import type React from "react"
import GameElement from "./GameElement"

interface GameWorldProps {
  children: React.ReactNode
}

const GameWorld: React.FC<GameWorldProps> = ({ children }) => {
  return (
    <div className="relative h-3/4 w-full bg-gradient-to-b from-blue-500 to-blue-700 overflow-hidden">
      <GameElement x={10} y={20} width={15} height={15} color="green">
        About Me
      </GameElement>
      <GameElement x={40} y={30} width={20} height={20} color="yellow">
        Projects
      </GameElement>
      <GameElement x={70} y={20} width={15} height={15} color="red">
        Contact
      </GameElement>
      <div className="absolute bottom-0 left-0 w-1/3 h-20 bg-green-600">About</div>
      <div className="absolute bottom-0 left-1/3 w-1/3 h-20 bg-yellow-600">Projects</div>
      <div className="absolute bottom-0 right-0 w-1/3 h-20 bg-red-600">Contact</div>
      {children}
    </div>
  )
}

export default GameWorld

