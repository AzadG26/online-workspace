"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { colorData } from "@/data/content"

const colors = colorData.map((c) => ({ label: c.name, color: c.hex }))

export default function ColorsPage() {
  return (
    <>
      <CategoryHero
        title="Colors"
        description="Discover the wonderful world of colors! Learn to name and identify them."
        emoji="🎨"
        gradient="linear-gradient(135deg, #6EE7B7, #96F0CC)"
        color="var(--color-green)"
        categoryId="colors"
      />

      <Section title="Color Palette" subtitle="Tap any color to learn its name!" className="bg-white">
        <LearningGrid items={colors} color="#6EE7B7" columns={5} type="color" />
      </Section>

      <Section title="Color Songs & Videos" subtitle="Sing along with our color songs!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="colors" />
      </Section>

      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-green/5 to-green/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-green-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">
            Colorful World!
          </h2>
          <p className="mt-2 font-body text-gray">
            Play color games and explore more activities.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games">
              <Button variant="green">Play Color Games</Button>
            </Link>
            <Link href="/worksheets">
              <Button variant="outline">Download Worksheets</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
