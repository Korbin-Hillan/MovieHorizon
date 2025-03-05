"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1); // Current page state
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  useEffect(() => {
    axios
      .get(`${API_URL}/movies_list?page=${page}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setMovies(response.data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [page]);

  const nextPage = () => setPage((prev) => prev + 1);

  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-4">
      <h1 className="text-white text-xl text-center mb-6">Movies</h1>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {movies.map((movie) => {
          const displayedTitle =
            movie.title.length > 21
              ? movie.title.substring(0, 21) + "..."
              : movie.title;

          return (
            <div key={movie.id} className="flex flex-col items-center">
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className="w-44 h-64 object-cover rounded-lg"
              />
              <h6 className="text-center text-sm mt-2 text-white">{displayedTitle}</h6>
            </div>
          );
        })}
      </div>

      {}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-white text-lg">Page {page}</span>
        <button
          onClick={nextPage}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesList;
