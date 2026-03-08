import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { blogPosts } from '@/data/blogs'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Tirth Bhatt`,
    description: post.tagline,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Parse markdown-like content to HTML
  const parseContent = (content: string) => {
    return content
      .split('\n\n')
      .map((block, index) => {
        // Headers
        if (block.startsWith('# ')) {
          return (
            <h2 key={index} className="font-mono font-bold text-2xl text-[#E8E8E8] mt-12 mb-6">
              <span className="text-[#00F5FF]">#</span> {block.slice(2)}
            </h2>
          )
        }
        
        // Code blocks
        if (block.startsWith('```')) {
          const lines = block.split('\n')
          const code = lines.slice(1, -1).join('\n')
          return (
            <pre key={index} className="my-6 p-6 bg-[#0A0A0A] border border-[#00F5FF]/20 overflow-x-auto">
              <code className="font-mono text-sm text-[#888888] whitespace-pre">
                {code}
              </code>
            </pre>
          )
        }

        // Inline code
        const processedBlock = block.replace(
          /`([^`]+)`/g,
          '<code class="px-1.5 py-0.5 bg-[#0A0A0A] border border-[#1A1A1A] font-mono text-sm text-[#00F5FF]">$1</code>'
        )

        // Regular paragraph
        return (
          <p
            key={index}
            className="font-sans text-[#888888] leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: processedBlock }}
          />
        )
      })
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-16 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 font-mono text-sm text-[#555555] hover:text-[#00F5FF] transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Title */}
        <h1 className="font-mono font-extrabold text-3xl md:text-4xl text-[#E8E8E8] mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#0A0A0A] border border-[#1A1A1A] font-mono text-xs text-[#555555]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="font-sans italic text-lg text-[#555555] mb-8">
          {post.tagline}
        </p>

        {/* Date */}
        <p className="font-mono text-sm text-[#FFB800] mb-8">
          {post.date}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-[#00F5FF]/30 mb-12" />

        {/* Content */}
        <div className="prose-custom">
          {parseContent(post.content)}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-[#1A1A1A]">
          <p className="font-sans text-[#555555] mb-4">
            Thanks for reading! If you found this helpful, feel free to reach out.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F5FF] text-[#050505] font-mono font-semibold hover:bg-[#FFB800] hover:-translate-y-1 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </article>
    </main>
  )
}
