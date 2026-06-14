"use client"

import { useState, useCallback, useRef, useEffect } from "react"

export function useGameTimer(initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
  }, [])

  const reset = useCallback((newTime?: number) => {
    stop()
    setTimeLeft(newTime ?? initialTime)
  }, [initialTime, stop])

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  return { timeLeft, isRunning, start, stop, reset }
}

export interface GameScore {
  score: number
  moves: number
  pairs: number
  completed: boolean
}

export function useGameScore() {
  const [score, setScore] = useState<GameScore>({
    score: 0,
    moves: 0,
    pairs: 0,
    completed: false,
  })

  const incrementMoves = useCallback(() => {
    setScore((prev) => ({ ...prev, moves: prev.moves + 1 }))
  }, [])

  const addPoints = useCallback((points: number) => {
    setScore((prev) => ({ ...prev, score: prev.score + points, pairs: prev.pairs + 1 }))
  }, [])

  const complete = useCallback(() => {
    setScore((prev) => ({ ...prev, completed: true }))
  }, [])

  const reset = useCallback(() => {
    setScore({ score: 0, moves: 0, pairs: 0, completed: false })
  }, [])

  return { score, incrementMoves, addPoints, complete, reset }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue] as const
}

export function triggerConfetti(x: number, y: number, color = "#FF6B6B") {
  const colors = ["#FF6B6B", "#FFD93D", "#6BCBFF", "#B28DFF", "#6EE7B7", "#FF9F43"]
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      pointer-events: none;
      z-index: 9999;
      transition: all ${0.8 + Math.random() * 0.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 1;
    `
    document.body.appendChild(particle)
    requestAnimationFrame(() => {
      particle.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${-(Math.random() * 300 + 100)}px) rotate(${Math.random() * 720}deg)`
      particle.style.opacity = "0"
    })
    setTimeout(() => particle.remove(), 1500)
  }
}

export function playChime(freq: number, type: OscillatorType = "sine") {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  } catch {
    // Audio not available
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
