"use client"

import { useRef, useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  isRevealed: boolean
  delay: number
}

export function ProjectCard({ project, isRevealed, delay }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 5, y: -x * 5 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full p-6 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#00F5FF] hover:-translate-y-2 hover:shadow-[0_24px_48px_#00F5FF12] transition-all duration-500 group ${
        isRevealed ? 'card-3d revealed' : 'card-3d'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isRevealed
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
      }}
    >
      {/* Title */}
      <h3 className="font-mono font-bold text-xl text-[#E8E8E8] mb-2">
        {project.title}
      </h3>

      <div className="h-px w-full bg-[#1A1A1A] mb-4" />

      {/* Description */}
      <p className="font-sans text-sm text-[#888888] mb-6 leading-relaxed line-clamp-3">
        {project.solution}
      </p>

      {/* Features (truncated) */}
      <ul className="space-y-1.5 mb-6">
        {project.features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start gap-2 font-sans text-xs text-[#666666]">
            <span className="text-[#00F5FF] mt-0.5">→</span>
            <span className="line-clamp-1">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.techStack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 bg-[#0F0F0F] border border-[#1A1A1A] font-mono text-[10px] text-[#555555]"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 6 && (
          <span className="px-2 py-0.5 font-mono text-[10px] text-[#555555]">
            +{project.techStack.length - 6}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#555555] hover:text-[#00F5FF] transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
        )}
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-[#555555] hover:text-[#00F5FF] transition-colors"
          >
            <ExternalLink size={14} />
            Demo
          </a>
        )}
      </div>

      {/* Cyan left border on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00F5FF] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
    </div>
  )
}
