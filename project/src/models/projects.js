import db from "./db.js";

// =========================================
// Get the next upcoming projects
// =========================================
const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        INNER JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date
        LIMIT $1;
    `;

    const result = await db.query(query, [numberOfProjects]);

    return result.rows;
};

// =========================================
// Get details for one project
// =========================================
const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        INNER JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// =========================================
// Get all projects for an organization
// =========================================
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            title,
            description,
            date,
            location,
            organization_id
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const result = await db.query(query, [organizationId]);

    return result.rows;
};

// =========================================
// Get all projects for a category
// =========================================
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id
        FROM project p
        INNER JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

// =========================================
// Create a new project
// =========================================
const createProject = async (
    title,
    description,
    location,
    date,
    organizationId
) => {

    const query = `
        INSERT INTO project
        (
            title,
            description,
            location,
            date,
            organization_id
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        RETURNING project_id;
    `;

    const result = await db.query(query, [
        title,
        description,
        location,
        date,
        organizationId
    ]);

    if (result.rows.length === 0) {
        throw new Error("Failed to create project");
    }

    if (process.env.ENABLE_SQL_LOGGING === "true") {
        console.log(
            "Created new project with ID:",
            result.rows[0].project_id
        );
    }

    return result.rows[0].project_id;
};

// =========================================
// Get categories assigned to one project
// =========================================
const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            c.category_id,
            c.category_name,
            c.description
        FROM category c
        INNER JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;

};

// =========================================
// Export model functions
// =========================================
export {
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    createProject
};