"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { animalData } from "@/data/content"

const animals = animalData.map((a) => ({ label: a.name, emoji: a.emoji }))

export default function AnimalsPage() {
  return (
    <>
      <CategoryHero
        title="Animals"
        description="Explore the amazing world of animals! Learn their names, sounds, and fun facts."
        emoji="🐾"
        gradient="linear-gradient(135deg, #6BCBFF, #A0DEFF)"
        color="var(--color-sky)"
        categoryId="animals"
      />

      <Section title="Meet the Animals" subtitle="Tap any animal to learn more!" className="bg-white">
        <LearningGrid items={animals} color="#6BCBFF" columns={5} type="emoji" />
      </Section>

      <Section title="Animal Videos" subtitle="Watch and learn about amazing animals!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="animals" />
      </Section>

      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-sky/5 to-sky/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-sky-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">
            Animal Adventures!
          </h2>
          <p className="mt-2 font-body text-gray">
            Play animal games and explore more activities.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games">
              <Button variant="sky">Play Animal Games</Button>
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
