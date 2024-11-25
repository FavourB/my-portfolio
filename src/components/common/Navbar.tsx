'use client'
import { useTheme } from '@/context/ThemeContext'
import { useActiveSection } from '@/hooks/useActiveSection'
import { NavItem } from './NavItem'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Briefcase, Mail, MessageSquare, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '#hero', icon: Home, label: 'HOME' },
  { href: '#about', icon: User, label: 'ABOUT' },
  { href: '#portfolio', icon: Briefcase, label: 'WORK' },
  { href: '#contact', icon: Mail, label: 'CONTACT' },
  { href: '#chat', icon: MessageSquare, label: 'CHAT' },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const activeSection = useActiveSection()
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    if (href?.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  const themeToggleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      }
    }
  }

  const navContainerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
      {/* Theme Toggle */}
      <motion.button
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 
                   flex items-center justify-center shadow-lg hover:shadow-xl 
                   transition-shadow duration-300"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variants={themeToggleVariants}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation */}
      <motion.div 
        className="lg:hidden"
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 
                     border-t dark:border-gray-800 backdrop-blur-lg"
          initial={{ y: 100 }}
          animate={{ y: isScrollingDown ? 100 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            willChange: 'transform',
            paddingBottom: 'env(safe-area-inset-bottom)'
          }}
        >
          <div className="flex justify-around items-center h-16 px-4">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={activeSection === item.href.replace('#', '')}
                onClick={handleNavClick}
              />
            ))}
          </div>
        </motion.nav>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div 
        className="hidden lg:block"
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.nav
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end space-y-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              isActive={activeSection === item.href.replace('#', '')}
              onClick={handleNavClick}
            />
          ))}
        </motion.nav>
      </motion.div>
    </>
  )
}