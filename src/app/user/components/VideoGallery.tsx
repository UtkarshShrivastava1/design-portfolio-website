"use client";
import React, { useEffect, useState } from "react";
import { Play, Maximize2, Clock, Eye } from "lucide-react";

type VideoSlotFromDB = {
  slotId: number;
  title?: string;
  description?: string;
  durationText?: string;
  views?: number;
  type?: "portrait" | "landscape";
  category?: string;
  isLive?: boolean;
  thumbnailUrl?: string;
  videoUrl?: string;
  videoType?: string;
};

type UIVideo = {
  id: number;
  title: string;
  description: string;
  duration: string;
  views: string;
  type: "portrait" | "landscape";
  thumbnail: string;
  videoUrl?: string;
  videoType?: string;
  isLive?: boolean;
  category?: string;
};

const defaultVideos: UIVideo[] = [
  {
    id: 1,
    title: "Mobile App Design Process",
    description: "Complete redesign of a fintech mobile application",
    duration: "2:45",
    views: "1.2K",
    type: "portrait",
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: false,
    category: "Mobile Design",
  },
  {
    id: 2,
    title: "Dashboard UX Case Study",
    description: "Enterprise dashboard design and user experience optimization",
    duration: "4:20",
    views: "2.8K",
    type: "portrait",
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: false,
    category: "UX Design",
  },
  {
    id: 3,
    title: "Branding & Identity",
    description: "Complete brand identity design for a tech startup",
    duration: "3:15",
    views: "1.9K",
    type: "portrait",
    thumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=600&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: false,
    category: "Branding",
  },
  {
    id: 4,
    title: "Web Design Workflow",
    description: "Modern e-commerce website design from concept to launch",
    duration: "5:30",
    views: "3.4K",
    type: "portrait",
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: false,
    category: "Web Design",
  },
  {
    id: 5,
    title: "User Journey Mapping",
    description: "Step-by-step guide to building user-centered workflows",
    duration: "4:10",
    views: "1.5K",
    type: "landscape",
    thumbnail:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: false,
    category: "UX Research",
  },
  {
    id: 6,
    title: "Social App UI Revamp",
    description: "Creative overhaul of a social networking app UI",
    duration: "3:55",
    views: "2.3K",
    type: "landscape",
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: false,
    category: "Mobile Design",
  },
  {
    id: 7,
    title: "E-commerce Platform Design",
    description:
      "Complete marketplace redesign with advanced filtering and checkout flow",
    duration: "6:45",
    views: "4.1K",
    type: "landscape",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: false,
    category: "E-commerce",
  },
  {
    id: 8,
    title: "Animation & Micro-interactions",
    description:
      "Bringing interfaces to life with smooth animations and delightful transitions",
    duration: "3:30",
    views: "2.7K",
    type: "landscape",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    videoUrl: undefined,
    videoType: "mp4",
    isLive: true,
    category: "Animation",
  },
];

function slotToUI(slot: VideoSlotFromDB | undefined, index: number): UIVideo {
  const fallback = defaultVideos[index];
  if (!slot) return fallback;
  return {
    id: slot.slotId ?? fallback.id,
    title: slot.title || fallback.title,
    description: slot.description || fallback.description,
    duration: slot.durationText || fallback.duration,
    views: slot.views !== undefined ? String(slot.views) : fallback.views,
    type: slot.type === "landscape" ? "landscape" : "portrait",
    thumbnail: slot.thumbnailUrl || fallback.thumbnail,
    videoUrl: slot.videoUrl || undefined,
    videoType: slot.videoType || "mp4",
    isLive: !!slot.isLive,
    category: slot.category || fallback.category,
  };
}

