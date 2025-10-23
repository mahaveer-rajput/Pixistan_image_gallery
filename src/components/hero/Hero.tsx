"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function HeroSection() {
  const images = ["/o.jpg", "/o.jpg", "/o.jpg", "/o.jpg"];
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    const random = images[Math.floor(Math.random() * images.length)];
    setHeroImage(random);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center h-[30rem] md:h-[35rem] w-full text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 text-sm sm:text-base font-medium mb-6">
          {[
            "Explore",
            "Photos",
            "Illustrations",
            "Vectors",
            "Videos",
            "Music",
          ].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full ${
                i === 0
                  ? "bg-white text-black shadow"
                  : "bg-transparent text-white hover:bg-white/20"
              } transition-all`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for free Images, Videos, Music & more"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/30 text-white placeholder-white outline-none backdrop-blur-sm"
            />
            <div className="absolute left-4 top-3 text-white">
              <FaSearch className="mt-1"/>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            "nature",
            "sky",
            "wallpaper",
            "office",
            "beach",
            "forest",
            "cat",
            "flowers",
          ].map((tag) => (
            <button
              key={tag}
              className="px-4 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm hover:bg-white/40 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Image Credit */}
        <div className="absolute bottom-4 left-4 text-xs text-white/80">
          Free image by{" "}
          <a href="#" className="underline">
            wal_172619
          </a>
        </div>
      </div>
    </section>
  );
}
