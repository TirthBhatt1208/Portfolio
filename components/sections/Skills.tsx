"use client"

import { useReveal } from '@/hooks/use-reveal'
import { skillCategories } from '@/data/skills'

export function Skills() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 bg-[#0A0A0A]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <h2
          className={`font-mono text-sm text-[#00F5FF] mb-16 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {'>'} skills --list --all
        </h2>

        {/* Skill Categories */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`transition-all duration-700 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              {/* Category Label */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`font-mono text-xs tracking-widest ${
                  category.exploring ? 'text-[#FFB800]' : 'text-[#555555]'
                }`}>
                  {category.name}
                  {category.exploring && ' ★'}
                </span>
                <div className="flex-1 h-px bg-[#1A1A1A]" />
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 font-mono text-sm border transition-all duration-300 cursor-default ${
                      category.exploring
                        ? 'bg-[#0A0A0A] border-[#FFB800]/30 text-[#FFB800]/70 hover:bg-[#1A1A00] hover:border-[#FFB800] hover:text-[#FFB800] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_14px_#FFB80055]'
                        : 'bg-[#0A0A0A] border-[#1A1A1A] text-[#666666] hover:bg-[#001A1A] hover:border-[#00F5FF] hover:text-[#00F5FF] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_14px_#00F5FF55]'
                    }`}
                    style={{
                      transitionDelay: `${categoryIndex * 150 + skillIndex * 80}ms`,
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.85)'
                    }}
                  >
                    {category.exploring && '★ '}{skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
