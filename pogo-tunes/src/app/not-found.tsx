import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cream to-white px-4 text-center">
      <div className="text-9xl">🔍</div>
      <h1 className="mt-6 font-display text-6xl font-bold text-coral">404</h1>
      <p className="mt-4 font-display text-2xl font-bold text-dark">Oops! Page Not Found</p>
      <p className="mt-2 max-w-md font-body text-gray">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
        Let&apos;s get you back to learning!
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 font-display text-lg font-bold text-white shadow-soft transition-all hover:shadow-glow-coral hover:scale-105"
      >
        <Home className="h-5 w-5" /> Back to Home
      </Link>
    </section>
  )
}
