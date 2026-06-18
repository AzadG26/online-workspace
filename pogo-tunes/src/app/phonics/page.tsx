"use client"

import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { CategoryHero } from "@/components/category/category-hero"
import { LearningGrid } from "@/components/category/learning-grid"
import { VideoRow } from "@/components/category/video-row"

const phonicsSounds = [
  { label: "Aa", emoji: "🍎" },
  { label: "Bb", emoji: "⚽" },
  { label: "Cc", emoji: "🐱" },
  { label: "Dd", emoji: "🐶" },
  { label: "Ee", emoji: "🥚" },
  { label: "Ff", emoji: "🐸" },
  { label: "Gg", emoji: "🍇" },
  { label: "Hh", emoji: "🏠" },
  { label: "Ii", emoji: "🍦" },
  { label: "Jj", emoji: "🫗" },
  { label: "Kk", emoji: "🪁" },
  { label: "Ll", emoji: "🍋" },
  { label: "Mm", emoji: "🐭" },
  { label: "Nn", emoji: "🪹" },
  { label: "Oo", emoji: "🐙" },
  { label: "Pp", emoji: "🐷" },
  { label: "Qq", emoji: "👑" },
  { label: "Rr", emoji: "🐰" },
  { label: "Ss", emoji: "☀️" },
  { label: "Tt", emoji: "🐢" },
  { label: "Uu", emoji: "☂️" },
  { label: "Vv", emoji: "🎻" },
  { label: "Ww", emoji: "⌚" },
  { label: "Xx", emoji: "❌" },
  { label: "Yy", emoji: "🪀" },
  { label: "Zz", emoji: "🦓" },
]

const phonicsInteractive = [
  { label: "Aa", emoji: "🍎", phrase: "Aa says ah! Like Apple!", description: "Apple starts with the letter A!" },
  { label: "Bb", emoji: "⚽", phrase: "Bb says buh! Like Ball!", description: "Ball starts with the letter B!" },
  { label: "Cc", emoji: "🐱", phrase: "Cc says kuh! Like Cat!", description: "Cat starts with the letter C!" },
  { label: "Dd", emoji: "🐶", phrase: "Dd says duh! Like Dog!", description: "Dog starts with the letter D!" },
  { label: "Ee", emoji: "🥚", phrase: "Ee says eh! Like Egg!", description: "Egg starts with the letter E!" },
  { label: "Ff", emoji: "🐸", phrase: "Ff says fff! Like Frog!", description: "Frog starts with the letter F!" },
  { label: "Gg", emoji: "🍇", phrase: "Gg says guh! Like Grapes!", description: "Grapes start with the letter G!" },
  { label: "Hh", emoji: "🏠", phrase: "Hh says huh! Like House!", description: "House starts with the letter H!" },
  { label: "Ii", emoji: "🍦", phrase: "Ii says ih! Like Ice cream!", description: "Ice cream starts with the letter I!" },
  { label: "Jj", emoji: "🫗", phrase: "Jj says juh! Like Juice!", description: "Juice starts with the letter J!" },
  { label: "Kk", emoji: "🪁", phrase: "Kk says kuh! Like Kite!", description: "Kite starts with the letter K!" },
  { label: "Ll", emoji: "🍋", phrase: "Ll says lll! Like Lemon!", description: "Lemon starts with the letter L!" },
  { label: "Mm", emoji: "🐭", phrase: "Mm says mmm! Like Mouse!", description: "Mouse starts with the letter M!" },
  { label: "Nn", emoji: "🪹", phrase: "Nn says nnn! Like Nest!", description: "Nest starts with the letter N!" },
  { label: "Oo", emoji: "🐙", phrase: "Oo says ah! Like Octopus!", description: "Octopus starts with the letter O!" },
  { label: "Pp", emoji: "🐷", phrase: "Pp says puh! Like Pig!", description: "Pig starts with the letter P!" },
  { label: "Qq", emoji: "👑", phrase: "Qq says kw! Like Queen!", description: "Queen starts with the letter Q!" },
  { label: "Rr", emoji: "🐰", phrase: "Rr says rrr! Like Rabbit!", description: "Rabbit starts with the letter R!" },
  { label: "Ss", emoji: "☀️", phrase: "Ss says sss! Like Sun!", description: "Sun starts with the letter S!" },
  { label: "Tt", emoji: "🐢", phrase: "Tt says tuh! Like Turtle!", description: "Turtle starts with the letter T!" },
  { label: "Uu", emoji: "☂️", phrase: "Uu says uh! Like Umbrella!", description: "Umbrella starts with the letter U!" },
  { label: "Vv", emoji: "🎻", phrase: "Vv says vvv! Like Violin!", description: "Violin starts with the letter V!" },
  { label: "Ww", emoji: "⌚", phrase: "Ww says wuh! Like Watch!", description: "Watch starts with the letter W!" },
  { label: "Xx", emoji: "❌", phrase: "Xx says kss! Like X-ray!", description: "X-ray starts with the letter X!" },
  { label: "Yy", emoji: "🪀", phrase: "Yy says yuh! Like Yo-yo!", description: "Yo-yo starts with the letter Y!" },
  { label: "Zz", emoji: "🦓", phrase: "Zz says zzz! Like Zebra!", description: "Zebra starts with the letter Z!" },
]

export default function PhonicsPage() {
  return (
    <>
      <CategoryHero
        title="Phonics"
        description="Learn the sounds of letters! Phonics helps you read and spell words."
        emoji="🔊"
        gradient="linear-gradient(135deg, #B28DFF, #CCB0FF)"
        color="var(--color-purple)"
        categoryId="phonics"
      />
      <Section title="Letter Sounds" subtitle="Tap any letter to hear its sound!" className="bg-white">
        <LearningGrid items={phonicsSounds} color="#B28DFF" columns={5} type="emoji" interactiveItems={phonicsInteractive} />
      </Section>
      <Section title="Phonics Videos" subtitle="Sing along and learn letter sounds!" className="bg-gradient-to-b from-white to-cream" wave="top" waveColor="#FFFFFF">
        <VideoRow category="phonics" />
      </Section>
      <Section className="bg-gradient-to-b from-cream to-white text-center">
        <div className="rounded-3xl bg-gradient-to-br from-purple/5 to-purple/10 p-8 md:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-purple-dark" />
          <h2 className="mt-4 font-display text-2xl font-bold text-dark md:text-3xl">Keep Reading!</h2>
          <p className="mt-2 font-body text-gray">Practice phonics with games and activities.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/games"><Button variant="purple">Play Phonics Games</Button></Link>
            <Link href="/worksheets"><Button variant="outline">Download Worksheets</Button></Link>
          </div>
        </div>
      </Section>
    </>
  )
}
