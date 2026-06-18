"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Star, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGameTimer, useGameScore, triggerConfetti, playChime } from "@/hooks/use-game"

interface Balloon {
  id: number
  label: string
  x: number
  y: number
  popped: boolean
  speed: number
  color: string
  size: number
}

const BALLOON_COLORS = ["#FF6B6B", "#6BCBFF", "#FFD93D", "#B28DFF", "#6EE7B7", "#FF9F43"]

type Round = { label: string; items: string[] }

const ROUNDS: Round[] = [
  { label: "Letters A-F", items: ["A","B","C","D","E","F"] },
  { label: "Letters G-L", items: ["G","H","I","J","K","L"] },
  { label: "Letters M-R", items: ["M","N","O","P","Q","R"] },
  { label: "Numbers 1-6", items: ["1","2","3","4","5","6"] },
  { label: "Numbers 7-12", items: ["7","8","9","10","11","12"] },
  { label: "Mixed Challenge", items: ["A","3","E","7","B","9"] },
]

function getRandomBalloon(roundItems: string[], id: number): Balloon {
  return {
    id,
    label: roundItems[Math.floor(Math.random() * roundItems.length)],
    x: Math.random() * 80 + 5,
    y: 105,
    popped: false,
    speed: Math.random() * 15 + 10,
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    size: Math.random() * 12 + 44,
  }
}

