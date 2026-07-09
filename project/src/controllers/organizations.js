import { getAllOrganizations } from "../models/organizations.js";

// Controller for the Organizations page
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = "Our Partner Organizations";

    res.render("organizations", {
        title,
        organizations
    });
};

export { showOrganizationsPage };