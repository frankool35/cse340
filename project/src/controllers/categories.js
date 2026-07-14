
import {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments
} from "../models/categories.js";

import {
    getProjectsByCategoryId,
    getProjectDetails
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
// Show Assign Categories Form
// =========================================
const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const projectDetails =
        await getProjectDetails(projectId);

    const categories =
        await getAllCategories();

    const assignedCategories =
        await getCategoriesByServiceProjectId(projectId);

    const title = "Assign Categories to Project";

    res.render("assign-categories", {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });

};

// =========================================
// Process Assign Categories Form
// =========================================
const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const selectedCategoryIds =
        req.body.categoryIds || [];

    const categoryIdsArray =
        Array.isArray(selectedCategoryIds)
            ? selectedCategoryIds
            : [selectedCategoryIds];

    await updateCategoryAssignments(
        projectId,
        categoryIdsArray
    );

    req.flash(
        "success",
        "Categories updated successfully."
    );

    res.redirect(`/project/${projectId}`);

};


// =========================================
// Export controller functions
// =========================================
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
};