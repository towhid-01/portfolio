"use client"

import { motion } from "framer-motion"
import { forwardRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Math Escape",
    description: "Escape the Dungeon challenges you to solve math puzzles, overcome obstacles, and collect coins to unlock new paths.",
    image: "/image.png?height=150&width=400",
    technologies: ["Unity", "C#"],
    demoLink: "https://towhid-01.itch.io/math-escape",
    codeLink: "https://github.com/towhid-01/Math-Escape",
  },
  {
    title: "Atomic Architect",
    description: "Atomic Architect is a physics-based puzzle game where players construct molecular structures by strategically placing atoms.",
    image: "/AtomicArchitect.PNG?height=150&width=400",
    technologies: ["Unity", "C#"],
    demoLink: "https://towhid-01.itch.io/atomic-architect",
    codeLink: "https://github.com/towhid-01/Atomic-Architect",
  },
  {
    title: "Sudoku",
    description: "This Sudoku game, developed using Unity, is currently under development.",
    image: "/sudoku.png?height=150&width=400",
    technologies: ["Unity", "C#"],
    demoLink: "https://github.com/towhid-01/sudoku-game",
    codeLink: "https://github.com/towhid-01/sudoku-game",
  },
  {
    title: "StrawHats",
    description: "This single-page website was created to showcase my skills in HTML, CSS, JavaScript, and CSS animations.",
    image: "/strawHats.png?height=150&width=400",
    technologies: ["HTML", "CSS","CSS Animation", "JavaScript"],
    demoLink: "https://towhid-01.github.io/StrawHat-Pirates/",
    codeLink: "https://github.com/towhid-01/StrawHat-Pirates",
  },
]

const Projects = forwardRef<HTMLElement>((props, ref) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-20 game-bg">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-primary glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Quests
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Card className="overflow-hidden h-full flex flex-col bg-card text-card-foreground pixel-corners game-border">
                <div className="relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={150}
                    className="w-full"
                  />
                  <motion.div
                    className="absolute inset-0 bg-primary/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button asChild variant="secondary" className="mr-2 pixel-corners">
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        Play Demo
                      </a>
                    </Button>
                    <Button asChild className="pixel-corners">
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        View Code
                      </a>
                    </Button>
                  </motion.div>
                </div>
                <CardHeader>
                  <CardTitle className="text-primary">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="bg-primary/20 text-primary px-2 py-1 rounded text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                      >
                        {tech}
                      </motion.span>
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
})

Projects.displayName = "Projects"

export default Projects

