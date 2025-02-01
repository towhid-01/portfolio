"use client"

import { useRef } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import ProblemSolving from "./components/ProblemSolving"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const problemSolvingRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header
        onAboutClick={() => scrollTo(aboutRef)}
        onProjectsClick={() => scrollTo(projectsRef)}
        onSkillsClick={() => scrollTo(skillsRef)}
        onProblemSolvingClick={() => scrollTo(problemSolvingRef)}
        onContactClick={() => scrollTo(contactRef)}
      />
      <main className="flex-grow">
        <Hero />
        <About ref={aboutRef} />
        <Projects ref={projectsRef} />
        <Skills ref={skillsRef} />
        <ProblemSolving ref={problemSolvingRef} />
        <Contact ref={contactRef} />
      </main>
      <Footer />
    </div>
  )
}

