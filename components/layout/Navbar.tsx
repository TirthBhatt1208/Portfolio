"use client"

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections
    navLinks.forEach(({ href }) => {
      const section = document.querySelector(href)
      if (section) observer.observe(section)
    })

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/80 backdrop-blur-md border-b border-[#1A1A1A]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono font-bold text-xl text-[#E8E8E8] hover:text-[#00F5FF] transition-colors duration-300 glow-pulse"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            BT
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={`relative font-sans text-sm transition-colors duration-300 ${
                    activeSection === href.slice(1)
                      ? 'text-[#E8E8E8]'
                      : 'text-[#555555] hover:text-[#E8E8E8]'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#00F5FF] transition-transform duration-300 origin-left ${
                      activeSection === href.slice(1)
                        ? 'w-full scale-x-100'
                        : 'w-full scale-x-0'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#E8E8E8] hover:text-[#00F5FF] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#050505] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map(({ href, label }, index) => (
            <button
              key={href}
              onClick={() => handleNavClick(href)}
              className={`font-sans text-2xl text-[#E8E8E8] hover:text-[#00F5FF] transition-all duration-500 ${
                isMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
