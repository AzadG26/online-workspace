import { Hero } from "@/components/home/hero"
import { CategoriesSection } from "@/components/home/categories-section"
import { VideosSection } from "@/components/home/videos-section"
import { ShortsSection } from "@/components/home/shorts-section"
import { GamesSection } from "@/components/home/games-section"
import { FeaturesSection } from "@/components/home/features-section"
import { CharactersSection } from "@/components/home/characters-section"
import { CTASection } from "@/components/home/cta-section"
import { BlogSection } from "@/components/home/blog-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <VideosSection />
      <ShortsSection />
      <GamesSection />
      <FeaturesSection />
      <CharactersSection />
      <CTASection />
      <BlogSection />
    </>
  )
}
