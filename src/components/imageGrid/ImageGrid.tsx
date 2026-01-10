// components/ImageGrid.tsx
"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import { FiDownload, FiHeart, FiEye, FiCalendar } from "react-icons/fi";
import Link from "next/link"; 

export interface StockImage {
  id: string;
  title: string;
  duration: string;
  description?: string;
  created_at?: string;
  imageUrl: string;
  views: number;
  likes: number;
  downloads: number;
}

export default function ImageGrid({ images }: { images: StockImage[] }) {
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    768: 2,
    500: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pixistan Stock Photos</h1>
        <p className="text-gray-600 dark:text-gray-400">
          High quality royalty-free images
        </p>
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="space-y-4"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {/* Image with hover overlay */}
            <Link href={`/images/${image.id}`} key={image.id}>
            <div className="relative w-full h-auto">
              <Image
                src={image.imageUrl}
                alt={image.title}
                width={600}
                height={600}
                layout="responsive"
                objectFit="cover"
                className="rounded-xl transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
              />

              {/* Hover overlay with actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div className="flex justify-end gap-2">
                  <button className="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white transition">
                    <FiHeart className="text-lg" />
                  </button>
                  <button className="p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white transition">
                    <FiDownload className="text-lg" />
                  </button>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {image.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-white/90 text-sm">
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" /> {image.duration}
                    </span>
                    <span className="flex items-center">
                      <FiEye className="mr-1" /> {image.views}
                    </span>
                    <span className="flex items-center">
                      <FiHeart className="mr-1" /> {image.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </Link>

            {/* Info bar always visible */}
            <div className="absolute bottom-0 left-0 right-0 text-white backdrop-blur-sm p-3 flex justify-between items-center">
              <span className="truncate font-medium text-sm">
                {image.title}
              </span>
              <div className="flex items-center space-x-1 text-xs">
                <FiDownload className="text-gray-500" />
                <span>{image.downloads}</span>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
    
  );
}
