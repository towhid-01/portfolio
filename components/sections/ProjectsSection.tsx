"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink } from "lucide-react"
import { projects } from "@/lib/constants"

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="projects" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.2 } }}
              className="group"
            >
              <Card className="bg-white dark:bg-[#1e293b] backdrop-blur-lg border-purple-500/30 h-full hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-500 overflow-hidden shadow-xl relative">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={false}
                />

                <CardHeader className="relative pb-4 z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 bg-gradient-to-br ${project.gradient} bg-opacity-20 rounded-lg text-primary`}
                      >
                        <project.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-800 dark:text-white group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
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
                          <Badge
                            variant="outline"
                            className="text-xs border-orange-500/40 text-orange-400 hover:bg-orange-500/20 transition-all duration-300"
                          >
                            {project.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10 pt-0">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-primary">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-600 dark:text-gray-300 flex items-start gap-2 group-hover:text-gray-100 transition-colors duration-300"
                        >
                          <Star className="w-2.5 h-2.5 text-primary mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-purple-400/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/60 cursor-pointer transition-all duration-300"
                      >
                        {tech}
                      </Badge>
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
