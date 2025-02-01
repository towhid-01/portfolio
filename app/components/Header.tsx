"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface HeaderProps {
  onAboutClick: () => void
  onProjectsClick: () => void
  onSkillsClick: () => void
  onProblemSolvingClick: () => void
  onContactClick: () => void
}

export default function Header({
  onAboutClick,
  onProjectsClick,
  onSkillsClick,
  onProblemSolvingClick,
  onContactClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/Towhid_Sarker.pdf" 
          target="_blank"
          className="text-2xl font-bold text-primary glow pixel-corners bg-secondary px-4 py-2 hover:bg-secondary/80 transition-colors"
        >
          Resume
        </Link>
        {/* Navigation bar */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {["About", "Projects", "Skills", "Problem Solving", "Contact"].map((item, index) => (
            <motion.button
              key={item}
              onClick={[onAboutClick, onProjectsClick, onSkillsClick, onProblemSolvingClick, onContactClick][index]}
              className="text-foreground hover:text-primary transition-colors pixel-corners bg-secondary px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
