"use client";
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import axios from "axios";

interface Project {
  thumbnailURL: string;
  youtubeLink: string;
  instagramLink: string;
}

interface ClientProject {
  name: string;
  company: string;
  workDid: string;
  testimonial: string;
  projects: Project[];
}

const ClientPage: React.FC = () => {
  const [clients, setClients] = useState<ClientProject[]>([]);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  useEffect(() => {
    async function fetchClientData() {
      try {
        const res = await axios.get("/api/clientproject");

        if (res.status === 200 && Array.isArray(res.data?.data)) {
          const fetchedClients = res.data.data;
          setClients(fetchedClients);
          setActiveIndexes(new Array(fetchedClients.length).fill(0));
        } else {
          console.error("Unexpected response:", res);
        }
      } catch (err) {
        console.error("Axios error:", err);
      }
    }

    fetchClientData();
  }, []);

  if (!clients.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading client projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-black text-white px-4 sm:px-6 md:px-10 py-10 space-y-20">
      {clients.map((client, clientIndex) => (
        <div
          key={clientIndex}
          className="lg:flex lg:items-center gap-6 border-b border-gray-800 pb-20"
        >
          {/* Left: Projects Carousel */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-6">
              Projects by {client.name}
            </h1>

            {Array.isArray(client.projects) && client.projects.length > 0 && (
              <div>
                <div className="bg-gray-900 rounded-lg overflow-hidden mb-6 border-2 border-yellow-400">
                  <div className="aspect-[16/9] relative">
                    <img
                      src={
                        client.projects[activeIndexes[clientIndex]]
                          .thumbnailURL
                      }
                      alt={`Project thumbnail ${activeIndexes[clientIndex] + 1}`}
                      className="w-full h-full object-cover"
                    />

                    <a
                      href={
                        client.projects[activeIndexes[clientIndex]].youtubeLink
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity"
                    >
                      <Play className="w-12 h-12 text-yellow-400" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {client.projects.map((proj, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setActiveIndexes((prev) =>
                          prev.map((val, i) =>
                            i === clientIndex ? idx : val
                          )
                        )
                      }
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        activeIndexes[clientIndex] === idx
                          ? "border-yellow-400 ring-2 ring-yellow-400/50"
                          : "border-gray-600 hover:border-yellow-400"
                      }`}
                    >
                      <img
                        src={proj.thumbnailURL}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Client Info */}
          <div className="lg:w-1/2 bg-gray-900 p-6 lg:p-8 rounded-lg h-screen">
            <h2 className="text-3xl font-bold text-white mb-2">{client.name}</h2>
            <p className="text-yellow-400 text-lg font-medium mb-4">
              {client.company}
            </p>
            <p className="text-gray-300 mb-6 italic">&quot;{client.workDid}&quot;</p>

            <div className="bg-black p-6 rounded-lg border-l-4 border-yellow-400">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                Testimonial
              </h3>
              <p className="text-gray-300 leading-relaxed">
                &quot;{client.testimonial}&quot;
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientPage;
