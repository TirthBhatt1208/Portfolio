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
    // Split by code blocks first so we don't break code blocks that contain empty lines
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      // Code blocks
      if (part.startsWith('```')) {
        const lines = part.trim().split('\n');
        // Extract the code content, ignoring the first line (```language) and the last line (```)
        const code = lines.slice(1, -1).join('\n');
        return (
          <pre key={`code-${index}`} className="my-6 p-6 bg-[#0A0A0A] border border-[#00F5FF]/20 overflow-x-auto rounded-lg">
            <code className="font-mono text-sm text-[#888888] whitespace-pre">
              {code}
            </code>
          </pre>
        );
      }

      // Process regular text content
      return part.split('\n\n').map((block, bIndex) => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return null;

        const key = `text-${index}-${bIndex}`;

        // H1 Headers (mapped to h2 visually)
        if (trimmedBlock.startsWith('# ')) {
          return (
            <h2 key={key} className="font-mono font-bold text-2xl text-[#E8E8E8] mt-12 mb-6">
              <span className="text-[#00F5FF]">#</span> {trimmedBlock.slice(2)}
            </h2>
          );
        }

        // H2 Headers
        if (trimmedBlock.startsWith('## ')) {
          return (
            <h3 key={key} className="font-mono font-bold text-xl text-[#E8E8E8] mt-8 mb-4">
              <span className="text-[#A78BFA]">##</span> {trimmedBlock.slice(3)}
            </h3>
          );
        }

        // Dividers
        if (trimmedBlock === '---') {
          return <div key={key} className="h-px w-full bg-[#1A1A1A] my-10" />;
        }

        // Inline code
        const processedBlock = trimmedBlock.replace(
          /`([^`]+)`/g,
          '<code class="px-1.5 py-0.5 bg-[#0A0A0A] border border-[#1A1A1A] font-mono text-sm text-[#00F5FF] rounded">$1</code>'
        );

        // Regular paragraph
        return (
          <p
            key={key}
            className="font-sans text-[#888888] leading-relaxed my-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: processedBlock }}
          />
        );
      });
    });
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
