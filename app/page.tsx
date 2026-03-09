import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { CurrentlyLearning } from '@/components/sections/CurrentlyLearning'
import { Services } from '@/components/sections/Services'
import { Architecture } from '@/components/sections/Architecture'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'
import { ResumeBanner } from '@/components/sections/ResumeBanner'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <CurrentlyLearning />
        <Services />
        <Blog />
        <Contact />
        <ResumeBanner />
      </main>
      <Footer />
    </>
  )
}
