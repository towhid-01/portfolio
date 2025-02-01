import type React from "react"

interface InfoPanelProps {
  section: string
}

const InfoPanel: React.FC<InfoPanelProps> = ({ section }) => {
  const content = {
    start: "Welcome to my interactive portfolio! Use arrow keys to move the character and explore.",
    about: "I'm a game developer with X years of experience in Unity and Unreal Engine.",
    projects: "Check out my latest games and projects!",
    contact: "Get in touch with me for collaborations or job opportunities.",
  }

  return (
    <div className="h-1/4 w-full bg-gray-800 p-4">
      <h2 className="text-2xl font-bold mb-2">{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
      <p>{content[section as keyof typeof content]}</p>
    </div>
  )
}

export default InfoPanel

