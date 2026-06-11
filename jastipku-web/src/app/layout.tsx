import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "Jastipku",
  description: "Travel-based purchase assistance for customers and travelers.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-light`}>
        {children}
      </body>
    </html>
  );
}
