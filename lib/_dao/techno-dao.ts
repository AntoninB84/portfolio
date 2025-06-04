'use server';

import postgres from 'postgres';
import { Techno, TechnoForm, TechnoFormSchema } from '../_objects/techno';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadFile } from '../upload-actions';
import { createObjectImage, deleteObjectImageByObjectIdAndObjectType } from './objectImage-dao';
import { ImageObjectType } from '../_objects/objectImage';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

const CreateTechno = TechnoFormSchema.omit({id: true});
const UpdateTechno = TechnoFormSchema.omit({id: true});

export type TechnoFormState = {
  errors?: {
    name?: string[];
    logo?: string[];
  };
  message?: string | null;
};

export async function createTechno(prevState: TechnoFormState, formData: FormData) {
    const validatedFields = CreateTechno.safeParse({
        name: formData.get('name'),
        logo: formData.get('logo')
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Techno.',
      };
    }

    const { name, logo } = validatedFields.data;

    try{
      const data = await sql`
        INSERT INTO technos (name)
        VALUES (${name}) RETURNING ID
      `;
      const technoId = data[0].id;
    
      await createObjectImage(logo, ImageObjectType.Techno, technoId);
    }catch (error) {
      return {
        message: 'Database Error: Failed to Create Techno.',
      };
    }

    revalidatePath('/dashboard/technos');
    redirect('/dashboard/technos');
}

export async function updateTechno(id: string, prevState: TechnoFormState, formData: FormData) {
    const validatedFields = await UpdateTechno.safeParseAsync({
        name: formData.get('name'),
        logo: formData.get('logo')
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Techno.',
      };
    }

    const { name, logo } = validatedFields.data;

    try {
        await sql`
            UPDATE technos
            SET name = ${name}
            WHERE id = ${id}
        `;

        if(logo.size > 0 && logo.name !== 'undefined'){
          await deleteObjectImageByObjectIdAndObjectType(id, ImageObjectType.Techno);
          await createObjectImage(logo, ImageObjectType.Techno, id);
        }
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Techno.',
        };
    }
    
    revalidatePath('/dashboard/technos');
    redirect('/dashboard/technos');
}

export async function fetchTechnos() {
  try {
    const data = await sql<Techno[]>`SELECT * FROM technos`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch technos data.');
  }
}

export async function fetchTechnoById(id: string) {
  try {
    const data = await sql<TechnoForm[]>`
      SELECT
        technos.id,
        technos.name,
        objectImages.id as logoId,
        objectImages.filename as logofilename 
      FROM technos 
      LEFT JOIN objectImages ON objectImages.objectId = technos.id AND objectImages.objectType = ${ImageObjectType.Techno} 
      WHERE technos.id = ${id} ;
    `;

    const techno = data.map((techno) => ({...techno}));

    return techno[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch techno.');
  }
}

export async function fetchTechnosByProjectId(projectId: string) {
  try {
    const data = await sql<Techno[]>`
      SELECT
        technos.id,
        technos.name,
        objectImages.id as logoId,
        objectImages.filename as logofilename
      FROM technos 
      LEFT JOIN objectImages ON objectImages.objectId = technos.id AND objectImages.objectType = ${ImageObjectType.Techno}  
      WHERE technos.id in (SELECT projectTechnos.techno_id FROM projectTechnos WHERE projectTechnos.project_id = ${projectId});
    `;

    const techno = data.map((techno) => ({...techno}));

    return techno;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch techno.');
  }
}

export async function deleteTechno(id: string){
    await sql`DELETE FROM technos WHERE id = ${id}`;
    await deleteObjectImageByObjectIdAndObjectType(id, ImageObjectType.Techno);
    revalidatePath('/dashboard/technos');
}