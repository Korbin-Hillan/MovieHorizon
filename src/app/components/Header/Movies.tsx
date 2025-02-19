"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';

interface Movie {
    MovieID: number;
    Title: string;
    Image: string;
}

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios.get<Movie[]>("http://localhost:5001/movie")
            .then(response => setMovies(response.data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    return (
        <div className="">
            <h1 className="text-white text-xl">Now in Theaters</h1>
            <div className="flex flex-wrap gap-4">
                {movies.map((movie) => (
                    <div key={movie.MovieID} className="flex flex-col items-center">
                    <Image 
                    src={movie.Image} 
                    alt={movie.Title} 
                    width={200} 
                    height={300} 
                    className="w-44 h-64 object-cover rounded-lg"
                    />
                        <h6 className="text-center text-sm mt-2">{movie.Title}</h6>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;
