"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function KonamiCode() {
  const [buffer, setBuffer] = useState<string[]>([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setBuffer(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join(',') === KONAMI.join(',')) {
          setActive(true)
          setTimeout(() => setActive(false), 3000)
          return []
        }
        return next
      })
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          {/* Confetti */}
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-sm"
              style={{
                width: `${6 + (i % 4) * 2}px`,
                height: `${6 + (i % 3) * 2}px`,
                background: `hsl(${(i * 37) % 360}, 80%, 60%)`,
                left: '50%',
                top: '50%',
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i / 40) * Math.PI * 2) * (120 + (i % 5) * 40),
                y: Math.sin((i / 40) * Math.PI * 2) * (120 + (i % 5) * 40) + 60,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                rotate: (i % 2 === 0 ? 1 : -1) * (180 + (i % 4) * 90),
              }}
              transition={{ duration: 2.2, ease: "easeOut", delay: (i % 8) * 0.04 }}
            />
          ))}

          {/* Achievement card */}
          <motion.div
            initial={{ scale: 0.4, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative z-10 bg-gradient-to-br from-purple-700/95 via-cyan-700/95 to-blue-700/95 backdrop-blur-xl border-2 border-yellow-400/70 rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-4"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-yellow-400/10 to-cyan-500/20 animate-pulse pointer-events-none" />
            <motion.div
              animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl mb-4 relative z-10"
            >
              🎮
            </motion.div>
            <div className="relative z-10">
              <div className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-2">
                Achievement Unlocked
              </div>
              <div className="text-white font-bold text-2xl leading-tight">
                You found the secret!
              </div>
              <div className="text-white/50 text-xs mt-3">↑↑↓↓←→←→BA</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
