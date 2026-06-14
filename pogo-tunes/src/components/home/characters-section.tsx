"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { characters } from "@/data/content"

export function CharactersSection() {
  return (
    <Section
      title="Meet the Pogo Tunes Friends!"
      subtitle="Join Pogo, Tuni, and Bobo on every learning adventure!"
      className="bg-white"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {characters.map((char, i) => (
          <motion.div
            key={char.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-soft transition-all duration-300 hover:shadow-card"
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
              style={{ background: char.color }}
            />
            <motion.div
              className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-cream text-5xl shadow-soft"
              animate={{ y: [0, -6, 0] }}
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
