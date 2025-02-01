"use client"

import { motion } from "framer-motion"
import { forwardRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const platforms = [
  { name: "Codeforces", problems: 750, color: "bg-blue-500" },
  { name: "LeetCode", problems: 150, color: "bg-yellow-500" },
  { name: "Other Judges", problems: 300, color: "bg-green-500" },
]

const ProblemSolving = forwardRef<HTMLElement>((props, ref) => {
  const totalProblems = platforms.reduce((sum, platform) => sum + platform.problems, 0)

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-primary glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Code Battle Stats
        </motion.h2>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl font-bold text-primary">Total Challenges Conquered: {totalProblems}+</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-secondary text-secondary-foreground pixel-corners">
                <CardHeader>
                  <CardTitle className="text-center text-primary">{platform.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center">
                    <motion.div
                      className={`w-32 h-32 ${platform.color} rounded-full flex items-center justify-center text-white text-2xl font-bold pixel-corners`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      viewport={{ once: true }}
                    >
                      {platform.problems}+
                    </motion.div>
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

ProblemSolving.displayName = "ProblemSolving"

export default ProblemSolving

