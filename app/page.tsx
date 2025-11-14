"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Gamepad2,
  Trophy,
  Calendar,
  MapPin,
  Star,
  Zap,
  Target,
  Award,
  Briefcase,
  Sparkles,
  Play,
  Puzzle,
  Palette,
  ArrowRight,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  MessageCircle,
  Database,
  Settings,
  Layers,
} from "lucide-react"
import { FaClipboardCheck } from "react-icons/fa"
import { GoogleAnalytics } from "@/components/analytics"
import { VisitorTracker } from "@/components/visitor-tracker"
import { Toaster } from "@/components/ui/sonner"
import React from "react"
import { LoadingScreen } from "@/components/loading-screen" // Import the new component
import { CustomCursor } from "@/components/custom-cursor" // Import the new CustomCursor component
import { ParticleBackground } from "@/components/ParticleBackground" // Import the enhanced ParticleBackground component
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext" // Import theme context

// Animated Background is now replaced by ParticleBackground component

// Navigation Component
const Navigation = () => {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "achievements", label: "Achievements" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
    { id: "resume", label: "Resume", isExternal: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "resume") {
      window.open("/Towhid Sarker_Resume.pdf", "_blank")
      setIsOpen(false)
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/20 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold text-primary cursor-pointer"
          >
            <Gamepad2 className="w-6 h-6 inline mr-2" />
            Towhid
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id && !item.isExternal
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                toggleTheme()
              }}
              className="relative p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: theme === "light" ? 0 : 180,
                  scale: theme === "light" ? 1 : 1.1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-primary" />
                ) : (
                  <Sun className="w-4 h-4 text-primary" />
                )}
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full"
                animate={{
                  opacity: theme === "light" ? 0 : 1,
                  scale: theme === "light" ? 0.8 : 1.2,
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsOpen(!isOpen)
              }}
              className="md:hidden p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            paddingTop: isOpen ? 16 : 0,
            paddingBottom: isOpen ? 16 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  x: isOpen ? 0 : -20,
                }}
                transition={{
                  duration: 0.3,
                  delay: isOpen ? index * 0.05 : 0,
                }}
                whileHover={{ x: 10 }}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id && !item.isExternal
                    ? "bg-primary/20 text-primary"
                    : "text-foreground/70 hover:bg-primary/10"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

// Hero Section with Enhanced Animations
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
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
          >
            Towhid Sarker
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-8">
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
              transition={{ delay: 1.2 }}
            >
              Crafting engaging gameplay experiences with smooth animations, polished UI, and creative problem-solving
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="bg-primary hover:bg-primary/90 text-background px-8 py-3 rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">View Projects</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-background px-8 py-3 rounded-full group bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-primary"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Get In Touch</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
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

