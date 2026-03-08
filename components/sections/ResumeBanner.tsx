"use client"

import { useReveal } from '@/hooks/use-reveal'
import { Download } from 'lucide-react'

export function ResumeBanner() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-[#111111]">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="font-mono text-xl text-[#E8E8E8] mb-3">
          Want to know more about me?
        </h3>
        <p className="font-sans text-[#555555] mb-8">
          Full experience, education & projects — all in one place.
        </p>

        <a
          href="/resume.pdf"
          download="Tirth_Bhatt_Resume.pdf"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-[#00F5FF] text-[#050505] font-mono font-semibold hover:bg-[#FFB800] hover:-translate-y-1 transition-all duration-300"
        >
          <Download
            size={18}
            className="animate-bounce"
            style={{ animationDuration: "1.5s" }}
          />
          Download Resume
        </a>
      </div>
    </section>
  );
}
