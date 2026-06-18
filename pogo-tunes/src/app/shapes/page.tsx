"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { shapeData } from "@/data/content"

const shapes = shapeData.map((s) => ({ label: s.name, emoji: s.emoji }))
const shapeInteractive = shapeData.map((s) => ({
  label: s.name,
  emoji: s.emoji,
  phrase: `It's a ${s.name}!`,
  description: s.fact,
}))

export default function ShapesPage() {
  return (
    <>
      <CategoryHero
        title="Shapes"
        description="Learn all about shapes! Circles, squares, triangles, and more fun shapes to discover."
        emoji="🔷"
        gradient="linear-gradient(135deg, #6EE7B7, #96F0CC)"
        color="var(--color-green)"
        categoryId="shapes"
      />
      <Section title="Fun Shapes" subtitle="Tap any shape to learn its name!" className="bg-white">
        <LearningGrid items={shapes} color="#6EE7B7" columns={5} type="emoji" interactiveItems={shapeInteractive} />
      </Section>
      <Section title="Shape Videos" subtitle="Sing along with shape songs!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="shapes" />
      </Section>
      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-green/5 to-green/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-green-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">Shape Adventures!</h2>
          <p className="mt-2 font-body text-gray">Play shape games and explore more activities.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games"><Button variant="green">Play Shape Games</Button></Link>
            <Link href="/worksheets"><Button variant="outline">Download Worksheets</Button></Link>
          </div>
        </div>
      </Section>
    </>
  )
}
