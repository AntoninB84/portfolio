'use server';

import postgres from 'postgres';
import { User } from '../_objects/user';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}