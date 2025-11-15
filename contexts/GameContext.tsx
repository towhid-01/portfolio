"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface GameElement {
  id: string
  rotation: number
  isFixed: boolean
  group?: string // Group ID for tracking card completion
}

interface GameContextType {
  score: number
  totalElements: number
  fixedElements: number
  gameCompleted: boolean
  elements: Map<string, GameElement>
  registerElement: (id: string, group?: string) => void
  fixElement: (id: string) => void
  getElementRotation: (id: string) => number
  isElementFixed: (id: string) => boolean
  isGroupCompleted: (group: string) => boolean
  resetGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [elements, setElements] = useState<Map<string, GameElement>>(new Map())
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)

  // Random rotation between 15-45 degrees (positive or negative)
  const getRandomRotation = () => {
    const angle = 15 + Math.random() * 30
    return Math.random() > 0.5 ? angle : -angle
  }

  const registerElement = useCallback((id: string, group?: string) => {
    setElements((prev) => {
      if (prev.has(id)) return prev
      const newMap = new Map(prev)
      newMap.set(id, {
        id,
        rotation: getRandomRotation(),
        isFixed: false,
        group,
      })
      return newMap
    })
  }, [])

  const fixElement = useCallback((id: string) => {
    setElements((prev) => {
      const element = prev.get(id)
      if (!element || element.isFixed) return prev

      const newMap = new Map(prev)
      newMap.set(id, { ...element, isFixed: true })

      // Add points - 25 per card
      setScore((s) => s + 25)

      return newMap
    })
  }, [])

  const getElementRotation = useCallback(
    (id: string) => {
      const element = elements.get(id)
      return element?.isFixed ? 0 : element?.rotation || 0
    },
    [elements]
  )

  const isElementFixed = useCallback(
    (id: string) => {
      return elements.get(id)?.isFixed || false
    },
    [elements]
  )

  const isGroupCompleted = useCallback(
    (group: string) => {
      const groupElements = Array.from(elements.values()).filter((e) => e.group === group)
      if (groupElements.length === 0) return false
      return groupElements.every((e) => e.isFixed)
    },
    [elements]
  )

  const resetGame = useCallback(() => {
    setElements(new Map())
    setScore(0)
    setGameCompleted(false)
  }, [])

  // Check if game is completed
  useEffect(() => {
    const totalCount = elements.size
    const fixedCount = Array.from(elements.values()).filter((e) => e.isFixed).length

    if (totalCount > 0 && fixedCount === totalCount && !gameCompleted) {
      setGameCompleted(true)
    }
  }, [elements, gameCompleted])

  const totalElements = elements.size
  const fixedElements = Array.from(elements.values()).filter((e) => e.isFixed).length

  return (
    <GameContext.Provider
      value={{
        score,
        totalElements,
        fixedElements,
        gameCompleted,
        elements,
        registerElement,
        fixElement,
        getElementRotation,
        isElementFixed,
        isGroupCompleted,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within GameProvider")
  }
  return context
}
