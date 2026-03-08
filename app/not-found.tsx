import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-mono text-8xl font-bold text-[#00F5FF] mb-4 glitch" data-text="404">
          404
        </h1>
        <p className="font-sans text-xl text-[#888888] mb-8">
          This page doesn't exist in my stack.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F5FF] text-[#050505] font-mono font-semibold hover:bg-[#FFB800] hover:-translate-y-1 transition-all duration-300"
        >
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </main>
  )
}
