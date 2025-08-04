'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Palette, 
  Monitor, 
  User, 
  FileText,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Visual Identity & Branding',
    description: 'Craft cohesive visual identities and branding that align with your mission, values, and audience for lasting impact.',
    icon: <Palette className="w-10 h-10" />,
    gradient: 'from-yellow-400 via-yellow-300 to-amber-400'
  },
  {
    id: 2,
    title: 'Creative Direction & Art Consultation',
    description: 'Guide the creative process across projects, offering expert consultation for visual storytelling and aesthetic cohesion.',
    icon: <Monitor className="w-10 h-10" />,
    gradient: 'from-yellow-300 via-amber-300 to-yellow-400'
  },
  {
    id: 3,
    title: 'NFT Creation (Mixed Media & Experimental Artworks)',
    description: 'Explore Web3 through cutting-edge NFT artwork using diverse media forms and innovative digital experimentation.',
    icon: <User className="w-10 h-10" />,
    gradient: 'from-amber-400 via-yellow-400 to-yellow-300'
  },
  {
    id: 4,
    title: 'Visual Documentation & Film Making',
    description: 'Capture and produce compelling visual stories through photography, film, and narrative-driven content.',
    icon: <FileText className="w-10 h-10" />,
    gradient: 'from-yellow-400 via-amber-400 to-yellow-300'
  },
  {
    id: 5,
    title: 'Creative Strategy & Campaign Design',
    description: 'Design integrated campaigns powered by clear creative direction, branding consistency, and bold execution.',
    icon: <Zap className="w-10 h-10" />,
    gradient: 'from-yellow-400 via-yellow-300 to-amber-300'
  },
  {
    id: 6,
    title: 'Creative Mentorship',
    description: 'Empower emerging creatives with mentorship focused on industry navigation, portfolio building, and concept execution.',
    icon: <User className="w-10 h-10" />,
    gradient: 'from-amber-300 via-yellow-300 to-yellow-500'
  },
  {
    id: 7,
    title: 'Pre & Post Production',
    description: 'Support across video workflows including scripting, storyboarding, editing, color grading, and sound design.',
    icon: <Monitor className="w-10 h-10" />,
    gradient: 'from-yellow-400 via-amber-400 to-yellow-300'
  },
  {
    id: 8,
    title: 'Print Design',
    description: 'Deliver high-quality printed materials from concept to production — including editorial, packaging, and promotional work.',
    icon: <FileText className="w-10 h-10" />,
    gradient: 'from-yellow-400 via-amber-400 to-yellow-300'
  }
];

// Reduce top spacing and improve responsiveness
const ServicesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-24 px-6 bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-yellow-300/15 to-yellow-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Mouse Follower */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-yellow-400/5 to-amber-400/5 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        ></div>

        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-4 h-4 border border-yellow-400/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-yellow-400/20 rotate-12 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-amber-400/30 animate-ping" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 font-bold text-sm tracking-[0.3em] uppercase">
                Premium Services
              </span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 relative tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                Services
              </span>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-yellow-400/50 rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-400/30 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            We don&lsquo;t just create designs – we craft 
            <span className="text-yellow-400 font-semibold"> digital masterpieces </span>
            that transform brands and captivate audiences worldwide.
          </p>

          {/* Animated Underline */}
          <div className="flex justify-center mt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className={`text-center transition-all duration-1200 delay-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="relative inline-block">
            <button className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-400 text-black px-12 py-6 font-bold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Let&lsquo;s Create Magic Together
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              
              {/* Button Animation Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-white/30 rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 group-hover:scale-150"></div>
            </button>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 p-8 transition-all duration-700 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/10 hover:-translate-y-4 cursor-pointer overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ 
        transitionDelay: `${index * 200}ms`,
        background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`}></div>
      
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 via-transparent to-amber-400/20 blur-sm"></div>
      </div>
      
      {/* Icon Container */}
      <div className="relative mb-8 z-10">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-500 relative ${
          isHovered 
            ? `bg-gradient-to-br ${service.gradient} text-black transform rotate-6 scale-110 shadow-2xl shadow-yellow-400/30` 
            : 'bg-gradient-to-br from-gray-800 to-gray-900 text-yellow-400 border border-gray-700'
        }`}>
          {service.icon}
          
          {/* Icon Glow Effect */}
          {isHovered && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/30 to-amber-400/30 blur-lg -z-10"></div>
          )}
        </div>
        
        {/* Floating Particles */}
        <div className={`absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full transition-all duration-500 ${
          isHovered ? 'scale-150 animate-ping' : 'scale-100'
        }`}></div>
        <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400 rounded-full transition-all duration-700 ${
          isHovered ? 'scale-200 animate-pulse' : 'scale-100'
        }`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-yellow-100 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-base">
          {service.description}
        </p>
      </div>

      {/* Hover Arrow with Trail Effect */}
      <div className={`absolute bottom-6 right-6 transition-all duration-500 ${
        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}>
        <div className="relative">
          <ArrowRight className="w-6 h-6 text-yellow-400" />
          <div className="absolute inset-0 bg-yellow-400/30 blur-md rounded-full"></div>
        </div>
      </div>

      {/* Animated Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-400/0 group-hover:border-yellow-400/50 transition-all duration-300"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-400/0 group-hover:border-yellow-400/50 transition-all duration-300 delay-100"></div>

      {/* Ripple Effect */}
      <div className={`absolute inset-0 rounded-lg transition-all duration-1000 ${
        isHovered 
          ? 'bg-gradient-to-br from-yellow-400/5 via-transparent to-amber-400/5' 
          : 'bg-transparent'
      }`}></div>
    </div>
  );
};

export default ServicesSection;