'use client'
import React, { useEffect, useState, ChangeEvent } from "react";

type Blog = {
  _id: string;
  title: string;
  category: string;
  content: string;
  imageURL: string;
  createdAt: string;
  updatedAt: string;
};

const BlogsAdmin: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(Array.isArray(data.response) ? data.response : []);
    } catch (e) {
      console.error("Error fetching blogs:", e);
      setBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete a blog
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (e) {
      console.error("Error deleting blog:", e);
    }
    
    setLoading(false);
  };

  // Enter update mode
  const handleEdit = (blog: Blog) => {
    setEditId(blog._id);
    setEditTitle(blog.title);
    setEditContent(blog.content);
    setEditCategory(blog.category);
    setEditImageFile(null); // No file selected yet
  };

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImageFile(e.target.files[0]);
    }
  };

  // Update blog post (with image upload)
  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("content", editContent);
      formData.append("category", editCategory);
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      const res = await fetch(`/api/blog/${editId}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        const updatedBlog = await res.json();
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === editId
              ? {
                  ...b,
                  title: editTitle,
                  content: editContent,
                  category: editCategory,
                  imageURL: updatedBlog.data?.imageURL || b.imageURL,
                }
              : b
          )
        );
        setEditId(null);
        setEditTitle("");
        setEditContent("");
        setEditCategory("");
        setEditImageFile(null);
      }
    } catch (e) {
      console.error("Error updating blog:", e);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
    setEditCategory("");
    setEditImageFile(null);
  };

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

  if (blogs.length === 0) {
    return (
      <section className="bg-black lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Blogs Not Found
            </h1>
            <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
              Sorry, no blogs are available to display at the moment.
            </p>
            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <a
                className="inline-block rounded border border-gray-500 bg-gray-400 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-gray-700"
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
    <div className="bg-black min-h-screen py-6 px-2">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">Blog <span className="text-gray-400">Posts</span></h1>
      <div className="bg-gray-300 w-[3%] h-1 mx-[50%] mb-10 mt-0.5"></div>
      <ul className="space-y-8 max-w-2xl mx-auto">
        {blogs.map((blog) => (
          <li key={blog._id} className="bg-gray-900 rounded-xl shadow p-6 flex gap-6 items-start">
            <img
              src={blog.imageURL}
              alt={blog.title}
              className="w-32 h-32 object-cover rounded-lg border border-gray-800"
            />
            <div className="flex-1">
              {editId === blog._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                    className="mb-2 w-full px-2 py-1 rounded bg-gray-800 text-white font-bold border border-gray-600"
                  />
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Category"
                    className="mb-2 w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={5}
                    className="w-full px-2 py-1 rounded bg-gray-800 text-gray-100 border border-gray-600"
                    placeholder="Content"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2 w-full px-2 py-1 rounded bg-gray-800 text-white border border-gray-600"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white">{blog.title}</h2>
                  <span className="text-sm text-gray-400 mb-2 block">
                    {blog.category} · {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <p className="text-gray-200 mb-3">{blog.content}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 font-semibold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 font-semibold"
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

export default BlogsAdmin;