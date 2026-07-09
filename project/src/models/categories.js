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
// Get one category by ID
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
// Export model functions
// =========================================
export {
    getAllCategories,
    getCategoryDetails
};