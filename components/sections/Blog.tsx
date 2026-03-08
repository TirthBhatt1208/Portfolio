"use client"

import Link from 'next/link'
import { useReveal } from '@/hooks/use-reveal'
import { blogPosts } from '@/data/blogs'
import { ArrowRight } from 'lucide-react'

export function Blog() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="font-mono font-bold text-3xl text-[#E8E8E8] mb-2">
            Thoughts & Writings
          </h2>
          <p className="font-mono text-sm text-[#555555]">
            {'// things I figured out the hard way'}
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              isRevealed={isRevealed}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface BlogCardProps {
  post: typeof blogPosts[number]
  isRevealed: boolean
  delay: number
}

function BlogCard({ post, isRevealed, delay }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative block p-6 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#00F5FF] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_#00F5FF08] transition-all duration-500 ${
        isRevealed ? 'card-3d revealed' : 'card-3d'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00F5FF] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

      {/* Date */}
      <span className="font-mono text-xs text-[#FFB800] mb-4 block">
        {post.date}
      </span>

      {/* Title */}
      <h3 className="font-mono font-semibold text-[#E8E8E8] mb-2 leading-tight">
        {post.title}
      </h3>

      {/* Tagline */}
      <p className="font-sans text-sm text-[#555555] mb-4">
        {post.tagline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-[#0F0F0F] border border-[#1A1A1A] font-mono text-[10px] text-[#555555]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Read More */}
      <span className="flex items-center gap-2 font-mono text-xs text-[#555555] group-hover:text-[#00F5FF] transition-colors">
        Read More
        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  )
}
