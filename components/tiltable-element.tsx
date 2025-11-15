"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useGame } from "@/contexts/GameContext"

interface TiltableElementProps {
  children: React.ReactNode
  id: string
  className?: string
  group?: string
}

export const TiltableElement = ({ children, id, className = "", group }: TiltableElementProps) => {
  const { registerElement, fixElement, getElementRotation, isElementFixed } = useGame()
  const [isHovered, setIsHovered] = useState(false)
  const [showParticleBurst, setShowParticleBurst] = useState(false)
  const [hasBeenFixed, setHasBeenFixed] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    registerElement(id, group)
  }, [id, group, registerElement])

  const rotation = getElementRotation(id)
  const isFixed = isElementFixed(id)

  const handleHoverStart = () => {
    if (!isFixed) {
      setIsHovered(true)
      // Animate to fixed position
      controls.start({
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      })
    }
  }

  const handleHoverEnd = () => {
    if (!isFixed) {
      setIsHovered(false)
      fixElement(id)
      setShowParticleBurst(true)
      setHasBeenFixed(true)

      // Flash green
      controls.start({
        boxShadow: [
          "0 0 0px rgba(34, 197, 94, 0)",
          "0 0 30px rgba(34, 197, 94, 0.8)",
          "0 0 0px rgba(34, 197, 94, 0)",
        ],
        transition: { duration: 0.6 },
      })

      // Hide particle burst after animation
      setTimeout(() => setShowParticleBurst(false), 1000)
    }
  }

  // Determine glow color
  const getGlowColor = () => {
    if (hasBeenFixed && !isFixed) return "rgba(34, 197, 94, 0)" // green (fading out)
    if (isFixed) return "rgba(34, 197, 94, 0)" // no glow when fixed
    if (isHovered) return "rgba(251, 146, 60, 0.3)" // orange on hover
    return "rgba(239, 68, 68, 0.3)" // red when broken
  }

  return (
    <div className="relative">
      <motion.div
        className={className}
        initial={{ rotate: rotation }}
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{
          boxShadow: isFixed ? "none" : `0 0 20px ${getGlowColor()}`,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {children}
      </motion.div>

      {/* Particle Burst Effect */}
      <AnimatePresence>
        {showParticleBurst && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2
              const distance = 50 + Math.random() * 30
              const x = Math.cos(angle) * distance
              const y = Math.sin(angle) * distance

              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x,
                    y,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  {/* Star particle */}
                  <div className="relative">
                    <span className="text-2xl">✨</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* REMOVED - Corner warning icons (causing 4 extra alerts per card) */}
    </div>
  )
}
