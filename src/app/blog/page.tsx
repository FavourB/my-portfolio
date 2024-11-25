'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/section-header'

const blogPosts = [
  {
    id: 1,
    title: 'How to Own Your Audience by Creating an Email List',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/placeholder.png',
    readTime: '5 min read',
    date: 'Oct 15, 2023',
  },
  {
    id: 2,
    title: 'Top 10 Toolkits for Deep Learning in 2022',
    excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/placeholder.png',
    readTime: '8 min read',
    date: 'Oct 12, 2023',
  },
  {
    id: 3,
    title: 'Everything You Need to Know About Web Accessibility',
    excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/placeholder.png',
    readTime: '6 min read',
    date: 'Oct 10, 2023',
  },
]

export default function Blog() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="blog" className="py-20 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="MY"
            highlight="BLOG"
            shadowText="POSTS"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="group bg-background rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onHoverStart={() => setHoveredId(post.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  <span className="mr-2">Read More</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    animate={hoveredId === post.id ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </motion.svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}