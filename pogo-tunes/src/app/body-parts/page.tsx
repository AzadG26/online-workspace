"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { bodyPartData } from "@/data/content"

const bodyParts = bodyPartData.map((b) => ({ label: b.name, emoji: b.emoji }))
const bodyPartInteractive = bodyPartData.map((b) => ({
  label: b.name,
  emoji: b.emoji,
  phrase: `These are my ${b.name}!`,
  description: b.fact,
}))

export default function BodyPartsPage() {
  return (
    <>
      <CategoryHero
        title="Body Parts"
        description="Learn about your amazing body! From head to toes, discover how your body works."
        emoji="🧍"
        gradient="linear-gradient(135deg, #FF6B6B, #FF8E8E)"
        color="var(--color-coral)"
        categoryId="body-parts"
      />
      <Section title="My Amazing Body" subtitle="Tap any body part to learn about it!" className="bg-white">
        <LearningGrid items={bodyParts} color="#FF6B6B" columns={5} type="emoji" interactiveItems={bodyPartInteractive} />
      </Section>
      <Section title="Body Parts Videos" subtitle="Sing and dance while learning!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="body-parts" />
      </Section>
      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-coral/5 to-coral/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-coral-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">Move Your Body!</h2>
          <p className="mt-2 font-body text-gray">Play games and learn more about your body.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games"><Button variant="coral">Play Games</Button></Link>
            <Link href="/worksheets"><Button variant="outline">Download Worksheets</Button></Link>
          </div>
        </div>
      </Section>
    </>
  )
}
