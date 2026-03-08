"use client"

import { useState, useEffect } from 'react'
import { Github, Linkedin, ArrowUp } from 'lucide-react'

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 px-6 border-t border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Built With */}
          <div className="flex items-center gap-2 font-sans text-sm text-[#555555]">
            Built with
            <span className="px-2 py-1 bg-[#0A0A0A] border border-[#1A1A1A] font-mono text-xs text-[#00F5FF] glow-pulse">
              Next.js
            </span>
            <span className="px-2 py-1 bg-[#0A0A0A] border border-[#1A1A1A] font-mono text-xs text-[#00F5FF] glow-pulse">
              Tailwind
            </span>
            by
            <span className="text-[#E8E8E8]">Tirth Bhatt</span>
            <span className="text-[#555555]">• 2026</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/TirthBhatt1208"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#555555] hover:text-[#00F5FF] transition-colors group"
              aria-label="GitHub"
            >
              <Github size={18} className="group-hover:drop-shadow-[0_0_6px_#00F5FF]" />
              <span className="hidden sm:inline font-mono text-xs">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/tirth-bhatt-796609277"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#555555] hover:text-[#00F5FF] transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="group-hover:drop-shadow-[0_0_6px_#00F5FF]" />
              <span className="hidden sm:inline font-mono text-xs">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-[#0A0A0A] border border-[#1A1A1A] text-[#555555] hover:text-[#00F5FF] hover:border-[#00F5FF] transition-all duration-300 ${
          showBackToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}
