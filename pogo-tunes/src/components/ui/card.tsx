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
  style?: React.CSSProperties
}

function Card({ className, gradient, hover = true, delay = 0, style, children }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "rounded-2xl bg-white p-6 shadow-soft transition-shadow duration-300",
        hover && "cursor-pointer hover:shadow-card",
        className,
      )}
      style={gradient ? { background: gradient, ...style } : style}
    >
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
