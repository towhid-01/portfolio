"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGame } from "@/contexts/GameContext"
import { Trophy, Target, Sparkles, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export const GameUI = () => {
  const { score, totalElements, fixedElements, gameCompleted, resetGame } = useGame()
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (gameCompleted) {
      setShowCelebration(true)
    }
  }, [gameCompleted])

  const progress = totalElements > 0 ? (fixedElements / totalElements) * 100 : 0

  return (
    <>
      {/* Instruction Banner */}
      <AnimatePresence>
        {!gameCompleted && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: -100,
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 max-w-2xl w-full px-4"
          >
            <div className="bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-center gap-2 text-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <p className="text-sm md:text-base text-foreground/90 font-medium">
                  Oh no! My portfolio is broken! Help me fix these misaligned elements... I'm too tired of alignment
                  stuff 😅
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Display */}
      <AnimatePresence>
        {!gameCompleted && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: 100,
              opacity: 0,
              scale: 0.8,
              rotate: 10,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="fixed top-24 right-4 md:right-8 z-40"
          >
        <div className="bg-gradient-to-br from-purple-600/30 via-cyan-600/30 to-blue-600/30 backdrop-blur-md border border-purple-500/40 rounded-2xl p-4 shadow-xl min-w-[180px]">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground/70 font-medium">Progress</span>
              <span className="text-xs text-foreground/90 font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-background/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-foreground/80">Fixed</span>
              </div>
              <span className="text-lg font-bold text-foreground">
                {fixedElements}/{totalElements}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-foreground/80">Score</span>
              </div>
              <motion.span
                key={score}
                initial={{ scale: 1.3, color: "#a855f7" }}
                animate={{ scale: 1, color: "inherit" }}
                className="text-lg font-bold text-foreground"
              >
                {score}
              </motion.span>
            </div>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 50, opacity: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="bg-gradient-to-br from-purple-600/40 via-cyan-600/40 to-blue-600/40 backdrop-blur-xl border-2 border-purple-500/50 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confetti effect */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-full"
                    initial={{
                      x: "50%",
                      y: "50%",
                      scale: 0,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              <div className="text-center relative z-10">
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="inline-block mb-4"
                >
                  <Trophy className="w-20 h-20 text-yellow-400" />
                </motion.div>

                <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  🎉 Great Job!
                </h2>

                <p className="text-foreground/90 text-lg mb-6">
                  You fixed <span className="font-bold text-purple-400">{fixedElements}</span> out of{" "}
                  <span className="font-bold text-cyan-400">{totalElements}</span> misaligned elements!
                </p>

                <div className="bg-background/30 rounded-xl p-4 mb-6">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    Your Score: <span className="text-purple-400">{score}</span>
                  </div>
                  <div className="text-foreground/60 text-sm">
                    Max Score: <span className="text-cyan-400">{totalElements * 10}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      resetGame()
                      setShowCelebration(false)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>
                  <Button
                    onClick={() => setShowCelebration(false)}
                    variant="outline"
                    className="flex-1 border-purple-500/50 hover:bg-purple-500/10"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
