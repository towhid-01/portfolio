"use client"

import { motion } from "framer-motion"
import { forwardRef } from "react"
import Image from "next/image"

const skills = [
  { name: "Unity", logo: "/unity.png" },
  { name: "C#", logo: "/c-sharp.png" },
  { name: "C++", logo: "/c-.png" },
  { name: "Git", logo: "/github.png" },
  { name: "MySQL", logo: "/mysql-database.png" },
  { name: "HTML", logo: "/html.png" },
  { name: "CSS", logo: "/css-3.png" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
]

const Skills = forwardRef<HTMLElement>((props, ref) => {
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
          Skill Tree
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-24 h-24 relative mb-4 game-border pixel-corners">
                <Image
                  src={skill.logo || "/placeholder.svg"}
                  alt={`${skill.name} logo`}
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                />
              </div>
              <span className="text-foreground text-sm">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

Skills.displayName = "Skills"

export default Skills

