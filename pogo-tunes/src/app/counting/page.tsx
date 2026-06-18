"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"

import { numberInteractive } from "@/data/learning"

const numbers = Array.from({ length: 20 }, (_, i) => ({
  label: String(i + 1),
  emoji: ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟",
          "💯","🔢","🔢","🔢","🔢","🔢","🔢","🔢","🔢","🔢"][i],
}))

export default function CountingPage() {
  return (
    <>
      <CategoryHero
        title="Counting"
        description="Learn numbers 1 to 100 with fun counting songs, games, and activities!"
        emoji="🔢"
        gradient="linear-gradient(135deg, #FFD93D, #FFE680)"
        color="var(--color-yellow)"
        categoryId="counting"
      />

      <Section title="Numbers 1-10" subtitle="Tap any number to learn more!" className="bg-white">
        <LearningGrid items={numbers.slice(0, 10)} color="#FFD93D" columns={5} type="emoji" interactiveItems={numberInteractive} />
      </Section>

      <Section title="Numbers 11-20" subtitle="Count higher and higher!" className="bg-gradient-to-b from-white to-cream">
        <LearningGrid items={numbers.slice(10, 20)} color="#FFD93D" columns={5} type="emoji" />
      </Section>

      <Section title="Counting Videos" subtitle="Sing along and learn to count!" className="bg-white" wave="top" waveColor="#FFFFFF">
        <VideoRow category="counting" />
      </Section>

      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-yellow/5 to-yellow/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-yellow-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">
            Keep Counting!
          </h2>
          <p className="mt-2 font-body text-gray">
            Play counting games and download practice worksheets.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games">
              <Button variant="yellow">Play Number Games</Button>
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
