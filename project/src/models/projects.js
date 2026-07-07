import db from "./db.js";

const getAllProjects = async () => {
    const query = `
        SELECT
            project_id,
            project_name,
            description,
            start_date,
            organization_id,
            category_id
        FROM public.project;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };