"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useProgress, type Achievement } from "@/hooks/use-progress"

interface ProgressContextType {
  recordGame: (gameId: string, gameTitle: string, score: number, completed: boolean) => void
  recordQuiz: (category: string, score: number, total: number) => void
  newAchievement: Achievement | null
}

const ProgressContext = createContext<ProgressContextType>({
  recordGame: () => {},
  recordQuiz: () => {},
  newAchievement: null,
})

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { recordGame, recordQuiz, newAchievement } = useProgress()
  return (
    <ProgressContext.Provider value={{ recordGame, recordQuiz, newAchievement }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  return useContext(ProgressContext)
}
