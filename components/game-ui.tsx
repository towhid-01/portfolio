"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGame } from "@/contexts/GameContext"
import { Trophy, Target, Sparkles, RotateCcw, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export const GameUI = () => {
  const { score, totalElements, fixedElements, gameCompleted, resetGame } = useGame()
  const [showCelebration, setShowCelebration] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Check if welcome popup should be shown (only once per session)
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("portfolio-game-welcome")
    if (!hasSeenWelcome && totalElements > 0) {
      setShowWelcome(true)
    }
  }, [totalElements])

  useEffect(() => {
    if (gameCompleted) {
      setShowCelebration(true)
    }
  }, [gameCompleted])

  const handleWelcomeClose = () => {
    setShowWelcome(false)
    sessionStorage.setItem("portfolio-game-welcome", "true")
  }

  const progress = totalElements > 0 ? (fixedElements / totalElements) * 100 : 0

  return (
    <>
      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleWelcomeClose}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-gradient-to-br from-purple-600/40 via-cyan-600/40 to-blue-600/40 backdrop-blur-xl border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 blur-2xl animate-pulse pointer-events-none" />

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ rotate: -10, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    🎮
                  </motion.div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Portfolio Challenge!
                  </h2>
                  <p className="text-foreground/90 text-sm sm:text-base leading-relaxed px-2">
                    Help me fix these misaligned elements! Hover over the tilted skill badges to align them and earn points. Can you get a perfect score?
                  </p>
                </div>

                <div className="bg-background/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-purple-500/30">
                  <div className="flex items-center justify-center gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{totalElements}</div>
                      <div className="text-xs text-foreground/70">Elements</div>
                    </div>
                    <div className="h-8 w-px bg-foreground/20" />
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">0</div>
                      <div className="text-xs text-foreground/70">Fixed</div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleWelcomeClose}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold py-6 text-base shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                >
                  Let's Go!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Score Indicator */}
      <AnimatePresence>
        {!gameCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="fixed top-20 right-3 sm:right-4 md:right-6 z-40"
          >
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative group cursor-pointer touch-manipulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {!isExpanded ? (
                // Compact Badge
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600/90 via-cyan-600/90 to-blue-600/90 backdrop-blur-md border-2 border-purple-500/50 rounded-2xl shadow-lg flex items-center justify-center hover:shadow-purple-500/50 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {fixedElements}
                      <span className="text-foreground/60">/</span>
                      {totalElements}
                    </div>
                  </div>
                  <ChevronDown className="absolute -bottom-1 -right-1 w-4 h-4 text-purple-400 bg-background/80 rounded-full p-0.5" />
                </div>
              ) : (
                // Expanded Panel
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-purple-600/30 via-cyan-600/30 to-blue-600/30 backdrop-blur-md border border-purple-500/40 rounded-2xl p-3 sm:p-4 shadow-xl min-w-[160px] sm:min-w-[180px]"
                >
                  <ChevronUp className="absolute -top-1 -right-1 w-5 h-5 text-purple-400 bg-background/80 rounded-full p-0.5" />

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
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                        <span className="text-xs sm:text-sm text-foreground/80">Fixed</span>
                      </div>
                      <span className="text-sm sm:text-lg font-bold text-foreground">
                        {fixedElements}/{totalElements}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                        <span className="text-xs sm:text-sm text-foreground/80">Score</span>
                      </div>
                      <motion.span
                        key={score}
                        initial={{ scale: 1.3, color: "#a855f7" }}
                        animate={{ scale: 1, color: "inherit" }}
                        className="text-sm sm:text-lg font-bold text-foreground"
                      >
                        {score}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.button>
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
