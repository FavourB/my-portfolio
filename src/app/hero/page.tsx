'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollY } = useScroll()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // Smooth parallax and interactive image effects
  const imageY = useTransform(scrollY, [0, 500], [0, 50])
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <section ref={ref} className="relative min-h-[100svh] flex items-center py-12 md:py-0 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Circular Image with Border Animation */}
            <motion.div
              className="relative order-2 lg:order-1 group"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-full overflow-hidden bg-black/5 shadow-xl 
                before:absolute before:inset-0 before:border-4 before:border-primary/20 before:animate-border-trace
                before:rounded-full before:z-10 before:pointer-events-none">
                <motion.div 
                  style={{ y: smoothImageY }} 
                  className="h-full w-full relative"
                >
                  <Image
                    src="/placeholder.svg"
                    alt="Steve Milner"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="order-1 lg:order-2 lg:pl-12"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative mb-6 md:mb-8">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                  <motion.span 
                    className="inline-flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={inView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="hidden md:block w-8 h-[2px] bg-primary mr-4" />
                    I&apos;M{' '}
                    <span className="text-primary ml-6"> FAVOUR BAWA.</span>
                  </motion.span>
                </h1>
                <motion.h2 
                  className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-600 dark:text-gray-400"
                  initial={{ y: 20, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                 FRONTEND DEVELOPER
                </motion.h2>
              </div>

              <motion.p 
                className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                I&apos;m a passionate web designer & front‑end developer focused on
                crafting clean & user‑friendly experiences, I am commited to building
                excellent software that improves the lives of those around me.
              </motion.p>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center bg-transparent text-base md:text-lg font-semibold relative px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="relative z-10 flex items-center">
                  MORE ABOUT ME
                  <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary transform origin-left transition-transform group-hover:scale-x-110" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8 md:p-12"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square w-full rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="Steve Milner"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-primary">About Me</h2>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-4">
                    As a passionate web designer and front-end developer based in USA, 
                    I specialize in creating intuitive, visually stunning digital experiences 
                    that solve real-world problems.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                    My journey in web development is driven by a commitment to crafting 
                    clean, efficient, and user-friendly interfaces that not only look 
                    great but also enhance user interaction and satisfaction.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}