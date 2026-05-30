"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { contactLinks } from "@/lib/constants"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(3, "Please specify the project type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    /*
     * EMAIL SETUP INSTRUCTIONS:
     * 1. Go to https://web3forms.com/ and get a free API key
     * 2. Replace "YOUR_WEB3FORMS_KEY" below with your actual key
     * 3. Uncomment the try-catch block below
     * 4. Remove/comment the toast.info block
     */

    // TEMPORARY: Show coming soon message
    toast.info("Email integration coming soon!", {
      description: "Please contact me directly at towhid.sarker3@gmail.com for now.",
    })
    setIsSubmitting(false)
    reset()
    return

    /* UNCOMMENT THIS BLOCK TO ENABLE EMAIL SENDING:
    try {
      const WEB3FORMS_KEY = "YOUR_WEB3FORMS_KEY" // Replace with your key from web3forms.com

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: data.name,
          email: data.email,
          subject: `Portfolio Contact: ${data.projectType}`,
          message: `Project Type: ${data.projectType}\n\nFrom: ${data.name} (${data.email})\n\nMessage:\n${data.message}`,
          from_name: data.name,
          replyto: data.email,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon!",
        })
        reset()
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to send message", {
        description: "Please contact me directly at towhid.sarker3@gmail.com",
      })
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  return (
    <section id="contact" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-4 overflow-visible"
        >
          Let's Create Together
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Ready to Build Something Amazing?</h3>
              <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
                I'm always excited to collaborate on innovative game projects, discuss Unity development opportunities,
                or explore creative solutions for interactive experiences. Let's turn your ideas into engaging gameplay!
              </p>
            </div>

            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.target || undefined}
                  rel={link.rel || undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-[#1e293b] backdrop-blur-lg border border-purple-500/30 rounded-lg hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 group shadow-lg"
                >
                  <div className={`p-3 bg-gradient-to-br ${link.gradient} bg-opacity-20 rounded-lg`}>
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      <link.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-white font-medium">{link.name}</p>
                    <p className="text-slate-600 dark:text-gray-300 text-sm">{link.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white dark:bg-[#1e293b] backdrop-blur-lg border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 dark:text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Start a Conversation
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-gray-300">
                  Let's discuss your next game project or collaboration opportunity!
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        {...register("name")}
                        placeholder="Your Name"
                        className="bg-white dark:bg-slate-800 border-purple-500/30 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-purple-500 transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Input
                        {...register("email")}
                        placeholder="Your Email"
                        type="email"
                        className="bg-white dark:bg-slate-800 border-purple-500/30 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-purple-500 transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Input
                      {...register("projectType")}
                      placeholder="Project Type (Game Dev, Collaboration, etc.)"
                      className="bg-white dark:bg-slate-800 border-purple-500/30 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-purple-500 transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
                  </div>

                  <div>
                    <Textarea
                      {...register("message")}
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      className="bg-white dark:bg-slate-800 border-purple-500/30 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-purple-500 resize-none transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white group shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 mr-2 border-2 border-background border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
