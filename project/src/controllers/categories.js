import { getAllCategories } from "../models/categories.js";

// Controller for the Categories page
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    res.render("categories", {
        title: "Categories",
        categories
    });
};

export { showCategoriesPage };