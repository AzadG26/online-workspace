"use client"

import { type HTMLAttributes, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-xs font-semibold backdrop-blur-sm border border-white/30",
  {
    variants: {
      variant: {
        coral: "bg-coral/15 text-coral shadow-sm",
        yellow: "bg-yellow/15 text-yellow-dark shadow-sm",
        sky: "bg-sky/15 text-sky-dark shadow-sm",
        purple: "bg-purple/15 text-purple-dark shadow-sm",
        green: "bg-green/15 text-green-dark shadow-sm",
        gray: "bg-gray/10 text-gray shadow-sm",
      },
    },
    defaultVariants: {
      variant: "coral",
    },
  },
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  },
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
