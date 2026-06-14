"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-300 active:scale-95 cursor-pointer select-none",
  {
    variants: {
      variant: {
        coral: "bg-coral text-white hover:bg-coral-dark shadow-md hover:shadow-glow-coral",
        yellow: "bg-yellow text-dark hover:bg-yellow-dark shadow-md hover:shadow-glow-yellow",
        sky: "bg-sky text-white hover:bg-sky-dark shadow-md hover:shadow-glow-sky",
        purple: "bg-purple text-white hover:bg-purple-dark shadow-md hover:shadow-glow-purple",
        green: "bg-green text-dark hover:bg-green-dark shadow-md hover:shadow-glow-green",
        outline: "border-2 border-coral text-coral hover:bg-coral hover:text-white",
        ghost: "text-dark hover:bg-cream",
        white: "bg-white text-dark hover:bg-cream shadow-md",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "coral",
      size: "md",
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
