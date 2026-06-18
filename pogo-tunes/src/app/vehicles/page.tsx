"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"
import { vehicleData } from "@/data/content"

const vehicles = vehicleData.map((v) => ({ label: v.name, emoji: v.emoji }))
const vehicleInteractive = vehicleData.map((v) => ({
  label: v.name,
  emoji: v.emoji,
  phrase: `Vroom! It's a ${v.name}!`,
  description: v.fact,
}))

export default function VehiclesPage() {
  return (
    <>
      <CategoryHero
        title="Vehicles"
        description="Vroom vroom! Learn all about cars, trains, planes, and things that go!"
        emoji="🚗"
        gradient="linear-gradient(135deg, #FFD93D, #F59E0B)"
        color="var(--color-yellow)"
        categoryId="vehicles"
      />
      <Section title="Things That Go!" subtitle="Tap any vehicle to learn its name!" className="bg-white">
        <LearningGrid items={vehicles} color="#FFD93D" columns={5} type="emoji" interactiveItems={vehicleInteractive} />
      </Section>
      <Section title="Vehicle Videos" subtitle="Watch vehicles in action!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="vehicles" />
      </Section>
      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-yellow/5 to-yellow/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-yellow-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">Let's Go!</h2>
          <p className="mt-2 font-body text-gray">Discover more vehicle fun and games.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games"><Button variant="yellow">Play Games</Button></Link>
            <Link href="/worksheets"><Button variant="outline">Download Worksheets</Button></Link>
          </div>
        </div>
      </Section>
    </>
  )
}
