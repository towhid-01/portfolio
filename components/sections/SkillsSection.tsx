"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TiltableElement } from "@/components/tiltable-element"
import { skillCategories } from "@/lib/constants"
import { useGame } from "@/contexts/GameContext"

export default function SkillsSection() {
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <TiltableElement key={category.title} id={`skill-card-${categoryIndex}`} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }}
                className="h-full"
                style={{ willChange: "transform", transform: "translateZ(0)" }}
              >
                <Card className="bg-white dark:bg-[#1e293b] backdrop-blur-lg border-purple-500/30 h-full hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl relative overflow-hidden">
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
                        whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(147, 51, 234, 0.4)", transition: { duration: 0.3 } }}
                      >
                        <category.icon className="w-6 h-6" />
                      </motion.div>
                      <CardTitle className="text-lg text-slate-800 dark:text-white">
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
                            transition={{ duration: 0.3, delay: categoryIndex * 0.1 + badgeIndex * 0.05 }}
                            whileHover={!isFixed ? { scale: 1.08, y: -2, transition: { duration: 0.2 } } : {}}
                            onHoverStart={() => {
                              if (!isFixed) handleBadgeFix(categoryIndex, badgeIndex)
                            }}
                            style={{ transformOrigin: "center center" }}
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
