import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key for writes
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;

    if (!file || !description) {
      return NextResponse.json(
        { success: false, error: "File and description are required" },
        { status: 400 }
      );
    }

    // 🌟 Upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "pixistan" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const { secure_url, created_at } = uploadResult as any;
    console.log("✅ Uploaded to Cloudinary:", secure_url);

    // 🌟 Insert metadata into Supabase
    const { data, error: dbError } = await supabase
      .from("pixistan_images")
      .insert([
        {
          image_url: secure_url,
          description,
          tags,
          created_at: new Date().toISOString(),
          views: 0,
          likes: 0,
          downloads: 0,
        },
      ])
      .select(); // 👈 Return inserted row

    if (dbError) {
      console.error("❌ Supabase Insert Error:", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to save metadata" },
        { status: 500 }
      );
    }

    console.log("✅ Saved to Supabase:", data);

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("❌ Upload Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
