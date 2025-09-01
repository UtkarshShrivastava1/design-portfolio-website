'use client';

import React, { useEffect, useState } from "react";

type Video = {
  _id: string;
  title: string;
  description: string;
  category: string;
  video: string; // video URL/path
  thumbnailURL?: string;
  portrait: string;
  originalFilename?: string;
  createdAt: string;
  updatedAt: string;
  type: string;
};

const ViewVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Editable state for all fields
  const [editForm, setEditForm] = useState<Partial<Video>>({});

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data.videos || []);
      console.log("Fetched videos:", data);
    } catch (e) {
      setVideos([]);
      console.error("Error fetching videos:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleEditClick = (video: Video) => {
    setEditId(video._id);
    setEditForm({ ...video });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/videos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update video");

      const updated = await res.json();
      setVideos((prev) =>
        prev.map((v) => (v._id === editId ? updated : v))
      );
      handleCancel();
    } catch (e) {
      console.error("Update error:", e);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (e) {
      console.error("Delete error:", e);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
       <section className="bg-black lg:grid lg:h-screen lg:place-content-center">
          <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-prose text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Video Not Found
              </h1>
              <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
                Sorry, no videos are available to display at the moment.
              </p>
              <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                <a
                  className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                  href="/admin/dashboard"
                >
                  Go back home
                </a>
              </div>
            </div>
          </div>
        </section>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Uploaded Videos</h1>
      <ul className="space-y-10">
        {videos.map((video) => (
          <li key={video._id} className="bg-gray-900 rounded-lg p-6 shadow flex flex-col md:flex-row gap-6">
            <div className="md:w-48">
              <video
                src={video.video}
                controls
                poster={video.thumbnailURL}
                className="w-full rounded-md bg-black max-h-48 object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {editId === video._id ? (
                <>
                  <input
                    name="title"
                    value={editForm.title || ""}
                    onChange={handleChange}
                    placeholder="Title"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <textarea
                    name="description"
                    value={editForm.description || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Description"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600 resize-none"
                  />
                  <input
                    name="category"
                    value={editForm.category || ""}
                    onChange={handleChange}
                    placeholder="Category"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <input
                    name="portrait"
                    value={editForm.portrait || ""}
                    onChange={handleChange}
                    placeholder="Portrait URL"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <input
                    name="thumbnailURL"
                    value={editForm.thumbnailURL || ""}
                    onChange={handleChange}
                    placeholder="Thumbnail URL"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <input
                    name="type"
                    value={editForm.type || ""}
                    onChange={handleChange}
                    placeholder="Type"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={handleUpdate}
                      className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{video.title}</h2>
                  <p className="text-gray-300 mb-2">{video.description}</p>
                  <p className="text-gray-400 mb-2">Category: {video.category}</p>
                  <p className="text-gray-400 mb-2">Type: {video.type}</p>
                  <p className="text-gray-400 mb-2">Portrait URL: {video.portrait}</p>
                  <p className="text-gray-400 mb-2">Thumbnail URL: {video.thumbnailURL}</p>
                  <p className="text-gray-400 text-xs">
                    Uploaded: {new Date(video.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => handleEditClick(video)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded font-semibold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewVideos;
