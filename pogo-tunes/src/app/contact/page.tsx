"use client"

import { useState, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MessageSquare, HelpCircle, CheckCircle, AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/structured-data"
import { contactPageSchema, organizationSchema } from "@/lib/structured-data"

const floatingIcons = ["💌", "⭐", "✉️", "🌈", "📬", "✨"]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [mailtoUrl, setMailtoUrl] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        if (data.mailtoUrl) {
          setMailtoUrl(data.mailtoUrl)
          window.open(data.mailtoUrl, "_blank")
        }
        setTimeout(() => setStatus("idle"), 8000)
      } else {
        setStatus("error")
        setErrorMsg(data.error || "Something went wrong.")
      }
    } catch {
      setStatus("error")
      setErrorMsg("Network error. Please try again.")
    }
  }

  return (
    <>
      <StructuredData schema={[contactPageSchema(), organizationSchema()]} />
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream to-white pt-24 pb-16 md:pt-32">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10 pointer-events-none"
            style={{ top: `${15 + i * 10}%`, left: `${i % 2 === 0 ? 5 : 92}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            {icon}
          </motion.div>
        ))}
      <div className="relative mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="font-display text-4xl font-bold text-dark md:text-5xl"
        >
          Get in{" "}
          <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 20 }}
          className="mt-4 max-w-2xl font-body text-lg text-gray"
        >
          We&apos;d love to hear from you! Send us a message and we&apos;ll get back to you.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="font-display text-sm font-bold text-dark">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-white/50 bg-white/70 px-5 py-3 font-body text-dark outline-none backdrop-blur-xl transition-all focus:border-coral/50 focus:shadow-glow-coral placeholder:text-gray/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-display text-sm font-bold text-dark">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-white/50 bg-white/70 px-5 py-3 font-body text-dark outline-none backdrop-blur-xl transition-all focus:border-coral/50 focus:shadow-glow-coral placeholder:text-gray/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-display text-sm font-bold text-dark">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-white/50 bg-white/70 px-5 py-3 font-body text-dark outline-none backdrop-blur-xl transition-all focus:border-coral/50 focus:shadow-glow-coral resize-none placeholder:text-gray/30"
                  placeholder="Your message..."
                />
              </div>
              <Button variant="coral" size="lg" className="w-full shadow-xl" disabled={status === "sending"}>
                {status === "sending" ? (
                  <span className="flex items-center gap-2"><span className="animate-pulse">Sending...</span></span>
                ) : (
                  <span className="flex items-center gap-2">Send Message <Send className="h-4 w-4" /></span>
                )}
              </Button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-2xl bg-green/15 backdrop-blur-sm border border-green/30 px-5 py-4"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-dark" />
                    <span className="font-display text-sm font-bold text-green-dark">
                      Message sent! {mailtoUrl && "Check your email app to finish sending."}
                    </span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-2xl bg-coral/15 backdrop-blur-sm border border-coral/30 px-5 py-4"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 text-coral" />
                    <span className="font-display text-sm font-bold text-coral">{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 20 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, title: "Email", text: "azadg26@gmail.com", color: "text-coral", href: "mailto:azadg26@gmail.com" },
              { icon: MessageSquare, title: "Social", text: "Message us on Instagram or Facebook", color: "text-purple", href: "https://instagram.com/pogotunes" },
              { icon: HelpCircle, title: "Support", text: "Check our FAQ or Parents Guide", color: "text-sky", href: "/quiz" },
            ].map((item) => (
              <a key={item.title} href={item.href} target={item.href.startsWith("http") || item.href.startsWith("mailto") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                <motion.div
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="group flex items-start gap-4 rounded-2xl bg-white/70 border border-white/50 p-5 shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-card cursor-pointer"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/70 border border-white/50 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-dark">{item.title}</h3>
                    <p className="mt-1 font-body text-sm text-gray">{item.text}</p>
                  </div>
                </motion.div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
    </>
  )
}
