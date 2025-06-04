'use server';

import postgres from 'postgres';
import { deleteFile, uploadFile } from '../upload-actions';
import { ObjectImage } from '../_objects/objectImage';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function createObjectImage(file: File, parentType: string, parentId: string) {
    
    const filename = `${parentType}-${parentId}-${file.name}`;

    try{
      await sql`
        INSERT INTO objectImages (objectId, objectType, filename)
        VALUES (${parentId}, ${parentType}, ${filename})
      `;
      await uploadFile(file, filename);
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

export async function fetchObjectImageByObjectTypeAndId(objectType: string, objectId: string) {
  try {
    const data = await sql<ObjectImage[]>`
      SELECT
        objectImages.id,
        objectImages.filename,
        objectImages.objectId,
        objectImages.objectType
      FROM objectImages
      WHERE objectImages.objectid = ${objectId} AND objectImages.objectType = ${objectType};
    `;

    const objectImage = data.map((objectImage) => ({...objectImage}));

    return objectImage;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch objectImages.');
  }
}

export async function deleteObjectImage(id: string){
  try{
    const objectImage = await fetchObjectImageById(id);
    if(objectImage){
      await sql`DELETE FROM objectImages WHERE id = ${id}`;
      deleteFile(objectImage.filename);
    }
  }catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to delete objectImage.');
  }
}

export async function deleteObjectImageByObjectIdAndObjectType(objectId: string, objectType: string){
  try{
    const objectImages = await fetchObjectImageByObjectTypeAndId(objectType, objectId);
    if(objectImages){
      await sql`DELETE FROM objectImages WHERE objectid = ${objectId} AND objecttype = ${objectType}`;
      objectImages.forEach((objectImage) => deleteFile(objectImage.filename))
    }
  }catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to delete objectImages.');
  }
}