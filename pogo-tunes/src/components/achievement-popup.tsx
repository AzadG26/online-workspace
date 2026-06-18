"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Achievement } from "@/hooks/use-progress"

export function AchievementPopup({ achievement }: { achievement: Achievement | null }) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
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
              {achievement.emoji}
            </motion.span>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-white/70">Achievement Unlocked!</p>
              <p className="font-display text-lg font-bold text-white">{achievement.title}</p>
              <p className="font-body text-sm text-white/80">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
