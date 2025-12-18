"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
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
import { LoadingScreen } from "@/components/loading-screen"
import { ParticleBackground } from "@/components/ParticleBackground"
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext"
import { GameProvider, useGame } from "@/contexts/GameContext"
import { GameUI } from "@/components/game-ui"
import { TiltableElement } from "@/components/tiltable-element"
import { CardWarningIcon } from "@/components/card-warning-icon"
import StreakZone from "@/components/sections/StreakZone"
import {
  projects,
  experiences,
  achievements,
  skillCategories,
  contactLinks,
  navItems,
  stats,
} from "@/lib/constants"
import { Navbar } from "@/components/layout"

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
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
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
                className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full group bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-purple-500"
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
                    className="bg-slate-900/80 backdrop-blur-lg border border-purple-500/30 p-8 rounded-2xl text-center hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl"
                  >
                    <div className="text-primary mb-4">
                      <stat.icon className="w-6 h-6" />
                    </div>
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
              <Card className="bg-slate-900/80 backdrop-blur-lg border-purple-500/30 h-full hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-500 overflow-hidden shadow-xl relative">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={false}
                />

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
                        <project.icon className="w-5 h-5" />
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
                              className="text-xs border-orange-500/40 text-orange-400 hover:bg-orange-500/20 transition-all duration-300"
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
                          className="text-xs border-purple-400/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60 cursor-pointer transition-all duration-300"
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
                      className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-500 hover:text-white group bg-transparent mt-4 relative overflow-hidden transition-all duration-300"
                    >
                      <motion.div
                        className="absolute inset-0 bg-purple-500"
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
                  <exp.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent"></div>
              </div>

              <Card className="bg-slate-900/80 backdrop-blur-lg ml-12 border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">{exp.position}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-primary font-semibold">{exp.company}</p>
                        <Badge variant="outline" className="text-xs border-orange-500/40 text-orange-400 hover:bg-orange-500/20">
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
              <Card className="bg-slate-900/80 backdrop-blur-lg h-full border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-gradient-to-br ${category.gradient} bg-opacity-20 rounded-lg text-primary`}>
                      <category.icon className="w-5 h-5" />
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
                        className="bg-background/50 p-3 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
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

