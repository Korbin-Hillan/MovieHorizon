"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
    MovieID: number;
    Title: string;
    Cost: number;
    Year: number;
    Budget: number;
    Revenue: number;
    Genre: string;
}

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios.get<Movie[]>("http://localhost:5001/movie")
            .then(response => setMovies(response.data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    return (
        <div>
            <h1>Movie Database</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.MovieID}>
                        <strong>{movie.Title}</strong> ({movie.Year}) - {movie.Genre}
                        <br />
                        Cost: ${movie.Cost} | Budget: ${movie.Budget} | Revenue: ${movie.Revenue}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;
