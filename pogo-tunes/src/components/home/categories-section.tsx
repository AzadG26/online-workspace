"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { categories } from "@/data/content"

export function CategoriesSection() {
  const featured = categories.slice(0, 8)

  return (
    <Section
      title="What Would You Like to Learn Today?"
      subtitle="Pick a topic and start your learning adventure with Pogo and friends!"
      wave="top"
      waveColor="#FFF8E7"
      className="bg-white"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((cat, i) => (
          <Link key={cat.id} href={cat.href}>
            <Card delay={i * 0.05} className="group p-6 text-center md:p-8">
              <motion.div
                className="mb-4 text-4xl md:text-5xl"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {cat.emoji}
              </motion.div>
              <CardTitle className="text-base md:text-lg">{cat.title}</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                {cat.ageRange} years
              </CardDescription>
              <div
                className="mx-auto mt-4 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: cat.gradient }}
              />
            </Card>
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
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral to-purple px-6 py-3 font-display text-sm font-bold text-white shadow-soft transition-all hover:shadow-card hover:scale-105"
        >
          View All Categories <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </Section>
  )
}
