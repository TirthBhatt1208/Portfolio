"use client"

import { useReveal } from '@/hooks/use-reveal'

const learningItems = [
  {
    title: "System Design",
    description: "Distributed systems, CAP theorem, load balancing, scalable architectures"
  },
  {
    title: "Cloud Deployment",
    description: "AWS services beyond EC2 — S3, CloudFront, understanding IAM and networking"
  },
  {
    title: "Docker & Container Orchestration",
    description: "From Docker Compose to Kubernetes fundamentals"
  },
  {
    title: "GenAI & LLM Integration",
    description: "LangChain, prompt engineering, RAG pipelines, embedding databases"
  }
]

export function CurrentlyLearning() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <h2
          className={`font-mono text-sm text-[#00F5FF] mb-16 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {'>'} currently --learning
        </h2>

        {/* Learning Items */}
        <div className="space-y-8">
          {learningItems.map((item, index) => (
            <div
              key={item.title}
              className={`flex gap-4 transition-all duration-700 ${
                isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <span className="text-[#00F5FF] font-mono mt-0.5">◎</span>
              <div>
                <h3 className="font-mono text-[#E8E8E8] mb-1">{item.title}</h3>
                <p className="font-sans text-sm text-[#555555]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
