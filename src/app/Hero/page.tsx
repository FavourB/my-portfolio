'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Modal from './Modal';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  const { scrollY } = useScroll();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Smooth parallax effect
  const imageY = useTransform(scrollY, [0, 500], [0, 50]);
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-[100vh] flex items-center py-12 md:py-0 overflow-hidden"
      >
        {/* Background Design */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-primary"
            style={{
              clipPath: 'polygon(0 0, 45% 0, 35% 100%, 0 100%)',
            }}
          />
          <div
            className="absolute inset-0 bg-background dark:bg-gray-900 transition-colors duration-300"
            style={{
              clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 35% 100%)',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image with Effects */}
            <motion.div
              className="relative order-2 lg:order-1 group"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-full overflow-hidden shadow-xl">
                <motion.div
                  style={{ y: smoothImageY }}
                  className="relative h-full w-full"
                >
                  {/* Image layer */}
                  <Image
                    src="/placeholder.png"
                    alt="Favour Bawa"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-full"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Hero Text */}
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
                    <span className="text-primary ml-5">  FAVOUR BAWA.</span>
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
                crafting clean & user‑friendly experiences, I am committed to
                building excellent software that improves the lives of those
                around me.
              </motion.p>

              <motion.button
                onClick={() => setIsModalOpen(true)} // Fix: Correct onClick handler to toggle modal
                className="group inline-flex items-center bg-primary text-white dark:text-white 
                 text-base md:text-lg font-semibold relative px-6 py-3 
                 rounded-full hover:bg-primary/90 dark:hover:bg-primary/80 
                 transition-colors focus:outline-none focus:ring-2 
                 focus:ring-primary/50 dark:focus:ring-primary/40"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="relative z-10 flex items-center">
                  MORE ABOUT ME
                  <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 transition-transform 
                              group-hover:translate-x-1" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
