'use server';

import postgres from 'postgres';
import { Project, ProjectFormSchema } from '../_objects/project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ImageObjectType, ImageType } from '../_objects/objectImage';
import { toArray } from '../utils';
import { createProjectTechno, deleteProjectTechno, fetchTechnosIdsByProjectId } from './projectTechno-dao';
import { createObjectImage, deleteObjectImageByObjectIdAndObjectType, fetchObjectImageByObjectTypeAndId } from './objectImage-dao';
import { fetchTechnosByProjectId } from './techno-dao';
import { createTranslation, deleteTranslationByObjectIdAndObjectType, fetchTranslationByObjectTypeAndId, fetchTranslationByObjectTypeAndIdAndLocale, updateTranslation } from './translation-dao';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

const CreateProject = ProjectFormSchema.omit({id: true});
const UpdateProject = ProjectFormSchema.omit({id: true});

export type ProjectFormState = {
  errors?: {
    name?: string[];
    descriptions?: string[];
    year?: string[];
    ismobile?: string[];
    isweb?: string[];
    images?: string[];
    technos?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: ProjectFormState, formData: FormData) {
  const validatedFields = await CreateProject.safeParseAsync({
      name: formData.get('name'),
      year: formData.get('year'),
      descriptions: (() => {
        const desc = formData.get('descriptions');
        return typeof desc === 'string' ? JSON.parse(desc) : undefined;
      })(),
      ismobile: formData.get('ismobile'),
      isweb: formData.get('isweb'),
      technos: formData.getAll('technos'),
      images: formData.getAll('images'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Project.',
    };
  }

  const { name, year, descriptions, ismobile, isweb, technos, images } = validatedFields.data;

  try{
    const data = await sql`
      INSERT INTO projects (name, year, ismobile, isweb)
      VALUES (${name}, ${year}, ${ismobile ? true : false}, ${isweb ? true : false})
      RETURNING id
    `;
    const projectId = data[0].id;

    // Creating translations for the project
    descriptions.forEach(async (description: { locale: string; content: string; }) => {
      await createTranslation(description.content, description.locale, 'Project', projectId);
    });

    // Creating links between project and techno
    if(technos){
      const technoIds = toArray(technos);
      for(const technoId of technoIds){
        await createProjectTechno(technoId, projectId);
      }
    }

    // Creating images for the project
    if(images){
      const imagesAsArray = toArray(images);
      for(const image of imagesAsArray){
        if(image.size > 0 && image.name !== 'undefined'){
          await createObjectImage(image, ImageObjectType.Project, projectId);
        }
      }
    }
  }catch (error) {
    return {
      message: 'Database Error: Failed to Create Project.',
    };
  }

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function updateProject(id: string, prevState: ProjectFormState, formData: FormData) {
    const validatedFields = await UpdateProject.safeParseAsync({
        name: formData.get('name'),
        year: formData.get('year'),
        descriptions: (() => {
          const desc = formData.get('descriptions');
          return typeof desc === 'string' ? JSON.parse(desc) : undefined;
        })(),
        ismobile: formData.get('ismobile'),
        isweb: formData.get('isweb'),
        technos: formData.getAll('technos'),
        images: formData.getAll('images'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Project.',
      };
    }

    const { name, year, descriptions, ismobile, isweb, technos, images } = validatedFields.data;

    const currentTechnosIds = toArray(technos);
    const previousTechnosIds = await fetchTechnosIdsByProjectId(id);
    const toCreateProjectTechnoIds = currentTechnosIds.filter(id => !previousTechnosIds.includes(id));
    const toDeleteProjectTechnoIds = previousTechnosIds.filter(id => !currentTechnosIds.includes(id));

    try {
        await sql`
            UPDATE projects
            SET name = ${name}, year = ${year},
            ismobile = ${ismobile ? true : false}, isweb = ${isweb ? true : false} 
            WHERE id = ${id}
        `;

        //Updating translations
        descriptions.forEach(async (description: { locale: string; content: string; }) => {
           const translationExists = await fetchTranslationByObjectTypeAndIdAndLocale('Project', id, description.locale);
            if (translationExists.length > 0) {
              await updateTranslation(description.content, description.locale, 'Project', id);
              return; // If translation already exists, skip creation
            }
            // If translation does not exist, create it
            await createTranslation(description.content, description.locale, 'Project', id);
        });

        //Creating new links between project and techno
        for(const technoId of toCreateProjectTechnoIds){
          await createProjectTechno(technoId, id);
        }

        //Deleting old links between project and techno
        for(const technoId of toDeleteProjectTechnoIds){
          await deleteProjectTechno(id, technoId);
        }

        if(images){
          const imagesAsArray = toArray(images);
          for(const image of imagesAsArray){
            if(image.size > 0 && image.name !== 'undefined'){
              await createObjectImage(image, ImageObjectType.Project, id);
            }
          }
        }
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Project.',
        };
    }
    
    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function fetchProjects(locale: string = 'en') {
  try {
    // Fetch all projects with their translations in a single query
    const projectsData = await sql<Project[]>`
      SELECT 
        p.*,
        COALESCE(t.content, '') as description
      FROM projects p
      LEFT JOIN translations t ON t.objectid = p.id 
        AND t.objectType = 'Project' 
        AND t.locale = ${locale}
      ORDER BY p.position DESC
    `;

    if (projectsData.length === 0) {
      return [];
    }

    const projectIds = projectsData.map(p => p.id);

    // Fetch all technos for all projects in a single query
    const technosData = await sql<any[]>`
      SELECT
        pt.project_id,
        t.id,
        t.name,
        oi.id as logoId,
        oi.filename as logofilename
      FROM projectTechnos pt
      JOIN technos t ON t.id = pt.techno_id
      LEFT JOIN objectImages oi ON oi.objectId = t.id 
        AND oi.objectType = ${ImageObjectType.Techno}
      WHERE pt.project_id = ANY(${projectIds})
    `;

    // Fetch all images for all projects in a single query
    const imagesData = await sql<any[]>`
      SELECT
        oi.id,
        oi.filename,
        oi.objectId,
        oi.objectType,
        oi.imagetype,
        oi.position
      FROM objectImages oi
      WHERE oi.objectId = ANY(${projectIds})
        AND oi.objectType = ${ImageObjectType.Project}
      ORDER BY oi.position ASC
    `;

    // Group technos and images by project ID
    const technosByProject = new Map<string, any[]>();
    const imagesByProject = new Map<string, any[]>();

    technosData.forEach(techno => {
      const projectId = techno.project_id;
      if (!technosByProject.has(projectId)) {
        technosByProject.set(projectId, []);
      }
      technosByProject.get(projectId)!.push({
        id: techno.id,
        name: techno.name,
        logoId: techno.logoid,
        logofilename: techno.logofilename
      });
    });

    imagesData.forEach(image => {
      const projectId = image.objectid;
      if (!imagesByProject.has(projectId)) {
        imagesByProject.set(projectId, []);
      }
      imagesByProject.get(projectId)!.push(image);
    });

    // Combine all data
    const projects = projectsData.map(project => ({
      ...project,
      technos: technosByProject.get(project.id) || [],
      images: imagesByProject.get(project.id) || []
    }));

    return projects;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projects data.');
  }
}

export async function fetchProjectById(id: string) {
  try {
    const data = await sql<Project[]>`
      SELECT *
      FROM projects 
      WHERE projects.id = ${id};
    `;

    const projects = data.map((project) => ({...project}));

    var project = projects[0];
    const translations = await fetchTranslationByObjectTypeAndId('Project', project.id);
    project.description = JSON.stringify(translations);
    project.technos = await fetchTechnosByProjectId(id);
    project.images = await fetchObjectImageByObjectTypeAndId(ImageObjectType.Project, id);

    return project;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project.');
  }
}

export async function deleteProject(id: string){
    await sql`DELETE FROM projects WHERE id = ${id}`;
    await deleteObjectImageByObjectIdAndObjectType(id, ImageObjectType.Project);
    await deleteTranslationByObjectIdAndObjectType(id, 'Project');
    revalidatePath('/dashboard/projects');
}