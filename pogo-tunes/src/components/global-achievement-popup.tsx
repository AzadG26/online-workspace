"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useProgressContext } from "@/components/progress-provider"

export function GlobalAchievementPopup() {
  const { newAchievement } = useProgressContext()

  return (
    <AnimatePresence>
      {newAchievement && (
        <motion.div
          key={newAchievement.id + (newAchievement.unlockedAt ?? 0)}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-yellow to-yellow-dark p-4 pr-6 shadow-glow-yellow">
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {newAchievement.emoji}
            </motion.span>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-white/70">Achievement Unlocked!</p>
              <p className="font-display text-lg font-bold text-white">{newAchievement.title}</p>
              <p className="font-body text-sm text-white/80">{newAchievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
