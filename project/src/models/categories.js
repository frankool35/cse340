import db from "./db.js";

// =========================================
// Get all categories
// =========================================
const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            category_name,
            description
        FROM category
        ORDER BY category_name;
    `;

    const result = await db.query(query);

    return result.rows;
};

// =========================================
// Get one category
// =========================================
const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            category_name,
            description
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// =========================================
// Get categories assigned to a project
// =========================================
const getCategoriesByServiceProjectId = async (projectId) => {

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
// Assign one category to a project
// =========================================
const assignCategoryToProject = async (categoryId, projectId) => {

    const query = `
        INSERT INTO project_category
        (
            category_id,
            project_id
        )
        VALUES
        (
            $1,
            $2
        );
    `;

    await db.query(query, [categoryId, projectId]);
};

// =========================================
// Replace all category assignments
// =========================================
const updateCategoryAssignments = async (projectId, categoryIds) => {

    await db.query(
        `
        DELETE FROM project_category
        WHERE project_id = $1;
        `,
        [projectId]
    );

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

// =========================================
// Export model functions
// =========================================
export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments
};