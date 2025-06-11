import React, { useState, useRef, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { FaSun, FaMoon } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from 'react-router-dom';

const notifications = [
  { id: 1, message: "New user registered", time: "2 min ago" },
  { id: 2, message: "Server backup completed", time: "10 min ago" },
  { id: 3, message: "New comment on post", time: "1 hr ago" },
];

const Topbar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-end items-center gap-6 p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-b dark:border-gray-700">
      {/* Theme Toggle */}
      <button
        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
      </button>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button
          className="relative text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
          onClick={() => setShowNotif((prev) => !prev)}
        >
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
        </button>

        {showNotif && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="p-3 border-b dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-100">
              Notifications
            </div>
            <ul>
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex flex-col"
                >
                  <span className="text-sm text-gray-800 dark:text-white">{n.message}</span>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </li>
              ))}
            </ul>
            <div className="p-2 text-center text-xs text-blue-500 hover:underline cursor-pointer">
              View all
            </div>
          </div>
        )}
      </div>

      {/* User Profile Dropdown */}
      <div className="relative" ref={profileRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowProfile((prev) => !prev)}
        >
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800 dark:text-white">Ashish Pathak</span>
          <MdKeyboardArrowDown />
        </div>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="flex flex-col items-center py-4 border-b dark:border-gray-700">
              <img
                src="https://i.pravatar.cc/60?img=3"
                alt="User"
                className="w-14 h-14 rounded-full object-cover mb-2"
              />
              <span className="font-semibold text-gray-800 dark:text-white">Ashish Pathak</span>
              <span className="text-xs text-gray-500">ashish@email.com</span>
            </div>
            <div className="flex flex-col py-2">
              <button
                className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
              >
                Settings
              </button>
              <button className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
