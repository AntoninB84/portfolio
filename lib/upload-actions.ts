"use server";

import fs from "node:fs/promises";

export async function uploadFile(file: File, fileName: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/uploads/${fileName}`, buffer);
}