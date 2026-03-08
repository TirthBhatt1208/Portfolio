"use client"

import { useRef, useState } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { services } from '@/data/services'
import { Code2, Server, Rocket, Brain } from 'lucide-react'

const iconMap = {
  fullstack: Code2,
  api: Server,
  devops: Rocket,
  ai: Brain,
}

export function Services() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h2
          className={`font-mono font-bold text-3xl text-[#E8E8E8] mb-16 text-center transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          What I Can Build For You
        </h2>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              Icon={iconMap[service.id as keyof typeof iconMap]}
              isRevealed={isRevealed}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: typeof services[number]
  Icon: typeof Code2
  isRevealed: boolean
  delay: number
}

function ServiceCard({ service, Icon, isRevealed, delay }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 6, y: -x * 6 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const isAI = service.id === 'ai'

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-6 border transition-all duration-500 group ${
        isAI
          ? 'bg-[#0A0A0A] border-[#FFB800]/20 hover:border-[#FFB800]'
          : 'bg-[#0A0A0A] border-[#1A1A1A] hover:border-[#FFB800]'
      } ${isRevealed ? 'card-3d revealed' : 'card-3d'}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: isRevealed
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x ? -6 : 0}px)`
          : undefined,
        background: isAI ? 'linear-gradient(135deg, #0A0A0A 0%, rgba(255,184,0,0.03) 100%)' : undefined,
      }}
    >
      {/* Learning Badge */}
      {service.isLearning && (
        <span className="absolute top-4 right-4 px-2 py-0.5 bg-[#FFB800]/10 border border-[#FFB800]/30 font-mono text-[10px] text-[#FFB800]">
          actively learning
        </span>
      )}

      {/* Icon */}
      <div className={`mb-4 transition-all duration-300 group-hover:scale-110 ${
        isAI ? 'text-[#FFB800] group-hover:drop-shadow-[0_0_10px_#FFB800]' : 'text-[#555555] group-hover:text-[#FFB800] group-hover:drop-shadow-[0_0_10px_#FFB800]'
      }`}>
        <Icon size={28} />
      </div>

      {/* Title */}
      <h3 className="font-mono font-semibold text-[#E8E8E8] mb-2">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-[#555555] mb-4">
        {service.description}
      </p>

      {/* Tagline */}
      <p className={`font-sans text-sm italic ${isAI ? 'text-[#FFB800]/70' : 'text-[#888888]'}`}>
        "{service.tagline}"
      </p>
    </div>
  )
}
