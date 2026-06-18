"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { triggerConfetti, playChime } from "@/hooks/use-game"

interface Dot {
  id: number
  number: number
  x: number
  y: number
}

interface Line {
  from: number
  to: number
}

const PICTURES = [
  { emoji: "🐶", name: "Puppy", hint: "A cute puppy face!" },
  { emoji: "🌈", name: "Rainbow", hint: "A colorful rainbow!" },
  { emoji: "🦋", name: "Butterfly", hint: "A beautiful butterfly!" },
]

function generateDots(): Dot[] {
  const dots: Dot[] = []
  const cols = 5
  const rows = 4
  const xPadding = 15
  const yPadding = 18
  const xStep = (70 - xPadding * 2) / (cols - 1)
  const yStep = (65 - yPadding * 2) / (rows - 1)
  let id = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      id++
      const jitterX = (Math.random() - 0.5) * 7
      const jitterY = (Math.random() - 0.5) * 7
      dots.push({
        id,
        number: id,
        x: xPadding + c * xStep + jitterX,
        y: yPadding + r * yStep + jitterY,
      })
    }
  }
  return dots
}

export function ConnectDots() {
  const [dots, setDots] = useState<Dot[]>([])
  const [currentNum, setCurrentNum] = useState(1)
  const [lines, setLines] = useState<Line[]>([])
  const [pictureIndex, setPictureIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const dotsRef = useRef<Dot[]>([])

  const startGame = useCallback(() => {
    const d = generateDots()
    setDots(d)
    dotsRef.current = d
    setCurrentNum(1)
    setLines([])
    setRevealed(false)
    setGameStarted(true)
    setElapsed(0)
  }, [])

  useEffect(() => {
    if (!gameStarted || revealed) return
    const interval = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(interval)
  }, [gameStarted, revealed])

  const nextPicture = useCallback(() => {
    if (pictureIndex < PICTURES.length - 1) {
      setPictureIndex(i => i + 1)
      const d = generateDots()
      setDots(d)
      dotsRef.current = d
      setCurrentNum(1)
      setLines([])
      setRevealed(false)
      setElapsed(0)
    }
  }, [pictureIndex])

  const tapDot = useCallback((dot: Dot) => {
    if (dot.number !== currentNum) {
      playChime(200, "square")
      return
    }
    playChime(500 + dot.number * 20)
    if (currentNum > 1) {
      setLines(prev => [...prev, { from: currentNum - 1, to: currentNum }])
    }
    if (currentNum === 20) {
      setRevealed(true)
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2)
      playChime(800)
      setTimeout(() => playChime(1000), 200)
    } else {
      setCurrentNum(n => n + 1)
    }
  }, [currentNum])

  return (
    <div className="relative min-h-[500px]">
      {!gameStarted && (
        <div className="flex flex-col items-center justify-center py-16">
          <motion.span className="text-8xl" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            {PICTURES[0].emoji}
          </motion.span>
          <h3 className="mt-6 font-display text-2xl font-bold text-dark">Connect the Dots!</h3>
          <p className="mt-2 font-body text-gray">Tap numbers 1 to 20 in order to reveal a surprise picture!</p>
          <Button variant="purple" className="mt-6" onClick={startGame}>
            Start Connecting!
          </Button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="mb-4 flex items-center justify-between rounded-xl bg-cream/50 p-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold text-purple">
                {PICTURES[pictureIndex].emoji} {PICTURES[pictureIndex].name}
              </span>
              <span className="font-display text-sm text-gray">#{pictureIndex + 1}/{PICTURES.length}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-bold text-sky">⏱ {elapsed}s</span>
              <span className="font-display text-sm font-bold text-purple">{currentNum - 1}/20</span>
              <Button variant="ghost" size="sm" onClick={startGame}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-b from-purple/5 via-white to-cream">
            <svg className="absolute inset-0 h-full w-full">
              {dots.map((dot) => {
                const line = lines.find(l => l.to === dot.number)
                if (!line) return null
                const fromDot = dots.find(d => d.number === line.from)
                if (!fromDot) return null
                return (
                  <line
                    key={`line-${dot.number}`}
                    x1={`${fromDot.x}%`}
                    y1={`${fromDot.y}%`}
                    x2={`${dot.x}%`}
                    y2={`${dot.y}%`}
                    stroke="#B28DFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                  />
                )
              })}
            </svg>

            {dots.map(dot => {
              const isDone = dot.number < currentNum
              const isCurrent = dot.number === currentNum
              return (
                <motion.button
                  key={dot.id}
                  className={`absolute flex items-center justify-center rounded-full font-display font-bold text-white transition-all ${
                    isDone ? "bg-purple shadow-md scale-90" :
                    isCurrent ? "bg-purple shadow-lg" : "bg-purple/40 hover:bg-purple/60"
                  }`}
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: isCurrent ? 38 : 32,
                    height: isCurrent ? 38 : 32,
                    zIndex: isCurrent ? 10 : 1,
                  }}
                  onClick={() => tapDot(dot)}
                  whileHover={isCurrent ? { scale: 1.15 } : { scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="drop-shadow-sm text-xs">{dot.number}</span>
                </motion.button>
              )
            })}

            {revealed && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm"
              >
                <div className="text-center">
                  <motion.span
                    className="text-8xl"
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {PICTURES[pictureIndex].emoji}
                  </motion.span>
                  <p className="mt-4 font-display text-xl font-bold text-dark">{PICTURES[pictureIndex].hint}</p>
                  <p className="mt-1 font-body text-sm text-gray">Completed in {elapsed}s!</p>
                  <div className="mt-6 flex gap-3 justify-center">
                    {pictureIndex < PICTURES.length - 1 ? (
                      <Button variant="purple" onClick={nextPicture}>Next Picture →</Button>
                    ) : (
                      <Button variant="purple" onClick={startGame}>Play Again</Button>
                    )}
                    <Button variant="outline" onClick={startGame}>Restart</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-3 text-center font-body text-sm text-gray/60">
            {currentNum <= 20 ? (
              <>Tap dot <span className="font-bold text-purple">{currentNum}</span> to continue!</>
            ) : revealed ? (
              <span className="font-semibold text-purple">Amazing! You completed the picture! 🌟</span>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
