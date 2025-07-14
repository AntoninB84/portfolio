'use server';

import postgres from 'postgres';
import { Translation } from '../_objects/translation';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function createTranslation(content: string, locale: string, parentType: string, parentId: string) {
    try{
      await sql`
        INSERT INTO translations (objectId, objectType, locale, content)
        VALUES (${parentId}, ${parentType}, ${locale}, ${content})
      `;
    }catch (error) {
      return {
        message: 'Database Error: Failed to Create Translation.',
      };
    }
}

export async function updateTranslation(content: string, locale: string, parentType: string, parentId: string) {
    try{
      await sql`
        UPDATE translations SET content = ${content} 
        WHERE objectId = ${parentId} AND objectType = ${parentType} AND locale = ${locale}`;
    }catch (error) {
      return {
        message: 'Database Error: Failed to update Translation.',
      };
    }
}

export async function fetchTranslationByObjectTypeAndId(objectType: string, objectId: string) {
  try {
    const data = await sql<Translation[]>`
      SELECT
        translations.id,
        translations.objectId,
        translations.objectType,
        translations.locale,
        translations.content 
      FROM translations
      WHERE translations.objectid = ${objectId} AND translations.objectType = ${objectType};
    `;

    const translation = data.map((translation) => ({...translation}));

    return translation;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch translations.');
  }
}

export async function fetchTranslationByObjectTypeAndIdAndLocale(objectType: string, objectId: string, locale: string) {
  try {
    const data = await sql<Translation[]>`
      SELECT
        translations.id,
        translations.objectId,
        translations.objectType,
        translations.locale,
        translations.content 
      FROM translations
      WHERE translations.objectid = ${objectId} AND translations.objectType = ${objectType} and translations.locale = ${locale};
    `;

    const translation = data.map((translation) => ({...translation}));

    return translation;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch translations.');
  }
}

export async function deleteTranslationByObjectIdAndObjectType(objectId: string, objectType: string){
  try{
    const translations = await fetchTranslationByObjectTypeAndId(objectType, objectId);
    if(translations){
      await sql`DELETE FROM translations WHERE objectid = ${objectId} AND objecttype = ${objectType}`;
    }
  }catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to delete translations.');
  }
}