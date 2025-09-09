"use client";
import Sidebar from "@/app/(admin)/admin/components/Sidebar";
import React, { useState } from "react";
import { Plus, Upload, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { Menu } from "lucide-react";

function AddClientForm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    workDid: "",
    testimonial: "",
  });
  

  type Project = {
    id: number;
    thumbnailFile: File | null;
    thumbnailURL: string;
    youtubeLink: string;
    instagramLink: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      thumbnailFile: null,
      thumbnailURL: "",
      youtubeLink: "",
      instagramLink: "",
    };
    setProjects((prev) => [...prev, newProject]);
  };

  interface RemoveProjectFn {
    (projectId: number): void;
  }

  const removeProject: RemoveProjectFn = (projectId) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  interface HandleProjectChangeFn {
    (
      projectId: number,
      field: keyof Omit<Project, "id" | "thumbnailFile" | "thumbnailURL">,
      value: string
    ): void;
  }

  const handleProjectChange: HandleProjectChangeFn = (
    projectId,
    field,
    value
  ) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, [field]: value } : project
      )
    );
  };

  interface HandleImageUploadFn {
    (projectId: number, file: File): void;
  }

  const handleImageUpload: HandleImageUploadFn = (projectId, file) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              thumbnailFile: file,
              thumbnailURL: URL.createObjectURL(file),
            }
          : project
      )
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("company", formData.company);
      submitData.append("workDid", formData.workDid);
      submitData.append("testimonial", formData.testimonial);

      projects.forEach((project, index) => {
        if (project.thumbnailFile) {
          submitData.append(
            `project_${index}_thumbnail`,
            project.thumbnailFile
          );
        }
        submitData.append(`project_${index}_youtubeLink`, project.youtubeLink);
        submitData.append(
          `project_${index}_instagramLink`,
          project.instagramLink
        );
      });

      submitData.append("projectsCount", projects.length.toString());

      const response = await fetch("/api/clientproject", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add project");
      }

      const result = await response.json();
      console.log("Project saved successfully:", result);

      setFormData({
        name: "",
        company: "",
        workDid: "",
        testimonial: "",
      });
      setProjects([]);

      alert("Client project added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 z-30">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white text-black rounded-lg shadow-lg"
      >
        <Plus className="w-6 h-6 rotate-45" />
      </button>

      {/* Main content */}
      {/* Main Content Area */}
      <main className="flex-1 mt-16 lg:mt-0 lg:ml-64 overflow-y-auto bg-black text-white">
        {/* Header */}
        <header className="bg-black px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden mr-2 sm:mr-4 text-gray-400 hover:text-gray-300 transition-colors p-1"
            >
              <Menu size={20} className="sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400">
              Dashboard
            </h1>
          </div>
          <div className="text-gray-300 text-xs sm:text-sm">
            <span className="hidden sm:inline"></span>Admin
          </div>
        </header>

        {/* Form */}
        <div className="p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black border border-gray-400 rounded-2xl p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Client Info */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                       <h2 className="text-2xl font-semibold text-gray-400 flex items-center">
                    <Upload className="mr-3" size={24} />
                    Client Information
                  </h2>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-300 transition-colors p-1"
                      >
                         <a
                      className="inline-block rounded-sm border border-white bg-white px-12 py-3 text-base font-medium text-black hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden"
                      href="/admin/add-client-project/viewProjects"
                    >
                     
                      View Client Projects
                    </a>
                      </button>
                    </div>
                  
                  </div>
                 

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-400 font-medium">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                        placeholder="Enter client name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-gray-400 font-medium">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                        placeholder="Enter company name"
                      />
                    </div>

                    <div className="lg:col-span-2 space-y-2">
                      <label className="block text-gray-400 font-medium">
                        Work Description *
                      </label>
                      <textarea
                        name="workDid"
                        value={formData.workDid}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:outline-none resize-none"
                        placeholder="Describe the work performed for this client"
                      />
                    </div>

                    <div className="lg:col-span-2 space-y-2">
                      <label className="block text-gray-400 font-medium">
                        Testimonial
                      </label>
                      <textarea
                        name="testimonial"
                        value={formData.testimonial}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:outline-none resize-none"
                        placeholder="Client testimonial (optional)"
                      />
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-400 flex items-center">
                      <Upload className="mr-3" size={24} />
                      Projects ({projects.length})
                    </h2>

                    <button
                      type="button"
                      onClick={addProject}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  {projects.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-500" />
                      </div>
                      <p className="text-lg font-medium mb-2 text-gray-400">
                        No projects added yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Click &quot;Add Project&quot; to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {projects.map((project, index) => (
                        <div
                          key={project.id}
                          className="border border-gray-700 rounded-xl p-6 bg-gray-900"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-400">
                              Project {index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() => removeProject(project.id)}
                              className="p-2 text-red-400 hover:bg-red-900 hover:bg-opacity-30 rounded-lg transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Thumbnail */}
                            <div className="lg:col-span-2 space-y-2">
                              <label className="block text-gray-400 font-medium">
                                Project Thumbnail *
                              </label>
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    if (files && files[0]) {
                                      handleImageUpload(project.id, files[0]);
                                    }
                                  }}
                                  className="hidden"
                                  id={`thumbnail-${project.id}`}
                                  required
                                />
                                <label
                                  htmlFor={`thumbnail-${project.id}`}
                                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-gray-400 transition-all duration-200 bg-gray-800"
                                >
                                  {project.thumbnailURL ? (
                                    <div className="relative w-full h-full">
                                      <Image
                                        src={project.thumbnailURL}
                                        alt={`Thumbnail preview for project ${
                                          index + 1
                                        }`}
                                        fill
                                        className="object-cover rounded-xl"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                                      <p className="text-sm text-gray-400">
                                        Click to upload image
                                      </p>
                                    </>
                                  )}
                                </label>
                              </div>
                            </div>

                            {/* Links */}
                            <div className="space-y-2">
                              <label className="block text-gray-400 font-medium">
                                YouTube Link
                              </label>
                              <input
                                type="url"
                                value={project.youtubeLink}
                                onChange={(e) =>
                                  handleProjectChange(
                                    project.id,
                                    "youtubeLink",
                                    e.target.value
                                  )
                                }
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                                placeholder="https://youtube.com/..."
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-gray-400 font-medium">
                                Instagram Link
                              </label>
                              <input
                                type="url"
                                value={project.instagramLink}
                                onChange={(e) =>
                                  handleProjectChange(
                                    project.id,
                                    "instagramLink",
                                    e.target.value
                                  )
                                }
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:outline-none"
                                placeholder="https://instagram.com/..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || projects.length === 0}
                    className="flex items-center gap-3 px-12 py-4 bg-white text-black rounded-xl hover:bg-gray-300 disabled:bg-gray-600 disabled:text-gray-400 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Client Project
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddClientForm;
