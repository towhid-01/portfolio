"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>&copy; {new Date().getFullYear()} Towhid Sarker. All rights reserved.</p>
          </motion.div>

          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="https://github.com/towhid-01" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://linkedin.com/in/towhid-sarker" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
            </Link>
            <button
              onClick={() => {
                navigator.clipboard.writeText("towhid");
                alert("Discord username copied: towhid");
              }}
              className="focus:outline-none"
              title="Copy Discord Username"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.369a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.447.864-.614 1.249-1.837-.278-3.674-.278-5.485 0-.167-.395-.403-.874-.614-1.249a.076.076 0 00-.079-.037c-1.67.372-3.323.93-4.885 1.515a.07.07 0 00-.032.027C.533 9.177-.319 13.854.099 18.451a.082.082 0 00.031.054c2.052 1.514 4.041 2.438 5.999 3.033a.077.077 0 00.084-.027c.465-.633.873-1.302 1.226-2.003a.078.078 0 00-.041-.105c-.652-.247-1.274-.545-1.872-.892a.077.077 0 01-.008-.129c.125-.094.25-.193.371-.295a.075.075 0 01.077-.01c3.925 1.793 8.18 1.793 12.058 0a.075.075 0 01.078.009c.12.102.245.201.371.295a.077.077 0 01-.008.13c-.598.346-1.22.645-1.873.891a.078.078 0 00-.04.106c.354.701.761 1.37 1.225 2.003a.077.077 0 00.084.027c1.961-.595 3.95-1.52 5.999-3.033a.077.077 0 00.031-.054c.444-4.6-.527-9.274-3.612-13.983a.071.071 0 00-.031-.028zM8.08 15.672c-1.202 0-2.191-1.11-2.191-2.48 0-1.37.962-2.481 2.191-2.481 1.208 0 2.191 1.1 2.191 2.48 0 1.37-.962 2.481-2.191 2.481zm7.867 0c-1.202 0-2.191-1.11-2.191-2.48 0-1.37.963-2.481 2.191-2.481 1.208 0 2.191 1.1 2.191 2.48 0 1.37-.962 2.481-2.191 2.481z" />
              </svg>
            </button>
            <Link href="mailto:towhid@example.com">
              <Mail className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
