"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGame } from "@/contexts/GameContext"
import { AlertTriangle } from "lucide-react"

interface CardWarningIconProps {
  group: string
}

export const CardWarningIcon = ({ group }: CardWarningIconProps) => {
  const { isGroupCompleted } = useGame()
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const completed = isGroupCompleted(group)
    if (completed && !isCompleted) {
      setIsCompleted(true)
    }
  }, [isGroupCompleted, group, isCompleted])

  const shouldShow = !isCompleted

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          exit={{
            scale: 0,
            rotate: 180,
            transition: { duration: 0.4 },
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="absolute -top-2 -right-2 z-20"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-red-500/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg border-2 border-red-400"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
