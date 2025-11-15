import { Gamepad2, Code, Settings, Layers } from "lucide-react"
import type { SkillCategory } from "@/types"

export const skillCategories: SkillCategory[] = [
  {
    title: "Game Dev Tools",
    icon: Gamepad2,
    skills: ["Unity 2D/3D", "DOTween", "Particle System", "Unity UI"],
    gradient: "from-primary to-secondary",
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["C++", "C#", "JavaScript", "MySQL"],
    gradient: "from-secondary to-primary",
  },
  {
    title: "Dev Tools",
    icon: Settings,
    skills: ["Git", "GitHub", "Visual Studio", "Rider", "Linux"],
    gradient: "from-primary/80 to-secondary/80",
  },
  {
    title: "Other Skills",
    icon: Layers,
    skills: ["AR Foundation (basic)", "Level Design", "OOP", "Version Control"],
    gradient: "from-secondary/80 to-primary/80",
  },
]
