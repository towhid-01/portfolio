"use client"

import { motion } from "framer-motion"
import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Contact = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 game-bg">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-primary glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Send a Message
        </motion.h2>
        <motion.form
          action="https://formsubmit.co/towhid.sarker3@gmail.com" 
          method="POST"
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="mb-4">
            <Input
              type="text"
              name="name" 
              placeholder="Your Name"
              required
              className="bg-card text-card-foreground pixel-corners game-border"
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              name="email" 
              placeholder="Your Email"
              required
              className="bg-card text-card-foreground pixel-corners game-border"
            />
          </div>
          <div className="mb-4">
            <Textarea
              name="message" 
              placeholder="Your Message"
              rows={4}
              required
              className="bg-card text-card-foreground pixel-corners game-border"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 pixel-corners game-border"
          >
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  )
})

Contact.displayName = "Contact"

export default Contact
