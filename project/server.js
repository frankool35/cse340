import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { testConnection } from "./src/models/db.js";
import router from "./src/routes.js";


import session from "express-session";
import flash from "./src/middleware/flash.js";


dotenv.config();

console.log("DB_URL =", process.env.DB_URL);
console.log("NODE_ENV =", process.env.NODE_ENV);

const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));


// Session management
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));

// Flash middleware
app.use(flash);

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === "development") {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


// Static files
app.use(express.static(path.join(__dirname, "public")));

// ===========================
// Routes
// ===========================
app.use(router);

// ===========================
// Catch-all 404 handler
// ===========================
app.use((req, res, next) => {
    const err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

// ===========================
// Global Error Handler
// ===========================
app.use((err, req, res, next) => {
    console.error(err.stack);

    const status = err.status || 500;

    res.status(status).render(`errors/${status === 404 ? "404" : "500"}`, {
        title: status === 404 ? "Page Not Found" : "Server Error",
        error: err,
        NODE_ENV
    });
});

// ===========================
// Start Server
// ===========================
app.listen(port, async () => {
    try {
        await testConnection();
        console.log(`Server running at http://127.0.0.1:${port}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});