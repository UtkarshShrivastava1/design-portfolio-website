'use client'
import React, { useEffect, useState } from "react";

type Testimonial = {
  _id: string;
  profilePictureURL: string;
  userName: string;
  designation: string;
  headline?: string;
  description?: string;
};

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editHeadline, setEditHeadline] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonial");
      const data = await res.json();
      console.log('Fetched testimonials:',data)
      setTestimonials(data.testimonials || []);
      console.log('Fetched testimonials:', testimonials);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Delete testimonial by ID
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/testimonial/${id}`, {
        method:"DELETE",
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert("Failed to delete testimonial");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Enter edit mode
  const handleEdit = (testimonial: Testimonial) => {
    setEditId(testimonial._id);
    setEditHeadline(testimonial.headline || "");
    setEditDescription(testimonial.description || "");
  };

  // Save updated testimonial
  const handleUpdate = async () => {
    if (!editId) return;

    try {
      const res = await fetch(`/api/testimonial/${editId}`, {
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline: editHeadline,
          description: editDescription,
        }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t._id === editId ? { ...t, headline: editHeadline, description: editDescription } : t
          )
        );
        setEditId(null);
        setEditHeadline("");
        setEditDescription("");
      } else {
        alert("Failed to update testimonial");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setEditHeadline("");
    setEditDescription("");
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white max-w-full mx-auto">
      <h1 className="text-3xl  text-center mt-5 font-bold mb-2">Manage <span className="text-gray-400">Testimonials</span></h1>
      <div className="w-[100px] h-1 mx-auto px-0.5 bg-gray-700 mb-8"></div>

      {testimonials.length==0 &&(
            <section className="bg-black lg:grid lg:h-screen lg:place-content-center">
    <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-prose text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Testimonial Not Found
        </h1>

        <p className="mt-4 text-base text-gray-700 sm:text-lg/relaxed">
          Sorry, no testimonials are available to display at the moment.
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

      <ul className="space-y-6">
        {Array.isArray(testimonials) && testimonials.map((t) => (
          <li
            key={t._id}
            className="bg-gray-900 p-4 rounded-lg shadow flex items-center gap-4"
          >
            <img
              src={t.profilePictureURL}
              alt={t.userName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{t.userName} - <span className="text-gray-400">{t.designation}</span></p>

              {editId === t._id ? (
                <>
                  <input
                    type="text"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    placeholder="Headline"
                    className="mt-1 p-1 rounded bg-gray-800 w-full text-white border border-gray-700"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                    rows={3}
                    className="mt-2 p-1 rounded bg-gray-800 w-full text-white border border-gray-700 resize-none"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700 font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-1 font-medium">{t.headline || <em>No headline</em>}</p>
                  <p className="text-gray-400">{t.description || <em>No description</em>}</p>
                </>
              )}
            </div>

            {editId !== t._id && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 font-semibold"
                  aria-label={`Edit testimonial from ${t.userName}`}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 font-semibold"
                  aria-label={`Delete testimonial from ${t.userName}`}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTestimonials;
