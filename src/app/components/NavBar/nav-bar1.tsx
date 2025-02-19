"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BiCameraMovie } from "react-icons/bi";
import { ImTv } from "react-icons/im";

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
          <FiChevronRight size={30} />
        ) : (
          <FiChevronLeft size={30} />
        )}
      </button>

      {/* Sidebar Content (hidden when collapsed) */}
      {!isCollapsed && (
        <div className="p-4">
          <h2 className="text-lg font-bold">Navigation</h2>
          <div className="mt-4 space-y-2">
            {/* Movies Recently Released */}
            <p className="flex cursor-pointer items-center rounded-md bg-gray-800 px-2 py-2 hover:bg-gray-700">
              <BiCameraMovie size={25} className="ml-2 mr-3" />
              Movies Recently Released
            </p>

            {/* Series Recently Released */}
            <p className="flex cursor-pointer items-center rounded-md bg-gray-800 px-2 py-2 hover:bg-gray-700">
              <ImTv size={22} className="ml-2 mr-3" />
              Series Recently Released
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
