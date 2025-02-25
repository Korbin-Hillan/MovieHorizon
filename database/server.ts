import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load .env.local if it exists
dotenv.config({ path: '.env.local' });

const app = express();

// Allows frontend (React) to communicate with backend (Express)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

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
  
      const response = await fetch(url, options);
      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error("Error fetching authentication data:", err);
      res.status(500).json({ message: "Failed to fetch authentication data" });
    }
  });

  app.get("/movie", async (req, res) => {
    try {
      const url = 'https://api.themoviedb.org/3/movie/now_playing';
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
      };
  
      const response = await axios.get(url, options);
      // Send only the results array
      res.json(response.data.results);
    } catch (err) {
      console.error("Error fetching top rated movies:", err);
      res.status(500).json({ message: "Failed to fetch top rated movies" });
    }
  });
  
  
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});