import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto mb-26">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-gray-400 font-semibold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/user/about"
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                  Brand Broucher
                </a>
              </li>
             
              <li>
                <a
                  href="/user/contact"
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Products Section */}
          {/* <div className="space-y-4">
            <h3 className="text-gray-400 font-semibold text-lg mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                  Socket API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                  Socket SDK
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                  SocketScan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                  Bungee
                </a>
              </li>
            </ul>
          </div> */}

          {/* Social Section */}
          <div className="space-y-4">
            <h3 className="text-gray-400 font-semibold text-lg mb-4">
              Social
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/01prinz?igsh=MWwydWN6anRkOXIzMw=="
                  className="text-gray-300 hover:text-gray-400 transition-colors duration-200 text-sm"
                >
                 Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Logo Section - Large SOCKET text */}
        {/* <div className=" absolute left-[50%] translate-x-[-50%] bottom-[12%]">
            <div className="text-6xl sm:text-7xl lg:text-9xl font-bold text-gray-800 select-none tracking-wider ">
                DESIGNER
            </div>
          </div> */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] sm:bottom-[10%] md:bottom-[12%] text-center w-full px-2">
              <div className="relative">
                {/* Responsive Text */}
                <div
                 className="font-bold text-gray-800 select-none tracking-wider whitespace-nowrap
             text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-8xl
             mb-4 sm:mb-6 md:mb-8 lg:mb-10"
                >
                  <h2>SOCH LABS</h2>
                </div>

                {/* Foreground gradient overlay */}
                <div className="absolute bottom-0 left-0 w-full h-[40%] sm:h-[50%] md:h-[60%] bg-gradient-to-t from-black to-transparent pointer-events-none" />
              </div>
            </div>


      </div>
      {/* Bottom Section */}
      <div className="border-t border-gray-800 pt-8 relative z-50 bg-black">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            powered by : <Link href={"https://www.zager.in/Home"} className="hover:text-white"> © Zager Digital services</Link>
          </div>

          {/* Legal Links */}
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-white dark:hover:text-gray-100"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-white dark:hover:text-gray-100"
            >
              Privacy Notice
            </Link>
            <Link
              href="/admin-login"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-white dark:hover:text-gray-100"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
