"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const menuItems = [
  //   { name: "Home", href: "/home" },
  //   { name: "About", href: "/about" },
  //   { name: "Projects", href: "/project" },
  //   { name: "Blogs", href: "/blogs" },
  //   { name: "Services", href: "/servicess" },
  //   { name: "Contact", href: "/contact" },
  //   { name: "Client", href: "/clientpage" },
  // ];
  const menuItems = [
    { name: "Home", href: "/user/home" },
    { name: "About", href: "/user/about" },
    { name: "Projects", href: "/user/projects" },
    { name: "Blogs", href: "/user/blogs" },
    { name: "Services", href: "/user/servicess" },
    { name: "Contact", href: "/user/contact" },
    { name: "Client", href: "/user/clientpage" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-white ${
          isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 relative">
            {/* Logo */}
            <Link
              href="/user/home"
              className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
            >
              <Image
                src="/Logo.PNG"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="ml-2 text-xs  sm:text-lg font-semibold dark:text-white">
                Design Portfolio
              </span>
            </Link>

            {/* Centered Company Name */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
              <h1 className="text-white text-2xl font-light tracking-wider whitespace-nowrap">
                {/* <span className="font-bold text-yellow-400">Your</span>Company */}
              </h1>
            </div>

            {/* Schedule Call Button */}
            <div className="flex items-center space-x-4">
              <a
                href="/user/contact"
                className="group relative bg-transparent border-2 border-yellow-400 rounded-full text-yellow-400 font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-yellow-400 hover:text-black overflow-hidden
 px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-sm"
              >
                <span className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="sm:hidden">Call</span>
                  <span className="hidden sm:inline">Schedule a Call</span>
                </span>
                <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>

              {/* Hamburger Menu Button */}
              <button
                onClick={toggleMenu}
                className="w-12 h-12 flex flex-col items-center justify-center space-y-1.5 group focus:outline-none"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                    isMenuOpen ? "rotate-45 translate-y-2" : "group-hover:w-8"
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-yellow-400 transition-all duration-300 ease-out ${
                    isMenuOpen ? "opacity-0" : "group-hover:w-8"
                  }`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : "group-hover:w-8"
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg"></div>

        <div
          className={`relative h-full flex flex-col justify-center items-center transform transition-all duration-700 ease-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Menu Items */}
          <div className="space-y-8 text-center">
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className={`transform transition-all duration-500 ease-out ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a
                  href={item.href}
                  className="group relative text-4xl md:text-4xl font-light text-white hover:text-yellow-400 transition-colors duration-300 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 bg-yellow-400/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></span>
                </a>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-white hover:text-yellow-400 transition-colors duration-300"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></svg>
          </button>

          {/* Social Icons */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 transition-all duration-700 ease-out ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {/* Twitter */}
            <a
              href="#"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 2.6a9.864 9.864 0 0 1-3.127 1.195 4.922 4.922 0 0 0-8.388 4.482A13.978 13.978 0 0 1 1.64 3.15a4.922 4.922 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.23-.616v.06a4.927 4.927 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.935 4.935 0 0 0 4.6 3.419A9.867 9.867 0 0 1 .96 19.54 13.953 13.953 0 0 0 7.548 21c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0 0 24 4.557z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38a9.02 9.02 0 0 1-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.566-1.36 2.14-2.23z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