export default function VideoGallery() {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<UIVideo | null>(null);
  const [videos, setVideos] = useState<UIVideo[]>(defaultVideos);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const slots: VideoSlotFromDB[] = await res.json();
        const byId = new Map<number, VideoSlotFromDB>();
        for (const s of slots || [])
          if (s?.slotId) byId.set(Number(s.slotId), s);
        const mapped: UIVideo[] = Array.from({ length: 8 }, (_, i) =>
          slotToUI(byId.get(i + 1), i)
        );
        if (mounted) setVideos(mapped);
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideoModal();
    };
    document.addEventListener("keydown", onKey);
    if (showVideoModal) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showVideoModal]);

  const handleVideoPlay = (video: UIVideo) => {
    if (video.videoUrl) {
      setSelectedVideo(video);
      setShowVideoModal(true);
      setPlayingVideo(video.id);
    } else {
      alert(`Video "${video.title}" coming soon!`);
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
    setPlayingVideo(null);
  };

  const renderVideoCard = (
    video: UIVideo,
    forcedAspect?: "portrait" | "landscape"
  ) => {
    const isPortrait = (forcedAspect ?? video.type) === "portrait";

    // Responsive play size: larger on touch devices (sm/md), smaller on desktop (lg)
    const playSizeClass =
      "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-14 lg:h-14";

    return (
      <article
        role="button"
        tabIndex={0}
        key={video.id}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleVideoPlay(video);
          }
        }}
        onClick={() => handleVideoPlay(video)}
        onMouseEnter={() => setHoveredVideo(video.id)}
        onMouseLeave={() => setHoveredVideo(null)}
        className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-400/20 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <div
          className={`w-full overflow-hidden rounded-2xl ${
            // mobile/tablet: use explicit aspect classes for better predictability
            isPortrait
              ? "aspect-[3/4] sm:aspect-[3/4] md:aspect-[3/4]"
              : "aspect-video sm:aspect-video md:aspect-video"
          }`}
          style={{ height: "100%" }}
        >
          {playingVideo === video.id && video.videoUrl ? (
            <video
              className="w-full h-full object-cover rounded-2xl"
              controls
              autoPlay
              poster={video.thumbnail}
              onEnded={() => setPlayingVideo(null)}
            >
              <source src={video.videoUrl} type={`video/${video.videoType}`} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 rounded-2xl"
              draggable={false}
            />
          )}

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-colors duration-300 pointer-events-none" />

          {video.isLive && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center z-10">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
              LIVE
            </div>
          )}

          <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-gray-300 text-xs font-semibold rounded-full z-10">
            {video.category}
          </div>

          {/* Play center */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div
              className={`${playSizeClass} rounded-full bg-white flex items-center justify-center transform transition-all duration-300 ${
                hoveredVideo === video.id
                  ? "scale-110 shadow-2xl shadow-gray-400/50"
                  : "scale-100"
              } ${playingVideo === video.id ? "opacity-0" : "opacity-100"}`}
              aria-hidden
            >
              <Play
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black"
                fill="currentColor"
              />
            </div>
          </div>

          {/* bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
            <div className="flex items-center justify-between mb-2 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{video.views}</span>
                </div>
              </div>

              <button
                aria-label={`Open ${video.title}`}
                className="p-1.5 rounded-full bg-black/50 hover:bg-white/20 transition-colors z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVideoPlay(video);
                }}
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>

            <h3
              className={`font-bold text-white transition-colors mb-1 ${
                isPortrait ? "text-sm sm:text-base" : "text-base sm:text-lg"
              }`}
            >
              {video.title}
            </h3>
            <p
              className={`text-gray-300 ${
                isPortrait ? "text-xs sm:text-sm" : "text-sm sm:text-base"
              } leading-relaxed line-clamp-2`}
            >
              {video.description}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 border-2 border-gray-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </article>
    );
  };

  // Desktop layout: 4 portraits (1..4) above and 4 landscapes (5..8) below.
  // On smaller screens we'll show responsive grids.
  const portraitVideos = videos
    .filter((v) => v.type === "portrait")
    .slice(0, 4);
  const landscapeVideos = videos
    .filter((v) => v.type === "landscape")
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white pb-20 px-4 sm:px-6 lg:px-12">
      <div className="text-center py-10 sm:py-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
          <span className="text-white">VIDEO</span> GALLERY
        </h1>
        <div className="w-20 h-1 bg-gray-500 mx-auto mb-4" />
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-2">
          Explore my design process through video case studies and walkthroughs
        </p>
      </div>

      <section className="py-6 sm:py-8 max-w-7xl mx-auto">
        {/* LARGE DESKTOP: exact 4 portrait above and 4 landscape below */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6 mb-4">
            {portraitVideos.map((v) => (
              <div key={v.id} className="h-96">
                <div className="h-full">{renderVideoCard(v, "portrait")}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-6">
            {landscapeVideos.map((v) => (
              <div key={v.id} className="h-48">
                <div className="h-full">{renderVideoCard(v, "landscape")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet (md) and below: responsive grid */}
        <div className="block lg:hidden">
          {/* On medium: 3 columns, on small: 2, on mobile: 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`${
                  video.type === "portrait" ? "" : "md:col-span-1"
                }`}
              >
                {renderVideoCard(video)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      {showVideoModal && selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeVideoModal();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl mx-auto">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-400 transition-colors"
              aria-label="Close video"
            >
              ✕
            </button>

            {selectedVideo.videoUrl ? (
              <video
                className="w-full rounded-lg max-h-[80vh]"
                controls
                autoPlay
                poster={selectedVideo.thumbnail}
              >
                <source
                  src={selectedVideo.videoUrl}
                  type={`video/${selectedVideo.videoType || "mp4"}`}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-300 mb-2">
                  {selectedVideo.description}
                </p>
                <p className="text-gray-400">
                  Video coming soon! Add videoUrl to enable playback.
                </p>
              </div>
            )}

            <div className="mt-3 text-center">
              <h3 className="text-lg font-bold text-white">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-300">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gray-600/3 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
