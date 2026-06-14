"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Shield, Music, Globe, Smile } from "lucide-react"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Heart,
    title: "100% Free",
    description: "Every single resource is completely free. No subscriptions, no paywalls, no hidden fees.",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    icon: Sparkles,
    title: "Fun Animations",
    description: "Beautiful, engaging animations that captivate young learners and make concepts stick.",
    color: "text-yellow-dark",
    bg: "bg-yellow/10",
  },
  {
    icon: Shield,
    title: "Safe & Ad-Free",
    description: "A completely safe, ad-free environment. No tracking, no distractions, just learning.",
    color: "text-sky-dark",
    bg: "bg-sky/10",
  },
  {
    icon: Music,
    title: "Music & Songs",
    description: "Catchy educational songs that help children remember concepts through melody and rhythm.",
    color: "text-purple-dark",
    bg: "bg-purple/10",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Content available in multiple languages. Start with English and Hindi, with more coming!",
    color: "text-green-dark",
    bg: "bg-green/10",
  },
  {
    icon: Smile,
    title: "Kid-Designed",
    description: "Designed with input from educators, child psychologists, and most importantly — kids!",
    color: "text-coral",
    bg: "bg-coral/10",
  },
]

export function FeaturesSection() {
  return (
    <Section
      title="Why Parents & Teachers Love Pogo Tunes"
      subtitle="We believe learning should be joyful, accessible, and completely free for every child."
      className="bg-white"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-card"
          >
            <div
              className={cn(
                "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                feature.bg,
              )}
            >
              <feature.icon className={cn("h-6 w-6", feature.color)} />
            </div>
            <h3 className="font-display text-lg font-bold text-dark">{feature.title}</h3>
            <p className="mt-2 font-body text-sm text-gray leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
