import type React from "react"

interface PlayerCharacterProps {
  position: { x: number; y: number }
}

const PlayerCharacter: React.FC<PlayerCharacterProps> = ({ position }) => {
  return (
    <div
      className="absolute w-10 h-10 bg-white rounded-full"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition: "all 0.1s ease-out",
      }}
    />
  )
}

export default PlayerCharacter

