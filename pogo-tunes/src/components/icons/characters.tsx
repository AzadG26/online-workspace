"use client"

import { type SVGProps } from "react"

interface CharacterProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function PogoFox({ size = 48, ...props }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="55" r="35" fill="#FF6B6B" />
      <polygon points="22,30 12,8 35,25" fill="#FF6B6B" />
      <polygon points="78,30 88,8 65,25" fill="#FF6B6B" />
      <polygon points="22,30 12,8 35,25" fill="#FF8E8E" fillOpacity="0.3" />
      <polygon points="78,30 88,8 65,25" fill="#FF8E8E" fillOpacity="0.3" />
      <circle cx="50" cy="55" r="22" fill="#FF8E8E" />
      <ellipse cx="38" cy="50" rx="4" ry="5" fill="#2D3436" />
      <ellipse cx="62" cy="50" rx="4" ry="5" fill="#2D3436" />
      <circle cx="38" cy="48" r="1.5" fill="white" />
      <circle cx="62" cy="48" r="1.5" fill="white" />
      <ellipse cx="50" cy="62" rx="6" ry="4" fill="#2D3436" />
      <path d="M44 58 Q50 64 56 58" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function TuniRabbit({ size = 48, ...props }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="35" cy="15" rx="8" ry="22" fill="#B28DFF" />
      <ellipse cx="65" cy="15" rx="8" ry="22" fill="#B28DFF" />
      <ellipse cx="35" cy="15" rx="5" ry="17" fill="#CCB0FF" />
      <ellipse cx="65" cy="15" rx="5" ry="17" fill="#CCB0FF" />
      <circle cx="50" cy="55" r="32" fill="#B28DFF" />
      <circle cx="50" cy="55" r="24" fill="#CCB0FF" />
      <ellipse cx="38" cy="50" rx="4" ry="5" fill="#2D3436" />
      <ellipse cx="62" cy="50" rx="4" ry="5" fill="#2D3436" />
      <circle cx="38" cy="48" r="1.5" fill="white" />
      <circle cx="62" cy="48" r="1.5" fill="white" />
      <ellipse cx="50" cy="60" rx="5" ry="3.5" fill="#FFB5B5" />
      <path d="M45 56 Q50 61 55 56" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function BoboBear({ size = 48, ...props }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="27" cy="30" r="12" fill="#FFD93D" />
      <circle cx="73" cy="30" r="12" fill="#FFD93D" />
      <circle cx="27" cy="30" r="7" fill="#FFE680" />
      <circle cx="73" cy="30" r="7" fill="#FFE680" />
      <circle cx="50" cy="55" r="32" fill="#FFD93D" />
      <circle cx="50" cy="55" r="24" fill="#FFE680" />
      <ellipse cx="38" cy="50" rx="4" ry="5" fill="#2D3436" />
      <ellipse cx="62" cy="50" rx="4" ry="5" fill="#2D3436" />
      <circle cx="38" cy="48" r="1.5" fill="white" />
      <circle cx="62" cy="48" r="1.5" fill="white" />
      <ellipse cx="50" cy="65" rx="8" ry="5" fill="#F0C020" />
      <path d="M44 58 Q50 63 56 58" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}
