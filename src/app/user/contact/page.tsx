'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Send,
  User,
  MessageSquare,
  Check,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
  MapPin,
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: <Github className="w-6 h-6" />,
    url: 'https://github.com/yourusername',
    color: 'hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="w-6 h-6" />,
    url: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-blue-400'
  },
  {
    name: 'Twitter',
    icon: <Twitter className="w-6 h-6" />,
    url: 'https://twitter.com/yourusername',
    color: 'hover:text-blue-400'
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-6 h-6" />,
    url: 'https://instagram.com/yourusername',
    color: 'hover:text-pink-400'
  }
];

const ContactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS integration would go here
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error:unknown) {
      setSubmitStatus(error instanceof Error ? 'error' : 'error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
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
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-amber-400/5"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-72 h-72 bg-gradient-to-r from-amber-400/8 to-yellow-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Interactive Mouse Glow */}
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-yellow-400/8 to-amber-400/8 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 160,
            top: mousePosition.y - 160,
          }}
        ></div>

        {/* Geometric Patterns */}
        <div className="absolute top-20 right-20 w-6 h-6 border-2 border-yellow-400/20 rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-yellow-400/30 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-amber-400/40 animate-ping" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-400 font-bold text-sm tracking-[0.3em] uppercase">
                Let&apos;s Connect
              </span>
              <Heart className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-6xl md:text-6xl font-black text-white mb-8 relative tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Get In
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                Touch
              </span>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-10 h-10 border-2 border-yellow-400/50 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
              <Sparkles className="absolute -bottom-4 -left-4 w-8 h-8 text-yellow-400/70 animate-bounce" style={{ animationDelay: '1s' }} />
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Ready to create something 
            <span className="text-yellow-400 font-semibold"> extraordinary</span>? 
            Let&apos;s bring your vision to life and make magic happen together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 p-8 md:p-12 rounded-2xl">
              {/* Form Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 via-transparent to-amber-400/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  Send a Message
                </h3>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and I&apos;ll get back to you within 24 hours!
                </p>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3 animate-pulse">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Message sent successfully! I&apos;ll be in touch soon.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium">Something went wrong. Please try again.</span>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-gray-900/50 border-2 rounded-lg text-white placeholder-gray-500 transition-all duration-300 focus:outline-none ${
                        focusedField === 'name' 
                          ? 'border-yellow-400 shadow-lg shadow-yellow-400/20 bg-gray-900/70' 
                          : errors.name 
                            ? 'border-red-500' 
                            : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                    
                    {/* Focus Glow Effect */}
                    {focusedField === 'name' && (
                      <div className="absolute inset-0 rounded-lg bg-yellow-400/5 blur-sm pointer-events-none"></div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-gray-900/50 border-2 rounded-lg text-white placeholder-gray-500 transition-all duration-300 focus:outline-none ${
                        focusedField === 'email' 
                          ? 'border-yellow-400 shadow-lg shadow-yellow-400/20 bg-gray-900/70' 
                          : errors.email 
                            ? 'border-red-500' 
                            : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                    
                    {focusedField === 'email' && (
                      <div className="absolute inset-0 rounded-lg bg-yellow-400/5 blur-sm pointer-events-none"></div>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="block text-gray-300 font-medium mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-4 bg-gray-900/50 border-2 rounded-lg text-white placeholder-gray-500 transition-all duration-300 focus:outline-none resize-none ${
                        focusedField === 'message' 
                          ? 'border-yellow-400 shadow-lg shadow-yellow-400/20 bg-gray-900/70' 
                          : errors.message 
                            ? 'border-red-500' 
                            : 'border-gray-700 hover:border-gray-600'
                      }`}
                      placeholder="Tell me about your project, ideas, or just say hello!"
                    />
                    {errors.message && (
                      <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                    
                    {focusedField === 'message' && (
                      <div className="absolute inset-0 rounded-lg bg-yellow-400/5 blur-sm pointer-events-none"></div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-400 text-black px-8 py-4 font-bold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/25 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          Send Message
                        </>
                      )}
                    </span>
                    
                    {/* Button Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-white/30 rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="space-y-12">
              {/* Direct Contact */}
              <div className="relative bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm border border-gray-800/30 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 mt-4">
                  <Mail className="w-8 h-8 text-yellow-400" />
                  Direct Contact
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href="mailto:hello@yourdesign.com" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">
                        hello@yourdesign.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <a href="tel:+1234567890" className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">New York, NY</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="relative bg-gradient-to-br from-gray-900/30 to-black/30 backdrop-blur-sm border border-gray-800/30 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                  Follow Me
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-3 p-4 bg-gray-900/30 rounded-lg hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 hover:shadow-lg ${social.color}`}
                    >
                      <div className="relative">
                        {social.icon}
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="text-white group-hover:text-yellow-400 transition-colors duration-300 font-medium">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="relative bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-800/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-bold">Available for Projects</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Currently accepting new projects for Q2 2025. Let&apos;s create something amazing together!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;