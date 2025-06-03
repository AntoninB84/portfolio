'use server';

import postgres from 'postgres';
import { uploadFile } from '../upload-actions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function createObjectImage(file: File, parentType: string, parentId: string) {
    
    const fileName = `${parentType}-${parentId}-${file.name}`;

    console.log(fileName);
    try{
      await sql`
        INSERT INTO objectImages (objectId, objectType, fileName)
        VALUES (${parentId}, ${parentType}, ${fileName})
      `;
      await uploadFile(file, fileName);
    }catch (error) {
      return {
        message: 'Database Error: Failed to Create ObjectImage.',
      };
    }
}

export async function fetchObjectImageById(id: string) {
  try {
    const data = await sql`
      SELECT
        objectImages.id,
        objectImages.filename,
        objectImages.objectId,
        objectImages.objectType
      FROM objectImages
      WHERE objectImages.id = ${id};
    `;

    const objectImage = data.map((objectImage) => ({...objectImage}));

    return objectImage[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch objectImage.');
  }
}

export async function deleteObjectImage(id: string){
    await sql`DELETE FROM objectImages WHERE id = ${id}`;
}