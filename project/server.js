import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";


dotenv.config();

console.log("DB_URL =", process.env.DB_URL);
console.log("NODE_ENV =", process.env.NODE_ENV);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.get("/organizations", async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = "Our Partner Organizations";

    res.render("organizations", {
        title,
        organizations
    });
});

app.get("/projects", async (req, res) => {
    const projects = await getAllProjects();

    res.render("projects", {
        title: "Projects",
        projects
    });
});

app.get("/categories", async (req, res) => {
    const categories = await getAllCategories();

    res.render("categories", {
        title: "Categories",
        categories
    });
});

// Start server
app.listen(port, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${port}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
