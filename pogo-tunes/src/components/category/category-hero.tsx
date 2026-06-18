"use client"

import { motion } from "framer-motion"
import { categories } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { categorySchema, breadcrumbSchema } from "@/lib/structured-data"

const floatingIcons = ["⭐", "✨", "🌈", "🎵", "💫"]

interface CategoryHeroProps {
  title: string
  description: string
  emoji: string
  gradient: string
  color: string
  categoryId?: string
}

export function CategoryHero({ title, description, emoji, gradient, color, categoryId }: CategoryHeroProps) {
  const cat = categoryId ? categories.find((c) => c.id === categoryId) : null

  return (
    <>
      {cat && (
        <StructuredData
          schema={[
            categorySchema(cat),
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Categories", url: "/categories" },
              { name: cat.title, url: cat.href },
            ]),
          ]}
        />
      )}
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${color}20, #FFF8E7 50%, #FFFFFF)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,107,0.06),transparent_50%)]" />
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20 pointer-events-none"
            style={{ top: `${15 + i * 12}%`, left: `${i % 2 === 0 ? 5 : 90}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            {icon}
          </motion.div>
        ))}

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl text-6xl shadow-float md:h-40 md:w-40 md:text-7xl"
              style={{ background: gradient }}
            >
              <motion.div
                className="absolute -inset-2 rounded-3xl opacity-30 blur-xl"
                style={{ background: gradient }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative drop-shadow-lg">{emoji}</span>
            </motion.div>

            <div className="text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="font-display text-4xl font-bold text-dark md:text-5xl lg:text-6xl"
              >
                Let's Learn{" "}
                <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{
                  backgroundImage: `linear-gradient(135deg, ${color}, ${color}cc)`,
                }}>{title}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 20 }}
                className="mt-4 max-w-2xl font-body text-lg text-gray"
              >
                {description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
