"use client"

import { motion } from "framer-motion"
import { forwardRef } from "react"

const About = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-green-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg mb-6">
            I am Towhid Sarker, a dedicated game developer with a strong foundation in Unity (C#) and C++. 
            With a passion for problem-solving and optimization, I have developed multiple projects, 
            including story-driven games that emphasize engaging gameplay and immersive experiences.
          </p>
          <p className="text-lg">
            I thrive on creating engaging user experiences and continuously expanding my expertise in game mechanics, 
            2D sprite animations, and game UI design. My problem-solving skills are backed by extensive competitive programming experience, 
            having solved over 1,200 algorithmic challenges across various platforms.
          </p>
        </motion.div>
      </div>
    </section>
  )
})

About.displayName = "About"

export default About
