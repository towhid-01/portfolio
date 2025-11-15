// Type definitions for the portfolio application
import type { LucideIcon } from "lucide-react"

export interface Project {
  title: string
  description: string
  tech: string[]
  features: string[]
  status: string
  type: string
  icon: LucideIcon
  gradient: string
  link?: string
}

export interface Experience {
  company: string
  position: string
  duration: string
  location: string
  type: string
  responsibilities: string[]
  icon: LucideIcon
  gradient: string
}

export interface AchievementItem {
  name: string
  rank: string
  team: string
}

export interface Achievement {
  title: string
  items: AchievementItem[]
  icon: LucideIcon
  gradient: string
}

export interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: string[]
  gradient: string
}

export interface ContactLink {
  name: string
  value: string
  icon: LucideIcon
  href: string
  target?: string
  rel?: string
  gradient: string
}

export interface NavItem {
  id: string
  label: string
  isExternal?: boolean
}

export interface Stat {
  label: string
  value: string
  icon: LucideIcon
}

export interface ContactFormData {
  name: string
  email: string
  projectType: string
  message: string
}
