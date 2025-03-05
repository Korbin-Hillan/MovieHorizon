"use client";

import Header from "../components/Header/header";
import Sidebar from "../components/NavBar/nav-bar1";
import axios from "axios";
import Image from "next/image";
import Movies_list from "./movies_list"
import React, { useEffect, useState, useRef } from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export default function MoviesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false); // NavBar is Expanded by default -> useState(true) if collapse by default
  const [movies, setMovies] = useState<Movie[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";


  useEffect(() => {
    axios
      .get(`${API_URL}/movie`)
      .then((response) => {
        console.log("Response data:", response.data);
        setMovies(response.data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [API_URL]);
  return (
    <div className="flex min-h-screen bg-custom-bg transition-all">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"}`}
      >
        <Header />
        <Movies_list />
      </div>
    </div>
  );
}
