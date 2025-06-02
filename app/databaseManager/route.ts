'use server';

import postgres from 'postgres';
import bcryptjs from 'bcryptjs';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createUserTable() {
  // await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	const data = await sql`CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`;
	return data;
}

async function createAdmin() {
    const adminId = process.env.ADMIN_ID!;
    const adminEmail = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD!;
    const hashedPassword = await bcryptjs.hash(password, 10);
    return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${adminId}, 'Admin', ${adminEmail}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
    `;
}

async function createProjectTable() {
	const data = await sql`CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    isMobile BOOLEAN NOT NULL,
    isWeb BOOLEAN NOT NULL,
    year SMALLINT NOT NULL
  );`;
	return data;
}

async function createTechnoTable() {
	const data = await sql`CREATE TABLE IF NOT EXISTS technos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );`;
	return data;
}

async function createProjectTechnoTable() {
	const data = await sql`CREATE TABLE IF NOT EXISTS projectTechnos (
  project_id UUID NOT NULL,
  techno_id UUID NOT NULL,
  CONSTRAINT link_project_techno_project_id_fkey FOREIGN KEY (project_id)
     REFERENCES projects (id) MATCH SIMPLE 
     ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT link_project_techno_techno_id_fkey FOREIGN KEY (techno_id)
     REFERENCES technos (id) MATCH SIMPLE 
     ON DELETE CASCADE ON UPDATE CASCADE
  );`;
	return data;
}

async function createObjectImageTable() {
	const data = await sql`CREATE TABLE IF NOT EXISTS objectImages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    objectId UUID NOT NULL,
    objectType VARCHAR(255) NOT NULL,
    imageUrl TEXT NOT NULL
  );`;
	return data;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      // createUserTable(),
      // createAdmin(),
      // createProjectTable(),
      // createTechnoTable(),
      // createProjectTechnoTable(),
      // createObjectImageTable()
    ]);

    return Response.json({ message: 'Database created successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
