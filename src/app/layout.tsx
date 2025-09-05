// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

// Load the font with the `variable` option
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // This creates a CSS variable for font-family
});

export const metadata: Metadata = {
  title: "Sochlabs.in",
  description: "Admin + User App",
  icons: {
    icon: "/vercel.svg", // relative to the public/ folder
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-mono">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
