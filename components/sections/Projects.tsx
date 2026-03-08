"use client"

import { useReveal } from '@/hooks/use-reveal'
import { projects } from '@/data/projects'
import { FeaturedProjectCard } from '@/components/ui/FeaturedProjectCard'
import { ProjectCard } from '@/components/ui/ProjectCard'

export function Projects() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.05 })

  const featuredProjects = projects.filter(p => p.featured)
  const regularProjects = projects.filter(p => !p.featured)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 bg-[#0A0A0A]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-mono font-bold text-3xl text-[#E8E8E8] mb-2">
            Things I've Built
          </h2>
          <p className="font-mono text-sm text-[#555555]">
            {'// selected works — 2023–2025'}
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-12">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              isRevealed={isRevealed}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {regularProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isRevealed={isRevealed}
              delay={(featuredProjects.length + index) * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
