"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/app/(admin)/admin/components/Sidebar";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
       title: "",
      category: "",
      description: "",
      image: "" as string | File,
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

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
console.log(formData);
      const data = new FormData();
  data.append("title", formData.title);
  data.append("category", formData.category);
  data.append("description", formData.description);
  data.append("tags", formData.tags);
  data.append("year", formData.year);
  data.append("client", formData.client);
  data.append("duration", formData.duration);
  data.append("tools", formData.tools);
  data.append("color", formData.color);
  data.append("link", formData.link);
  data.append("githubUrl", formData.githubUrl);
  data.append("videoDemoUrl", formData.videoDemoUrl);
  data.append("status", formData.status);

  // ✅ Append image (if selected)
  if (formData.image) {
    data.append("image", formData.image);
  }

  const res = await fetch("/api/projects", {
    method: "POST",
    body: data,
  });

  const json = await res.json();

  if (res.ok) {
    alert("Project created ✅");
    setFormData({
      title: "",
      category: "",
      description: "",
      image: "",
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
  } else {
    alert("Error creating project ❌");
  }
};
  

  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
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
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              {/* Title */}
              <h2 className="text-lg font-semibold text-white">
                Create New Project
              </h2>

              {/* View Projects Button */}
              <button
                onClick={() => router.push("/admin/projects/viewProjects")}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg border border-white hover:bg-gray-700 transition"
              >
                View All Projects
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Title */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                >
                  <option value="">Select Status</option>
                  <option value="Featured">Featured</option>
                  <option value="Award Winner">Award Winner</option>
                  <option value="Innovation">Innovation</option>
                  <option value="Trending">Trending</option>
                  <option value="Beta">Beta</option>
                  <option value="Live">Live</option>
                </select>
              </div>

             {/* Year */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Year</label>
                <input
                  type="text"
                  placeholder="Enter Year (e.g. 2024)"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

            

                  {/* Duration */}
                  <div className="flex flex-col">
                    <label className="text-gray-300 mb-1">Duration (in months)</label>
                    <input
                      type="text"
                      placeholder="Enter Duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="p-2 rounded bg-black border border-gray-700 text-white"
                    />
                  </div>

                  {/* Description */} <div className="flex flex-col md:col-span-2"> <label className="text-gray-300 mb-1">Description</label> <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value }) } className="p-2 rounded bg-black border border-gray-700 text-white" /> </div>


              {/* Client */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Client</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) =>
                    setFormData({ ...formData, client: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

              {/* Image */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files?.[0] || "" })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
                
              </div>

              {/* Tags */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

              {/* Tools */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">
                  Tools (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tools}
                  onChange={(e) =>
                    setFormData({ ...formData, tools: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

              {/* Color Picker */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Color</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="w-16 h-10 p-1 rounded"
                />
              </div>

              {/* Links */}
              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Project Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-300 mb-1">Video Demo URL</label>
                <input
                  type="text"
                  value={formData.videoDemoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoDemoUrl: e.target.value })
                  }
                  className="p-2 rounded bg-black border border-gray-700 text-white"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="col-span-full mt-6 bg-gray-800 text-white py-4 rounded border-r-indigo-50 hover:bg-gray-700 transition"
              >
                Save Project
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
