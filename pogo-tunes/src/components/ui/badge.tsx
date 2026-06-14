"use client"

import { type HTMLAttributes, forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-semibold",
  {
    variants: {
      variant: {
        coral: "bg-coral/10 text-coral",
        yellow: "bg-yellow/10 text-yellow-dark",
        sky: "bg-sky/10 text-sky-dark",
        purple: "bg-purple/10 text-purple-dark",
        green: "bg-green/10 text-green-dark",
        gray: "bg-gray/10 text-gray",
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
