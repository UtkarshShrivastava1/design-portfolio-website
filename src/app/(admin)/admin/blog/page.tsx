"use client";

import { useState } from "react";
import Sidebar from "@/app/(admin)/admin/components/Sidebar";
import { Menu, Upload } from "lucide-react";
import axios from "axios";

const BlogForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    catogery: string;
    file: File | null;
  }>({
    title: "",
    content: "",
    catogery: "",
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.catogery);
      if (formData.file) {
        formDataToSend.append("imageFile", formData.file);
      }

      const response = await axios.post("/api/blog", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Blog uploaded successfully:", response.data);

      setSubmitMessage("Blog uploaded successfully!");
      setFormData({
        title: "",
        content: "",
        catogery: "",
        file: null,
      });
    } catch (error: unknown) {
      console.log("Error uploading blog:", error);
      setSubmitMessage("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-black px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden mr-2 sm:mr-4 text-yellow-400 hover:text-yellow-300 transition-colors p-1"
            >
              <Menu size={20} className="sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">
              Dashboard
            </h1>
          </div>
          <div className="text-yellow-300 text-xs sm:text-sm">
            <span className="hidden sm:inline">Welcome back, </span>Admin
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto bg-black">
          <div className="max-w-4xl mx-auto">
            {/* Upload Form */}
            <div className="bg-black border border-yellow-400 rounded-xl p-4 sm:p-6 md:p-8 shadow-xl w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                <Upload
                  className="text-yellow-400 mr-0 sm:mr-3 mb-2 sm:mb-0"
                  size={28}
                />
                <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">
                  Upload A Blog
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Title Input */}
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Category Input */}
                <div>
                  <label
                    htmlFor="catogery"
                    className="block text-yellow-300 text-sm font-medium mb-2"
                  >
                    Category *
                  </label>
                  <input
                    type="text"
                    id="catogery"
                    name="catogery"
                    value={formData.catogery}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter Category"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-yellow-300 text-sm font-medium mb-2"
                  >
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                    placeholder="Enter Content"
                  />
                </div>

                {/* File Input */}
                <div>
                  <label
                    htmlFor="file-input"
                    className="block text-yellow-300 text-sm font-medium mb-2"
                  >
                    Upload Image *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="file-input"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-yellow-400 rounded-lg text-yellow-100 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-medium file:text-xs sm:file:text-sm hover:file:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                    />
                  </div>
                  {formData.file && (
                    <p className="mt-2 text-xs sm:text-sm text-yellow-300 break-all">
                      Selected: {formData.file.name}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-black transition-all duration-200 transform hover:scale-105 text-sm sm:text-base ${
                      isSubmitting
                        ? "bg-yellow-600 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-300 hover:shadow-lg"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      "Upload to Gallery"
                    )}
                  </button>
                </div>

                {/* Submit Message */}
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

export default BlogForm;
