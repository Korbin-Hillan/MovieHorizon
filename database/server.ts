import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

// Load .env.local if it exists
dotenv.config({ path: '.env.local' });

const app = express();

// Allows frontend (React) to communicate with backend (Express)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306
});

// GET route to fetch movies
app.get('/movie', async (req, res) => {
    console.log("✅ Received GET request to /movie"); // Log request
    try {
        const [rows] = await pool.query('SELECT * FROM movie'); // Ensure correct table name
        console.log("🎬 Movies fetched from database:", rows); // Log fetched data
        res.json(rows);
    } catch (err) {
        console.error("❌ Database Error:", err);
        res.status(500).json({ message: "Database error" });
    }
});


// Define server port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


