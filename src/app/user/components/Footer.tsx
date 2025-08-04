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
            <h3 className="text-yellow-400 font-semibold text-lg mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Work with us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Brand Assets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Products Section */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-semibold text-lg mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Socket API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Socket SDK
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  SocketScan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Bungee
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-semibold text-lg mb-4">
              Social
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Mirror
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  Telegram
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
        <div className="absolute left-[50%] translate-x-[-50%] bottom-[12%]">
          <div className="relative">
            {/* Text */}
            <div className="text-6xl sm:text-7xl lg:text-9xl font-bold text-gray-800 select-none tracking-wider">
              DESIGNER
            </div>

            {/* Foreground gradient overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="border-t border-gray-800 pt-8 relative z-50 bg-black">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">© 2024 - Socket Protocol</div>

          {/* Legal Links */}
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Privacy Notice
            </Link>
            <Link
              href="/admin-login"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
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
