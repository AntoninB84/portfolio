"use server";

import fs from "node:fs/promises";

export async function uploadFile(file: File, filename: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/uploads/${filename}`, buffer);
}

export async function deleteFile(filename: string) {
  try{
    await fs.rm(`./public/uploads/${filename}`);
  }catch(e){
    console.log(`Failed to delete file : ${filename}`);
    console.log(e);
  }
}