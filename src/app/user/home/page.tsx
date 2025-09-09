"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import {

  Palette,
  Download,
  Brush,
  Monitor,
  Printer,
 
  Mail,
  InstagramIcon

} from "lucide-react";

import VideoGallery from "../components/VideoGallery";
import Testimonials from "../components/Testimonial";
import MyWork from "../components/Work";
import GallerySection from "../components/Gallery";
import Image from "next/image";

const Portfolio = () => {


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

  const scrollToNextSection = () => {
  // Scroll down by viewport height (window.innerHeight)
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
};



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
      <section className="relative min-h-screen overflow-hidden bg-black">
          <div className="absolute inset-0 md:shrink-0">
            <Image
              src="/BANNER_IMAGE.png"
              alt="Hero background"
              
              objectPosition="center"
              layout="responsive"
              width={1920} 
              height={1080}
              quality={100}
              className="h-auto md:max-w-[100%] md:background-image: var(<custom-property>);"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none" /> */}
          </div>

          {/* <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          > */}
            <motion.div
              onClick={scrollToNextSection}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-10 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  scrollToNextSection();
                }
              }}
            >
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-center space-y-2"
                    >
                      <span className="text-xs sm:text-sm text-gray-400">Scroll to explore</span>
                      <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <motion.div
                          className="w-1 h-3 bg-white rounded-full mt-2"
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
              className="text-gray-600 text-sm font-bold tracking-wider uppercase mb-4"
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
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-200 transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
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
              <span>Download Brochure</span>
            </motion.button>
          </div>
        </div>
      </AnimatedSection>


      <MyWork />

      {/* Services Section */}
      <AnimatedSection className="py-20 bg-white text-black">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h3
              className="text-gray-600 text-sm font-bold tracking-wider uppercase mb-4"
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
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-300 hover:shadow-2xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <service.icon className="w-10 h-10 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-600 transition-colors duration-300">
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
              className="text-gray-400 text-sm font-bold tracking-wider uppercase mb-4"
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
                    className="w-full px-6 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea
                    rows={6}
                    placeholder="Your Message"
                    className="w-full px-6 py-4 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-300 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-300 transition-colors duration-300"
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
                <h3 className="text-2xl font-bold mb-6 text-gray-400">
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
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">withsoch@gmail.com</p>
                  </div>
                </motion.div>

                {/* <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </motion.div> */}

                {/* <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">New York, NY</p>
                  </div>
                </motion.div> */}
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-white border-opacity-20">
                <h4 className="text-lg font-bold mb-4 text-gray-400">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {[
                    { icon: InstagramIcon, href: "https://www.instagram.com/01prinz?igsh=MWwydWN6anRkOXIzMw==", label: "Instagram" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 bg-white 
                      text-black bg-opacity-10 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-600 transition-all duration-300"
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
    </div>
  );
};

export default Portfolio;
