"use client";

import Header from "../components/Header/header";
import Sidebar from "../components/NavBar/nav-bar1";
import TV_List from "./tvshow_list"
import React, { useState } from "react";

export default function MoviesPage() {
  const [isCollapsed, setIsCollapsed] = useState(false); // NavBar is Expanded by default -> useState(true) if collapse by default
  
  return (
    <div className="flex min-h-screen bg-custom-bg transition-all">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"}`}
      >
        <Header />
        <TV_List />
      </div>
    </div>
  );
}