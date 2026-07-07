import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

console.log("DB_URL:", process.env.DB_URL);

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected!");
    console.log(result.rows);
} catch (err) {
    console.error("❌ Error:");
    console.error(err);
} finally {
    await pool.end();
}