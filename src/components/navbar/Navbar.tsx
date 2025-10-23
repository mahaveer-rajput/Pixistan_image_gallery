"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import DropdownPanel from "@/components/DropdownPanel";
import PixistanAuth from "@/components/PixistanAuth";
import MegaMenu from "../MegaMenu";
import ProfileDropdown from "../ProfileDropDown";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    if (!isHome) return; // 👈 Only run scroll listener on homepage

    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
          : "bg-white shadow-md" // 👈 Solid navbar for other pages
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`hidden lg:block text-2xl font-bold ${
              isHome && !scrolled ? "text-white" : "text-black"
            }`}
          >
            Pixistan
          </Link>

          {/* Mobile Logo */}
          <Link
            href="/"
            className={`lg:hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-[10px] px-2 py-1 text-2xl font-bold ${
              isHome && !scrolled ? "text-white" : "text-black"
            }`}
          >
            Pix
          </Link>

          {/* Search Bar */}
          {isHome && scrolled && (
            <div className="flex-1 px-2 lg:px-8">
              <div
                className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 w-full max-w-2xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white focus-within:shadow-md"
                role="search"
              >
                <FaSearch
                  className="text-gray-500 mr-3 flex-shrink-0"
                  aria-hidden="true"
                  size={18}
                />
                <input
                  type="search"
                  placeholder="Search over 4.3M+ stock images, videos and music..."
                  className="bg-transparent outline-none w-full text-black placeholder-gray-500 text-base"
                  aria-label="Search stock images, videos and music"
                />
              </div>
            </div>
          )}

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            <div onClick={() => setIsMegaOpen(!isMegaOpen)}>
              <button className="hidden lg:flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-purple-600 hover:to-blue-600 transition-colors duration-300 shadow-lg">
                Explore
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    isMegaOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <MegaMenu isOpen={isMegaOpen} />
            </div>

            <button
              onClick={() => setAuthOpen(true)}
              className={`transition-colors duration-300 inline-block px-3 py-2 lg:px-5 font-bold rounded-2xl border border-gray-400 hover:bg-gray-400 text-sm text-center ${
                isHome && !scrolled ? "text-white" : "text-black"
              }`}
            >
              Join
            </button>

            <ProfileDropdown />

            <Link
              href="/Uploading"
              className="hidden lg:flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-purple-600 hover:to-blue-600 transition-colors duration-300 shadow-lg"
            >
              Upload
            </Link>

            {/* Hamburger */}
            <button onClick={toggleDropdown}>
              <FaBars
                className={`sm:block lg:hidden transition-colors duration-300 ${
                  isHome && !scrolled ? "text-white" : "text-black"
                } size-5`}
              />
            </button>
          </div>
        </div>
      </div>

      <DropdownPanel isOpen={isDropdownOpen} onClose={toggleDropdown} />
      <PixistanAuth isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}
