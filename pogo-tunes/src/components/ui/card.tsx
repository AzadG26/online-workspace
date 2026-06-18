"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  gradient?: string
  hover?: boolean
  delay?: number
  glass?: boolean
  glow?: "coral" | "purple" | "sky" | "yellow" | "green"
  style?: React.CSSProperties
}

function Card({ className, gradient, hover = true, delay = 0, glass, glow, style, children }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay }}
      whileHover={hover ? { y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } } : undefined}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group",
        glass
          ? "bg-white/70 backdrop-blur-xl border border-white/50 shadow-soft"
          : "bg-white shadow-soft",
        hover && "cursor-pointer",
        glow && "hover:shadow-glow-" + glow,
        className,
      )}
      style={gradient ? { background: gradient, ...style } : style}
    >
      {hover && (
        <motion.div
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: glow
              ? `radial-gradient(600px circle at 50% 50%, rgba(255,107,107,0.06), transparent 60%)`
              : undefined,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("font-display text-xl font-bold text-dark", className)}>{children}</h3>
}

function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-1 font-body text-sm text-gray", className)}>{children}</p>
}

export { Card, CardTitle, CardDescription }
