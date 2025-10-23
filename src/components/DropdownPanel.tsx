"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaTimes, FaCamera, FaPenNib, FaVideo, FaMusic } from "react-icons/fa";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DropdownFullScreen({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = ""; // Restore scroll
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-close dropdown if route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!isOpen) return null; // Only mount when open

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
      ></div>

      {/* Fullscreen Dropdown */}
      <div className="fixed inset-0 z-50 bg-white text-gray-800 transition-transform duration-300 ease-out overflow-y-auto">
        <div className="flex justify-between items-center px-4 py-3 border-b sticky top-0 bg-white">
          <h2 className="text-lg font-bold">Pixistan</h2>
          <button onClick={onClose} className="text-gray-600 text-2xl">
            <FaTimes />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Upload Button */}
          <Link
            href="/upload"
            onClick={onClose} // Close dropdown on click
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex justify-center rounded-md text-sm font-medium"
          >
            Upload
          </Link>
        </div>

        <div className="p-4">
          <h3 className="uppercase text-xs font-semibold text-gray-500 mb-3">
            Media
          </h3>
          <ul className="space-y-2">
            {[
              { icon: <FaCamera />, label: "Photos" },
              { icon: <FaPenNib />, label: "Illustrations" },
              { icon: <FaVideo />, label: "Videos" },
              { icon: <FaMusic />, label: "Music" },
            ].map((item, index) => (
              <li
                key={index}
                onClick={onClose} // Optional: close on item click
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                {item.icon} {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