// Skills Section with Alignment Game
const SkillsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { fixElement, isElementFixed, isGroupCompleted, registerElement } = useGame()

  const [badgeRotations] = useState(() => {
    return skillCategories.map(category =>
      category.skills.map(() => Math.random() * 60 - 30)
    )
  })

  useEffect(() => {
    skillCategories.forEach((category, categoryIndex) => {
      category.skills.forEach((skill, badgeIndex) => {
        const badgeId = `badge-${categoryIndex}-${badgeIndex}`
        registerElement(badgeId, `card-${categoryIndex}`)
      })
    })
  }, [registerElement])

  const handleBadgeFix = (categoryIndex: number, badgeIndex: number) => {
    const badgeId = `badge-${categoryIndex}-${badgeIndex}`
    if (!isElementFixed(badgeId)) {
      fixElement(badgeId)
    }
  }

  const isCardComplete = (categoryIndex: number) => {
    return isGroupCompleted(`card-${categoryIndex}`)
  }

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
          {skillCategories.map((category, categoryIndex) => (
            <TiltableElement key={category.title} id={`skill-card-${categoryIndex}`} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: categoryIndex * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 },
                }}
                className="h-full"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <Card className="bg-slate-900/80 backdrop-blur-lg border-purple-500/30 h-full hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl relative overflow-hidden">
                  <AnimatePresence>
                    {!isCardComplete(categoryIndex) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-3 right-3 z-20 text-2xl"
                        title="Fix all misaligned badges!"
                      >
                        ⚠️
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 hover:opacity-10 transition-opacity duration-500`}
                  />

                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className={`p-3 bg-gradient-to-br ${category.gradient} bg-opacity-20 rounded-lg text-primary`}
                        whileHover={{
                          scale: 1.15,
                          boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)",
                          transition: { duration: 0.3 },
                        }}
                      >
                        <category.icon className="w-6 h-6" />
                      </motion.div>
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, badgeIndex) => {
                        const badgeId = `badge-${categoryIndex}-${badgeIndex}`
                        const rotation = badgeRotations[categoryIndex][badgeIndex]
                        const isFixed = isElementFixed(badgeId)

                        return (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={isInView ? {
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              rotate: isFixed ? 0 : rotation
                            } : {}}
                            transition={{
                              duration: 0.4,
                              delay: categoryIndex * 0.1 + badgeIndex * 0.05,
                              type: "spring",
                              stiffness: 200,
                            }}
                            whileHover={!isFixed ? {
                              scale: 1.08,
                              y: -2,
                              transition: { duration: 0.2 },
                            } : {}}
                            onHoverStart={() => {
                              if (!isFixed) {
                                handleBadgeFix(categoryIndex, badgeIndex)
                              }
                            }}
                            style={{
                              transformOrigin: "center center",
                            }}
                          >
                            <Badge
                              variant="outline"
                              className={`border-purple-400/40 text-purple-300 ${
                                !isFixed ? 'hover:bg-purple-500/20 hover:border-purple-400/60' : 'bg-green-500/10 border-green-400/40'
                              } cursor-pointer transition-all duration-300 text-xs px-3 py-1 relative overflow-hidden`}
                            >
                              {isFixed && (
                                <motion.div
                                  initial={{ x: '-100%' }}
                                  animate={{ x: '100%' }}
                                  transition={{ duration: 0.5, ease: "easeInOut" }}
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
                                />
                              )}
                              <span className="relative z-10">{skill}</span>
                            </Badge>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TiltableElement>
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

    /*
     * EMAIL SETUP INSTRUCTIONS:
     * 1. Go to https://web3forms.com/ and get a free API key
     * 2. Replace "YOUR_WEB3FORMS_KEY" below with your actual key
     * 3. Uncomment the try-catch block below
     * 4. Remove/comment the toast.info block
     */

    // TEMPORARY: Show coming soon message
    toast.info("Email integration coming soon!", {
      description: "Please contact me directly at towhid.sarker3@gmail.com for now.",
    })
    setIsSubmitting(false)
    reset()
    return

    /* UNCOMMENT THIS BLOCK TO ENABLE EMAIL SENDING:
    try {
      const WEB3FORMS_KEY = "YOUR_WEB3FORMS_KEY" // Replace with your key from web3forms.com

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: data.name,
          email: data.email,
          subject: `Portfolio Contact: ${data.projectType}`,
          message: `Project Type: ${data.projectType}\n\nFrom: ${data.name} (${data.email})\n\nMessage:\n${data.message}`,
          from_name: data.name,
          replyto: data.email,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon!",
        })
        reset()
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to send message", {
        description: "Please contact me directly at towhid.sarker3@gmail.com",
      })
    } finally {
      setIsSubmitting(false)
    }
    */
  }

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
                  className="flex items-center gap-4 p-4 bg-slate-900/80 backdrop-blur-lg border border-purple-500/30 rounded-lg hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 group shadow-lg"
                >
                  <div className={`p-3 bg-gradient-to-br ${link.gradient} bg-opacity-20 rounded-lg`}>
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      <link.icon className="w-5 h-5" />
                    </div>
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
            <Card className="bg-slate-900/80 backdrop-blur-lg border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl">
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
                        className="bg-background/50 border-purple-500/30 text-foreground placeholder:text-foreground/40 focus:border-purple-500 transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input
                        {...register("email")}
                        placeholder="Your Email"
                        type="email"
                        className="bg-background/50 border-purple-500/30 text-foreground placeholder:text-foreground/40 focus:border-purple-500 transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Input
                      {...register("projectType")}
                      placeholder="Project Type (Game Dev, Collaboration, etc.)"
                      className="bg-background/50 border-purple-500/30 text-foreground placeholder:text-foreground/40 focus:border-purple-500 transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
                  </div>

                  <div>
                    <Textarea
                      {...register("message")}
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      className="bg-background/50 border-purple-500/30 text-foreground placeholder:text-foreground/40 focus:border-purple-500 resize-none transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white group shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <SkillsSection />
        <StreakZone />
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