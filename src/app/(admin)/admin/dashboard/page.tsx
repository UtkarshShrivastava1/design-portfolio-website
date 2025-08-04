"use client";

import { useState } from "react";
import Sidebar from "@/app/(admin)/admin/components/Sidebar";
import { Menu, Upload } from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    file: File | null;
  }>({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      await axios.post("/api/gallery", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitMessage("Gallery item uploaded successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        file: null,
      });
    } catch (error: unknown) {
      console.error(error);
      setSubmitMessage("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden mr-4 text-yellow-400 hover:text-yellow-300"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold text-yellow-400">Dashboard</h1>
          </div>
          <div className="text-yellow-300 text-sm">Welcome back, Admin</div>
        </header>

        <main className="flex-1 p-6 overflow-auto bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black border border-yellow-400 rounded-xl p-8 shadow-xl w-[60%] mx-auto">
              <div className="flex items-center mb-6">
                <Upload className="text-yellow-400 mr-3" size={28} />
                <h2 className="text-2xl font-bold text-yellow-400">
                  Upload New Gallery Item
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-yellow-300 text-sm font-medium mb-2"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter image title"
                    className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-yellow-300 text-sm font-medium mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Enter image description"
                    className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-yellow-300 text-sm font-medium mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select a category</option>
                    <option value="nature">Nature</option>
                    <option value="architecture">Architecture</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                    <option value="abstract">Abstract</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="street">Street Photography</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="file-input"
                    className="block text-yellow-300 text-sm font-medium mb-2"
                  >
                    Upload Image *
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-medium hover:file:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {formData.file && (
                    <p className="mt-2 text-sm text-yellow-300">
                      Selected: {formData.file.name}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium text-black transition-all duration-200 transform hover:scale-105 ${
                      isSubmitting
                        ? "bg-yellow-600 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-300 hover:shadow-lg"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      "Upload to Gallery"
                    )}
                  </button>
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.includes("Error")
                        ? "bg-red-900 border border-red-500 text-red-200"
                        : "bg-green-900 border border-green-500 text-green-200"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
