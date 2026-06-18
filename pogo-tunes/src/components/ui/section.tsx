"use client"

import { type HTMLAttributes, type ReactNode, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode
  subtitle?: string
  gradient?: boolean
  wave?: "top" | "bottom" | "both"
  waveColor?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, title, subtitle, gradient, wave, waveColor = "#FFF8E7", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative px-4 py-16 md:py-24",
          gradient && "bg-gradient-to-b from-cream to-white",
          className,
        )}
        {...props}
      >
        {wave === "top" && (
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ height: 60 }}>
            <svg viewBox="0 0 1200 120" className="relative block w-full" style={{ height: 60 }}>
              <path d="M0,60 C300,120 700,0 1200,60 L1200,0 L0,0 Z" fill={waveColor} />
            </svg>
          </div>
        )}

        <div className="mx-auto max-w-7xl">
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="font-display text-3xl font-bold text-dark md:text-4xl lg:text-5xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mx-auto mt-4 max-w-2xl font-body text-base text-gray md:text-lg">
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}
          {children}
        </div>

        {wave === "bottom" && (
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: 60 }}>
            <svg viewBox="0 0 1200 120" className="relative block w-full" style={{ height: 60 }}>
              <path d="M0,0 C300,60 700,120 1200,60 L1200,120 L0,120 Z" fill={waveColor} />
            </svg>
          </div>
        )}
      </section>
    )
  },
)
Section.displayName = "Section"

export { Section }
