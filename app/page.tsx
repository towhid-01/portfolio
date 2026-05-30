"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Gamepad2,
  Mail,
  Play,
  Puzzle,
  Sparkles,
  ChevronDown,
} from "lucide-react"
import { FaClipboardCheck } from "react-icons/fa"
import { GoogleAnalytics } from "@/components/analytics"
import { VisitorTracker } from "@/components/visitor-tracker"
import { Toaster } from "@/components/ui/sonner"
import React from "react"
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext"
import { GameProvider } from "@/contexts/GameContext"
import { stats } from "@/lib/constants"
import { Navbar } from "@/components/layout"
import { KonamiCode } from "@/components/konami-code"

// Dynamic imports for performance - code split all heavy sections
const LoadingScreen = dynamic(() => import("@/components/loading-screen").then(m => ({ default: m.LoadingScreen })), { ssr: false })
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground").then(m => ({ default: m.ParticleBackground })), { ssr: false })
const GameUI = dynamic(() => import("@/components/game-ui").then(m => ({ default: m.GameUI })), { ssr: false })

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { ssr: false })
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"), { ssr: false })
const AchievementsSection = dynamic(() => import("@/components/sections/AchievementsSection"), { ssr: false })
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), { ssr: false })
const StreakZone = dynamic(() => import("@/components/sections/StreakZone"), { ssr: false })
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false })

// Hero Section
const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <motion.div style={{ y, opacity, scale }} className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
            whileHover={{ scale: 1.1 }}
          >
            <div className="relative inline-block group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"
              />
              <motion.div whileHover={{ rotate: 180, scale: 1.2 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                <Gamepad2 className="w-20 h-20 mx-auto mb-4 text-primary relative z-10" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 pb-2"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Towhid Sarker
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-8">
            <motion.h2
              className="text-2xl md:text-4xl text-foreground/80 mb-4 font-medium"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Unity Game Developer | Puzzle Mechanics & UI Animation
            </motion.h2>
            <motion.p
              className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Crafting engaging gameplay experiences with smooth animations, polished UI, and creative problem-solving
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View Projects
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full group bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="animate-bounce"
            whileHover={{ scale: 1.2, y: -10 }}
          >
            <ChevronDown className="w-6 h-6 mx-auto text-primary cursor-pointer" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Duolingo streak badge – updates daily from May 30 2026 base
const DuolingoBadge = () => {
  const base = 1227
  const baseDate = new Date('2026-05-30T00:00:00Z').getTime()
  const daysSince = Math.floor((Date.now() - baseDate) / 86400000)
  const streak = base + Math.max(0, daysSince)
  return (
    <a
      href="https://www.duolingo.com/profile/Towhid_0"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <Badge className="bg-green-500/20 text-green-400 border-green-500/40 px-3 py-1 hover:bg-green-500/40 hover:border-green-400/60 hover:shadow-[0_0_12px_rgba(34,197,94,0.4)] transition-all duration-200 cursor-pointer">
        🦉 {streak}+ day Duolingo streak
      </Badge>
    </a>
  )
}

// About Section
const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-6"
            >
              <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                I'm a passionate Unity Game Developer specializing in puzzle games, educational experiences,
                and smooth UI animations. Currently working remotely at SM Technology as a Game Developer,
                where I focus on building complete mobile games from scratch, developing game mechanics, UI systems,
                and collaborating with designers to deliver production-ready games.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                My expertise spans Unity 2D/3D development, DOTween animations, and creating polished
                gameplay mechanics. I've contributed to multiple games and educational projects, always focusing on user
                experience and engaging interactions.
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/40 px-3 py-1 hover:bg-purple-500/30 transition-colors">
                  <Gamepad2 className="w-3 h-3 mr-1" />
                  Unity Developer
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40 px-3 py-1 hover:bg-orange-500/30 transition-colors">
                  <Puzzle className="w-3 h-3 mr-1" />
                  Puzzle Games
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/40 px-3 py-1 hover:bg-purple-500/30 transition-colors">
                  <FaClipboardCheck className="w-3 h-3 mr-1" />
                  Task Management
                </Badge>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40 px-3 py-1 hover:bg-orange-500/30 transition-colors">
                  <Sparkles className="w-3 h-3 mr-1" />
                  UI Animation
                </Badge>
                <DuolingoBadge />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="grid grid-cols-1 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-[#1e293b] backdrop-blur-lg border border-purple-500/30 p-8 rounded-2xl text-center hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl"
                  >
                    <div className="text-primary mb-4">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-slate-600 dark:text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Component
const MainContent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <GameProvider>
      <div className="min-h-screen bg-background text-foreground transition-all duration-500">
        <GoogleAnalytics />
        <Toaster />
        <LoadingScreen isLoading={isLoading} />
        <ParticleBackground />
        <GameUI />
        <KonamiCode />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <Suspense fallback={null}>
          <ProjectsSection />
          <ExperienceSection />
          <AchievementsSection />
          <SkillsSection />
          <StreakZone />
          <ContactSection />
        </Suspense>
        {/* Footer */}
        <footer className="py-8 border-t border-primary/20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-foreground/60 text-center md:text-left"
              >
                © 2025 Towhid Sarker. Designed with intention combining creativity, code, and clarity.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <VisitorTracker />
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </GameProvider>
  )
}

export default function Component() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  )
}
