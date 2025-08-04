"use client"
import React, { useState } from 'react';
import { Play, Maximize2, Clock, Eye } from 'lucide-react';

const VideoGallery = () => {
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  const videos = [
    {
      id: 1,
      title: "Mobile App Design Process",
      description: "Complete redesign of a fintech mobile application",
      duration: "2:45",
      views: "1.2K",
      type: "portrait",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Dashboard UX Case Study",
      description: "Enterprise dashboard design and user experience optimization",
      duration: "4:20",
      views: "2.8K",
      type: "landscape",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Branding & Identity",
      description: "Complete brand identity design for a tech startup",
      duration: "3:15",
      views: "1.9K",
      type: "portrait",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Web Design Workflow",
      description: "Modern e-commerce website design from concept to launch",
      duration: "5:30",
      views: "3.4K",
      type: "landscape",
      thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center"
    }
  ];

  return (
   <div className="h-screen max-h-screen overflow-hidden bg-black text-white pb-20">

      {/* Header */}
      <div className="relative overflow-hidden h-1/3">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/5"></div>
        <div className="relative px-6 py-8 sm:px-12 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                VIDEO GALLERY
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Explore my design process through video case studies and project walkthroughs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="px-6 sm:px-12 h-2/3 overflow-y-auto mt-10 mb-20"> 
        <div className="max-w-7xl mx-auto h-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`group relative overflow-hidden rounded-2xl bg-gray-900 mb-10 border border-gray-800 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/20 ${
                  video.type === 'portrait' 
                    ? 'h-full' 
                    : 'h-full'
                }`}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                {/* Video Thumbnail */}
                <div className="absolute inset-0">
               <img loading="lazy"
  src={video.thumbnail}
  alt={video.title}
  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
/>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-colors duration-500"></div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center transform transition-all duration-500 ${
                    hoveredVideo === video.id ? 'scale-110 shadow-2xl shadow-yellow-400/50' : 'scale-100'
                  }`}>
                    <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 mb-1.5 ">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3 text-xs text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-full bg-black/50 hover:bg-yellow-400/20 transition-colors">
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 text-white group-hover:text-yellow-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 border-2 border-yellow-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-yellow-600/3 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default VideoGallery;