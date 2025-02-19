"use client";
import { useState, useEffect } from "react";
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
  const [textVisible, setTextVisible] = useState(!isCollapsed);

  // Handles Navigation Menu visibility with a delay
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCollapsed) {
      setTextVisible(false);
    } else {
      timer = setTimeout(() => {
        setTextVisible(true);
      }, 150);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isCollapsed]);

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
      {/* Sidebar Content */}
      <div className="mt-16 flex flex-col items-center space-y-1">
        {/* Movies Recently Released */}
        <div
          className={`group relative flex w-full cursor-pointer items-center rounded-md bg-gray-800 px-2 py-2 hover:bg-gray-700`}
        >
          <div
            className={`${isCollapsed ? "flex w-full justify-center" : "w-auto"}`}
          >
            <BiCameraMovie size={29} className="flex-shrink-0" />
          </div>
          {!isCollapsed && (
            <p
              className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${textVisible ? "opacity-100" : "opacity-0"}`}
            >
              Movies Recently Released
            </p>
          )}
          {isCollapsed && (
            <span className="absolute left-16 rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Movies Recently Released
            </span>
          )}
        </div>
        {/* Series Recently Released */}
        <div
          className={`group relative flex w-full cursor-pointer items-center rounded-md bg-gray-800 px-2 py-2 hover:bg-gray-700`}
        >
          <div
            className={`${isCollapsed ? "flex w-full justify-center" : "w-auto"}`}
          >
            <ImTv size={25} className="flex-shrink-0" />
          </div>
          {!isCollapsed && (
            <p
              className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${textVisible ? "opacity-100" : "opacity-0"}`}
            >
              Series Recently Released
            </p>
          )}
          {isCollapsed && (
            <span className="absolute left-16 rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Series Recently Released
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
