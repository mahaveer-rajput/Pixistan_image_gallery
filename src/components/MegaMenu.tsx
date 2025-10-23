"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaCamera,
  FaPaintBrush,
  FaGem,
  FaVideo,
  FaMusic,
  FaVolumeUp,
  FaFire,
  FaUsers,
  FaComments,
  FaBlog,
  FaInfoCircle,
  FaGlobe,
} from "react-icons/fa";
import { SiPixabay } from "react-icons/si";
import { BsFillChatDotsFill } from "react-icons/bs";

export default function MegaMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="hidden absolute top-full left-1/2 -translate-x-1/2 w-full max-w-5xl mx-auto bg-[#1a1a1a] text-gray-100 rounded-xl shadow-xl p-8 lg:grid grid-cols-2 md:grid-cols-5 gap-8 mt-3 z-50 border border-gray-700"
        >
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Media</h3>
            <ul className="space-y-3">
              <MegaItem icon={<FaCamera />} text="Photos" />
              <MegaItem icon={<FaPaintBrush />} text="Illustrations" />
              <MegaItem icon={<FaGem />} text="Vectors" />
              <MegaItem icon={<FaVideo />} text="Videos" />
              <MegaItem icon={<FaMusic />} text="Music" />
              <MegaItem icon={<FaVolumeUp />} text="Sound Effects" />
              <MegaItem icon={<FaFire />} text="GIFs" />
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Discover</h3>
            <ul className="space-y-3">
              <MegaLink text="Editor's Choice" />
              <MegaLink text="Curated Collections" />
              <MegaLink text="Pixistan Radio" />
              <MegaLink text="Popular Images" />
              <MegaLink text="Popular Videos" />
              <MegaLink text="Popular Music" />
              <MegaLink text="Popular Searches" />
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Trending</h3>
            <ul className="space-y-3">
              <MegaLink text="Summer" />
              <MegaLink text="Cartoon" />
              <MegaLink text="Good Morning" />
              <MegaLink text="Happy Birthday" />
              <MegaLink text="Wallpaper" />
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Community</h3>
            <ul className="space-y-3">
              <MegaLink text="Contests" badge="LIVE" />
              <MegaLink text="Creators" icon={<FaUsers />} />
              <MegaLink text="Forum" icon={<BsFillChatDotsFill />} />
              <MegaLink text="Blog" icon={<FaBlog />} />
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-3">
              <MegaLink text="About Us" icon={<FaInfoCircle />} />
              <MegaLink text="FAQ" />
              <MegaLink text="Terms of Service" />
              <MegaLink text="Privacy Policy" />
              <MegaLink text="Contact" />
            </ul>
          </div>

          {/* Footer */}
          <div className="col-span-full border-t border-gray-700 pt-6 flex justify-between items-center text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <FaGlobe />
              <span>Language</span>
            </div>
            <div className="flex gap-4 text-lg">
              <Link href="#">
                <SiPixabay />
              </Link>
              <Link href="#">
                <FaCamera />
              </Link>
              <Link href="#">
                <FaUsers />
              </Link>
              <Link href="#">
                <FaInfoCircle />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MegaItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
      {icon}
      <span>{text}</span>
    </li>
  );
}

function MegaLink({
  text,
  badge,
  icon,
}: {
  text: string;
  badge?: string;
  icon?: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
      {icon}
      <span>{text}</span>
      {badge && (
        <span className="ml-2 text-xs px-2 py-0.5 bg-red-600 text-white rounded-full">
          {badge}
        </span>
      )}
    </li>
  );
}
