import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tirth Bhatt | Full-Stack Developer',
  description: 'Full-Stack Developer specializing in React, Next.js, Express.js, and GenAI. Building fast, scalable web apps from pixel-perfect frontends to bulletproof backends.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'Express.js', 'Node.js', 'TypeScript', 'GenAI', 'Web Developer', 'Tirth Bhatt'],
  authors: [{ name: 'Tirth Bhatt' }],
  creator: 'Tirth Bhatt',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Tirth Bhatt | Full-Stack Developer',
    description: 'Full-Stack Developer building fast, scalable web apps with React, Next.js, and Express.js.',
    siteName: 'Tirth Bhatt Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tirth Bhatt | Full-Stack Developer',
    description: 'Full-Stack Developer building fast, scalable web apps with React, Next.js, and Express.js.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${syne.variable}`}>
      <body className="font-sans antialiased bg-[#050505] text-[#E8E8E8] overflow-x-hidden">
        {/* Noise Overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Scanlines */}
        <div className="scanlines" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
