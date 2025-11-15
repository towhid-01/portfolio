import { Trophy, Code, Award } from "lucide-react"
import type { Achievement } from "@/types"

export const achievements: Achievement[] = [
  {
    title: "Programming Contests",
    items: [
      { name: "Sec Inter University Junior Programming Contest 2022", rank: "Rank 43", team: "UITS_Wreckers_Exist" },
      {
        name: "6th DRMC Int'l Tech Carnival 2023 – Programming Contest [Preliminary Round]",
        rank: "Rank 13",
        team: "CircleCycle",
      },
      { name: "UITS Intra University Programming Contest 2022", rank: "Rank 10", team: "UITS_CircleCycle" },
    ],
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Competitive Programming",
    items: [
      { name: "Total Problems Solved", rank: "1200+", team: "Multiple Online Judges" },
      { name: "Codeforces: __PrEdAToR__", rank: "Max: 1110", team: "750+ Solved" },
      { name: "LeetCode: _PrEdAToR_", rank: "Max: 1511", team: "150+ Solved" },
    ],
    icon: Code,
    gradient: "from-primary to-secondary",
  },
  {
    title: "Academic Recognition",
    items: [
      { name: "Poster Presentation Competition", rank: "3rd Place", team: "Team Leader" },
      { name: "University CGPA", rank: "3.09/4.00", team: "BSc CSE" },
      { name: "Leadership Excellence", rank: "Proven", team: "Multiple Projects" },
    ],
    icon: Award,
    gradient: "from-secondary to-primary",
  },
]
