'use client'

import React, { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        (target.closest && (target.closest('button') || target.closest('a')))
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.style.cursor = 'auto';
    } else {
      document.body.style.cursor = 'none';
    }
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <motion.div 
            className="absolute w-8 h-8 bg-primary rounded-full opacity-20"
            animate={{ scale: isHovering ? 1.2 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-4 h-4 bg-primary rounded-full"
            animate={{ scale: isHovering ? 0.8 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="w-2 h-2 bg-primary rounded-full opacity-50" />
      </motion.div>
    </>
  )
}

export default CustomCursor

