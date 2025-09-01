"use client";
import { useState } from "react";
import Sidebar from "@/app/(admin)/admin/components/Sidebar";
import { Menu, Upload } from "lucide-react";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Controlled form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [portraitFile, setPortraitFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (portraitFile) formData.append("portrait", portraitFile);
    if (videoFile) formData.append("video", videoFile);

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Video Upload Response:", data);
      alert(data.message || "Upload completed");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Something went wrong while uploading");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-row">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content Area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="bg-black px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu size={28} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Admin Dashboard
            </h1>
          </div>
          <div className="text-gray-300 text-sm">Welcome, Admin</div>
        </header>

        {/* Form */}
        <main className="flex-1 flex justify-center items-center px-4">
          <form
            onSubmit={handleUpload}
            className="flex flex-col items-center gap-6 bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
          >
            {/* Title Section */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center">
                <Upload className="text-gray-400 mr-3" size={26} />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
                  Upload New Video
                </h2>
              </div>
              <a
                href="/admin/videos/viewVideos"
                className="rounded border border-white bg-white px-6 py-2 text-sm font-medium text-black hover:bg-transparent hover:text-white transition"
              >
                View Videos
              </a>
            </div>

            {/* Title */}
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            {/* Description */}
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            {/* Category */}
            <input
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />

            {/* Portrait Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPortraitFile(e.target.files ? e.target.files[0] : null)
              }
              required
              className="w-full p-3 rounded bg-gray-800 text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            />

            {/* Video Upload */}
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setVideoFile(e.target.files ? e.target.files[0] : null)
              }
              required
              className="w-full p-3 rounded bg-gray-800 text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold p-3 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
