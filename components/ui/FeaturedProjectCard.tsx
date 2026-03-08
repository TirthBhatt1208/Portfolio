"use client"

import { useRef, useState, useEffect } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

interface FeaturedProjectCardProps {
  project: Project
  isRevealed: boolean
  delay: number
}

export function FeaturedProjectCard({ project, isRevealed, delay }: FeaturedProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)

  // Pulsing glow effect
  useEffect(() => {
    if (!isHovered) {
      setGlowIntensity(0)
      return
    }
    const interval = setInterval(() => {
      setGlowIntensity(prev => Math.sin(Date.now() / 500) * 0.3 + 0.7)
    }, 50)
    return () => clearInterval(interval)
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 8, y: -x * 8 })
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full p-8 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#00F5FF] transition-all duration-500 group overflow-hidden ${
        isRevealed ? 'card-3d revealed' : 'card-3d'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isRevealed
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`
          : undefined,
        boxShadow: isHovered 
          ? `0 0 ${30 * glowIntensity}px rgba(0, 245, 255, ${0.2 * glowIntensity}), 0 0 ${60 * glowIntensity}px rgba(0, 245, 255, ${0.1 * glowIntensity})` 
          : 'none',
      }}
    >
      {/* Radial gradient follow cursor */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered 
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 245, 255, 0.06), transparent 40%)`
            : 'none'
        }}
      />

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#00F5FF]/0 group-hover:border-[#00F5FF] transition-all duration-300 group-hover:w-12 group-hover:h-12" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#00F5FF]/0 group-hover:border-[#00F5FF] transition-all duration-300 group-hover:w-12 group-hover:h-12" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#00F5FF]/0 group-hover:border-[#00F5FF] transition-all duration-300 group-hover:w-12 group-hover:h-12" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#00F5FF]/0 group-hover:border-[#00F5FF] transition-all duration-300 group-hover:w-12 group-hover:h-12" />

      {/* Scanning line effect */}
      <div 
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-line"
        style={{ top: '50%' }}
      />

      {/* Featured Badge with pulse */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-[#00F5FF]/10 border border-[#00F5FF]/30 group-hover:bg-[#00F5FF]/20 transition-colors duration-300">
        <span className="text-[#00F5FF] text-xs group-hover:animate-pulse">★</span>
        <span className="font-mono text-xs text-[#00F5FF]">FEATURED PROJECT</span>
      </div>

      {/* Links */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#555555] hover:text-[#00F5FF] transition-colors"
            aria-label="View on GitHub"
          >
            <Github size={20} />
          </a>
        )}
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#555555] hover:text-[#00F5FF] transition-colors"
            aria-label="View live demo"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="mt-12">
        <h3 className="font-mono font-bold text-2xl text-[#E8E8E8] mb-4">
          {project.title}
        </h3>
        
        <div className="h-px w-full bg-[#1A1A1A] mb-6" />

        <p className="font-sans text-[#888888] mb-4 leading-relaxed">
          {project.solution}
        </p>

        {/* State Management Note */}
        {project.stateManagement && (
          <div className="flex items-start gap-2 p-4 bg-[#050505] border border-[#1A1A1A] mb-6">
            <Zap className="w-4 h-4 text-[#FFB800] mt-0.5 shrink-0" />
            <p className="font-mono text-xs text-[#888888]">
              {project.stateManagement}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-mono text-xs text-[#555555] mb-3">KEY FEATURES</h4>
          <ul className="space-y-2">
            {project.features.map((feature, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 font-sans text-sm text-[#888888] group/feature hover:text-[#E8E8E8] transition-colors duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="text-[#00F5FF] mt-1 group-hover/feature:translate-x-1 transition-transform duration-300">→</span>
                <span className="group-hover/feature:translate-x-1 transition-transform duration-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={tech}
              className="px-3 py-1 bg-[#0F0F0F] border border-[#1A1A1A] font-mono text-xs text-[#666666] hover:border-[#00F5FF] hover:text-[#00F5FF] hover:bg-[#00F5FF]/5 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,245,255,0.15)] transition-all duration-300"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Cyan left border on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00F5FF] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
    </div>
  )
}
