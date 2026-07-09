import {
    getAllCategories,
    getCategoryDetails
} from "../models/categories.js";

import {
    getProjectsByCategoryId
} from "../models/projects.js";

// =========================================
// Categories List Page
// =========================================
const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();

    res.render("categories", {
        title: "Categories",
        categories
    });
};

// =========================================
// Category Details Page
// =========================================
const showCategoryDetailsPage = async (req, res, next) => {

    const categoryId = req.params.id;

    const categoryDetails =
        await getCategoryDetails(categoryId);

    if (!categoryDetails) {
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }

    const projects =
        await getProjectsByCategoryId(categoryId);

    res.render("category", {
        title: categoryDetails.category_name,
        categoryDetails,
        projects
    });
};

// =========================================
// Export controller functions
// =========================================
export {
    showCategoriesPage,
    showCategoryDetailsPage
};