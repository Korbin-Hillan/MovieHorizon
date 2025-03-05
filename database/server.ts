import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import mysql, { PoolConnection, ResultSetHeader } from "mysql2";

// Load .env.local if it exists
dotenv.config({ path: ".env.local" });

const app: express.Application = express();

  console.log("🔍 DB Config:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });


  const pool = mysql.createPool({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Allows frontend (React) to communicate with backend (Express)
  app.use(cors());

  // Middleware to parse JSON request bodies
  app.use(express.json());

  pool.getConnection((err: Error | null, connection: PoolConnection) => {
    if (err) {
      console.error("❌ Error connecting to the database:", err.message);
      return;
    }
    console.log("✅ Connected to the database!");

    // Release the connection back to the pool
    connection.release();
  });

  // ✅ API Route: Fetch All Users from MySQL
  app.get("/users", (req: Request, res: Response) => {
    pool.query("SELECT * FROM `users`", (err, results) => {
      if (err) {
        console.error("❌ Error fetching users:", err.message);
        return res.status(500).json({ message: "Failed to fetch users" });
      }
      res.json(results);
    });
  });

  app.post("/users", (req: Request, res: Response): void => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
         res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO `users` (Username, PasswordHash, Email) VALUES (?, ?, ?)";

    pool.query<ResultSetHeader>(query, [username, password, email], (err, results) => {
        if (err) {
            console.error("❌ Error inserting user:", err);
            return res.status(500).json({ message: "Failed to insert user" });
        }
        res.status(201).json({ message: "User inserted successfully", userId: results.insertId });
    });
});




  app.get("/auth", async (req, res) => {
      try {
        const url = 'https://api.themoviedb.org/3/authentication';
        console.log("TMDB API Key:", process.env.TMDB_API_KEY);
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
          }
        };
    
      const response = await axios.get(url, { headers: options.headers });
      res.json(response.data);

      } catch (err) {
        console.error("Error fetching authentication data:", err);
        res.status(500).json({ message: "Failed to fetch authentication data" });
      }
    });

    app.get("/movie", async (req: Request, res: Response) => {
      try {
          const url = "https://api.themoviedb.org/3/movie/now_playing";
          const options = {
              headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
              },
          };
  
          const response = await axios.get(url, options);
          res.json(response.data.results);
      } catch (err) {
          console.error("Error fetching movies:", err);
          res.status(500).json({ message: "Failed to fetch movies" });
      }
  });
  
    
    
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });