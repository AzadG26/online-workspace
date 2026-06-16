"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { hindiVarnamala } from "@/data/content"

const letters = hindiVarnamala.map((l) => ({ label: l }))

export default function HindiPage() {
  return (
    <>
      <CategoryHero
        title="Hindi"
        description="Discover Hindi alphabets (Varnamala) with fun songs, games, and activities!"
        emoji="🕉️"
        gradient="linear-gradient(135deg, #B28DFF, #CCB0FF)"
        color="var(--color-purple)"
        categoryId="hindi"
      />

      <Section title="Hindi Varnamala" subtitle="Tap any letter to start learning!" className="bg-white">
        <LearningGrid items={letters} color="#B28DFF" columns={5} />
      </Section>

      <Section title="Hindi Learning Videos" subtitle="Watch and learn Hindi the fun way!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="hindi" />
      </Section>

      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-purple/5 to-purple/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-purple-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">
            Keep Learning Hindi!
          </h2>
          <p className="mt-2 font-body text-gray">
            Practice with games and downloadable worksheets.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games">
              <Button variant="purple">Play Hindi Games</Button>
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
