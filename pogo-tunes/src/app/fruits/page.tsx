"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { fruitData } from "@/data/content"

const fruits = fruitData.map((f) => ({ label: f.name, emoji: f.emoji }))
const fruitInteractive = fruitData.map((f) => ({
  label: f.name,
  emoji: f.emoji,
  phrase: `Yummy ${f.name}!`,
  description: f.fact,
}))

export default function FruitsPage() {
  return (
    <>
      <CategoryHero
        title="Fruits"
        description="Learn the names of delicious fruits! From apples to watermelons, discover healthy eating."
        emoji="🍎"
        gradient="linear-gradient(135deg, #FF6B6B, #FF9F43)"
        color="var(--color-coral)"
        categoryId="fruits"
      />
      <Section title="Yummy Fruits" subtitle="Tap any fruit to learn its name!" className="bg-white">
        <LearningGrid items={fruits} color="#FF6B6B" columns={5} type="emoji" interactiveItems={fruitInteractive} />
      </Section>
      <Section title="Fruit Videos" subtitle="Sing along and learn fruit names!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="fruits" />
      </Section>
      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-coral/5 to-coral/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-coral-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">Fruit Fun!</h2>
          <p className="mt-2 font-body text-gray">Eat healthy and play fruit games!</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games"><Button variant="coral">Play Fruit Games</Button></Link>
            <Link href="/worksheets"><Button variant="outline">Download Worksheets</Button></Link>
          </div>
        </div>
      </Section>
    </>
  )
}
