'use client'
import { useActiveSection } from '@/context/ActiveSectionContext'
import MainLayout from '@/layouts/MainLayout'
import Hero from '@/app/Hero/page'
import About from '@/app/About/page'
import Portfolio from '@/app/Portfolio/page'
import Blog from '@/app/Blog/page'
import Contact from '@/app/Contact/page'
import SectionLayout from '@/layouts/SectionLayout'
import { useEffect } from 'react'

export default function Home() {
  const { activeSection, setActiveSection } = useActiveSection()

  // Ensure hero section is active on initial load
  useEffect(() => {
    if (!activeSection) {
      setActiveSection('hero')
    }
  }, [activeSection, setActiveSection])

  if (!activeSection) return null // Prevent flash of content

  return (
    <MainLayout>
      <div className="relative h-screen">
        <SectionLayout id="hero" currentActiveSection={activeSection}>
          <Hero />
        </SectionLayout>
        <SectionLayout id="about" currentActiveSection={activeSection}>
          <About />
        </SectionLayout>
        <SectionLayout id="portfolio" currentActiveSection={activeSection}>
          <Portfolio />
        </SectionLayout>
        <SectionLayout id="blog" currentActiveSection={activeSection}>
          <Blog />
        </SectionLayout>
        <SectionLayout id="contact" currentActiveSection={activeSection}>
          <Contact />
        </SectionLayout>
      </div>
    </MainLayout>
  )
}