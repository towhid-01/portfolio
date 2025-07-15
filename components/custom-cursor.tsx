"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/app/page" // Assuming useTheme is exported from app/page

interface Ripple {
  id: number
  x: number
  y: number
}

export const CustomCursor = () => {
  const { theme } = useTheme()
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)

  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isHoveringInput, setIsHoveringInput] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])

  const [isMobile, setIsMobile] = useState(false)

  const lerp = (start: number, end: number, amount: number) => {
    return (1 - amount) * start + amount * end
  }

  const animateCursor = () => {
    currentX.current = lerp(currentX.current, mouseX.current, 0.15) // Slightly faster lerp for responsiveness
    currentY.current = lerp(currentY.current, mouseY.current, 0.15)

    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`
    }
    if (cursorRingRef.current) {
      cursorRingRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`
    }

    requestRef.current = requestAnimationFrame(animateCursor)
  }

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isTouchDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY

      const target = e.target as HTMLElement
      const interactiveElements = [
        "BUTTON",
        "A",
        "LABEL",
        "SVG", // For Lucide icons
      ]
      const isInteractive =
        interactiveElements.includes(target.tagName) ||
        target.closest("[data-cursor-interactive]") || // Custom attribute for more control
        window.getComputedStyle(target).cursor === "pointer"

      const isInputOrTextarea = target.tagName === "INPUT" || target.tagName === "TEXTAREA"

      setIsHoveringInteractive(isInteractive)
      setIsHoveringInput(isInputOrTextarea)
    }

    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 1000) // Match ripple animation duration
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    requestRef.current = requestAnimationFrame(animateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  if (isMobile) {
    return null // Don't render cursor on mobile
  }

  const dotSize = isHoveringInteractive ? 12 : 8 // Dot scales from 8px to 12px
  const ringSize = isHoveringInteractive ? 40 : 30 // Ring scales from 30px to 40px
  const cursorOpacity = isHoveringInput ? 0 : 1 // Hide cursor over inputs

  const cursorDotColor = `hsl(var(--cursor-dot-color))`
  const cursorRingColor = `hsl(var(--cursor-ring-color))`
  const rippleColorRgb = `var(--ripple-color-rgb)` // Get RGB values from CSS variable

  return (
    <>
      {/* Custom Cursor Dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          backgroundColor: cursorDotColor,
          width: dotSize,
          height: dotSize,
          opacity: cursorOpacity,
          transition: "width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out",
          marginLeft: -dotSize / 2, // Center the dot
          marginTop: -dotSize / 2, // Center the dot
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Custom Cursor Ring */}
      <motion.div
        ref={cursorRingRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-2"
        style={{
          borderColor: cursorRingColor,
          width: ringSize,
          height: ringSize,
          opacity: cursorOpacity,
          transition: "width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out",
          marginLeft: -ringSize / 2, // Center the ring
          marginTop: -ringSize / 2, // Center the ring
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
            initial={{
              opacity: 1,
              scale: 0,
              x: ripple.x - 25, // Center the ripple
              y: ripple.y - 25, // Center the ripple
            }}
            animate={{
              opacity: 0,
              scale: 2,
              transition: { duration: 1, ease: "easeOut" }, // 1-second fade out
            }}
            exit={{ opacity: 0 }}
            style={{
              backgroundColor: `rgba(${rippleColorRgb}, 0.2)`, // Use RGB from CSS variable
              width: 50,
              height: 50,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}
