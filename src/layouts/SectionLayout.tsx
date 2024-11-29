'use client'
import { motion } from 'framer-motion'

interface SectionLayoutProps {
  children: React.ReactNode
  id: string
  currentActiveSection: string
}

export default function SectionLayout({
  children,
  id,
  currentActiveSection,
}: SectionLayoutProps) {
  const isVisible = currentActiveSection === id

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full overflow-auto"
    >
      {children}
    </motion.div>
  )
}