// About Section
const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { label: "Problems Solved", value: "1200+", icon: <Code className="w-6 h-6" /> },
    { label: "Games Developed", value: "6+", icon: <Gamepad2 className="w-6 h-6" /> },
  ]

  return (
    <section id="about" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                I'm a passionate Unity Game Developer specializing in puzzle games, educational experiences, 
                and smooth UI animations. Currently working remotely at Visiontillion, a Saudi Arabia based gaming company, 
                where I focus on creating engaging game UI/UX designs and developing detailed game documentation to 
                support production and design workflows.
              </p>

              <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                My expertise spans Unity 2D/3D development, DOTween animations, and creating polished
                gameplay mechanics. I've contributed to multiple games and educational projects, always focusing on user
                experience and engaging interactions.
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                  <Gamepad2 className="w-3 h-3 mr-1" />
                  Unity Developer
                </Badge>
                <Badge className="bg-secondary/20 text-secondary border-secondary/30 px-3 py-1">
                  <Puzzle className="w-3 h-3 mr-1" />
                  Puzzle Games
                </Badge>
                <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                  <FaClipboardCheck className="w-3 h-3 mr-1" />
                  Task Management
                </Badge>
                <Badge className="bg-secondary/20 text-secondary border-secondary/30 px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  UI Animation
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="grid grid-cols-1 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card border border-primary/20 p-8 rounded-2xl text-center hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="text-primary mb-4">{stat.icon}</div>
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                    <div className="text-foreground/60">{stat.label}</div>
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

// Projects Section with Enhanced Card Animations
const ProjectsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: "Math Escape",
      description: "Dungeon escape game where players solve math problems to progress through levels",
      tech: ["Unity 3D", "C#", "Level Design", "3D Movement"],
      features: ["3D dungeon environments", "Educational math integration", "Progressive difficulty"],
      status: "Completed",
      type: "Professional",
      icon: <Target className="w-5 h-5" />,
      gradient: "from-primary to-secondary",
    },
    {
      title: "Jingle Word",
      description: "Word-making game with leaderboard system and monetization features",
      tech: ["Unity", "C#", "AdMob", "UI Design"],
      features: ["Leaderboard system", "User authentication", "AdMob integration"],
      status: "Completed",
      type: "Professional",
      icon: <Sparkles className="w-5 h-5" />,
      gradient: "from-secondary to-primary",
    },
    {
      title: "Sudoku Game",
      description: "Multiplayer 2D Sudoku game with dynamic UI and real-time gameplay",
      tech: ["Unity", "C#", "Multiplayer", "UI"],
      features: ["9x9 grid layout", "Real-time multiplayer", "Dynamic difficulty"],
      status: "In Development",
      type: "Personal",
      icon: <Puzzle className="w-5 h-5" />,
      gradient: "from-primary/80 to-secondary/80",
    },
    {
      title: "Atomic Architect",
      description: "Educational game focused on atomic structure assembly and chemistry learning",
      tech: ["Unity", "C#", "Scriptable Objects", "Touch Controls"],
      features: ["Interactive particles", "Scalable data management", "Progressive learning"],
      status: "Completed",
      type: "Educational",
      icon: <Zap className="w-5 h-5" />,
      gradient: "from-secondary to-primary",
      link: "https://towhid-01.itch.io/atomic-architect", // <-- added link
    },
    {
      title: "Order Up",
      description: "Educational alphabet sorting game designed for children",
      tech: ["Unity", "C#", "DOTween", "Children's UI"],
      features: ["Alphabet sorting gameplay", "Smooth animations", "Child-friendly design"],
      status: "Completed",
      type: "Educational",
      icon: <Palette className="w-5 h-5" />,
      gradient: "from-primary to-secondary",
    },
    {
      title: "File Manager",
      description: "Console-based file management system with robust error handling",
      tech: ["C#", "OOP", "Console App", "Error Handling"],
      features: ["Core file operations", "Modular design", "Scalable architecture"],
      status: "Completed",
      type: "Utility",
      icon: <Database className="w-5 h-5" />,
      gradient: "from-secondary/80 to-primary/80",
    },
  ]

  return (
    <section id="projects" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group perspective-1000"
            >
              <Card className="bg-card border-primary/20 backdrop-blur-sm h-full hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl relative">
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={false}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                <CardHeader className="relative pb-4 z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`p-2 bg-gradient-to-br ${project.gradient} bg-opacity-20 rounded-lg text-primary`}
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                          transition: { duration: 0.6 },
                        }}
                      >
                        {project.icon}
                      </motion.div>
                      <div>
                        <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <Badge
                              variant="outline"
                              className={`text-xs transition-all duration-300 ${
                                project.status === "Completed"
                                  ? "border-success/30 text-success-foreground hover:bg-success/10"
                                  : project.status === "In Development"
                                    ? "border-warning/30 text-warning-foreground hover:bg-warning/10"
                                    : "border-info/30 text-info-foreground hover:bg-info/10"
                              }`}
                            >
                              {project.status}
                            </Badge>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <Badge
                              variant="outline"
                              className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                            >
                              {project.type}
                            </Badge>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-foreground/70 text-sm leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10 pt-0">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="text-xs text-foreground/60 flex items-start gap-2 group-hover:text-foreground/80 transition-colors duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <motion.div whileHover={{ scale: 1.3, rotate: 180 }} transition={{ duration: 0.3 }}>
                            <Star className="w-2.5 h-2.5 text-primary mt-0.5 flex-shrink-0" />
                          </motion.div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + i * 0.03 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <Badge
                          variant="outline"
                          className="text-xs border-secondary/30 text-secondary hover:bg-secondary/10 transition-all duration-300 cursor-pointer"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => {
                        if (project.link) {
                          window.open(project.link, "_blank")
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/30 text-primary hover:bg-primary hover:text-background group bg-transparent mt-4 relative overflow-hidden transition-all duration-300"
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <ExternalLink className="w-3 h-3 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                      <span className="relative z-10">View Details</span>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Section
const ExperienceSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const experiences = [
    {
      company: "Qiulin Technologies",
      position: "Executive – Project & Task Coordination",
      duration: "March 2025 – Present",
      location: "Uttara, Dhaka",
      type: "Full-time",
      responsibilities: [
        "Assigned and monitored tasks for a 25–30 member team to ensure smooth daily operations",
        "Managed onboarding, organized training sessions, and evaluated employee performance",
        "Created performance reports and salary sheets in Excel based on task completion data",
        "Improved team productivity through strategic task coordination and evaluation metrics",
      ],
      icon: <Briefcase className="w-5 h-5" />,
      gradient: "from-primary to-secondary",
    },
    {
      company: "Riseup Labs",
      position: "Game Developer – Intern",
      duration: "Aug 2024 – Dec 2024",
      location: "Uttara, Dhaka",
      type: "Internship",
      responsibilities: [
        "Built UI screens, login system, and leaderboard features in Unity using C#",
        "Designed levels and implemented smooth character movement, button interactions",
        "Integrated AdMob for monetization and participated in gameplay testing",
        "Contributed to debugging and iteration based on user feedback",
      ],
      icon: <Gamepad2 className="w-5 h-5" />,
      gradient: "from-secondary to-primary",
    },
  ]

  return (
    <section id="experience" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Professional Journey
        </motion.h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="relative mb-12 last:mb-0"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${exp.gradient} rounded-full mr-4 z-10 flex items-center justify-center text-background shadow-lg`}
                >
                  {exp.icon}
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent"></div>
              </div>

              <Card className="bg-card border-primary/20 backdrop-blur-sm ml-12 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">{exp.position}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-primary font-semibold">{exp.company}</p>
                        <Badge variant="outline" className="text-xs border-secondary/30 text-secondary">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left lg:text-right">
                      <div className="flex items-center text-foreground/60 text-sm mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center text-foreground/60 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-foreground/70 flex items-start gap-3 text-sm leading-relaxed">
                        <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Achievements Section
const AchievementsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const achievements = [
    {
      title: "Programming Contests",
      items: [
        { name: "Sec Inter University Junior Programming Contest 2022", rank: "Rank 43", team: "UITS_Wreckers_Exist" },
        {
          name: "6th DRMC Int’l Tech Carnival 2023 – Programming Contest [Preliminary Round]",
          rank: "Rank 13",
          team: "CircleCycle",
        },
        { name: "UITS Intra University Programming Contest 2022", rank: "Rank 10", team: "UITS_CircleCycle" },
      ],
      icon: <Trophy className="w-6 h-6" />,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Competitive Programming",
      items: [
        { name: "Total Problems Solved", rank: "1200+", team: "Multiple Online Judges" },
        { name: "Codeforces: __PrEdAToR__", rank: "Max: 1110", team: "750+ Solved" },
        { name: "LeetCode: _PrEdAToR_", rank: "Max: 1511", team: "150+ Solved" },
      ],
      icon: <Code className="w-6 h-6" />,
      gradient: "from-primary to-secondary",
    },
    {
      title: "Academic Recognition",
      items: [
        { name: "Poster Presentation Competition", rank: "3rd Place", team: "Team Leader" },
        { name: "University CGPA", rank: "3.09/4.00", team: "BSc CSE" },
        { name: "Leadership Excellence", rank: "Proven", team: "Multiple Projects" },
      ],
      icon: <Award className="w-6 h-6" />,
      gradient: "from-secondary to-primary",
    },
  ]

  return (
    <section id="achievements" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Achievements & Recognition
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="bg-card border-primary/20 backdrop-blur-sm h-full hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-gradient-to-br ${category.gradient} bg-opacity-20 rounded-lg text-primary`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg text-foreground">{category.title}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
                        className="bg-background/50 p-3 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-foreground leading-tight">{item.name}</h4>
                          <Badge
                            className={`bg-gradient-to-r ${category.gradient} text-white text-xs flex-shrink-0 ml-2`}
                          >
                            {item.rank}
                          </Badge>
                        </div>
                        <p className="text-xs text-foreground/60">{item.team}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skills Section with Enhanced Interactive Elements
const SkillsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skillCategories = [
    {
      title: "Game Dev Tools",
      icon: <Gamepad2 className="w-5 h-5" />,
      skills: ["Unity 2D/3D", "DOTween", "Particle System", "Unity UI"],
      gradient: "from-primary to-secondary",
    },
    {
      title: "Programming",
      icon: <Code className="w-5 h-5" />,
      skills: ["C++", "C#", "JavaScript", "MySQL"],
      gradient: "from-secondary to-primary",
    },
    {
      title: "Dev Tools",
      icon: <Settings className="w-5 h-5" />,
      skills: ["Git", "GitHub", "Visual Studio", "Rider", "Linux"],
      gradient: "from-primary/80 to-secondary/80",
    },
    {
      title: "Other Skills",
      icon: <Layers className="w-5 h-5" />,
      skills: ["AR Foundation (basic)", "Level Design", "OOP", "Version Control"],
      gradient: "from-secondary/80 to-primary/80",
    },
  ]

  return (
    <section id="skills" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: 1,
                transition: { duration: 0.3, type: "spring", stiffness: 300 },
              }}
              className="group/card"
            >
              <Card className="bg-card border-primary/20 backdrop-blur-sm h-full hover:border-primary/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-500 shadow-lg relative overflow-hidden group">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Floating particles effect */}
                <motion.div className="absolute inset-0 pointer-events-none" initial={false}>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/30 rounded-full"
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${50 + i * 10}%`,
                      }}
                    />
                  ))}
                </motion.div>

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className={`p-3 bg-gradient-to-br ${category.gradient} bg-opacity-20 rounded-lg text-primary`}
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1 + i * 0.05,
                          type: "spring",
                          stiffness: 200,
                        }}
                        whileHover={{
                          scale: 1.15,
                          y: -5,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 cursor-pointer transition-all duration-300 text-xs px-2 py-1 relative overflow-hidden group/badge"
                        >
                          <motion.div
                            className="absolute inset-0 bg-primary/10"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10">{skill}</span>
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Form Schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(3, "Please specify the project type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Contact Section
const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      // Using Formspree - replace YOUR_FORM_ID with actual Formspree form ID
      // Get free form ID from https://formspree.io/
      const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID"

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          message: data.message,
          _subject: `New Portfolio Contact: ${data.projectType}`,
        }),
      })

      // Log response for debugging
      console.log("Response status:", response.status)
      const result = await response.json()
      console.log("Response data:", result)

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon!",
        })
        reset()
      } else {
        // Show specific error message
        const errorMsg = result.error || result.errors?.map((e: any) => e.message).join(", ") || "Unknown error"
        console.error("API Error:", errorMsg)
        throw new Error(errorMsg)
      }
    } catch (error) {
      // Enhanced error logging
      console.error("Form submission error details:", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        type: typeof error,
      })

      toast.error("Failed to send message", {
        description: `Error: ${error instanceof Error ? error.message : "Please try again or contact me directly via email."}`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactLinks = [
    {
      name: "Email",
      value: "towhid.sarker3@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:towhid.sarker3@gmail.com",
      gradient: "from-primary to-secondary",
    },
    {
      name: "Discord",
      value: "towhid", // Replace with your Discord username
      icon: <MessageCircle className="w-5 h-5" />,
      href: "#", // Discord doesn't have direct links, or use discord.com/users/YOUR_USER_ID
      gradient: "from-secondary to-primary",
    },
    {
      name: "LinkedIn",
      value: "Professional Network",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/towhid-sarker/",
      target: "_blank",
      rel: "noopener noreferrer",
      gradient: "from-primary/80 to-secondary/80",
    },
    {
      name: "GitHub",
      value: "Code Repository",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/towhid-01",
      target: "_blank",
      rel: "noopener noreferrer",
      gradient: "from-secondary/80 to-primary/80",
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Let's Create Together
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Ready to Build Something Amazing?</h3>
              <p className="text-foreground/70 text-lg leading-relaxed">
                I'm always excited to collaborate on innovative game projects, discuss Unity development opportunities,
                or explore creative solutions for interactive experiences. Let's turn your ideas into engaging gameplay!
              </p>
            </div>

            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.target || undefined}
                  rel={link.rel || undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-card border border-primary/20 rounded-lg hover:border-primary/40 transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <div className={`p-3 bg-gradient-to-br ${link.gradient} bg-opacity-20 rounded-lg`}>
                    <div className="text-primary group-hover:scale-110 transition-transform">{link.icon}</div>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{link.name}</p>
                    <p className="text-foreground/60 text-sm">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-card border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Start a Conversation
                </CardTitle>
                <CardDescription className="text-foreground/60">
                  Let's discuss your next game project or collaboration opportunity!
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        {...register("name")}
                        placeholder="Your Name"
                        className="bg-background/50 border-primary/20 text-foreground placeholder:text-foreground/40 focus:border-primary transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input
                        {...register("email")}
                        placeholder="Your Email"
                        type="email"
                        className="bg-background/50 border-primary/20 text-foreground placeholder:text-foreground/40 focus:border-primary transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Input
                      {...register("projectType")}
                      placeholder="Project Type (Game Dev, Collaboration, etc.)"
                      className="bg-background/50 border-primary/20 text-foreground placeholder:text-foreground/40 focus:border-primary transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
                  </div>

                  <div>
                    <Textarea
                      {...register("message")}
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      className="bg-background/50 border-primary/20 text-foreground placeholder:text-foreground/40 focus:border-primary resize-none transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-background group shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 mr-2 border-2 border-background border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Main Component
const MainContent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    // Simulate loading time or wait for actual content to render
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading screen for 2 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-500">
      <GoogleAnalytics />
      <Toaster />
      <LoadingScreen isLoading={isLoading} /> {/* Render loading screen */}
      <CustomCursor /> {/* Add the custom cursor here */}
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <SkillsSection />
      <ContactSection />
      {/* Footer */}
      <footer className="py-8 border-t border-primary/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-foreground/60 text-center md:text-left"
            >
              © 2025 Towhid Sarker. Designed with intention combining creativity, code, and clarity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <VisitorTracker />
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Component() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  )
}
