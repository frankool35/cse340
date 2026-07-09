import {
    getAllOrganizations,
    getOrganizationDetails
} from "../models/organizations.js";

import {
    getProjectsByOrganizationId
} from "../models/projects.js";

// Controller for the Organizations page
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = "Our Partner Organizations";

    res.render("organizations", {
        title,
        organizations
    });
};

// Controller for a single Organization Details page
const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;

    const organizationDetails =
        await getOrganizationDetails(organizationId);

    const projects =
        await getProjectsByOrganizationId(organizationId);

    // If no organization exists, return a 404 error
    if (!organizationDetails) {
        const err = new Error("Organization not found");
        err.status = 404;
        return res.status(404).render("errors/404", {
            title: "Page Not Found"
        });
    }

    res.render("organization", {
        title: organizationDetails.name,
        organizationDetails,
        projects
    });
};

// Export controller functions
export {
    showOrganizationsPage,
    showOrganizationDetailsPage
};