"use client"

import { useReveal } from '@/hooks/use-reveal'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const lessons = [
  {
    number: "01",
    title: "How to fire real-time events from inside a BullMQ queue",
    content: `Queue workers run in their own process context — they have no direct reference to the WebSocket server. You can't just call io.emit() from inside a worker.\n\nSolution: Publish progress to a Redis Pub/Sub channel from inside the worker. The WebSocket server subscribes to that channel and forwards the event to the correct client using the userId from job metadata. This creates a clean, decoupled event-driven bridge.`
  },
  {
    number: "02",
    title: "Environment variables don't automatically load in background workers",
    content: `Background worker processes are separate Node.js processes. They don't inherit the .env file loaded by the main server.\n\nSolution: Explicitly call dotenv.config({ path: '../.env' }) at the very top of the worker entry file, before any other imports that depend on environment variables.`
  },
  {
    number: "03",
    title: "WebSocket event ordering with async queue progress",
    content: `Multiple queue steps fire progress events asynchronously. Events can arrive out of order on the client.\n\nSolution: Attach a Unix timestamp to every event in the worker before publishing. On the frontend, sort received events by timestamp before rendering. Never trust arrival order from async sources.`
  }
]

const cards = [
  {
    id: 'user-flow',
    title: 'User Flow',
    subtitle: 'Upload → Process → Stream',
    badge: 'SYSTEM DESIGN',
    accent: '#00F5FF',
    // Place your image at: public/diagrams/user-flow.png
    image: 'User_flow.png',
  },
  {
    id: 'cicd-flow',
    title: 'CI/CD Flow',
    subtitle: 'Push → Deploy → Live',
    badge: 'INFRASTRUCTURE',
    accent: '#A78BFA',
    // Place your image at: public/diagrams/cicd-flow.png
    image: 'CI_CD.png',
  },
]

export function Architecture() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })
  const router = useRouter()

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 className="font-mono font-bold text-3xl text-[#E8E8E8] mb-2">
            How I Built VideoFlow
          </h2>
          <p className="font-mono text-sm text-[#555555]">
            {'// system design + lessons learned the hard way'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT: Two small image cards */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            {cards.map((card, i) => (
              <div
                key={card.id}
                className="flex-1 rounded-xl overflow-hidden flex flex-col"
                style={{
                  background: '#0D0D0D',
                  border: '1px solid #1C1C1C',
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${0.25 + i * 0.1}s, transform 0.5s ease ${0.25 + i * 0.1}s, border-color 0.2s ease, box-shadow 0.2s ease`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = `${card.accent}44`
                  el.style.boxShadow = `0 0 24px ${card.accent}12`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = '#1C1C1C'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Badge + title */}
                <div className="px-4 pt-4 pb-3">
                  <span
                    className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded inline-block mb-2"
                    style={{ background: `${card.accent}18`, color: card.accent, border: `1px solid ${card.accent}30` }}
                  >
                    {card.badge}
                  </span>
                  <h3 className="font-mono text-sm font-bold text-[#E0E0E0]">{card.title}</h3>
                  <p className="font-mono text-[10px] text-[#3A3A3A] mt-0.5">{card.subtitle}</p>
                </div>

                {/* Diagram image thumbnail */}
                <div
                  className="mx-4 mb-3 rounded-lg overflow-hidden relative"
                  style={{ background: '#080808', border: '1px solid #181818', height: 110 }}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover object-top"
                    style={{ opacity: 0.9 }}
                  />
                  {/* bottom fade */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent 55%, #0D0D0D)' }}
                  />
                </div>

                {/* Button */}
                <div className="px-4 pb-4 mt-auto">
                  <button
                    onClick={() => router.push(`/architecture?focus=${card.id}`)}
                    className="w-full font-mono text-[11px] py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
                    style={{
                      background: 'transparent',
                      border: `1px solid ${card.accent}30`,
                      color: `${card.accent}99`,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = `${card.accent}12`
                      el.style.borderColor = `${card.accent}66`
                      el.style.color = card.accent
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.background = 'transparent'
                      el.style.borderColor = `${card.accent}30`
                      el.style.color = `${card.accent}99`
                    }}
                  >
                    View Full Diagram
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: 3 Problems — untouched */}
          <div
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateX(0)' : 'translateX(32px)',
              transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
            }}
          >
            <h3 className="font-mono text-sm text-[#FFB800] mb-6">
              3 PROBLEMS THAT MADE ME THINK
            </h3>
            <div className="space-y-8">
              {lessons.map((lesson) => (
                <div
                  key={lesson.number}
                  className="border-l-2 border-[#1A1A1A] pl-6 hover:border-[#00F5FF] transition-colors duration-300"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-2xl font-bold text-[#00F5FF]/30">
                      {lesson.number}
                    </span>
                    <h4 className="font-mono text-sm text-[#E8E8E8]">
                      {lesson.title}
                    </h4>
                  </div>
                  <p className="font-sans text-sm text-[#555555] leading-relaxed whitespace-pre-line">
                    {lesson.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}