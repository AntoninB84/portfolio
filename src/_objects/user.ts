export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const userTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`;