"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameTimer, useGameScore, triggerConfetti, playChime } from "@/hooks/use-game"

interface Pair { word: string; opposite: string; emoji: string; oppositeEmoji: string }

const PAIRS: Pair[] = [
  { word: "Big", opposite: "Small", emoji: "🐘", oppositeEmoji: "🐭" },
  { word: "Hot", opposite: "Cold", emoji: "☀️", oppositeEmoji: "❄️" },
  { word: "Fast", opposite: "Slow", emoji: "🐆", oppositeEmoji: "🐢" },
  { word: "Up", opposite: "Down", emoji: "⬆️", oppositeEmoji: "⬇️" },
  { word: "Day", opposite: "Night", emoji: "☀️", oppositeEmoji: "🌙" },
  { word: "Happy", opposite: "Sad", emoji: "😊", oppositeEmoji: "😢" },
  { word: "Full", opposite: "Empty", emoji: "📥", oppositeEmoji: "📤" },
  { word: "Wet", opposite: "Dry", emoji: "💧", oppositeEmoji: "🏜️" },
  { word: "Loud", opposite: "Quiet", emoji: "📢", oppositeEmoji: "🤫" },
  { word: "Light", opposite: "Heavy", emoji: "🪶", oppositeEmoji: "🪨" },
  { word: "Tall", opposite: "Short", emoji: "🌳", oppositeEmoji: "🌱" },
  { word: "Fast", opposite: "Slow", emoji: "🚀", oppositeEmoji: "🐌" },
]

interface Card {
  id: string
  text: string
  emoji: string
  pairIndex: number
  side: "left" | "right"
  matched: boolean
}

export default function OppositesPage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [cards, setCards] = useState<Card[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [pairsFound, setPairsFound] = useState(0)
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const timer = useGameTimer(120)
  const score = useGameScore()

  const pairCount = 8

  const initGame = useCallback(() => {
    const shuffledPairs = [...PAIRS].sort(() => Math.random() - 0.5).slice(0, pairCount)
    const leftCards: Card[] = shuffledPairs.map((p, i) => ({
      id: `left-${i}`, text: p.word, emoji: p.emoji, pairIndex: i, side: "left", matched: false,
    }))
    const rightCards: Card[] = shuffledPairs.map((p, i) => ({
      id: `right-${i}`, text: p.opposite, emoji: p.oppositeEmoji, pairIndex: i, side: "right", matched: false,
    }))
    rightCards.sort(() => Math.random() - 0.5)
    setCards([...leftCards, ...rightCards])
    setSelected(null)
    setPairsFound(0)
    setFeedback(null)
    score.reset()
    timer.reset(120)
    timer.start()
    setGameStarted(true)
  }, [score, timer])

  const handleCardClick = useCallback((card: Card) => {
    if (card.matched || feedback) return
    if (!selected) {
      setSelected(card.id)
      return
    }
    if (selected === card.id) {
      setSelected(null)
      return
    }
    const firstCard = cards.find(c => c.id === selected)
    if (!firstCard) { setSelected(null); return }

    if (firstCard.pairIndex === card.pairIndex && firstCard.side !== card.side) {
      setFeedback("correct")
      playChime(600)
      setTimeout(() => playChime(800), 150)
      setCards(prev => prev.map(c =>
        c.id === firstCard.id || c.id === card.id ? { ...c, matched: true } : c
      ))
      score.addPoints(10)
      const newCount = pairsFound + 1
      setPairsFound(newCount)
      if (newCount >= pairCount) {
        timer.stop()
        score.complete()
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
      }
      setTimeout(() => { setFeedback(null); setSelected(null) }, 500)
    } else {
      setFeedback("wrong")
      score.incrementMoves()
      playChime(200, "square")
      setTimeout(() => { setFeedback(null); setSelected(null) }, 600)
    }
  }, [selected, cards, feedback, score, timer, pairsFound, pairCount])

  return (
    <div className="min-h-screen bg-gradient-to-b from-coral/5 via-cream to-white pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <motion.span className="inline-block text-6xl" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            ↔️
          </motion.span>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark md:text-5xl">
            Opposites <span className="text-gradient-coral">Match</span>
          </h1>
          <p className="mt-2 font-body text-lg text-gray">Match each word with its opposite!</p>
        </div>

        {!gameStarted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12 text-center">
            <p className="font-display text-lg font-bold text-dark">Match {pairCount} pairs of opposites! 🎯</p>
            <p className="mt-2 font-body text-sm text-gray/60">Big ↔ Small • Hot ↔ Cold • Up ↔ Down • and more!</p>
            <Button variant="coral" size="lg" className="mt-8" onClick={initGame}>
              Start Matching!
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-cream/50 p-4">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-coral">
                <Star className="h-4 w-4 fill-current" /> {score.score.score}
              </span>
              <span className="font-display text-sm font-bold text-sky">⏱ {timer.timeLeft}s</span>
              <span className="font-display text-sm font-bold text-gray">{pairsFound}/{pairCount} matched</span>
              <Button variant="ghost" size="sm" onClick={initGame}><RefreshCw className="h-4 w-4" /></Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <p className="font-display text-center text-xs font-bold uppercase tracking-wider text-coral">Word</p>
                {cards.filter(c => c.side === "left").map(card => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    className={`w-full rounded-2xl p-4 text-center font-display text-lg font-bold transition-all ${
                      card.matched ? "bg-green/10 opacity-50" :
                      selected === card.id ? "bg-coral text-white shadow-md scale-105" :
                      "bg-white shadow-soft hover:shadow-card hover:-translate-y-0.5"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    disabled={card.matched}
                  >
                    {card.emoji} {card.text}
                  </motion.button>
                ))}
              </div>
              <div className="space-y-3">
                <p className="font-display text-center text-xs font-bold uppercase tracking-wider text-purple">Opposite</p>
                {cards.filter(c => c.side === "right").map(card => (
                  <motion.button
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    className={`w-full rounded-2xl p-4 text-center font-display text-lg font-bold transition-all ${
                      card.matched ? "bg-green/10 opacity-50" :
                      selected === card.id ? "bg-purple text-white shadow-md scale-105" :
                      "bg-white shadow-soft hover:shadow-card hover:-translate-y-0.5"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    disabled={card.matched}
                  >
                    {card.emoji} {card.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {(timer.timeLeft <= 0 || score.score.completed) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-2xl bg-white p-8 text-center shadow-card">
                  <motion.span className="text-6xl" animate={score.score.completed ? { rotate: 360 } : {}} transition={{ repeat: score.score.completed ? Infinity : 0, duration: 3, ease: "linear" }}>
                    {score.score.completed ? "🏆" : "⏰"}
                  </motion.span>
                  <h4 className="mt-4 font-display text-2xl font-bold text-dark">
                    {score.score.completed ? "Opposites Master!" : "Time's Up!"}
                  </h4>
                  <p className="mt-2 font-body text-lg text-gray">Score: {score.score.score}</p>
                  <p className="font-body text-sm text-gray/60">{pairsFound}/{pairCount} pairs matched</p>
                  <Button variant="coral" className="mt-6" onClick={initGame}>
                    Play Again
                  </Button>
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
