import type { BlogContent, VideoItem, GameItem, Category } from "@/data/content"

const BASE_URL = "https://pogotunes.vercel.app"

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Pogo Tunes",
    description:
      "Pogo Tunes makes learning fun with educational songs, games, videos, and activities for kids. Free and accessible for everyone.",
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Pogo Tunes",
    url: BASE_URL,
    logo: `${BASE_URL}/icon-192.svg`,
    description: "Fun Learning for Kids",
    foundingDate: "2025",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@pogotunes.com",
      url: `${BASE_URL}/contact`,
      contactType: "customer support",
    },
    sameAs: [
      "https://www.youtube.com/@Pogotunes",
      "https://www.instagram.com/pogo.tunes/",
      "https://www.facebook.com/profile.php?id=61590129552207",
      "https://in.pinterest.com/pogotunes/",
      "https://x.com/pogotunes",
    ],
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

export function articleSchema(post: BlogContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/blog/${post.id}/#article`,
    headline: post.title,
    description: post.content[0] || post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: BASE_URL },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.id}` },
  }
}

export function blogPostingSchema(post: BlogContent) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.id}/#blogpost`,
    headline: post.title,
    description: post.content[0] || post.title,
    articleBody: post.content.join("\n"),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: BASE_URL },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.id}` },
    wordCount: post.content.join(" ").split(/\s+/).length,
  }
}

export function videoObjectSchema(video: VideoItem) {
  const durationMatch = video.duration.match(/(\d+):(\d+)/)
  const isoDuration = durationMatch
    ? `PT${durationMatch[1]}M${durationMatch[2]}S`
    : "PT5M"
  const rawCount = parseInt(video.views.replace(/[KMB]/g, "")) || 1
  const multiplier = video.views.includes("M") ? 1_000_000 : video.views.includes("K") ? 1_000 : 1

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${BASE_URL}${video.href}/#video`,
    name: video.title,
    description: `${video.title} - ${video.category} educational video for kids. ${video.duration} minutes.`,
    thumbnailUrl: video.thumbnail || undefined,
    duration: isoDuration,
    uploadDate: "2025-01-01",
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "WatchAction",
      userInteractionCount: rawCount * multiplier,
    },
    publisher: { "@id": `${BASE_URL}/#organization` },
  }
}

export function gameSchema(game: GameItem) {
  return {
    "@context": "https://schema.org",
    "@type": ["Game", "EducationalApplication"],
    "@id": `${BASE_URL}${game.href}/#game`,
    name: game.title,
    description: game.description,
    url: `${BASE_URL}${game.href}`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: { "@id": `${BASE_URL}/#organization` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    educationalLevel: "Preschool",
    educationalUse: ["Game", "Play"],
    teaches: game.skills,
  }
}

export function categorySchema(cat: Category) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "@id": `${BASE_URL}${cat.href}/#category`,
    name: cat.title,
    description: cat.description,
    url: `${BASE_URL}${cat.href}`,
    educationalLevel: "Preschool",
    typicalAgeRange: cat.ageRange,
    timeToComplete: `PT${cat.count}M`,
    numberOfCredits: cat.count,
  }
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}/about/#about`,
    name: "About Pogo Tunes",
    description: "Learn about Pogo Tunes — a free educational platform for kids.",
    mainEntity: { "@id": `${BASE_URL}/#organization` },
  }
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${BASE_URL}/contact/#contact`,
    name: "Contact Pogo Tunes",
    description: "Get in touch with the Pogo Tunes team.",
    mainEntity: { "@id": `${BASE_URL}/#organization` },
  }
}

export function collectionPageSchema(title: string, description: string, url: string, itemCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}${url}/#collection`,
    name: title,
    description,
    url: `${BASE_URL}${url}`,
    mainEntity: { "@type": "ItemList", numberOfItems: itemCount },
  }
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/faq/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
