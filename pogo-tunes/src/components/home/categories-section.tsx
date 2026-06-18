"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { categories } from "@/data/content"

export function CategoriesSection() {
  const featured = categories.slice(0, 8)

  return (
    <Section
      title={
        <span>
          What Would You Like to{" "}
          <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Learn</span> Today?
        </span>
      }
      subtitle="Pick a topic and start your learning adventure with Pogo and friends!"
      wave="top"
      waveColor="#FFF8E7"
      className="bg-white"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((cat, i) => (
          <Link key={cat.id} href={cat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.05 }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative overflow-hidden rounded-2xl bg-white/70 p-6 text-center shadow-soft backdrop-blur-xl transition-all duration-300 hover:shadow-card md:p-8 border border-white/50"
            >
              <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at 50% 50%, rgba(255,107,107,0.06), transparent 60%)`,
                }}
              />
              <motion.div
                className="mb-4 text-4xl md:text-5xl"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {cat.emoji}
              </motion.div>
              <h3 className="font-display text-base font-bold text-dark md:text-lg">{cat.title}</h3>
              <p className="mt-1 font-body text-xs text-gray md:text-sm">{cat.ageRange} years</p>
              <motion.div
                className="mx-auto mt-4 h-1 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: cat.gradient, width: 48 }}
              />
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-purple px-6 py-3 font-display text-sm font-bold text-white shadow-soft transition-all duration-300 hover:shadow-glow-coral hover:scale-105"
        >
          View All Categories <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
