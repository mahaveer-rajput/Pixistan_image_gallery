"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <FaUserCircle
          size={32}
          className="text-gray-300 hover:text-gray-600  transition"
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-lg shadow-lg z-50"
          >
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm font-medium">u_1xidfwaxf</p>
            </div>
            <ul className="py-2">
              <MenuItem href="/profile">My profile</MenuItem>
              <MenuItem href="/media">My media</MenuItem>
              <MenuItem href="/upload">Upload</MenuItem>
              <MenuItem href="/stats">Statistics</MenuItem>
              <MenuItem href="/library">Library</MenuItem>
              <MenuItem href="/following">Following</MenuItem>
              <MenuItem href="/messages">Messages</MenuItem>
              <MenuItem href="/settings">Settings</MenuItem>
            </ul>
            <div className="px-4 py-2 border-t border-gray-700">
              <SafeSearchToggle />
              <button className="mt-2 w-full text-left text-red-400 hover:text-red-500">
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dropdown menu link
const MenuItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      href={href}
      className="block px-4 py-2 text-sm hover:bg-gray-800 transition"
    >
      {children}
    </Link>
  </li>
);

// SafeSearch toggle
const SafeSearchToggle = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">SafeSearch</span>
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:bg-green-500 transition"></div>
      </label>
    </div>
  );
};
