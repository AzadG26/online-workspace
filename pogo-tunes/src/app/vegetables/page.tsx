"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { vegetableData } from "@/data/content"

const vegetables = vegetableData.map((v) => ({ label: v.name, emoji: v.emoji }))
const vegetableInteractive = vegetableData.map((v) => ({
  label: v.name,
  emoji: v.emoji,
  phrase: `Healthy ${v.name}!`,
  description: v.fact,
}))

export default function VegetablesPage() {
  return (
    <>
      <CategoryHero
        title="Vegetables"
        description="Discover healthy vegetables! Learn their names and why they're good for you."
        emoji="🥦"
        gradient="linear-gradient(135deg, #6EE7B7, #34D399)"
        color="var(--color-green)"
        categoryId="vegetables"
      />
      <Section title="Healthy Vegetables" subtitle="Tap any vegetable to learn its name!" className="bg-white">
        <LearningGrid items={vegetables} color="#6EE7B7" columns={5} type="emoji" interactiveItems={vegetableInteractive} />
      </Section>
      <Section title="Vegetable Videos" subtitle="Learn about healthy eating!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="vegetables" />
      </Section>
      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-green/5 to-green/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-green-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">Eat Your Veggies!</h2>
          <p className="mt-2 font-body text-gray">Learn more with games and activities.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games"><Button variant="green">Play Games</Button></Link>
            <Link href="/worksheets"><Button variant="outline">Download Worksheets</Button></Link>
          </div>
        </div>
      </Section>
    </>
  )
}
