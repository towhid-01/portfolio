"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2 } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

interface LoadingScreenProps {
  isLoading: boolean
}

export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const { theme } = useTheme()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }} // Faster fade out
          className="fixed inset-0 z-[999] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }} // Faster animation
            className="text-center"
          >
            {/* Simplified animation - less complex for better performance */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative inline-block"
            >
              <Gamepad2 className="w-20 h-20 sm:w-24 sm:h-24 text-primary" />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                animate={{
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-6 text-lg sm:text-xl font-semibold text-foreground"
            >
              Loading Game World...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
