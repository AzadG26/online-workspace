"use client"

import { Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { abcLetters } from "@/data/content"

const letters = abcLetters.map((l) => ({ label: l }))

export default function ABCPage() {
  return (
    <>
      <CategoryHero
        title="ABCs"
        description="Learn all the letters from A to Z with fun songs, games, and activities!"
        emoji="🔤"
        gradient="linear-gradient(135deg, #FF6B6B, #FF8E8E)"
        color="var(--color-coral)"
        categoryId="abc"
      />

      <Section title="Alphabet Letters" subtitle="Tap any letter to start learning!" className="bg-white">
        <LearningGrid items={letters} color="#FF6B6B" columns={6} />
      </Section>

      <Section title="ABC Songs & Videos" subtitle="Sing along with our ABC videos!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="abc" />
      </Section>

      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-coral/5 to-coral/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-coral" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">
            Practice Makes Perfect!
          </h2>
          <p className="mt-2 font-body text-gray">
            Try our ABC games and worksheets for more practice.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games">
              <Button variant="coral">Play ABC Games</Button>
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
