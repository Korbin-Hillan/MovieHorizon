"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) => {
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      {/* Toggle Button */}
      <button
        className="absolute right-[-15px] top-5 rounded-full bg-gray-700 p-1"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <FiChevronRight size={20} />
        ) : (
          <FiChevronLeft size={20} />
        )}
      </button>

      {/* Sidebar Content (hidden when collapsed)*/}
      {!isCollapsed && (
        <div className="p-4">
          <h2 className="text-lg font-bold">Navigation</h2>
          <div className="mt-4">
            <p className="cursor-pointer rounded-md bg-gray-800 px-2 py-2 hover:bg-gray-700">
              Movies Recently Released
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
