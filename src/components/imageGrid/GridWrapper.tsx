import ImageGrid, { StockImage } from "@/components/imageGrid/ImageGrid";

async function getImages(): Promise<StockImage[]> {
  try {
    
   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

   console.log("🚀 Fetching from:", `${baseUrl}/api/images`);

   const res = await fetch(`${baseUrl}/api/images`, {
     next: { revalidate: 0 }, // forces no cache in Next.js 14/15
   });


    const json = await res.json();

    if (!json.success) {
      console.error("Failed to fetch images:", json.error);
      return [];
    }

    console.log("Fetched images from API:", json.data);

    // Map Supabase data to StockImage type for ImageGrid
  return json.data.map((item: any) => ({
    id: String(item.id),
    title: item.description || "Untitled",
    duration: item.created_at
      ? new Date(item.created_at).toLocaleDateString()
      : "Unknown",
    imageUrl: item.image_url ?? "", // 👈 fallback to empty string
    description: item.description ?? "",
    tags: Array.isArray(item.tags) ? item.tags : [],
    views: item.views ?? 0,
    likes: item.likes ?? 0,
    downloads: item.downloads ?? 0,
  }));
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getImages();

  return (
    <div>
      <ImageGrid images={images} />
    </div>
  );
}
