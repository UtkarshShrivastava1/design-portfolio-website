"use client";
import Sidebar from "@/app/(admin)/admin/components/Sidebar"
import React, { useState } from "react";
import { Menu} from 'lucide-react';

function TestimonialForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [formData, setFormData] = useState({
    userName: "",
    designation: "",
    headline: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("userName", formData.userName);
    form.append("designation", formData.designation);
    form.append("headline", formData.headline);
    form.append("description", formData.description);
    if (file) form.append("image", file);

    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        body: form,
      });
   

      // const data = await res.json();
      if (res.ok) {
        alert("Testimonial submitted!");
      } else {
        alert("Failed to submit testimonial.");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

       <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-black  px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden mr-4 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-yellow-400">Dashboard</h1>
          </div>
          <div className="text-yellow-300 text-sm">
            Welcome back, Admin
          </div>
        </header>

      <main className="flex-1 mt-20 md:ml-64 overflow-y-auto">
        <div className="max-w-2xl mx-auto border border-yellow-400 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
            <span role="img" aria-label="testimonial" className="mr-2">📝</span>
            Add Testimonial
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium text-yellow-400">User Name *</label>
              <input
                name="userName"
                type="text"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1e1f29] border border-yellow-400 rounded-md outline-none"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-yellow-400">Designation *</label>
              <input
                name="designation"
                type="text"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1e1f29] border border-yellow-400 rounded-md outline-none"
                placeholder="Enter designation"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-yellow-400">Headline</label>
              <input
                name="headline"
                type="text"
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1e1f29] border border-yellow-400 rounded-md outline-none"
                placeholder="Enter headline"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-yellow-400">Description</label>
              <textarea
                name="description"
                rows={5}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#1e1f29] border border-yellow-400 rounded-md outline-none"
                placeholder="Enter testimonial description"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium text-yellow-400">Upload Profile Picture *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 bg-[#1e1f29] border border-yellow-400 rounded-md text-yellow-100"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold transition-all"
            >
              Submit Testimonial
            </button>
          </form>
        </div>
      </main>
    </div>
    </div>
  );
}

export default TestimonialForm;
