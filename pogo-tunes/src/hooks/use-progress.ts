"use client"

import { useState, useCallback, useEffect } from "react"

export type GameResult = {
  gameId: string
  gameTitle: string
  score: number
  completed: boolean
  timestamp: number
}

export type QuizResult = {
  category: string
  score: number
  total: number
  timestamp: number
}

export type Achievement = {
  id: string
  title: string
  description: string
  emoji: string
  unlockedAt: number | null
}

export type ProgressData = {
  gamesPlayed: GameResult[]
  quizResults: QuizResult[]
  achievements: Achievement[]
  totalScore: number
  streak: number
  lastPlayed: number | null
  totalPlayTime: number
}

const STORAGE_KEY = "pogo-tunes-progress"

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: "first-game", title: "First Steps", description: "Play your first game", emoji: "🎮", unlockedAt: null },
  { id: "five-games", title: "Game Explorer", description: "Play 5 different games", emoji: "🎯", unlockedAt: null },
  { id: "all-games", title: "Game Master", description: "Play all 10 games", emoji: "🏆", unlockedAt: null },
  { id: "quiz-perfect", title: "Quiz Whiz", description: "Get a perfect score on any quiz", emoji: "🧠", unlockedAt: null },
  { id: "quiz-master", title: "Quiz Champion", description: "Complete 3 quiz categories", emoji: "👑", unlockedAt: null },
  { id: "score-100", title: "Century Club", description: "Earn 100 points total", emoji: "💯", unlockedAt: null },
  { id: "score-500", title: "High Scorer", description: "Earn 500 points total", emoji: "🌟", unlockedAt: null },
  { id: "score-1000", title: "Super Star", description: "Earn 1000 points total", emoji: "⭐", unlockedAt: null },
  { id: "streak-3", title: "Coming Back", description: "Play 3 days in a row", emoji: "🔥", unlockedAt: null },
  { id: "streak-7", title: "Dedicated", description: "Play 7 days in a row", emoji: "💪", unlockedAt: null },
  { id: "memory-win", title: "Memory Champ", description: "Complete Memory Match", emoji: "🧩", unlockedAt: null },
  { id: "pattern-pro", title: "Pattern Pro", description: "Complete Pattern Match level 10", emoji: "🔷", unlockedAt: null },
]

function loadProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw) as ProgressData
      return {
        ...defaultProgress(),
        ...data,
        achievements: ALL_ACHIEVEMENTS.map(a => {
          const existing = data.achievements?.find((ea: Achievement) => ea.id === a.id)
          return existing ? { ...a, unlockedAt: existing.unlockedAt } : a
        }),
      }
    }
  } catch { /* ignore */ }
  return defaultProgress()
}

function defaultProgress(): ProgressData {
  return {
    gamesPlayed: [],
    quizResults: [],
    achievements: ALL_ACHIEVEMENTS.map(a => ({ ...a, unlockedAt: null })),
    totalScore: 0,
    streak: 0,
    lastPlayed: null,
    totalPlayTime: 0,
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const checkAchievements = useCallback((p: ProgressData): { data: ProgressData; unlocked: Achievement[] } => {
    const unlocked: Achievement[] = []
    const achievements = p.achievements.map(a => {
      if (a.unlockedAt) return a

      let shouldUnlock = false
      switch (a.id) {
        case "first-game":
          shouldUnlock = p.gamesPlayed.length >= 1
          break
        case "five-games":
          shouldUnlock = new Set(p.gamesPlayed.map(g => g.gameId)).size >= 5
          break
        case "all-games":
          shouldUnlock = new Set(p.gamesPlayed.map(g => g.gameId)).size >= 10
          break
        case "quiz-perfect":
          shouldUnlock = p.quizResults.some(q => q.score === q.total)
          break
        case "quiz-master":
          shouldUnlock = new Set(p.quizResults.map(q => q.category)).size >= 3
          break
        case "score-100":
          shouldUnlock = p.totalScore >= 100
          break
        case "score-500":
          shouldUnlock = p.totalScore >= 500
          break
        case "score-1000":
          shouldUnlock = p.totalScore >= 1000
          break
        case "streak-3":
          shouldUnlock = p.streak >= 3
          break
        case "streak-7":
          shouldUnlock = p.streak >= 7
          break
        case "memory-win":
          shouldUnlock = p.gamesPlayed.some(g => g.gameId === "memory-match" && g.completed)
          break
        case "pattern-pro":
          shouldUnlock = p.gamesPlayed.some(g => g.gameId === "pattern-match" && g.completed)
          break
      }
      if (shouldUnlock) {
        const unlockedA = { ...a, unlockedAt: Date.now() }
        unlocked.push(unlockedA)
        return unlockedA
      }
      return a
    })
    return { data: { ...p, achievements }, unlocked }
  }, [])

  const recordGame = useCallback((gameId: string, gameTitle: string, score: number, completed: boolean) => {
    setProgress(prev => {
      const now = Date.now()
      const today = new Date().toDateString()
      const lastDate = prev.lastPlayed ? new Date(prev.lastPlayed).toDateString() : null
      const newStreak = lastDate === today ? prev.streak : lastDate === new Date(now - 86400000).toDateString() ? prev.streak + 1 : 1
      const updated: ProgressData = {
        ...prev,
        gamesPlayed: [...prev.gamesPlayed, { gameId, gameTitle, score, completed, timestamp: now }],
        totalScore: prev.totalScore + score,
        streak: newStreak,
        lastPlayed: now,
        totalPlayTime: prev.totalPlayTime + 1,
      }
      const { data, unlocked } = checkAchievements(updated)
      if (unlocked.length > 0) {
        setNewAchievement(unlocked[0])
        setTimeout(() => setNewAchievement(null), 4000)
      }
      return data
    })
  }, [checkAchievements])

  const recordQuiz = useCallback((category: string, score: number, total: number) => {
    setProgress(prev => {
      const now = Date.now()
      const today = new Date().toDateString()
      const lastDate = prev.lastPlayed ? new Date(prev.lastPlayed).toDateString() : null
      const newStreak = lastDate === today ? prev.streak : lastDate === new Date(now - 86400000).toDateString() ? prev.streak + 1 : 1
      const updated: ProgressData = {
        ...prev,
        quizResults: [...prev.quizResults, { category, score, total, timestamp: now }],
        totalScore: prev.totalScore + score,
        streak: newStreak,
        lastPlayed: now,
      }
      const { data, unlocked } = checkAchievements(updated)
      if (unlocked.length > 0) {
        setNewAchievement(unlocked[0])
        setTimeout(() => setNewAchievement(null), 4000)
      }
      return data
    })
  }, [checkAchievements])

  const resetProgress = useCallback(() => {
    const fresh = defaultProgress()
    setProgress(fresh)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  }, [])

  return { progress, newAchievement, recordGame, recordQuiz, resetProgress }
}
