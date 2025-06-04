'use server';

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

export async function createProjectTechno(technoId: string, projectId: string) {
    
    try{
      await sql`
        INSERT INTO projectTechnos (project_id, techno_id)
        VALUES (${projectId}, ${technoId})
      `;
    }catch (error) {
      return {
        message: 'Database Error: Failed to Create ProjectTechno.',
      };
    }
}

export async function fetchTechnosIdsByProjectId(projectId: string) {
  try {
    const data = await sql`
      SELECT
        projectTechnos.techno_id 
      FROM projectTechnos
      WHERE projectTechnos.project_id = ${projectId};
    `;

    const projectTechno = data.map((projectTechno) => projectTechno.techno_id);

    return projectTechno;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projectTechno.');
  }
}

export async function deleteProjectTechno(projectId: string, technoId: string){
    await sql`DELETE FROM projectTechnos WHERE project_id = ${projectId} AND techno_id = ${technoId}`;
}