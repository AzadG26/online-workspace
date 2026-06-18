"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { birdData } from "@/data/content"

const birds = birdData.map((b) => ({ label: b.name, emoji: b.emoji }))
const birdInteractive = birdData.map((b) => ({
  label: b.name,
  emoji: b.emoji,
  phrase: `Look! A ${b.name}!`,
  description: b.fact,
}))

export default function BirdsPage() {
  return (
    <>
      <CategoryHero
        title="Birds"
        description="Fly into the world of birds! Learn about parrots, eagles, penguins, and more."
        emoji="🦜"
        gradient="linear-gradient(135deg, #B28DFF, #818CF8)"
        color="var(--color-purple)"
        categoryId="birds"
      />
      <Section title="Beautiful Birds" subtitle="Tap any bird to learn its name!" className="bg-white">
        <LearningGrid items={birds} color="#B28DFF" columns={5} type="emoji" interactiveItems={birdInteractive} />
      </Section>
      <Section title="Bird Videos" subtitle="Watch and learn about birds!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="birds" />
      </Section>
      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-purple/5 to-purple/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-purple-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">Bird Watching!</h2>
          <p className="mt-2 font-body text-gray">Explore more bird activities and games.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games"><Button variant="purple">Play Games</Button></Link>
            <Link href="/worksheets"><Button variant="outline">Download Worksheets</Button></Link>
          </div>
        </div>
      </Section>
    </>
  )
}
