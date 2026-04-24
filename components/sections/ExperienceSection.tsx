"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { experiences } from "@/lib/constants"

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="experience" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Professional Journey
        </motion.h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 }}
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

              <Card className="bg-white dark:bg-[#1e293b] backdrop-blur-lg ml-12 border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-slate-800 dark:text-white mb-2">{exp.position}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-primary font-semibold">{exp.company}</p>
                        <Badge variant="outline" className="text-xs border-orange-500/40 text-orange-400 hover:bg-orange-500/20">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-left lg:text-right">
                      <div className="flex items-center text-slate-600 dark:text-gray-300 text-sm mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center text-slate-600 dark:text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-slate-600 dark:text-gray-300 flex items-start gap-3 text-sm leading-relaxed">
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