export function BalloonPop() {
  const [round, setRound] = useState(0)
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [target, setTarget] = useState("")
  const [targetsHit, setTargetsHit] = useState(0)
  const [totalTargets, setTotalTargets] = useState(10)
  const [message, setMessage] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [showRoundComplete, setShowRoundComplete] = useState(false)
  const animRef = useRef<number>(0)
  const targetRef = useRef<string>("")

  const timer = useGameTimer(60)
  const score = useGameScore()

  const startRound = useCallback((roundIndex: number) => {
    const r = ROUNDS[roundIndex]
    setTargetsHit(0)
    setShowRoundComplete(false)
    setMessage("")
    const newTarget = r.items[Math.floor(Math.random() * r.items.length)]
    setTarget(newTarget)
    targetRef.current = newTarget
    const initialBalloons: Balloon[] = Array.from({ length: 8 }, (_, i) => ({
      ...getRandomBalloon(r.items, i),
      y: Math.random() * 60 + 20,
    }))
    setBalloons(initialBalloons)
    if (!gameStarted) setGameStarted(true)
    timer.reset(60)
    timer.start()
  }, [gameStarted, timer])

  const nextRound = useCallback(() => {
    if (round < ROUNDS.length - 1) {
      setRound(r => r + 1)
    } else {
      score.complete()
      timer.stop()
      setMessage("You won all rounds! 🎉")
    }
  }, [round, score, timer])

  const resetGame = useCallback(() => {
    setRound(0)
    setGameStarted(false)
    setShowRoundComplete(false)
    setMessage("")
    setBalloons([])
    score.reset()
    timer.reset(60)
  }, [score, timer])

  const popBalloon = useCallback((id: number, label: string) => {
    if (balloons.find(b => b.id === id)?.popped) return
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b))

    if (label === targetRef.current) {
      playChime(600)
      triggerConfetti(
        window.innerWidth / 2 + Math.random() * 200 - 100,
        window.innerHeight / 2 + Math.random() * 200 - 100,
      )
      score.addPoints(10)
      setTargetsHit(prev => {
        const newCount = prev + 1
        if (newCount >= totalTargets) {
          setShowRoundComplete(true)
          timer.stop()
          score.addPoints(50)
          playChime(800)
          setTimeout(() => playChime(1000), 150)
          setMessage("Round Complete! 🎈")
        } else {
          const r = ROUNDS[round]
          const newTarget = r.items[Math.floor(Math.random() * r.items.length)]
          setTarget(newTarget)
          targetRef.current = newTarget
        }
        return newCount
      })
    } else {
      playChime(200, "square")
      score.incrementMoves()
    }

    setTimeout(() => {
      setBalloons(prev => {
        const active = prev.filter(b => !b.popped)
        if (active.length < 4) {
          const r = ROUNDS[round]
          const newId = Date.now() + Math.random()
          return [...prev.filter(b => !b.popped), getRandomBalloon(r.items, newId)]
        }
        return prev.filter(b => !b.popped)
      })
    }, 800)
  }, [balloons, round, score, timer, totalTargets])

  useEffect(() => {
    if (!gameStarted) return
    const animate = () => {
      setBalloons(prev => {
        let hasActive = false
        const updated = prev.map(b => {
          if (b.popped) return b
          hasActive = true
          const newY = b.y - b.speed * 0.016
          if (newY < -15) {
            return { ...b, y: 105, x: Math.random() * 80 + 5, label: ROUNDS[round].items[Math.floor(Math.random() * ROUNDS[round].items.length)] }
          }
          return { ...b, y: newY }
        })
        return updated
      })
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [gameStarted, round])

  return (
    <div className="relative min-h-[500px]">
      {!gameStarted && (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.span className="text-8xl" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            🎈
          </motion.span>
          <h3 className="mt-6 font-display text-2xl font-bold text-dark">Balloon Pop!</h3>
          <p className="mt-2 font-body text-gray">Pop the right balloon before it floats away!</p>
          <Button variant="coral" className="mt-6" onClick={() => startRound(0)}>
            Start Playing!
          </Button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-cream/50 p-4">
            <div>
              <span className="font-display text-sm font-semibold text-gray">Round {round + 1}/{ROUNDS.length}</span>
              <span className="mx-2 text-gray/40">|</span>
              <span className="font-body text-sm text-gray">{ROUNDS[round].label}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-display text-sm font-bold text-coral">
                <Star className="h-4 w-4 fill-current" /> Score: {score.score.score}
              </span>
              <span className="font-display text-sm font-bold text-sky">
                ⏱ {timer.timeLeft}s
              </span>
              <Button variant="ghost" size="sm" onClick={resetGame}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-b from-sky/10 via-white to-cream">
            <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-white/80 to-transparent p-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
                <Volume2 className="h-4 w-4 text-coral" />
                <span className="font-display text-lg font-bold text-dark">
                  Pop the <span className="text-coral underline decoration-wavy decoration-coral/30">{target}</span> balloon!
                </span>
              </div>
            </div>

            <AnimatePresence>
              {balloons.map(b => !b.popped && (
                <motion.button
                  key={b.id}
                  className="absolute cursor-pointer select-none"
                  style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.size, height: b.size * 1.2 }}
                  onClick={() => popBalloon(b.id, b.label)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <svg viewBox="0 0 40 50" className="drop-shadow-lg">
                    <ellipse cx="20" cy="22" rx="18" ry="22" fill={b.color} />
                    <ellipse cx="15" cy="15" rx="4" ry="6" fill="white" opacity={0.3} />
                    <polygon points="18,43 22,43 20,50" fill={b.color} opacity={0.8} />
                    <line x1="20" y1="43" x2="20" y2="50" stroke="#999" strokeWidth="0.5" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-white drop-shadow-md">
                    {b.label}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>

            {timer.timeLeft <= 0 && !showRoundComplete && !score.score.completed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="rounded-2xl bg-white p-8 text-center shadow-card">
                  <span className="text-5xl">⏰</span>
                  <h4 className="mt-4 font-display text-xl font-bold text-dark">Time's Up!</h4>
                  <p className="mt-2 font-body text-gray">Score: {score.score.score}</p>
                  <div className="mt-4 flex gap-3">
                    <Button variant="coral" onClick={resetGame}>Play Again</Button>
                    <Button variant="outline" onClick={() => startRound(round)}>Retry Round</Button>
                  </div>
                </div>
              </div>
            )}

            {showRoundComplete && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="rounded-2xl bg-white p-8 text-center shadow-card"
                >
                  <motion.span className="text-6xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    🎉
                  </motion.span>
                  <h4 className="mt-4 font-display text-xl font-bold text-dark">Round Complete!</h4>
                  <p className="mt-2 font-body text-gray">Round Score: {score.score.score}</p>
                  <div className="mt-4 flex gap-3">
                    <Button variant="coral" onClick={nextRound}>
                      {round < ROUNDS.length - 1 ? "Next Round →" : "Finish!"}
                    </Button>
                    <Button variant="outline" onClick={resetGame}>Play Again</Button>
                  </div>
                </motion.div>
              </div>
            )}

            {score.score.completed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="rounded-2xl bg-white p-8 text-center shadow-card"
                >
                  <motion.span className="text-6xl" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
                    🏆
                  </motion.span>
                  <h4 className="mt-4 font-display text-2xl font-bold text-dark">Amazing Job!</h4>
                  <p className="mt-2 font-body text-lg text-gray">Final Score: {score.score.score}</p>
                  <p className="font-display text-sm font-semibold text-coral">Moves: {score.score.moves}</p>
                  <Button variant="coral" className="mt-6" onClick={resetGame}>
                    Play Again
                  </Button>
                </motion.div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-display font-semibold text-gray">
              Popped: {targetsHit}/{totalTargets}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: ROUNDS.length }, (_, i) => (
                <span key={i} className={`h-2 w-4 rounded-full ${i === round ? "bg-coral" : i < round ? "bg-green" : "bg-gray/20"}`} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
