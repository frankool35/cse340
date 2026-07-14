import express from "express";

import { showHomePage } from "./controllers/index.js";

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from "./controllers/organizations.js";

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation
} from "./controllers/projects.js";

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from "./controllers/categories.js";

import { testErrorPage } from "./controllers/errors.js";


const router = express.Router();

// ===============================
// Home
// ===============================
router.get("/", showHomePage);

// ===============================
// Organizations
// ===============================
router.get("/organizations", showOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);

// ===============================
// Projects
// ===============================
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);

// New Project
router.get(
    "/new-project",
    showNewProjectForm
);

router.post(
    "/new-project",
    projectValidation,
    processNewProjectForm
);

// ===============================
// Categories
// ===============================
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);

// ===============================================
// Assign Categories to Project
// ===============================================
router.get(
    "/assign-categories/:projectId",
    showAssignCategoriesForm
);

router.post(
    "/assign-categories/:projectId",
    processAssignCategoriesForm
);

router.get(
    "/new-organization",
    showNewOrganizationForm
);

router.post(
    "/new-organization",
    organizationValidation,
    processNewOrganizationForm
);


router.get(
    "/edit-organization/:id",
    showEditOrganizationForm
);

router.post(
    "/edit-organization/:id",
    organizationValidation,
    processEditOrganizationForm
);

// ===============================
// Error Testing
// ===============================
router.get("/test-error", testErrorPage);

export default router;