"use client";

import Header from "./components/Header/header";
import Movies from "./components/Header/Movies";
import Sidebar from "./components/NavBar/nav-bar1";
import { useState } from "react";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-custom-bg transition-all">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${isCollapsed ? "ml-16 w-[calc(100%-4rem)]" : "ml-64 w-[calc(100%-16rem)]"}`}
      >
        <Header />
        <Movies />
      </div>
    </div>
  );
}
