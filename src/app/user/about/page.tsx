"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Palette, Zap, Layers, Sparkles, Code, Paintbrush, Monitor, Camera, Play, Pause } from 'lucide-react';

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    { name: "Photoshop", icon: <Palette className="w-6 h-6" />, level: 95, color: "from-blue-500 to-purple-600" },
    { name: "Illustrator", icon: <Sparkles className="w-6 h-6" />, level: 90, color: "from-orange-500 to-red-600" },
    { name: "Figma", icon: <Layers className="w-6 h-6" />, level: 92, color: "from-green-500 to-teal-600" },
    { name: "After Effects", icon: <Zap className="w-6 h-6" />, level: 85, color: "from-purple-500 to-pink-600" },
    { name: "Cinema 4D", icon: <Monitor className="w-6 h-6" />, level: 78, color: "from-yellow-500 to-orange-600" },
    { name: "Photography", icon: <Camera className="w-6 h-6" />, level: 88, color: "from-indigo-500 to-blue-600" }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveSkill((prev) => (prev + 1) % skills.length);
        console.log(`Active skill changed to: ${skills.length}`);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, skills.length]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 1.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y, opacity }}
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(255, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(255, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(255, 255, 0, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 60%, rgba(255, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 40%, rgba(255, 255, 0, 0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Mouse follower */}
        <motion.div
          className="absolute w-96 h-96 bg-yellow-400 rounded-full opacity-5 pointer-events-none blur-3xl"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Enhanced Profile Section */}
            <motion.div 
              variants={imageVariants}
              className="relative order-2 lg:order-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative group perspective-1000">
                {/* Holographic border effect */}
                <motion.div 
                  className="absolute -inset-6 rounded-3xl opacity-60"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(255,255,0,0.3), rgba(255,255,0,0.1), rgba(255,255,0,0.3))",
                      "linear-gradient(135deg, rgba(255,255,0,0.1), rgba(255,255,0,0.3), rgba(255,255,0,0.1))",
                      "linear-gradient(225deg, rgba(255,255,0,0.3), rgba(255,255,0,0.1), rgba(255,255,0,0.3))",
                      "linear-gradient(315deg, rgba(255,255,0,0.1), rgba(255,255,0,0.3), rgba(255,255,0,0.1))"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Main profile container */}
                <motion.div 
                  className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl p-8 border border-gray-700 backdrop-blur-xl shadow-2xl mt-0"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Profile image with 3D effect */}
                  <motion.div 
                    className="relative w-full aspect-square bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className="text-8xl font-black text-black select-none"
                      animate={{ 
                        rotateY: isHovered ? [0, 360] : 0,
                        scale: isHovered ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      {/* Assuming this is your profile image. Make sure the URL is correct and accessible. */}
                      <img src={"https://media-pnq1-2.cdn.whatsapp.net/v/t61.24694-24/328789428_7742629389166492_2249539091650252324_n.jpg?ccb=11-4&oh=01_Q5Aa2AFb7RdyFpV-c3Newcg1_sQepHMrBqpHpNiqLcJ1QB9qhQ&oe=688734AD&_nc_sid=5e03e0&_nc_cat=108"} className="w-full h-full object-cover rounded-2xl" alt="Profile" />
                    </motion.div>
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      animate={{
                        x: isHovered ? ["-100%", "100%"] : "-100%"
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </motion.div>
                  
                  {/* Floating status indicator */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 10px rgba(34, 197, 94, 0.5)",
                        "0 0 20px rgba(34, 197, 94, 0.8)",
                        "0 0 10px rgba(34, 197, 94, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                </motion.div>



{/* Main profile container End */}



                {/* Orbiting elements */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginTop: "-24px",
                      marginLeft: "-24px"
                    }}
                    animate={{
                      rotate: [0, 360],
                      x: Math.cos((i * 120 * Math.PI) / 180) * 140,
                      y: Math.sin((i * 120 * Math.PI) / 180) * 140,
                    }}
                    transition={{
                      rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
                      x: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
                      y: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    {
                      [
                        <Code key="code" className="w-6 h-6 text-black" />,
                        <Paintbrush key="paintbrush" className="w-6 h-6 text-black" />,
                        <Sparkles key="sparkles" className="w-6 h-6 text-black" />
                      ][i]
                    }
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Content */}
            <motion.div 
              variants={itemVariants}
              className="space-y-12 order-1 lg:order-2"
            >
              {/* Dynamic Name Section */}
              <div className="space-y-6">
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-6xl font-black leading-none mt-12 text-gray-100"
                  variants={itemVariants}
                >
                  <motion.span
                    className="inline-block"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [-1, 1, -1, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    Aniruddh
                  </motion.span>{" "}
                  <motion.span 
                    className="text-yellow-400 inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text hover:text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Agrawal
                  </motion.span>
                </motion.h1>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center space-x-6"
                >
                  <motion.div 
                    className="h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "120px" }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                  <motion.p 
                    className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide"
                    animate={{
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Multidisciplinary Visual Artist
                  </motion.p>
                </motion.div>
              </div>

              {/* Enhanced Bio */}
            <motion.div variants={itemVariants} className="space-y-8">
  <motion.p 
    className="text-xl md:text-2xl leading-relaxed text-white font-light"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    From <span className="text-yellow-400 font-semibold">Raipur, Chhattisgarh</span>. Young enthusiastic guy building my creative dream. <span className="text-yellow-300 font-semibold">Mad multitasker</span> with super pressure handling skills. Sometimes I forget to sleep due to work. <span className="text-yellow-400 font-semibold">GOAT</span> at finding creative solutions to hardcore problems. Have anger issues but kind from inside. Turn my headache into a brainstorming session.
  </motion.p>

  <motion.p 
    className="text-lg leading-relaxed text-gray-400"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
  >
    Introvert person dreaming of becoming a celebrity designer one day. Can be heartbroken but still work like hell. Civil engineer turned multidisciplinary visual artist with 5+ years of experience in branding. Hate partying and works on vacations too.
  </motion.p>
</motion.div>


             
            </motion.div>
          </motion.div>

          <div className='mt-16 lg:mt-24 space-y-12'>
             {/* Revolutionary Skills Section */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold text-yellow-400">
                    Expertise Arsenal
                  </h3>
                  <motion.button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                        activeSkill === index 
                          ? "border-yellow-400 bg-yellow-400/10 scale-105" 
                          : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                      }`}
                      onClick={() => {
                        setActiveSkill(index);
                        setIsPlaying(false);
                      }}
                      whileHover={{ scale: activeSkill === index ? 1.05 : 1.02 }}
                    >
                      {/* Skill progress background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-10`}
                        initial={{ x: "-100%" }}
                        animate={{ 
                          x: activeSkill === index ? "0%" : "-100%"
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      
                      <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div 
                            className={`p-2 rounded-lg ${activeSkill === index ? "bg-yellow-400 text-black" : "bg-gray-800 text-yellow-400"}`}
                            animate={{ rotate: activeSkill === index ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {skill.icon}
                          </motion.div>
                          <div className="font-bold text-white">{skill.name}</div>
                        </div>
                        
                        {/* Skill level bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                          <motion.div
                            className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: activeSkill === index ? `${skill.level}%` : "0%"
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        
                        <motion.div 
                          className="text-right text-sm text-gray-400"
                          animate={{ 
                            opacity: activeSkill === index ? 1 : 0.5
                          }}
                        >
                          {skill.level}%
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Epic CTA */}
              <motion.div variants={itemVariants} className="pt-8">
                <motion.button
                  className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-xl rounded-full overflow-hidden shadow-2xl"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Let&apos;s Create Magic</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;