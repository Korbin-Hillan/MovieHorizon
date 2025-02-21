"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from "lucide-react";

function isLongWord(word: string): boolean {
    return word.length > 21;
}

interface Movie {
    MovieID: number;
    Title: string;
    Image: string;
}

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get<Movie[]>(`${API_URL}/movie`) // ✅ Fixed Syntax Error
            .then(response => setMovies(response.data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    const scrollLeft = () => {
        //Use an if to ensure the property is not null and fully rendered
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: -1340, behavior: "smooth"})
        }
    }

    const scrollRight = () => {
        //Use an if to ensure the property is not null and fully rendered
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: 1340, behavior: "smooth"})
        }
    }

    return (
        <div className="relative p-4">
            <h1 className="text-white text-xl whitespace-nowrap text-center">Now in Theaters</h1>

            {/* Left Scroll Button */}
            <button className="absolute bg-black left-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
            onClick={scrollLeft}>
                <ChevronLeft className="text-white w-6 h-6" />
            </button>

            {/* Movie List */}
            <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide">
                {movies.map((movie) => {
                    console.log(movie.Title + " " + isLongWord(movie.Title));

                    // ✅ Do not modify state directly. Use a derived value.
                    const displayedTitle = isLongWord(movie.Title)
                        ? movie.Title.substring(0, 21) + "..."
                        : movie.Title;

                    return (
                        <div key={movie.MovieID} className="flex flex-col items-center flex-shrink-0">
                            <Image
                                src={movie.Image}
                                alt={movie.Title}
                                width={200}
                                height={300}
                                className="w-44 h-64 object-cover rounded-lg"
                            />
                            <h6 className="text-center text-sm mt-2">{displayedTitle}</h6>
                        </div>
                    );
                })}
            </div>

            {/* Right Scroll Button */}
            <button className="absolute bg-black right-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
            onClick={scrollRight}>
                <ChevronRight className="text-white w-6 h-6" />
            </button>

        </div>
    );
};

export default Movies;
