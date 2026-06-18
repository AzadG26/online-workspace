"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { characters } from "@/data/content"

export function CharactersSection() {
  return (
    <Section
      title={<span>Meet the Pogo Tunes <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Friends</span>!</span>}
      subtitle="Join Pogo, Tuni, and Bobo on every learning adventure!"
      className="bg-gradient-to-b from-white to-cream"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {characters.map((char, i) => (
          <motion.div
            key={char.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.15 }}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="group relative overflow-hidden rounded-3xl bg-white/70 p-8 text-center shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-card border border-white/50"
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-3xl"
              style={{ background: char.color }}
            />
            <motion.div
              className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white to-cream text-5xl shadow-soft ring-2 ring-white"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              {char.emoji}
            </motion.div>
            <h3 className="font-display text-2xl font-bold" style={{ color: char.color }}>
              {char.name}
            </h3>
            <p className="mt-1 font-display text-sm font-semibold text-gray">{char.role}</p>
            <p className="mt-3 font-body text-sm text-gray leading-relaxed">{char.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
