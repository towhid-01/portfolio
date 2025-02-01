"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const Circle = ({ x, y, size, color }: { x: any; y: any; size: number; color: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      x,
      y,
      width: size,
      height: size,
      backgroundColor: color,
    }}
  />
)

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isClicked, setIsClicked] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const circles = [
    { size: 64, color: "#3498db", stiffness: 100 },
    { size: 48, color: "#2ecc71", stiffness: 75 },
    { size: 32, color: "#e74c3c", stiffness: 50 },
    { size: 24, color: "#f39c12", stiffness: 25 },
    { size: 16, color: "#9b59b6", stiffness: 10 },
  ]

  const springXValues = circles.map((circle) => useSpring(0, { stiffness: circle.stiffness, damping: 10 }))
  const springYValues = circles.map((circle) => useSpring(0, { stiffness: circle.stiffness, damping: 10 }))

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    const animateCircles = () => {
      const currentTime = Date.now() * 0.001
      springXValues.forEach((springX, index) => {
        const offsetX = Math.sin(currentTime + index) * 20
        springX.set(mouseX.get() + offsetX)
      })
      springYValues.forEach((springY, index) => {
        const offsetY = Math.cos(currentTime + index) * 20
        springY.set(mouseY.get() + offsetY)
      })
      requestAnimationFrame(animateCircles)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      animateCircles()
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [mouseX, mouseY, springXValues, springYValues])

  return (
    <section className="py-20 overflow-hidden game-bg" ref={containerRef} onClick={() => setIsClicked((prev) => !prev)}>
      <div className="container mx-auto px-6 text-center relative">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-primary glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Towhid Sarker
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Game Developer | Problem Solver
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 pixel-corners game-border"
          >
            Start Adventure
          </Button>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl -z-10" />
        {circles.map((circle, index) => (
          <Circle
            key={index}
            x={springXValues[index]}
            y={springYValues[index]}
            size={circle.size}
            color={circle.color}
          />
        ))}
      </div>
    </section>
  )
}

