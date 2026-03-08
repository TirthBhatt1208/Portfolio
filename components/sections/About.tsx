"use client"

import { useReveal } from '@/hooks/use-reveal'
import { GraduationCap, Calendar, Zap } from 'lucide-react'

const highlightText = (text: string, keywords: string[]) => {
  let result = text
  keywords.forEach(keyword => {
    result = result.replace(
      new RegExp(`(${keyword})`, 'gi'),
      '<span class="text-[#00F5FF]">$1</span>'
    )
  })
  return result
}

const bioText = `I'm a Computer Engineering student at VVP Engineering College, Rajkot — in my 3rd year and obsessed with building things that actually work at scale.

I don't just write code — I build systems. From real-time video processing pipelines to AI-powered coding platforms, I enjoy solving problems that go beyond CRUD and require thinking in queues, sockets, and distributed architecture.

Currently deepening my expertise in full-stack development with React, Next.js, and Express.js, while threading GenAI capabilities into real products.`

const keywords = ['VVP Engineering College', 'real-time', 'systems', 'distributed architecture', 'GenAI']

const statCards = [
  {
    icon: GraduationCap,
    title: 'VVP Engineering',
    subtitle: 'College, Rajkot',
    detail: 'CGPA: 8.00'
  },
  {
    icon: Calendar,
    title: '3rd Year — B.E.',
    subtitle: 'Computer Engg.',
    detail: '2023 – 2027'
  },
  {
    icon: Zap,
    title: 'Full-Stack +',
    subtitle: 'GenAI Builder',
    detail: ''
  }
]

export function About() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })
  const [leftRef, isLeftRevealed] = useReveal<HTMLDivElement>({ threshold: 0.2 })
  const [rightRef, isRightRevealed] = useReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <h2
          className={`font-mono text-sm text-[#00F5FF] mb-16 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {'>'} about --me
        </h2>

        <div className="grid lg:grid-cols-[40%_1fr] gap-12 lg:gap-16">
          {/* Left Column - Photo */}
          <div
            ref={leftRef}
            className={`relative transition-all duration-1000 ${
              isLeftRevealed
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
            style={{ perspective: '1000px' }}
          >
            <div
              className="relative aspect-square max-w-sm mx-auto lg:mx-0"
              style={{
                clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)'
              }}
            >
              {/* Profile Photo */}
              <div className="w-full h-full bg-[#0F0F0F] border border-[#1A1A1A] flex items-center justify-center overflow-hidden">
                <img src="/My_Image.jpeg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              {/* Corner brackets */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-[#00F5FF]" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-[#00F5FF]" />
            </div>

            {/* Open to Work Badge */}
            <div className="absolute top-4 right-4 lg:-right-4 flex items-center gap-2 px-3 py-1.5 bg-[#0F0F0F] border border-[#1A1A1A]">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-[#E8E8E8]">Open to Work</span>
            </div>
          </div>

          {/* Right Column - Bio */}
          <div
            ref={rightRef}
            className={`transition-all duration-1000 ${
              isRightRevealed
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Bio Text */}
            <div
              className="font-sans text-[#888888] leading-relaxed mb-10 space-y-4"
              dangerouslySetInnerHTML={{
                __html: highlightText(bioText, keywords).replace(/\n\n/g, '</p><p class="mt-4">')
              }}
            />

            {/* Stat Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className="group p-4 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#00F5FF] transition-all duration-300 cursor-default"
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <card.icon className="w-5 h-5 text-[#00F5FF] mb-3" />
                  <h3 className="font-mono text-sm text-[#E8E8E8]">{card.title}</h3>
                  <p className="font-sans text-sm text-[#555555]">{card.subtitle}</p>
                  {card.detail && (
                    <p className="font-mono text-xs text-[#00F5FF] mt-2">{card.detail}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal Block */}
            <div className="terminal p-6">
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <span className="text-[#555555]">~</span>{' '}
                  <span className="terminal-prompt">tirth@portfolio:~$</span>{' '}
                  <span className="text-[#E8E8E8]">whoami</span>
                </div>
                <div className="text-[#888888] pl-4">
                  {'>'} CS Student. Systems Builder.
                </div>
                <div className="mt-4">
                  <span className="text-[#555555]">~</span>{' '}
                  <span className="terminal-prompt">tirth@portfolio:~$</span>{' '}
                  <span className="text-[#E8E8E8]">current --focus</span>
                </div>
                <div className="text-[#888888] pl-4 typing-cursor">
                  {'>'} System Design + Cloud Deployment + LLMs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
