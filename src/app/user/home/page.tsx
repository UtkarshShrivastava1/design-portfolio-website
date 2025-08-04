"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight,
  Sparkles,
  Palette,
  Zap,
  Download,
  Brush,
  Monitor,
  Printer,
  // Filter,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  // Star,
  // ChevronLeft,
  // Eye,
  // ExternalLink
} from "lucide-react";
// import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
// import Videos from '../components/Videos';
import VideoGallery from "../components/VideoGallery";
import Testimonials from "../components/Testimonial";
import MyWork from "../components/Work";
import GallerySection from "../components/Gallery";
// import Gallery from '../models/galleryModel';;

const Portfolio = () => {
  // const [activeFilter, setActiveFilter] = useState('All');
  // const [currentTestimonial, setCurrentTestimonial] = useState(0);
  //  const words = [
  //     {
  //       text: "Bring",
  //       className: "text-white dark:text-white",
  //     },
  //     {
  //       text: "Ideas",
  //       className: "text-white dark:text-white",
  //     },
  //     {
  //       text: "to Life",
  //        className: "text-yellow-400 dark:text-yellow-400",
  //     },

  //   ];
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const services = [
    {
      icon: Palette,
      title: "Logo Design",
      description:
        "Creating memorable and impactful brand identities that represent your unique story.",
    },
    {
      icon: Monitor,
      title: "Web Design",
      description:
        "Designing beautiful, user-friendly websites that engage and convert visitors.",
    },
    {
      icon: Printer,
      title: "Print Media",
      description:
        "Crafting stunning print materials from business cards to large format displays.",
    },
    {
      icon: Brush,
      title: "Illustration",
      description:
        "Custom illustrations that bring concepts to life with artistic flair and precision.",
    },
  ];

  // const filterOptions = ['All', 'Branding', 'Web', 'Posters', 'UI-UX'];

  // const filteredProjects = activeFilter === 'All'
  //   ? projects
  //   : projects.filter(project => project.category === activeFilter);

  type AnimatedSectionProps = {
    children: React.ReactNode;
    className?: string;
  };

  const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    className = "",
  }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden ">
        {/* Animated Background */}
        <div className="absolute inset-0 sm:mt-10 md:mt-24 lg:mt-24 xl:mt-32">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-15"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />

          <motion.div
            className="absolute top-1/4 left-10 w-4 h-4 bg-yellow-400 transform rotate-45"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-white rounded-full"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="absolute bottom-1/3 right-10 w-5 h-5 bg-yellow-300 transform rotate-12"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
          />
        </div>

        {/* Main Container */}
        <motion.div
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Section: Text Content */}
            <div className="text-white space-y-8 w-full md:mt-20">
              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-4xl md:text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight">
                  Bringing
                  <span className="relative inline-block mx-4">
                    <span className="text-yellow-400">Ideas</span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-400 opacity-30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>
                  to Life
                </h1>
                <div className="flex items-center space-x-4 text-base sm:text-lg">
                  <motion.div
                    className="w-10 sm:w-12 h-0.5 bg-yellow-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                  />
                  <span className="text-gray-300">
                    Through Visual Storytelling
                  </span>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg"
              >
                Freelance graphic designer crafting compelling visuals that
                communicate, inspire, and elevate your brand to new heights.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                {[
                  "Brand Identity",
                  "Web Design",
                  "Print Design",
                  "Illustration",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-yellow-400 bg-opacity-20 text-black rounded-full text-sm font-medium border border-yellow-400 border-opacity-30"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(251, 191, 36, 0.3)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 + index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  className="group inline-flex items-center space-x-3 bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-300 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(251, 191, 36, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/project" className="flex items-center space-x-2">
                    <span>View My Work</span>
                  </a>
                  <motion.div className="group-hover:translate-x-1 transition-transform duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Section: Image/Visual */}
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center w-full"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg mt-20">
                <motion.div
                  className="relative w-full aspect-square"
                  variants={pulseVariants}
                  animate="animate"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full" />
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        {/* <Palette className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4" /> */}

                        <img
                          src={
                            "https://media-pnq1-2.cdn.whatsapp.net/v/t61.24694-24/328789428_7742629389166492_2249539091650252324_n.jpg?ccb=11-4&oh=01_Q5Aa2AFb7RdyFpV-c3Newcg1_sQepHMrBqpHpNiqLcJ1QB9qhQ&oe=688734AD&_nc_sid=5e03e0&_nc_cat=108"
                          }
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute -top-6 -right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center"
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-xs sm:text-sm text-gray-400">
              Scroll to explore
            </span>
            <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-yellow-400 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <AnimatedSection className="py-20 bg-white text-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              className="text-yellow-600 text-sm font-bold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Who Am I?
            </motion.h3>

            <motion.h2
              className="text-4xl lg:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Creative Designer with Passion for Innovation
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              With over 5 years of experience in graphic design, I specialize in
              creating compelling visual narratives that connect brands with
              their audiences. My approach combines strategic thinking with
              creative execution, ensuring every design not only looks beautiful
              but serves a purpose.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Palette,
                  title: "Branding",
                  desc: "Complete brand identity systems",
                },
                {
                  icon: Monitor,
                  title: "UI/UX Design",
                  desc: "User-centered digital experiences",
                },
                {
                  icon: Brush,
                  title: "Illustration",
                  desc: "Custom artwork and graphics",
                },
              ].map((skill, index) => (
                <motion.div
                  key={skill.title}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-yellow-50 transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <skill.icon className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{skill.title}</h4>
                  <p className="text-gray-600">{skill.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </motion.button>
          </div>
        </div>
      </AnimatedSection>

      {/* Work/Projects Section */}
      {/* <AnimatedSection className="py-20 bg-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-yellow-400 text-sm font-bold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.h3>
            
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              My Work
            </motion.h2> */}

      {/* Filter Buttons */}
      {/* <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white bg-opacity-10 text-black hover:bg-opacity-20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
          </div> */}

      {/* Projects Grid */}
      {/* <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                layout
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-yellow-400 to-yellow-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-black text-center">
                      <Eye className="w-12 h-12 mx-auto mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <p className="font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Project</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-yellow-400 bg-opacity-20 text-gray-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection> */}

      <MyWork />

      {/* Services Section */}
      <AnimatedSection className="py-20 bg-white text-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h3
              className="text-yellow-600 text-sm font-bold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Services
            </motion.h3>

            <motion.h2
              className="text-4xl lg:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              What I Do
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:shadow-2xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <service.icon className="w-10 h-10 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Videos section */}
      <div>
        <VideoGallery />
      </div>

      {/* Gallery */}
      <div>
        <GallerySection />
      </div>

      {/* Testimonials Section */}

      <Testimonials />

      {/* Contact Section */}
      <AnimatedSection className="py-20 bg-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h3
              className="text-yellow-400 text-sm font-bold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Contact
            </motion.h3>

            <motion.h2
              className="text-4xl lg:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Let&apos;s Work Together
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea
                    rows={6}
                    placeholder="Your Message"
                    className="w-full px-6 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">
                  Get In Touch
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Ready to bring your vision to life? Let&apos;s discuss your
                  project and create something amazing together.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">hello@designer.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">New York, NY</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-white border-opacity-20">
                <h4 className="text-lg font-bold mb-4 text-yellow-400">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 bg-white 
                      text-yellow-400 bg-opacity-10 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-600 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      {/* <footer className="py-12 bg-gray-900 border-t border-white border-opacity-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Palette className="w-5 h-5 text-black" />
                </div>
                <span className="text-2xl font-bold">Designer</span>
              </div>
              <p className="text-gray-400 mb-6">
                Creating visual experiences that inspire and engage.
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <span>© 2024 Designer Portfolio</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Portfolio;
