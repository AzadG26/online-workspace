"use client"

import { type SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function Star({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
    </svg>
  )
}

export function SparkleIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" fill="currentColor" opacity="0.6" />
      <path d="M18 14l1 3.5L22.5 18l-3.5 1-1 3.5-1-3.5L13.5 18l3.5-1 1-3.5z" fill="currentColor" opacity="0.4" />
      <path d="M6 14l-1 3.5L1.5 18l3.5 1 1 3.5 1-3.5L10.5 18 7 17.5 6 14z" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export function Rainbow({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 15c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 15c0-3.86 3.14-7 7-7s7 3.14 7 7" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 15c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#6BCBFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 15c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="#B28DFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function MusicNote({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="18" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="17" cy="16" r="3" fill="currentColor" opacity="0.6" />
      <path d="M11 18V5l9-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 5l9-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ABCIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="3" width="20" height="18" rx="3" fill="currentColor" opacity="0.15" />
      <text x="6" y="16" fontFamily="Baloo 2, cursive" fontSize="10" fontWeight="bold" fill="currentColor">A</text>
      <text x="12" y="16" fontFamily="Baloo 2, cursive" fontSize="10" fontWeight="bold" fill="currentColor">B</text>
      <text x="17" y="16" fontFamily="Baloo 2, cursive" fontSize="10" fontWeight="bold" fill="currentColor">C</text>
    </svg>
  )
}

export function PaintPalette({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="9" r="2" fill="#FF6B6B" />
      <circle cx="16" cy="9" r="2" fill="#6BCBFF" />
      <circle cx="12" cy="17" r="2" fill="#6EE7B7" />
      <circle cx="6" cy="14" r="1.5" fill="#FFD93D" />
      <circle cx="18" cy="14" r="1.5" fill="#B28DFF" />
    </svg>
  )
}

export function PawPrint({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="8" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="5" cy="14" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="19" cy="14" r="3" fill="currentColor" opacity="0.6" />
      <ellipse cx="12" cy="18" rx="5" ry="3.5" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

export function ShapeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="14" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
      <polygon points="12,4 15,10 9,10" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function SoundWaves({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 12h2v4H4zM8 8h2v10H8zM12 5h2v16h-2zM16 8h2v10h-2zM20 12h2v4h-2z" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export function HindiOm({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="4" y="18" fontFamily="serif" fontSize="16" fontWeight="bold" fill="currentColor">ॐ</text>
    </svg>
  )
}

export function NumberIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="6" y="17" fontFamily="Baloo 2, cursive" fontSize="14" fontWeight="bold" fill="currentColor">123</text>
    </svg>
  )
}
