"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Globe, BookOpen } from "lucide-react"
import { Section } from "@/components/ui/section"
import { characters } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { aboutPageSchema, organizationSchema } from "@/lib/structured-data"

const floatingIcons = ["💜", "⭐", "🌈", "✨", "📚", "🌟"]

export default function AboutPage() {
  return (
    <>
      <StructuredData schema={[aboutPageSchema(), organizationSchema()]} />
      <section className="relative overflow-hidden bg-gradient-to-b from-coral/10 via-cream to-white pt-24 pb-12 md:pt-32">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-15 pointer-events-none"
            style={{ top: `${15 + i * 10}%`, left: `${i % 2 === 0 ? 5 : 92}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            {icon}
          </motion.div>
        ))}
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            About{" "}
            <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Pogo Tunes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 20 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Making learning fun, free, and accessible for every child around the world.
          </motion.p>
        </div>
      </section>

      <Section title={<span>Our <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Mission</span></span>} subtitle="Everything we do is for the joy of learning." className="bg-gradient-to-b from-white to-cream">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { icon: Heart, title: "Our Mission", text: "To provide every child with free, high-quality educational content that makes learning joyful and engaging.", color: "text-coral", bg: "bg-coral/10", glow: "rgba(255,107,107,0.15)" },
              { icon: Sparkles, title: "Our Vision", text: "A world where every child, regardless of their background, has access to premium learning resources.", color: "text-purple", bg: "bg-purple/10", glow: "rgba(178,141,255,0.15)" },
              { icon: Globe, title: "Global Reach", text: "Content available in multiple languages, helping children worldwide learn in their native language.", color: "text-sky", bg: "bg-sky/10", glow: "rgba(107,203,255,0.15)" },
              { icon: BookOpen, title: "Free Forever", text: "No subscriptions, no paywalls, no ads. We believe education should be free for everyone.", color: "text-green", bg: "bg-green/10", glow: "rgba(110,231,183,0.15)" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow-soft backdrop-blur-xl border border-white/50 transition-all duration-300 hover:shadow-card"
              >
                <motion.div
                  className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at 50% 50%, ${item.glow}, transparent 60%)`,
                  }}
                />
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} transition-transform group-hover:scale-110`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-dark">{item.title}</h3>
                <p className="mt-2 font-body text-sm text-gray leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section title={<span>Meet Our <span className="bg-gradient-to-r from-coral to-yellow bg-clip-text text-transparent">Characters</span></span>} subtitle="Our friendly characters make learning fun!" className="bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {characters.map((char, i) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.1 }}
                className="group rounded-2xl bg-white/70 p-6 text-center shadow-soft backdrop-blur-xl border border-white/50 transition-all duration-300 hover:shadow-card"
              >
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white to-cream text-3xl shadow-soft ring-2 ring-white"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {char.emoji}
                </motion.div>
                <h3 className="font-display text-lg font-bold" style={{ color: char.color }}>{char.name}</h3>
                <p className="text-sm font-semibold text-gray font-display">{char.role}</p>
                <p className="mt-2 font-body text-sm text-gray">{char.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
