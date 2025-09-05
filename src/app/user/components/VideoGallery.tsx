"use client";
import React, { useState } from "react";
import { Play, Maximize2, Clock, Eye } from "lucide-react";

const VideoGallery = () => {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null
  );

  const videos = [
    {
      id: 1,
      title: "Mobile App Design Process",
      description: "Complete redesign of a fintech mobile application",
      duration: "2:45",
      views: "1.2K",
      type: "portrait",
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop&crop=center",
      videoUrl: "", // Add your video URL here (MP4, WebM, etc.)
      videoType: "mp4", // mp4, webm, ogg
      isLive: false,
      category: "Mobile Design",
    },
    {
      id: 2,
      title: "Dashboard UX Case Study",
      description:
        "Enterprise dashboard design and user experience optimization",
      duration: "4:20",
      views: "2.8K",
      type: "landscape",
      thumbnail:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center",
      videoUrl: "", // Add your video URL here
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
      videoUrl: "", // Add your video URL here
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
      type: "landscape",
      thumbnail:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
      videoUrl: "", // Add your video URL here
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
      videoUrl: "", // Add your video URL here
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
      type: "portrait",
      thumbnail:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop&crop=center",
      videoUrl: "", // Add your video URL here
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
      videoUrl: "", // Add your video URL here
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
      videoUrl: "", // Add your video URL here
      videoType: "mp4",
      isLive: true,
      category: "Animation",
    },
    {
      id: 9,
      title: "AR/VR Interface Design",
      description:
        "Exploring spatial design principles for immersive digital experiences",
      duration: "5:20",
      views: "3.8K",
      type: "landscape",
      thumbnail:
        "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=600&fit=crop&crop=center",
      videoUrl: "", // Add your video URL here
      videoType: "mp4",
      isLive: false,
      category: "AR/VR Design",
    },
  ];

  const handleVideoPlay = (video: (typeof videos)[0]) => {
    if (video.videoUrl) {
      // If video URL exists, open in modal or play inline
      setSelectedVideo(video);
      setShowVideoModal(true);
    } else {
      // Fallback: show coming soon or redirect to external link
      alert(
        `Video "${video.title}" coming soon! Add videoUrl to enable playback.`
      );
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
    setPlayingVideo(null);
  };

  const renderVideoCard = (video: (typeof videos)[0]) => {
    const isPortrait = video.type === "portrait";

    return (
      <div
        key={video.id}
        className={`group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-400/20 w-full h-full`}
        onMouseEnter={() => setHoveredVideo(video.id)}
        onMouseLeave={() => setHoveredVideo(null)}
      >
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => handleVideoPlay(video)}
        >
          {/* Video Element (hidden by default, shown when playing) */}
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
            /* Thumbnail Image */
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 rounded-2xl"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"></div>

          {/* Live indicator */}
          {video.isLive && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
              LIVE
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-gray-400 text-xs font-semibold rounded-full">
            {video.category}
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-14 h-14 rounded-full bg-white flex items-center justify-center transform transition-all duration-500 ${
              hoveredVideo === video.id
                ? "scale-110 shadow-2xl shadow-gray-400/50"
                : "scale-100"
            } ${playingVideo === video.id ? "opacity-0" : "opacity-100"}`}
          >
            <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between mb-2 text-xs text-gray-300">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{video.views}</span>
              </div>
            </div>
            <button
              className="p-1.5 rounded-full bg-black/50 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleVideoPlay(video);
              }}
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
          <h3
            className={`font-bold text-white group-hover:text-white transition-colors mb-1 ${
              isPortrait ? "text-sm leading-tight" : "text-base"
            }`}
          >
            {video.title}
          </h3>
          <p
            className={`text-gray-300 leading-relaxed ${
              isPortrait ? "text-xs" : "text-sm"
            }`}
          >
            {video.description}
          </p>
        </div>

        <div className="absolute inset-0 border-2 border-gray-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center py-16">
        <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
        <span className="text-white"> VIDEO</span>   GALLERY
        </h1>
        <div className="w-32 h-1 bg-gray-500 mx-[49%] mb-4"></div>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore my design process through video case studies and walkthroughs
        </p>
      </div>

      <section className="py-8 sm:py-16 max-w-7xl mx-auto">
        {/* CSS Grid with perfect alignment - optimized for 9 videos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 auto-rows-fr">
          {videos.map((video) => {
            const isPortrait = video.type === "portrait";
            return (
              <div
                key={video.id}
                className={`${
                  isPortrait
                    ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2" // Portrait: responsive spanning
                    : "col-span-2 md:col-span-2 lg:col-span-2 row-span-1" // Landscape: consistent spanning
                }`}
                style={{
                  minHeight: isPortrait ? "400px" : "200px",
                }}
              >
                {renderVideoCard(video)}
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-400 transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {selectedVideo.videoUrl ? (
              <video
                className="w-full rounded-lg"
                controls
                autoPlay
                poster={selectedVideo.thumbnail}
              >
                <source
                  src={selectedVideo.videoUrl}
                  type={`video/${selectedVideo.videoType}`}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {selectedVideo.description}
                </p>
                <p className="text-gray-400">
                  Video coming soon! Add videoUrl to enable playback.
                </p>
              </div>
            )}

            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-300">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gray-600/3 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gray-500/4 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default VideoGallery;
