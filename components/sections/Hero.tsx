"use client"

import { useState, useEffect } from 'react'
import { Github, ArrowDown } from 'lucide-react'

const typingTexts = [
  "Full-Stack Developer",
  "React & Next.js Developer",
  "Express & Node.js Developer",
  "GenAI Enthusiast",
];

export function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex])

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#1A1A1A] rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 border border-[#1A1A1A] rotate-12 animate-spin"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-[#1A1A1A] -rotate-12 animate-spin"
          style={{ animationDuration: "30s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Name with Glitch Effect */}
        <h1
          className={`glitch font-mono font-extrabold text-[clamp(48px,10vw,120px)] leading-none mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          data-text="TIRTH BHATT"
          style={{ transitionDelay: "300ms" }}
        >
          TIRTH BHATT
        </h1>

        {/* Typing Subtitle */}
        <div
          className={`h-8 mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="font-mono text-xl text-[#00F5FF] typing-cursor">
            {displayText}
          </span>
        </div>

        {/* One-liner */}
        <p
          className={`font-sans text-lg text-[#888888] mb-12 max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          I build fast, scalable web apps — from pixel-perfect frontends to
          bulletproof backends.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <a
            href="#projects"
            className="group px-8 py-3 bg-[#00F5FF] text-[#050505] font-mono font-semibold hover:bg-[#FFB800] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FFB800]/20 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Projects
          </a>

          <a
            href="https://github.com/TirthBhatt1208"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3 border border-[#00F5FF] text-[#00F5FF] font-mono font-semibold overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Github size={18} />
              GitHub
            </span>
            <span className="absolute inset-0 bg-[#00F5FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center gap-2 text-[#050505] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <Github size={18} />
              GitHub
            </span>
          </a>

          <a
            href="/resume.pdf"
            download="Tirth_Bhatt_Resume.pdf"
            className="group px-8 py-3 border border-[#FFB800] text-[#FFB800] font-mono font-semibold hover:bg-[#FFB800] hover:text-[#050505] hover:-translate-y-1 transition-all duration-300"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "1500ms" }}
      >
        <ArrowDown className="text-[#555555] animate-bounce" size={24} />
      </div>
    </section>
  );
}
