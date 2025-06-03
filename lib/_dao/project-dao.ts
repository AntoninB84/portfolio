'use server';

import postgres from 'postgres';
import { Project, ProjectForm, ProjectFormSchema } from '../_objects/project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ImageObjectType } from '../_objects/objectImage';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

const CreateProject = ProjectFormSchema.omit({id: true});
const UpdateProject = ProjectFormSchema.omit({id: true});

export type ProjectFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    year?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: ProjectFormState, formData: FormData) {
    const validatedFields = CreateProject.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Project.',
      };
    }

    const { name } = validatedFields.data;

    try{
      await sql`
        INSERT INTO projects (name)
        VALUES (${name})
      `;
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
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Project.',
      };
    }

    const { name } = validatedFields.data;
    const project = await fetchProjectById(id);

    try {
        await sql`
            UPDATE projects
            SET name = ${name}
            WHERE id = ${id}
        `;
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
    const data = await sql<Project[]>`SELECT * FROM projects`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projects data.');
  }
}


export async function fetchProjectById(id: string) {
  try {
    const data = await sql<ProjectForm[]>`
      SELECT
        projects.id,
        projects.name,
      FROM projects 
      LEFT JOIN objectImages ON objectImages.objectId = projects.id  
      WHERE projects.id = ${id} AND objectImages.objectType = ${ImageObjectType.Project};
    `;

    const project = data.map((project) => ({...project}));

    return project[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch project.');
  }
}

export async function deleteProject(id: string){
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/dashboard/projects');
}