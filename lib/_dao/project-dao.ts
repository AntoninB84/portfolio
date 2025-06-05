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

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

const CreateProject = ProjectFormSchema.omit({id: true});
const UpdateProject = ProjectFormSchema.omit({id: true});

export type ProjectFormState = {
  errors?: {
    name?: string[];
    description?: string[];
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
      description: formData.get('description'),
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

  const { name, year, description, ismobile, isweb, technos, images } = validatedFields.data;

  try{
    const data = await sql`
      INSERT INTO projects (name, year, description, ismobile, isweb)
      VALUES (${name}, ${year}, ${description}, ${ismobile ? true : false}, ${isweb ? true : false})
      RETURNING id
    `;
    const projectId = data[0].id;

    if(technos){
      const technoIds = toArray(technos);
      for(const technoId of technoIds){
        await createProjectTechno(technoId, projectId);
      }
    }

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
        description: formData.get('description'),
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

    const { name, year, description, ismobile, isweb, technos, images } = validatedFields.data;

    const currentTechnosIds = toArray(technos);
    const previousTechnosIds = await fetchTechnosIdsByProjectId(id);
    const toCreateProjectTechnoIds = currentTechnosIds.filter(id => !previousTechnosIds.includes(id));
    const toDeleteProjectTechnoIds = previousTechnosIds.filter(id => !currentTechnosIds.includes(id));

    try {
        await sql`
            UPDATE projects
            SET name = ${name}, year = ${year}, description = ${description},
            ismobile = ${ismobile ? true : false}, isweb = ${isweb ? true : false} 
            WHERE id = ${id}
        `;

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

export async function fetchProjects() {
  try {
    const data = await sql<Project[]>`SELECT * FROM projects ORDER BY year DESC`;

    const projects = data.map((project) => ({...project}));

    for(var project of projects){
      project.technos = await fetchTechnosByProjectId(project.id);
      project.images = await fetchObjectImageByObjectTypeAndId(ImageObjectType.Project, project.id);
    }

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
    revalidatePath('/dashboard/projects');
}