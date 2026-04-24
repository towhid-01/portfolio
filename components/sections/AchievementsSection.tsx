"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { achievements } from "@/lib/constants"

export default function AchievementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="achievements" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2"
        >
          Achievements & Recognition
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="bg-white dark:bg-[#1e293b] backdrop-blur-lg h-full border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-gradient-to-br ${category.gradient} bg-opacity-20 rounded-lg text-primary`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg text-slate-800 dark:text-white">{category.title}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item, i) => (
                      <div
                        key={i}
                        className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{item.name}</h4>
                          <Badge
                            className={`bg-gradient-to-r ${category.gradient} text-white text-xs flex-shrink-0 ml-2`}
                          >
                            {item.rank}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-gray-300">{item.team}</p>
                      </div>
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
