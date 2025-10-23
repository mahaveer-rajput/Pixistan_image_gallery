"use client";
import { useState, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";

export default function ImageUpload() {
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleSubmit = async () => {
    if (!previewImage || !tags) return; // make sure tags and image are present
    setUploading(true);

    try {
      const fileInput = document.getElementById(
        "file-input"
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", tags);
      formData.append("description", description);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        console.log("Saved to Supabase + Cloudinary:", data.data.secure_url);
        setUploadedUrl(data.data.secure_url);
        alert("🎉 Image uploaded & saved to Pixistan!");
        setTags("");
        setDescription("");
        setPreviewImage(null);
      } else {
        console.error("Upload error:", data.error);
        alert("❌ Upload failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Upload to Pixistan
      </h2>

      <div
        className={`bg-white border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-5 ${
          !previewImage ? "cursor-pointer" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() =>
          !previewImage && document.getElementById("file-input")?.click()
        }
      >
        {previewImage ? (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-64 mx-auto rounded-md mb-4"
            />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
              }}
            >
              <RxCross2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="#7f8c8d"
              className="mx-auto mb-4"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            <p className="text-gray-600 mb-2">Drag and drop your image here</p>
            <p className="text-gray-400 mb-3">or</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium">
              Browse files
            </button>
          </>
        )}
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="bg-white rounded-lg p-5 mb-5">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tags *</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags in English (comma separated)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-gray-400 text-sm mt-1">Enter 3 or more tags</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 items-center">
            Description <span className="text-gray-400 ml-1">(?)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add an optional description"
            maxLength={280}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
          <p className="text-gray-400 text-sm text-right">
            {description.length}/280
          </p>
        </div>
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-400 text-white py-3 rounded-md font-medium text-lg"
        disabled={!tags || !previewImage || uploading}
        onClick={handleSubmit}
      >
        {uploading ? "Uploading..." : "Submit"}
      </button>

      {uploadedUrl && (
        <p className="mt-4 text-green-600 text-center">
          ✅ Uploaded! View it{" "}
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            here
          </a>
        </p>
      )}
    </div>
  );
}
