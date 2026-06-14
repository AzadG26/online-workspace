"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-cream to-white pt-24 pb-16 md:pt-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-dark md:text-5xl"
        >
          Get in <span className="text-gradient-coral">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl font-body text-lg text-gray"
        >
          We&apos;d love to hear from you! Send us a message and we&apos;ll get back to you.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-5">
              <div>
                <label className="font-display text-sm font-bold text-dark">Name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-2xl border-2 border-cream-dark bg-white px-5 py-3 font-body outline-none transition-all focus:border-coral"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-display text-sm font-bold text-dark">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-2xl border-2 border-cream-dark bg-white px-5 py-3 font-body outline-none transition-all focus:border-coral"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-display text-sm font-bold text-dark">Message</label>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-2xl border-2 border-cream-dark bg-white px-5 py-3 font-body outline-none transition-all focus:border-coral resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Button variant="coral" size="lg" className="w-full">
                Send Message <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, title: "Email", text: "support@pogotunes.com", color: "text-coral" },
              { icon: MessageSquare, title: "Social", text: "Message us on Instagram or Facebook", color: "text-purple" },
              { icon: HelpCircle, title: "Support", text: "Check our FAQ or Parents Guide", color: "text-sky" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-dark">{item.title}</h3>
                  <p className="mt-1 font-body text-sm text-gray">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
