import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // ✅ Read-only access is fine for fetching
);

export async function GET() {
  try {
    // Fetch images with metadata
   const { data, error } = await supabase
     .from("pixistan_images")
     .select("id, image_url, description, created_at, views, likes, downloads")
     .neq("image_url", null)
     .neq("image_url", "")
     .order("created_at", { ascending: false });


    if (error) {
      console.error("❌ Supabase Fetch Error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log("✅ Fetched images:", data.length);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("❌ API Error:", err.message || err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
