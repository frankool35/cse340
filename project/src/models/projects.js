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
            organization_id,
            category_id
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
            project_id,
            title,
            description,
            date,
            location,
            organization_id,
            category_id
        FROM project
        WHERE category_id = $1
        ORDER BY date;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
};

// =========================================
// Get category for one project
// =========================================
const getCategoryByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name,
            c.description
        FROM category c
        INNER JOIN project p
            ON c.category_id = p.category_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// =========================================
// Export model functions
// =========================================
export {
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId,
    getProjectsByCategoryId,
    getCategoryByProjectId
};