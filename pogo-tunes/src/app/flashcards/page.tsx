"use client"

import { useState, useEffect, useCallback, useMemo, type Dispatch, type SetStateAction } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle, RotateCcw, ChevronLeft, ChevronRight, Play, Pause, Keyboard } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { abcLetters, animalData, colorData } from "@/data/content"
import { StructuredData } from "@/components/structured-data"
import { collectionPageSchema, breadcrumbSchema } from "@/lib/structured-data"

const CATEGORIES = [
  { id: "letters", label: "Letters", emoji: "🔤" },
  { id: "animals", label: "Animals", emoji: "🐾" },
  { id: "colors", label: "Colors", emoji: "🎨" },
] as const

type FlashCard = { front: string; back: string; type: string }

function generateCards(category: string): FlashCard[] {
  switch (category) {
    case "letters":
      return abcLetters.map((l) => ({
        front: l,
        back: `${l} is for ${["Apple", "Ball", "Cat", "Dog", "Egg", "Fish", "Green", "Hat", "Ice", "Jump", "Kite", "Lion", "Moon", "Nest", "Orange", "Pig", "Queen", "Rabbit", "Sun", "Tree", "Umbrella", "Van", "Water", "Fox", "Yarn", "Zebra"][abcLetters.indexOf(l)]}`,
        type: "letter" as const,
      }))
    case "animals":
      return animalData.slice(0, 10).map((a) => ({
        front: a.emoji,
        back: `${a.name} — ${a.fact}`,
        type: "animal" as const,
      }))
    case "colors":
      return colorData.slice(0, 10).map((c) => ({
        front: c.emoji,
        back: c.name,
        type: "color" as const,
      }))
    default:
      return []
  }
}

export default function FlashcardsPage() {
  const [category, setCategory] = useState<"letters" | "animals" | "colors">("letters")
  const [cards, setCards] = useState<FlashCard[]>(() => generateCards("letters"))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  const current = cards[currentIndex]

  const changeCategory = useCallback((cat: "letters" | "animals" | "colors") => {
    setCategory(cat)
    setCards(generateCards(cat))
    setCurrentIndex(0)
    setIsFlipped(false)
    setIsAutoPlaying(false)
  }, [])

  const next = useCallback(() => {
    if (isFlipped) setIsFlipped(false)
    setCurrentIndex((p) => (p + 1) % cards.length)
  }, [cards.length, isFlipped])

  const prev = useCallback(() => {
    if (isFlipped) setIsFlipped(false)
    setCurrentIndex((p) => (p - 1 + cards.length) % cards.length)
  }, [cards.length, isFlipped])

  const shuffle = useCallback(() => {
    setIsFlipped(false)
    setIsAutoPlaying(false)
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
  }, [])

  const reset = useCallback(() => {
    setIsFlipped(false)
    setIsAutoPlaying(false)
    setCards(generateCards(category))
    setCurrentIndex(0)
  }, [category])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((p) => !p)
    if (isFlipped) setIsFlipped(false)
  }, [isFlipped])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % cards.length)
      setIsFlipped(false)
    }, 3000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, cards.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        setIsFlipped((p) => !p)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [next, prev])

  return (
    <>
      <StructuredData
        schema={[
          collectionPageSchema("Flashcards", "Interactive flashcards for kids to learn letters, animals, and colors.", "/flashcards", 100),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Flashcards", url: "/flashcards" },
          ]),
        ]}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-purple/10 via-cream to-white pt-24 pb-12 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl font-bold text-dark md:text-5xl"
          >
            <span className="text-gradient-purple">Flashcards</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg text-gray"
          >
            Flip cards to learn letters, animals, and more!
          </motion.p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => changeCategory(cat.id)}
                className={`rounded-full px-5 py-2 font-display text-sm font-bold transition-all ${
                  category === cat.id
                    ? "bg-purple text-white shadow-glow-purple"
                    : "bg-cream text-gray hover:bg-purple/10"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={shuffle}
              className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-purple/10 hover:text-purple"
              aria-label="Shuffle cards"
            >
              <Shuffle className="h-4 w-4" /> Shuffle
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-display text-sm font-semibold text-gray transition-all hover:bg-coral/10 hover:text-coral"
              aria-label="Reset cards"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-semibold transition-all ${
                isAutoPlaying
                  ? "bg-purple text-white shadow-glow-purple"
                  : "bg-cream text-gray hover:bg-purple/10"
              }`}
              aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isAutoPlaying ? "Pause" : "Auto"}
            </button>
          </div>

          <div
            className="relative h-64 w-full cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
            role="button"
            tabIndex={0}
            aria-label={`Flashcard ${currentIndex + 1} of ${cards.length}: ${isFlipped ? current.back : current.front}. Press Space or Enter to flip.`}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault()
                setIsFlipped((p) => !p)
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex + (isFlipped ? "-flipped" : "")}
                initial={{ opacity: 0, scale: 0.8, rotateY: isFlipped ? 180 : 0 }}
                animate={{ opacity: 1, scale: 1, rotateY: isFlipped ? 180 : 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex h-full w-full flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-purple/10 to-coral/10 p-8 text-center shadow-card"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-6xl md:text-7xl">{isFlipped ? current.back : current.front}</span>
                <p className="mt-4 font-display text-sm text-gray">
                  {isFlipped ? "Tap to flip back" : "Tap to flip"}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center gap-6">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft transition-all hover:shadow-card"
              aria-label="Previous card"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-display text-sm font-bold text-gray" aria-live="polite">
              {currentIndex + 1} / {cards.length}
            </span>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft transition-all hover:shadow-card"
              aria-label="Next card"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 font-body text-xs text-gray">
            <Keyboard className="h-3 w-3" /> Use ← → arrows to navigate, Space to flip
          </div>
        </div>
      </Section>
    </>
  )
}
