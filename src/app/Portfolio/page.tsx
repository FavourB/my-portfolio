'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/section-header'

const projects = [
  { id: 1, title: 'Project 1', category: 'Web Design', image: '/placeholder.png' },
  { id: 2, title: 'Project 2', category: 'Mobile App', image: '/placeholder.png' },
  { id: 3, title: 'Project 3', category: 'Branding', image: '/placeholder.png' },
  { id: 4, title: 'Project 4', category: 'Web Design', image: '/placeholder.png' },
  { id: 5, title: 'Project 5', category: 'Mobile App', image: '/placeholder.png' },
  { id: 6, title: 'Project 6', category: 'Branding', image: '/placeholder.png' },
]

const categories = ['All', 'Web Design', 'Mobile App', 'Branding']

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for section animation
  useEffect(() => {
    const currentRef = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '-100px 0px'
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const projectVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section 
      id="portfolio" 
      className="py-20 overflow-hidden relative min-h-screen pb-24"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="MY"
            highlight="PORTFOLIO"
            shadowText="WORKS"
          />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full transition-all duration-300 transform
                ${filter === category 
                  ? 'bg-primary text-primary-foreground scale-105 shadow-lg' 
                  : 'bg-secondary text-secondary-foreground hover:scale-105'}
              `}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={projectVariants}
                className="relative group overflow-hidden rounded-xl shadow-lg"
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                    loading="lazy"
                  />
                </div>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm md:text-base text-gray-200">{project.category}</p>
                    <motion.button
                      className="mt-4 px-6 py-2 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      View Project
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}