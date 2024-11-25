'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 35, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Mobile and touch detection
  const checkMobile = useCallback(() => {
    setIsMobile(
      window.innerWidth <= 768 || 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    )
  }, [])

  useEffect(() => {
    // Initial mobile check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)

    // If mobile, exit early
    if (isMobile) return () => window.removeEventListener('resize', checkMobile)

    let timeoutId: NodeJS.Timeout

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8)
      cursorY.set(e.clientY - 8)
    }

    const handleInteraction = (e: MouseEvent) => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const target = e.target as HTMLElement
      
      // Expanded interactive element detection
      const isInteractive = 
        target.closest('nav') ||
        target.closest('button') ||
        target.closest('a') ||
        target.onclick !== null ||
        target.getAttribute('role') === 'button' ||
        target.closest('[data-interactive="true"]')

      // Set hover state based on interaction
      setIsHovering(!!isInteractive)
    }

    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e)
      handleInteraction(e)
    }

    const handleMouseLeave = () => {
      timeoutId = setTimeout(() => {
        setIsHovering(false)
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [cursorX, cursorY, isMobile, checkMobile])

  // Render nothing on mobile
  if (isMobile) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none mix-blend-difference z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ 
          duration: 0.2,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      >
        <div className="absolute w-4 h-4 bg-white rounded-full opacity-30 blur-sm" />
        <div className="w-3 h-3 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  )
}