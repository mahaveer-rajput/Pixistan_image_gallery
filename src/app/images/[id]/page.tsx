import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { FaHeart, FaBookmark, FaShareAlt } from "react-icons/fa";
import ImageGrid from "@/components/imageGrid/ImageGrid";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function ImageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Fetch the image by ID
  const { data: image, error } = await supabase
    .from("pixistan_images")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !image) {
    console.error("Failed to fetch image:", error);
    return <div className="text-center py-20">❌ Image not found</div>;
  }

  // Fetch related images (you can adjust this query)
  const { data: relatedImages } = await supabase
    .from("pixistan_images")
    .select("*")
    .neq("id", id) // exclude the current image
    .limit(8);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        {/* Left: Image */}
        <div className="flex-1 flex justify-center items-start">
          <Image
            src={image.image_url}
            alt={image.description || "Pixistan Image"}
            width={800}
            height={600}
            className="rounded-xl object-cover shadow-md"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-6">
          {/* Download & Actions */}
          <div className="flex flex-col gap-3 mt-25">
            <p className="text-sm text-gray-500">
              Free for use under the Pixistan License
            </p>
            <a
              href={image.image_url}
              target="_blank"
              download
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full text-center"
            >
              Download
            </a>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-700 hover:text-red-500">
                <FaHeart /> {image.likes}
              </button>
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                <FaBookmark /> Save
              </button>
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <FaShareAlt /> Share
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="text-sm text-gray-600">
            <p>👁️ Views: {image.views}</p>
            <p>⬇️ Downloads: {image.downloads}</p>
            <p>📝 Description: {image.description || "No description"}</p>
          </div>
        </div>
      </div>

      {/* Suggested Images Section */}
      <h2 className="mt-10 text-2xl font-bold">You might also like</h2>
      <ImageGrid
        images={
          relatedImages?.map((img) => ({
            id: img.id,
            title: img.description || "Untitled",
            duration: "N/A",
            imageUrl: img.image_url,
            views: img.views,
            likes: img.likes,
            downloads: img.downloads,
          })) || []
        }
      />
    </main>
  );
}
