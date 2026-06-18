"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LearningPopup } from "@/components/learning-popup"
import type { InteractiveItem } from "@/data/learning"

interface LearningGridProps {
  items: Array<{ label: string; emoji?: string; color?: string }>
  color: string
  columns?: 4 | 5 | 6
  type?: "letter" | "emoji" | "color"
  interactiveItems?: InteractiveItem[]
}

export function LearningGrid({ items, color, columns = 5, type = "letter", interactiveItems }: LearningGridProps) {
  const [selected, setSelected] = useState<{ label: string; emoji: string; phrase: string; description: string; color?: string } | null>(null)

  const handleItemClick = (item: { label: string; emoji?: string; color?: string }) => {
    if (!interactiveItems) return
    const interactive = interactiveItems.find((i) => i.label === item.label)
    if (!interactive) return
    setSelected({
      label: interactive.label,
      emoji: interactive.emoji,
      phrase: interactive.phrase,
      description: interactive.description,
      color: item.color || undefined,
    })
  }

  return (
    <>
      <div
        className={cn(
          "grid gap-3 md:gap-4",
          columns === 4 && "grid-cols-2 md:grid-cols-4",
          columns === 5 && "grid-cols-3 md:grid-cols-5",
          columns === 6 && "grid-cols-3 md:grid-cols-6",
        )}
      >
        {items.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleItemClick(item)}
            className={cn(
              "group flex cursor-pointer flex-col items-center justify-center rounded-2xl p-4 text-center shadow-soft transition-all duration-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              type === "color" ? "h-28 md:h-32" : "h-24 md:h-28",
            )}
            style={{
              background: type === "color"
                ? `linear-gradient(135deg, ${item.color}, ${item.color}dd)`
                : `linear-gradient(135deg, ${color}15, ${color}08)`,
              border: type !== "color" ? `2px solid ${color}20` : "none",
              outlineColor: color,
            }}
            aria-label={interactiveItems ? `Learn about ${item.label}` : item.label}
          >
            {type === "color" ? (
              <span
                className="mb-2 block h-10 w-10 rounded-full shadow-md md:h-12 md:w-12"
                style={{ background: item.color }}
              />
            ) : item.emoji ? (
              <span className="text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110">{item.emoji}</span>
            ) : null}
            <span
              className="font-display text-sm font-bold md:text-base"
              style={{ color: type === "color" ? "#fff" : color }}
            >
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>

      {selected && (
        <LearningPopup
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          emoji={selected.emoji}
          label={selected.label}
          phrase={selected.phrase}
          description={selected.description}
          color={selected.color}
        />
      )}
    </>
  )
}
