"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameTimer, triggerConfetti, playChime } from "@/hooks/use-game"

interface Fruit {
  id: number
  emoji: string
  x: number
  y: number
  speed: number
  caught: boolean
  isGolden: boolean
}

const FRUITS = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🍌", "🍉", "🥝"]
const GOLDEN_FRUIT = "⭐"

export function FruitCatch() {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [basketX, setBasketX] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const fruitIdRef = useRef(0)
  const timer = useGameTimer(60)

  scoreRef.current = score
  livesRef.current = lives

  const spawnFruit = useCallback(() => {
    fruitIdRef.current += 1
    const newFruit: Fruit = {
      id: fruitIdRef.current,
      emoji: Math.random() < 0.15 ? GOLDEN_FRUIT : FRUITS[Math.floor(Math.random() * FRUITS.length)],
      x: Math.random() * 85 + 5,
      y: -5,
      speed: Math.random() * 30 + 40,
      caught: false,
      isGolden: false,
    }
    newFruit.isGolden = newFruit.emoji === GOLDEN_FRUIT
    setFruits(prev => [...prev, newFruit])
  }, [])

  const startGame = useCallback(() => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setFruits([])
    scoreRef.current = 0
    livesRef.current = 3
    timer.reset(60)
    timer.start()
  }, [timer])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100
      setBasketX(Math.max(5, Math.min(95, x)))
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
      setBasketX(Math.max(5, Math.min(95, x)))
    }
  }, [])

  useEffect(() => {
    if (!gameStarted || gameOver) return
    const spawnInterval = setInterval(spawnFruit, Math.max(400, 1200 - score * 3))
    return () => clearInterval(spawnInterval)
  }, [gameStarted, gameOver, score, spawnFruit])

  useEffect(() => {
    if (!gameStarted) return
    const interval = setInterval(() => {
      setFruits(prev => {
        const updated = prev.map(f => {
          if (f.caught) return f
          const newY = f.y + f.speed * 0.016
          if (newY >= 92) {
            if (Math.abs(f.x - basketRef.current) < 8 && livesRef.current > 0) {
              playChime(700)
              if (f.isGolden) {
                const points = 5
                scoreRef.current += points
                triggerConfetti(
                  window.innerWidth / 2,
                  window.innerHeight - 100,
                  "#FFD93D",
                )
                return { ...f, caught: true }
              } else {
                scoreRef.current += 1
                return { ...f, caught: true }
              }
            } else {
              livesRef.current -= 1
              playChime(200, "square")
              if (livesRef.current <= 0) {
                timer.stop()
                setGameOver(true)
              }
              return { ...f, caught: true }
            }
          }
          return { ...f, y: newY }
        })
        setScore(scoreRef.current)
        setLives(livesRef.current)
        const active = updated.filter(f => !f.caught)
        return active
      })
    }, 30)
    return () => clearInterval(interval)
  }, [gameStarted, timer])

  const basketRef = useRef(basketX)
  basketRef.current = basketX

  return (
    <div className="relative min-h-[500px]">
      {!gameStarted && (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.span className="text-8xl" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            🧺
          </motion.span>
          <h3 className="mt-6 font-display text-2xl font-bold text-dark">Fruit Catch!</h3>
          <p className="mt-2 font-body text-gray">Move your basket to catch falling fruits!</p>
          <p className="mt-1 font-body text-sm text-gray/60">Watch out — don't miss any!</p>
          <Button variant="green" className="mt-6" onClick={startGame}>
            Start Catching!
          </Button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="mb-4 flex items-center justify-between rounded-xl bg-cream/50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-coral">
                <Star className="h-4 w-4 fill-current" /> {score}
              </span>
              <span className="flex gap-0.5">
                {Array.from({ length: Math.max(0, lives) }, (_, i) => (
                  <Heart key={i} className="h-4 w-4 fill-red text-red" />
                ))}
              </span>
            </div>
            <span className="font-display text-sm font-bold text-sky">⏱ {timer.timeLeft}s</span>
            <Button variant="ghost" size="sm" onClick={startGame}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div
            ref={containerRef}
            className="relative h-[400px] cursor-none overflow-hidden rounded-2xl bg-gradient-to-b from-sky/20 via-white to-green/10"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            <AnimatePresence>
              {fruits.filter(f => !f.caught).map(f => (
                <motion.span
                  key={f.id}
                  className="absolute text-3xl"
                  style={{ left: `${f.x}%`, top: `${f.y}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {f.emoji}
                </motion.span>
              ))}
            </AnimatePresence>

            <motion.div
              className="absolute bottom-4 text-5xl"
              style={{ left: `calc(${basketX}% - 30px)` }}
              animate={{ x: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🧺
            </motion.div>

            {(timer.timeLeft <= 0 || gameOver) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="rounded-2xl bg-white p-8 text-center shadow-card">
                  <span className="text-5xl">{gameOver ? "😢" : "⏰"}</span>
                  <h4 className="mt-4 font-display text-xl font-bold text-dark">
                    {gameOver ? "Game Over!" : "Time's Up!"}
                  </h4>
                  <p className="mt-2 font-body text-gray">Caught {score} fruits!</p>
                  {score >= 20 && <p className="font-display text-sm font-bold text-green">Great job! 🌟</p>}
                  <Button variant="green" className="mt-6" onClick={startGame}>
                    Play Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-center gap-6 text-sm text-gray/60">
            <span>🌟 Golden fruit = 5 points</span>
            <span>❤️ {lives} lives</span>
            <span>🍎 1 point each</span>
          </div>
        </>
      )}
    </div>
  )
}
