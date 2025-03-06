"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Media {
  id: number;
  title?: string; // Movies have `title`, TV shows have `name`
  name?: string;
  overview: string;
  poster_path: string;
}

const Movies = () => {
  const [moviesInTheaters, setMoviesInTheaters] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTVShows, setPopularTVShows] = useState<Media[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const moviesInTheatersRef = useRef<HTMLDivElement | null>(null);
  const popularMoviesRef = useRef<HTMLDivElement | null>(null);
  const popularTVShowsRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    axios.get(`${API_URL}/movie`)
      .then((response) => setMoviesInTheaters(response.data))
      .catch((error) => console.error("Error fetching movies in theaters:", error));

    axios.get(`${API_URL}/Popular_Movies`)
      .then((response) => setPopularMovies(response.data))
      .catch((error) => console.error("Error fetching popular movies:", error));

    axios.get(`${API_URL}/Popular_TVShows`)
      .then((response) => setPopularTVShows(response.data))
      .catch((error) => console.error("Error fetching popular TV shows:", error));
  }, [API_URL]);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -1340, behavior: "smooth" });
    }
  };
  
  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 1340, behavior: "smooth" });
    }
  };

  const scrollContinuously = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref.current) return;
  
    let scrollAmount = direction === "right" ? 5 : -5;
    let intervalId: NodeJS.Timeout | null = null;
    let delayTimeout: NodeJS.Timeout | null = null;
    let isHeld = false;
  
    // Start delay timer (500ms before continuous scrolling)
    delayTimeout = setTimeout(() => {
      isHeld = true;
      intervalId = setInterval(() => {
        if (ref.current) {
          ref.current.scrollLeft += scrollAmount;
        }
      }, 10);
    }, 100); // 500ms delay before continuous scroll starts
  
    const stopScrolling = () => {
      if (delayTimeout) {
        clearTimeout(delayTimeout);
        delayTimeout = null;
      }
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
  
      // Only trigger small scroll if the button was *not* held
      if (!isHeld && ref.current) {
        ref.current.scrollBy({ left: scrollAmount * 267, behavior: "smooth" });
      }
  
      isHeld = false; // Reset hold state
  
      document.removeEventListener("mouseup", stopScrolling);
      document.removeEventListener("mouseleave", stopScrolling);
    };
  
    document.addEventListener("mouseup", stopScrolling);
    document.addEventListener("mouseleave", stopScrolling);
  };
  
  
  

  return (
    <div className="p-4">
      {/* Movies in Theaters */}
      <section className="relative">
        <h1 className="text-white text-xl text-center">Movies in Theaters</h1>
        <button
          className="absolute bg-black left-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
          onMouseDown={() => scrollContinuously(moviesInTheatersRef, "left")}
          >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        <div ref={moviesInTheatersRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
          {moviesInTheaters.map((movie) => {
            const displayedTitle = movie.title
              ? movie.title.length > 21
                ? movie.title.substring(0, 21) + "..."
                : movie.title
              : "Untitled";

            return (
              <div key={movie.id} className="flex flex-col items-center flex-shrink-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title || "Movie"}
                  width={200}
                  height={300}
                  className="w-44 h-64 object-cover rounded-lg"
                />
                <h6 className="text-center text-sm mt-2">{displayedTitle}</h6>
              </div>
            );
          })}
        </div>

        <button
          className="absolute bg-black right-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
          onMouseDown={() => scrollContinuously(moviesInTheatersRef, "right")}

        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </section>

      {/* Popular Movies */}
      <section className="relative mt-8">
        <h1 className="text-white text-xl text-center">Popular Movies</h1>
        <button
          className="absolute bg-black left-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
          onMouseDown={() => scrollContinuously(popularMoviesRef, "left")}
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        <div ref={popularMoviesRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
          {popularMovies.map((movie) => {
            const displayedTitle = movie.title
              ? movie.title.length > 21
                ? movie.title.substring(0, 21) + "..."
                : movie.title
              : "Untitled";

            return (
              <div key={movie.id} className="flex flex-col items-center flex-shrink-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title || "Movie"}
                  width={200}
                  height={300}
                  className="w-44 h-64 object-cover rounded-lg"
                />
                <h6 className="text-center text-sm mt-2">{displayedTitle}</h6>
              </div>
            );
          })}
        </div>

        <button
          className="absolute bg-black right-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
          onMouseDown={() => scrollContinuously(popularMoviesRef, "right")}
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </section>

      {/* Popular TV Shows */}
      <section className="relative mt-8">
        <h1 className="text-white text-xl text-center">Popular TV Shows</h1>
        <button
          className="absolute bg-black left-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
          onMouseDown={() => scrollContinuously(popularTVShowsRef, "left")}
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        <div ref={popularTVShowsRef} className="flex gap-4 overflow-x-auto scrollbar-hide">
          {popularTVShows.map((show) => {
            const displayedTitle = show.name
              ? show.name.length > 21
                ? show.name.substring(0, 21) + "..."
                : show.name
              : "Untitled";

            return (
              <div key={show.id} className="flex flex-col items-center flex-shrink-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                  alt={show.name || "TV Show"}
                  width={200}
                  height={300}
                  className="w-44 h-64 object-cover rounded-lg"
                />
                <h6 className="text-center text-sm mt-2">{displayedTitle}</h6>
              </div>
            );
          })}
        </div>

        <button
          className="absolute bg-black right-0 top-1/2 bg-opacity-70 -translate-y-1/2 rounded-full p-2 hover:bg-sky-700 active:bg-blue-500"
          onMouseDown={() => scrollContinuously(popularTVShowsRef, "right")}
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </section>
    </div>
  );
};

export default Movies;
