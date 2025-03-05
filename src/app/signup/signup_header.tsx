"use client";
import Link from 'next/link';
import "../globals.css"; 

const Header = () => {
  return (
    <header className="bg-white h-14 flex items-center justify-between px-40">
      <h1 className="text-3xl font-bold text-black">MovieDB</h1>



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

export default Header;