import { Briefcase, Gamepad2 } from "lucide-react"
import type { Experience } from "@/types"

export const experiences: Experience[] = [
  {
    company: "VisionTillion",
    position: "Unity Game Developer",
    duration: "September 2025 – Present",
    location: "Remote",
    type: "Full-time",
    responsibilities: [
      "Developing and implementing game UI/UX systems with DOTween animations and localization support for mobile platforms",
      "Creating interactive user interfaces including menus, HUDs, and gameplay flows while maintaining visual consistency",
      "Managing technical documentation and design specifications to streamline team collaboration and development workflow",
      "Optimizing game performance through debugging and close collaboration with artists and designers to ensure quality delivery",
    ],
    icon: Gamepad2,
    gradient: "from-purple-500 to-cyan-500",
  },
  {
    company: "Qiulin Technologies",
    position: "Executive – Project & Task Coordination",
    duration: "March 2025 – August 2025",
    location: "Uttara, Dhaka",
    type: "Full-time",
    responsibilities: [
      "Assigned and monitored tasks for a 25–30 member team to ensure smooth daily operations",
      "Managed onboarding, organized training sessions, and evaluated employee performance",
      "Created performance reports and salary sheets in Excel based on task completion data",
      "Improved team productivity through strategic task coordination and evaluation metrics",
    ],
    icon: Briefcase,
    gradient: "from-primary to-secondary",
  },
  {
    company: "Riseup Labs",
    position: "Game Developer – Intern",
    duration: "Aug 2024 – Dec 2024",
    location: "Uttara, Dhaka",
    type: "Internship",
    responsibilities: [
      "Built UI screens, login system, and leaderboard features in Unity using C#",
      "Designed levels and implemented smooth character movement, button interactions",
      "Integrated AdMob for monetization and participated in gameplay testing",
      "Contributed to debugging and iteration based on user feedback",
    ],
    icon: Gamepad2,
    gradient: "from-secondary to-primary",
  },
]
