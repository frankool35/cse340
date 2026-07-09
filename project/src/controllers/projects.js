import {
    getUpcomingProjects,
    getProjectDetails,
    getCategoryByProjectId
} from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// =========================================
// Projects List Page
// =========================================
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    res.render("projects", {
        title: "Upcoming Service Projects",
        projects
    });
};

// =========================================
// Project Details Page
// =========================================
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    const category = await getCategoryByProjectId(projectId);

    res.render("project", {
        title: project.title,
        project,
        category
    });
};

// Export controller functions
export {
    showProjectsPage,
    showProjectDetailsPage
};