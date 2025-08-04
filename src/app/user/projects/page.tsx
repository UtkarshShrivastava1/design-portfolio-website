"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {  ArrowRight, Eye, Heart, Zap, Layers, Monitor, Smartphone, Globe, Camera } from 'lucide-react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  // const [viewMode, setViewMode] = useState('grid');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "NeuroSync App",
      category: "UI/UX Design",
      description: "Revolutionary brain-computer interface application that reads neural patterns to enhance productivity and focus.",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tags: ["Mobile", "AI", "Healthcare"],
      status: "Featured",
      likes: 2847,
      views: 15692,
      year: "2024",
      client: "MindTech Labs",
      duration: "6 months",
      tools: ["Figma", "Principle", "After Effects"],
      color: "from-purple-500 to-blue-600",
      icon: <Monitor className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Quantum Commerce",
      category: "E-commerce",
      description: "Next-gen shopping platform using quantum computing algorithms for personalized product recommendations.",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      tags: ["Web", "E-commerce", "AI"],
      status: "Award Winner",
      likes: 4521,
      views: 28394,
      year: "2024",
      client: "RetailVerse",
      duration: "8 months",
      tools: ["Figma", "Framer", "Cinema 4D"],
      color: "from-pink-500 to-red-600",
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Hologram Banking",
      category: "Fintech",
      description: "Immersive holographic banking interface that revolutionizes how people interact with their finances.",
      image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      tags: ["AR/VR", "Fintech", "3D"],
      status: "Innovation",
      likes: 3672,
      views: 19847,
      year: "2023",
      client: "FutureBank",
      duration: "10 months",
      tools: ["Blender", "Unity", "Figma"],
      color: "from-cyan-500 to-teal-600",
      icon: <Layers className="w-6 h-6" />
    },
    {
      id: 4,
      title: "AI Portrait Studio",
      category: "Creative Tools",
      description: "Artificial intelligence-powered portrait generation tool that creates photorealistic avatars from text descriptions.",
      image: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      tags: ["AI", "Photography", "Creative"],
      status: "Trending",
      likes: 5234,
      views: 32156,
      year: "2024",
      client: "CreativeAI Inc",
      duration: "4 months",
      tools: ["Midjourney", "Photoshop", "Figma"],
      color: "from-orange-500 to-yellow-600",
      icon: <Camera className="w-6 h-6" />
    },
    {
      id: 5,
      title: "MetaSpace Social",
      category: "Social Platform",
      description: "Virtual reality social platform where users create and explore infinite digital worlds together.",
      image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      tags: ["VR", "Social", "Gaming"],
      status: "Beta",
      likes: 1892,
      views: 12374,
      year: "2024",
      client: "MetaCorp",
      duration: "12 months",
      tools: ["Unreal Engine", "Blender", "Figma"],
      color: "from-pink-500 to-yellow-500",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      id: 6,
      title: "EcoSphere Dashboard",
      category: "Data Visualization",
      description: "Real-time environmental monitoring dashboard that tracks global climate data with stunning 3D visualizations.",
      image: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
      tags: ["Data Viz", "Environment", "3D"],
      status: "Live",
      likes: 2156,
      views: 16783,
      year: "2023",
      client: "GreenTech Solutions",
      duration: "5 months",
      tools: ["D3.js", "Three.js", "Figma"],
      color: "from-green-500 to-blue-500",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const filters = ['all', 'UI/UX Design', 'E-commerce', 'Fintech', 'Creative Tools', 'Social Platform', 'Data Visualization'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Featured': return 'bg-yellow-400 text-black';
      case 'Award Winner': return 'bg-red-500 text-white';
      case 'Innovation': return 'bg-purple-500 text-white';
      case 'Trending': return 'bg-green-500 text-white';
      case 'Beta': return 'bg-blue-500 text-white';
      case 'Live': return 'bg-cyan-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-black text-white py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(255, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 0, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 25%, rgba(255, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 25% 75%, rgba(255, 255, 0, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating geometric shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            <div className={`w-8 h-8 ${i % 3 === 0 ? 'bg-yellow-400' : i % 3 === 1 ? 'border-2 border-yellow-400' : 'bg-gradient-to-r from-yellow-400 to-transparent'} ${i % 4 === 0 ? 'rounded-full' : i % 4 === 1 ? 'rounded-none rotate-45' : 'rounded-lg'}`} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-4 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-12 h-0.5 bg-yellow-400"
              initial={{ width: 0 }}
              animate={isInView ? { width: "48px" } : {}}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <span className="text-yellow-400 text-xl font-semibold tracking-wider">PORTFOLIO</span>
            <motion.div
              className="w-12 h-0.5 bg-yellow-400"
              initial={{ width: 0 }}
              animate={isInView ? { width: "48px" } : {}}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </motion.div>

          <motion.h2 
            className="text-6xl md:text-7xl lg:text-6xl font-black mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          >
            Featured {" "}
            <motion.span 
              className="text-yellow-400 inline-block"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              Work
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Pushing the boundaries of digital design through{" "}
            <motion.span 
              className="text-yellow-400 font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              innovation, creativity, and cutting-edge technology
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Advanced Filter System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
                activeFilter === filter
                  ? 'bg-yellow-400 text-black shadow-2xl'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-yellow-400"
                initial={{ x: "-100%" }}
                animate={{ x: activeFilter === filter ? "0%" : "-100%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 capitalize">
                {filter === 'all' ? 'All Projects' : filter}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Revolutionary Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                className="group relative perspective-1000"
                onMouseEnter={() => setHoveredProject(project.id) }
                onMouseLeave={() => setHoveredProject(null)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Project Image/Background */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: project.image }}
                      animate={{
                        scale: hoveredProject === project.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    {/* Overlay Effects */}
                    <motion.div
                      className="absolute inset-0 bg-black/40"
                      animate={{
                        opacity: hoveredProject === project.id ? 0.6 : 0.4
                      }}
                    />

                    {/* Status Badge */}
                    <motion.div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(project.status)}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {project.status}
                    </motion.div>

                    {/* Stats */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <motion.div
                        className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Heart className="w-3 h-3 text-red-400" />
                        <span className="text-xs text-white font-semibold">{project.likes}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Eye className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-white font-semibold">{project.views}</span>
                      </motion.div>
                    </div>

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-6 w-full">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tools.map((tool, i) => (
                                <motion.span
                                  key={tool}
                                  className="bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-semibold"
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  {tool}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Category Icon */}
                    <motion.div
                      className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black"
                      animate={{
                        rotate: hoveredProject === project.id ? 360 : 0,
                        scale: hoveredProject === project.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {project.icon}
                    </motion.div>
                  </div>

                  {/* Project Info */}
                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <motion.h3 
                          className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300"
                          animate={{
                            x: hoveredProject === project.id ? 5 : 0
                          }}
                        >
                          {project.title}
                        </motion.h3>
                        <span className="text-sm text-gray-400 font-semibold">{project.year}</span>
                      </div>
                      
                      <p className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
                        {project.category}
                      </p>
                    </div>

                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0.8
                      }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600"
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 0, 0.1)",
                            borderColor: "rgba(255, 255, 0, 0.3)"
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Project Details */}
                    <motion.div
                      className="grid grid-cols-2 gap-4 text-sm text-gray-400"
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0.6
                      }}
                    >
                      <div>
                        <span className="text-yellow-400 font-semibold">Client:</span>
                        <br />
                        {project.client}
                      </div>
                      <div>
                        <span className="text-yellow-400 font-semibold">Duration:</span>
                        <br />
                        {project.duration}
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 rounded-2xl flex items-center justify-center space-x-3 group-hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 30px rgba(255, 255, 0, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>View Project</span>
                        <motion.div
                          animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </span>
                    </motion.button>
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-3xl opacity-0 blur-xl`}
                    animate={{
                      opacity: hoveredProject === project.id ? 0.3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Epic Load More Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.button
            className="group relative px-12 py-6 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold text-xl rounded-full overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-yellow-400"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 flex items-center space-x-3 group-hover:text-black transition-colors duration-300">
              <span>Explore Full Portfolio</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}  
              >
                <Zap className="w-6 h-6" />
              </motion.div>
            </span>
          </motion.button>

          <motion.p
            className="text-gray-400 mt-6 text-lg"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            50+ more projects waiting to be discovered
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;