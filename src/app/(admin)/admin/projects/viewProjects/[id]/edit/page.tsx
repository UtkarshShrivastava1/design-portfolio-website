"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    year: "",
    client: "",
    duration: "",
    tools: "",
    color: "",
    link: "",
    githubUrl: "",
    videoDemoUrl: "",
    status: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const result = await res.json();

        setForm({
          title: result.data.title || "",
          category: result.data.category || "",
          description: result.data.description || "",
          tags: result.data.tags ? result.data.tags.join(", ") : "",
          year: result.data.year || "",
          client: result.data.client || "",
          duration: result.data.duration || "",
          tools: result.data.tools || "",
          color: result.data.color || "",
          link: result.data.link || "",
          githubUrl: result.data.githubUrl || "",
          videoDemoUrl: result.data.videoDemoUrl || "",
          status: result.data.status || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Project updated successfully!");
        router.push("/admin/projects/viewProjects");
      } else {
        console.error("Failed to update project");
      }
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  if (loading) return(    <div
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
</div>);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Project Title" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={4} className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="client" value={form.client} onChange={handleChange} placeholder="Client" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="year" value={form.year} onChange={handleChange} placeholder="Year" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="tools" value={form.tools} onChange={handleChange} placeholder="Tools" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="Color" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="link" value={form.link} onChange={handleChange} placeholder="Live Link" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="videoDemoUrl" value={form.videoDemoUrl} onChange={handleChange} placeholder="Video Demo URL" className="p-2 rounded bg-gray-800 border border-gray-700" />
          <input type="text" name="status" value={form.status} onChange={handleChange} placeholder="Status" className="p-2 rounded bg-gray-800 border border-gray-700" />

          <input type="file" name="image" onChange={handleImageChange} className="p-2 rounded bg-gray-800 border border-gray-700" />

          <input type="text" name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="p-2 rounded bg-gray-800 border border-gray-700" />

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectPage;
