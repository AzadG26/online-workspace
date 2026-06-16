"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { categories } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { categorySchema, breadcrumbSchema } from "@/lib/structured-data"

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
      <section
      className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16"
      style={{
        background: `linear-gradient(135deg, ${color}15, #FFF8E7, #FFFFFF)`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl text-6xl shadow-float md:h-40 md:w-40 md:text-7xl"
            style={{ background: gradient }}
          >
            {emoji}
          </motion.div>

          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl font-bold text-dark md:text-5xl lg:text-6xl"
            >
              Let's Learn{" "}
              <span style={{ color }}>{title}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
