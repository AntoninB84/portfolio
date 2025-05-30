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

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      // createUserTable(),
      // createAdmin(),
    ]);

    return Response.json({ message: 'Database created successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
