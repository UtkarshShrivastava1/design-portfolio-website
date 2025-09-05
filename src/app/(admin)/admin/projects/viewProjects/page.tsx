"use client";
import React, { useEffect, useState } from "react";
import { PenBoxIcon, Trash2 } from "lucide-react";
import Link from "next/link";

const ViewProject = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchProject = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => prev.filter((proj) => proj._id !== id)); // update UI without refetch
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        View Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((project) => (
          <div
            key={project._id}
            className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            {/* Header with actions */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
              <Link href={`/admin/projects/viewProjects/${project._id}/edit`}>
                <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
                  <PenBoxIcon size={16} /> Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(project._id)}
                className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>

            {/* Image */}
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
              title={project.title}
            ></div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
              {/* Category */}
              <p className="text-sm text-gray-400">{project.category}</p>

              {/* Title */}
              <h2 className="text-xl font-semibold mt-1 mb-2">{project.title}</h2>

              {/* Description */}
              <p className="text-gray-300 text-sm flex-1">{project.description}</p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-800 text-gray-200 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-3">
                <div>
                  <p className="text-sm font-medium">Client: {project.client}</p>
                  <p className="text-xs text-gray-400">
                    Duration: {project.duration} | Year: {project.year}
                  </p>
                </div>

                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProject;
