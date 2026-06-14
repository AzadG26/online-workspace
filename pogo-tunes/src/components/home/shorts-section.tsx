"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { shorts } from "@/data/content"

export function ShortsSection() {
  return (
    <Section
      title="Quick Learning Shorts"
      subtitle="Bite-sized fun for little learners!"
      className="bg-white"
    >
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {shorts.map((short, i) => (
          <Link key={short.id} href={short.href} className="snap-start shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="flex h-44 w-32 flex-col items-center justify-center rounded-2xl p-4 text-center shadow-soft transition-all duration-300 hover:shadow-card md:h-52 md:w-40"
              style={{
                background: `linear-gradient(135deg, ${short.color}, ${short.color}88)`,
              }}
            >
              <motion.span
                className="text-4xl md:text-5xl"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {short.emoji}
              </motion.span>
              <p className="mt-3 font-display text-sm font-bold text-white">{short.title}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <Link
          href="/shorts"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple to-sky px-6 py-3 font-display text-sm font-bold text-white shadow-soft transition-all hover:shadow-card hover:scale-105"
        >
          View All Shorts <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
