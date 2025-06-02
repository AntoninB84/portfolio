'use server';

import postgres from 'postgres';
import { Techno, TechnoForm, TechnoFormSchema } from '../_objects/techno';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

const CreateTechno = TechnoFormSchema.omit({id: true});
const UpdateTechno = TechnoFormSchema.omit({id: true});

export type TechnoFormState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createTechno(prevState: TechnoFormState, formData: FormData) {
    const validatedFields = CreateTechno.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Techno.',
      };
    }

    const { name } = validatedFields.data;

    try{
      await sql`
        INSERT INTO technos (name)
        VALUES (${name})
      `;
    }catch (error) {
      return {
        message: 'Database Error: Failed to Create Techno.',
      };
    }

    revalidatePath('/dashboard/technos');
    redirect('/dashboard/technos');
}

export async function updateTechno(id: string, prevState: TechnoFormState, formData: FormData) {
    const validatedFields = UpdateTechno.safeParse({
        name: formData.get('name'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Techno.',
      };
    }

    const { name } = validatedFields.data;

    try {
        await sql`
            UPDATE technos
            SET name = ${name}
            WHERE id = ${id}
        `;
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
        technos.name
      FROM technos
      WHERE technos.id = ${id};
    `;

    const techno = data.map((techno) => ({...techno}));

    return techno[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch techno.');
  }
}

export async function deleteTechno(id: string){
    await sql`DELETE FROM technos WHERE id = ${id}`;
    revalidatePath('/dashboard/technos');
}