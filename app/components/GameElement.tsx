import type React from "react"

interface GameElementProps {
  x: number
  y: number
  width: number
  height: number
  color: string
  children?: React.ReactNode
}

const GameElement: React.FC<GameElementProps> = ({ x, y, width, height, color, children }) => {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  )
}

export default GameElement

