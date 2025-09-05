'use client'
import React, { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import axios from "axios";

type ImageItem = {
  _id: string;
  imageURL: string;
  title: string;
  description: string;
  category: string;
};

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/gallery");
        setImages(response.data.gallery || []);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [mounted]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/gallery/${id}`);
      setImages(prev => prev.filter(img => img._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleEdit = (id: string, description: string) => {
    setEditId(id);
    setEditDescription(description);
    setEditImageFile(null);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImageFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      const formData = new FormData();
      formData.append("description", editDescription);
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      const res = await axios.patch(`/api/gallery/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedImage = res.data.data;
      setImages(imgs =>
        imgs.map(img =>
          img._id === editId
            ? {
                ...img,
                description: updatedImage.description,
                imageURL: updatedImage.imageURL,
              }
            : img
        )
      );
      setEditId(null);
      setEditDescription("");
      setEditImageFile(null);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  if (!mounted) return null;

  if (loading) {
    return (
     <div
  role="status"
  className="flex items-center space-x-3 justify-center min-h-screen bg-black"
>
  <svg
    className="animate-spin h-10 w-10 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>

  <span className="text-3xl font-medium text-gray-500">
    Loading...
  </span>
</div>

    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-10">
      <h1 className="text-white text-3xl font-bold mb-3 ">
        Image <span className="text-gray-400">Gallery</span>
      </h1>
      <div className="w-[100px] h-1 mx-4 px-1.5 bg-gray-700 mb-10 "></div>

      {images.length === 0 && (
        <section className="bg-black lg:grid lg:h-screen lg:place-content-center">
          <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-prose text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Image Not Found
              </h1>
              <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
                Sorry, no images are available to display at the moment.
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
      )}
      <div className="w-full max-w-4xl px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map(img => (
          <div
            key={img._id}
            className="bg-gray-900 rounded-lg shadow-md overflow-hidden flex flex-col items-center border border-gray-700"
          >
            <Image
              src={img.imageURL}
              alt={img.title || img.description || "Gallery Image"}
              width={320}
              height={200}
              loading="lazy"
              className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
            <div className="p-4 w-full flex flex-col gap-2 items-center">
              <span className="text-white font-medium">{img.description}</span>
              <div className="flex gap-3">
                <button
                  className="bg-white text-black rounded px-4 py-1 hover:bg-gray-200 transition duration-200 font-semibold"
                  onClick={() => handleEdit(img._id, img.description)}
                  aria-label="Edit Description"
                >
                  Update
                </button>
                <button
                  className="bg-gray-800 text-white rounded px-4 py-1 hover:bg-gray-900 transition duration-200 font-semibold"
                  onClick={() => handleDelete(img._id)}
                  aria-label="Delete Image"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
            <h2 className="text-white text-xl mb-4">Update Image & Description</h2>
            <input
              className="w-full mb-3 px-2 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none"
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
              placeholder="Image description"
            />
            <input
              type="file"
              accept="image/*"
              className="w-full mb-3 px-2 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none"
              onChange={handleImageChange}
            />
            <div className="flex gap-4">
              <button
                className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 font-semibold transition"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-900 font-semibold transition"
                onClick={() => {
                  setEditId(null);
                  setEditDescription("");
                  setEditImageFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;