import { getAllProjects } from "../models/projects.js";

// Controller for the Projects page
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();

    res.render("projects", {
        title: "Projects",
        projects
    });
};

export { showProjectsPage };