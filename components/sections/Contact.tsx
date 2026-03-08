"use client"

import { useState } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { Mail, Linkedin, Github, MapPin, Copy, Check, Send } from 'lucide-react'

export function Contact() {
  const [sectionRef, isRevealed] = useReveal<HTMLElement>({ threshold: 0.1 })
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('work.tirth1208@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormState('success')
    
    setTimeout(() => {
      setFormState('idle')
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section
      id="contact"
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
          Let's Build Something Together
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <Mail className="w-5 h-5 text-[#00F5FF]" />
                <span className="font-mono text-[#E8E8E8]">work.tirth1208@gmail.com</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-[#555555] hover:text-[#00F5FF] transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/tirth-bhatt-796609277"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <Linkedin className="w-5 h-5 text-[#00F5FF]" />
                <span className="font-mono text-[#888888] group-hover:text-[#E8E8E8] transition-colors">
                  linkedin.com/in/tirth-bhatt-796609277
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/TirthBhatt1208"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <Github className="w-5 h-5 text-[#00F5FF]" />
                <span className="font-mono text-[#888888] group-hover:text-[#E8E8E8] transition-colors">
                  github.com/TirthBhatt1208
                </span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-[#00F5FF]" />
                <span className="font-mono text-[#888888]">Rajkot, Gujarat, India</span>
              </div>
            </div>

            {/* Status */}
            <div className="mt-12 p-6 border-l-2 border-[#1A1A1A]">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-sans text-[#E8E8E8]">Open to work & freelance projects</span>
              </div>
              <p className="font-sans text-sm text-[#555555]">
                Usually responds within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 ${
              isRevealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <form onSubmit={handleSubmit} className="terminal p-6 space-y-6">
              {/* Name */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[#00F5FF] w-16">$ name:</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="flex-1 bg-transparent border-b border-[#2A2A2A] focus:border-[#00F5FF] focus:shadow-[0_1px_0_#00F5FF] font-mono text-[#E8E8E8] placeholder:text-[#444444] outline-none py-2 transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[#00F5FF] w-16">$ email:</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent border-b border-[#2A2A2A] focus:border-[#00F5FF] focus:shadow-[0_1px_0_#00F5FF] font-mono text-[#E8E8E8] placeholder:text-[#444444] outline-none py-2 transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex gap-4">
                <span className="font-mono text-[#00F5FF] w-16 pt-2">$ msg:</span>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  required
                  rows={4}
                  className="flex-1 bg-transparent border border-[#2A2A2A] focus:border-[#00F5FF] font-mono text-[#E8E8E8] placeholder:text-[#444444] outline-none p-3 resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formState === 'loading' || formState === 'success'}
                  className={`flex items-center gap-2 px-6 py-3 font-mono font-semibold transition-all duration-300 ${
                    formState === 'success'
                      ? 'bg-green-500 text-[#050505]'
                      : formState === 'error'
                      ? 'border border-red-500 text-red-500'
                      : 'bg-[#00F5FF] text-[#050505] hover:-translate-y-1'
                  }`}
                >
                  {formState === 'idle' && (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                  {formState === 'loading' && 'Sending...'}
                  {formState === 'success' && 'Sent ✓'}
                  {formState === 'error' && 'Try again'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
