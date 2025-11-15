import { Mail, MessageCircle, Linkedin, Github } from "lucide-react"
import type { ContactLink } from "@/types"

export const contactLinks: ContactLink[] = [
  {
    name: "Email",
    value: "towhid.sarker3@gmail.com",
    icon: Mail,
    href: "mailto:towhid.sarker3@gmail.com",
    gradient: "from-primary to-secondary",
  },
  {
    name: "Discord",
    value: "towhid",
    icon: MessageCircle,
    href: "https://www.discord.com/users/towhid",
    gradient: "from-secondary to-primary",
  },
  {
    name: "LinkedIn",
    value: "Professional Network",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/towhid-sarker/",
    target: "_blank",
    rel: "noopener noreferrer",
    gradient: "from-primary/80 to-secondary/80",
  },
  {
    name: "GitHub",
    value: "Code Repository",
    icon: Github,
    href: "https://github.com/towhid-01",
    target: "_blank",
    rel: "noopener noreferrer",
    gradient: "from-secondary/80 to-primary/80",
  },
]
