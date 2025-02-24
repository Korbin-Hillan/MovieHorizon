"use client";
import Link from 'next/link';
import "../../globals.css"; 

export default function Header() {
  return (
    <header className="bg-white h-14 flex items-center justify-between px-40">
      <h1 className="text-3xl font-bold text-black">MovieDB</h1>

      <div className="w-full sm:w-1/3">
        <label htmlFor="movie-search" className="sr-only">
          Search movies
        </label>
        <input
          id="movie-search"
          type="text"
          placeholder="Search movies..."
          className="w-full bg-gray-200 rounded-full h-10 pl-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex space-x-4">
        <Link href="/login">
        <button
          type="button"
          className="text-black w-12 h-10 pr-10"
        >
          Login
        </button>
        </Link>
        <Link href="/signup">
        <button
          type="button"
          className="text-black w-18 h-10"
        >
          Join MovieDB
        </button>
        </Link>
      </div>
    </header>
  );
}
