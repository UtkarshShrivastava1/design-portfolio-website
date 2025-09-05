'use client';

import React, { useEffect, useState, ChangeEvent } from "react";
import { Spinner } from "@heroui/react";

type Project = {
  instagramLink: string;
  thumbnailURL: string;
  youtubeLink: string;
};

type ClientProject = {
  _id: string;
  company: string;
  createdAt: string;
  name: string;
  projects: Project[];
  testimonial: string;
  updatedAt: string;
  workDid: string;
};

const ViewProject: React.FC = () => {
  const [projectsList, setProjectsList] = useState<ClientProject[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Editable fields state
  const [editCompany, setEditCompany] = useState<string>("");
  const [editName, setEditName] = useState<string>("");
  const [editTestimonial, setEditTestimonial] = useState<string>("");
  const [editWorkDid, setEditWorkDid] = useState<string>("");

  // Editable project links state (only for first project in projects array)
  const [editInstagramLink, setEditInstagramLink] = useState<string>("");
  const [editYoutubeLink, setEditYoutubeLink] = useState<string>("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/clientproject");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjectsList(data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/clientproject/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      setProjectsList((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: ClientProject) => {
    setEditId(project._id);
    setEditCompany(project.company);
    setEditName(project.name);
    setEditTestimonial(project.testimonial);
    setEditWorkDid(project.workDid);
    setEditInstagramLink(project.projects[0]?.instagramLink || "");
    setEditYoutubeLink(project.projects[0]?.youtubeLink || "");
    setEditImageFile(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditCompany("");
    setEditName("");
    setEditTestimonial("");
    setEditWorkDid("");
    setEditInstagramLink("");
    setEditYoutubeLink("");
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
      setLoading(true);
      const formData = new FormData();
      formData.append("company", editCompany);
      formData.append("name", editName);
      formData.append("testimonial", editTestimonial);
      formData.append("workDid", editWorkDid);
      formData.append("instagramLink", editInstagramLink);
      formData.append("youtubeLink", editYoutubeLink);
      if (editImageFile) {
        formData.append("thumbnail", editImageFile);
      }

      const response = await fetch(`/api/clientproject/${editId}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Update failed");
      console.log('Response of project page :', response);

      const updated = await response.json();
      setProjectsList((prev) =>
        prev.map((p) =>
          p._id === editId
            ? {
                ...p,
                company: editCompany,
                name: editName,
                testimonial: editTestimonial,
                workDid: editWorkDid,
                projects: [
                  {
                    instagramLink: editInstagramLink,
                    youtubeLink: editYoutubeLink,
                    thumbnailURL:
                      updated.projects?.[0]?.thumbnailURL ||
                      p.projects[0]?.thumbnailURL ||
                      "",
                  },
                ],
              }
            : p
        )
      );
      handleCancel();
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-full mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Client <span className="text-gray-400">Projects</span></h1>
      <div className="bg-gray-300 w-[5%] h-1 mx-[49.5%] mb-8 mt-1.5"></div>

      {projectsList.length === 0 ? (
        <section className="bg-black lg:grid lg:h-screen lg:place-content-center">
          <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-prose text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Projects Not Found
              </h1>

              <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
                Sorry, no Projects are available to display at the moment.
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
      ) : (
        <ul className="space-y-8">
          {projectsList.map((project) => (
            <li
              key={project._id}
              className="bg-gray-900 rounded-lg p-6 shadow flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-40 shrink-0 rounded overflow-hidden border border-gray-700">
                <img
                  src={project.projects[0]?.thumbnailURL}
                  alt={`Thumbnail for ${project.name}`}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 flex flex-col gap-3">
                {editId === project._id ? (
                  <>
                    <input
                      type="text"
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                      placeholder="Company"
                      className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Name"
                      className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    />
                    <textarea
                      rows={3}
                      value={editTestimonial}
                      onChange={(e) => setEditTestimonial(e.target.value)}
                      placeholder="Testimonial"
                      className="p-2 rounded bg-gray-800 text-white border border-gray-600 resize-none"
                    />
                    <textarea
                      rows={3}
                      value={editWorkDid}
                      onChange={(e) => setEditWorkDid(e.target.value)}
                      placeholder="Work Description"
                      className="p-2 rounded bg-gray-800 text-white border border-gray-600 resize-none"
                    />
                    <input
                      type="text"
                      value={editInstagramLink}
                      onChange={(e) => setEditInstagramLink(e.target.value)}
                      placeholder="Instagram Link"
                      className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    />
                    <input
                      type="text"
                      value={editYoutubeLink}
                      onChange={(e) => setEditYoutubeLink(e.target.value)}
                      placeholder="YouTube Link"
                      className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    />
                    <div className="flex gap-4 mt-2">
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
                    <h2 className="text-2xl font-semibold">{project.company}</h2>
                    <p className="text-lg font-medium">{project.name}</p>
                    <p className="text-gray-300 mb-2">{project.testimonial}</p>
                    <p className="text-gray-400 text-sm">{project.workDid}</p>
                    <div className="flex gap-4 mt-auto">
                      <a
                        href={project.projects[0]?.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                      >
                        Instagram
                      </a>
                      <a
                        href={project.projects[0]?.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                      >
                        YouTube
                      </a>
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
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
      )}
    </div>
  );
};

export default ViewProject;