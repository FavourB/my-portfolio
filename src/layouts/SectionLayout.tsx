//layouts/SectionLayout.tsx
'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'

interface SectionLayoutProps {
  children: React.ReactNode
}

export default function SectionLayout({ children }: SectionLayoutProps) {
  const activeSection = useActiveSection()
  const [currentSection, setCurrentSection] = useState<string>('home')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (activeSection) {
      setCurrentSection(activeSection)
    }
    setIsVisible(true)
  }, [activeSection])

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSection}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        exit="exit"
        variants={variants}
        className="min-h-screen w-full mx-auto pt-4 pb-24 px-4 sm:px-6 lg:px-8 
                   overflow-hidden relative"
        style={{
          willChange: 'opacity, transform',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 5rem)' // Account for bottom nav
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}