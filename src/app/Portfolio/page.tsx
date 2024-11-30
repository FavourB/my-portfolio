import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  ExternalLink, 
  Star, 
  Quote, 
  CodeIcon, 
  CheckCircle,
  X,
  Loader2
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

// Project data type with explicit image dimensions
interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  images: ProjectImage[];
  description: string;
  technologies: {
    name: string;
    description?: string;
  }[];
  upworkLink: string;
  clientSatisfaction: number;
  details: {
    duration: string;
    challenges: string[];
    solutions: string[];
  };
  reviews: {
    text: string;
    author: string;
    rating: number;
  }[];
}

// Sample projects with explicit image dimensions
const projects: Project[] = [
  {
    id: 1,
    title: 'Video Conferencing App',
    category: 'Web Application',
    images: [
      { 
        src: '/project-1-screenshot-1.png', 
        width: 1200, 
        height: 800,
        alt: 'Video Conferencing Dashboard'
      },
      { 
        src: '/project-1-screenshot-2.png', 
        width: 1200, 
        height: 800 
      },
      { 
        src: '/project-1-screenshot-3.png', 
        width: 1200, 
        height: 800 
      }
    ],
    description: 'Developed a sophisticated video conferencing platform optimized for small group learning environments.',
    technologies: [
      { 
        name: 'React', 
        description: 'Modern JavaScript library for building interactive user interfaces' 
      },
      { 
        name: 'TypeScript', 
        description: 'Typed superset of JavaScript for enhanced code reliability' 
      },
      // ... other technologies
    ],
    upworkLink: 'https://www.upwork.com/freelancers/~01a6f25e401b07c37c?p=1545480525390082048',
    clientSatisfaction: 4.9,
    details: {
      duration: '6 weeks',
      challenges: [
        'Real-time communication',
        'Scalable architecture',
        'Cross-browser compatibility'
      ],
      solutions: [
        'Implemented WebRTC for low-latency communication',
        'Developed modular, responsive design',
        'Optimized performance for multiple concurrent users'
      ]
    },
    reviews: [
      {
        text: "Exceptional work! The video conferencing app exceeded all our expectations.",
        author: "John D.",
        rating: 5
      },
      {
        text: "Incredible attention to detail and technical expertise.",
        author: "Sarah M.",
        rating: 4.8
      }
    ]
  },
  // Add more projects with similar structure...
];
// Animated Background Component

// Enhanced Animated Background with performance considerations
const AnimatedBackground = React.memo(() => {
  const [particleCount, setParticleCount] = useState(10);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setParticleCount(document.hidden ? 5 : 20);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          animate={{
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`-10vh`, `110vh`],
            scale: [0.5, 1.5],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 50}px`,
            height: `${10 + Math.random() * 50}px`,
            background: `radial-gradient(
              circle, 
              rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3) 0%, 
              rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.1) 100%
            )`
          }}
        />
      ))}
    </motion.div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';
// Project Modal Component with Enhanced Features
const ProjectModal: React.FC<{
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentImageIndex(prev => 
        prev < project.images.length - 1 ? prev + 1 : 0
      );
    },
    onSwipedRight: () => {
      setCurrentImageIndex(prev => 
        prev > 0 ? prev - 1 : project.images.length - 1
      );
    },
  });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        setCurrentImageIndex(prev => 
          prev > 0 ? prev - 1 : project.images.length - 1
        );
        break;
      case 'ArrowRight':
        setCurrentImageIndex(prev => 
          prev < project.images.length - 1 ? prev + 1 : 0
        );
        break;
    }
  }, [isOpen, onClose, project.images.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle image loading state
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={modalRef}
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        aria-labelledby="project-modal-title"
        onPointerDownOutside={onClose}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-50"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </Button>

        <DialogHeader>
          <DialogTitle id="project-modal-title" className="text-3xl font-bold">
            {project.title}
          </DialogTitle>
        </DialogHeader>
        
        
        {/* Enhanced Carousel with Swipe Gestures and Loading State */}
        <div className="relative" {...swipeHandlers}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          )}
            <Carousel 
              className="w-full max-w-3xl mx-auto"
              opts={{
                startIndex: currentImageIndex,
              }}
              setApi={(api) => {
                if (api) {
                  
                  setCurrentImageIndex(api.selectedScrollSnap());
                }
              }}
            >
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {project.images.length}
            </div>
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full aspect-video">
                    <Image
                      src={image.src}
                      alt={image.alt || `${project.title} - Screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-lg"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      onLoadingComplete={index === currentImageIndex ? handleImageLoad : undefined}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              aria-label="Previous image" 
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10" 
            />
            <CarouselNext 
              aria-label="Next image" 
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10" 
            />
          </Carousel>
        </div>

        {/* Project Details Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Project Overview */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <CodeIcon className="mr-2 text-primary" />
              Project Overview
            </h3>
            <p className="text-muted-foreground">{project.description}</p>
            
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge 
                    key={tech.name} 
                    variant="secondary"
                  >
                    {tech.name}
                  </Badge>
              ))}
              </div>
                </div>
          </motion.div>

          {/* Project Challenges & Solutions */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <CheckCircle className="mr-2 text-primary" />
              Challenges & Solutions
            </h3>
            <div>
              <h4 className="font-semibold mb-2">Challenges</h4>
              <ul className="list-disc pl-5 text-muted-foreground">
                {project.details.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-4 mb-2">Solutions</h4>
              <ul className="list-disc pl-5 text-muted-foreground">
                {project.details.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Client Reviews */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Quote className="mr-2 text-primary" />
            Client Reviews
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {project.reviews.map((review, index) => (
              <Card key={index} className="p-6 bg-secondary/10">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`w-5 h-5 ${
                        starIndex < Math.floor(review.rating)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                      fill={starIndex < Math.floor(review.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="italic mb-2">&quot;{review.text}&quot;</p>
                <p className="font-semibold text-muted-foreground">- {review.author}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};


// Main Portfolio Component with Enhanced Features
export default function AdvancedPortfolioSection() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const categories = ['All', 'Web Application', 'Dashboard Design', 'Cross-Platform Development'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <TooltipProvider>
      <LayoutGroup>
        <section className="relative min-h-screen py-16 bg-background">
          <AnimatedBackground />
          
          <motion.div 
            className="container mx-auto px-4 max-w-6xl relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <SectionHeader
              title="MY"
              highlight="PORTFOLIO"
              shadowText="WORKS"
            />

            {/* Sticky Category Filter with Enhanced Animations */}
            <motion.div 
              className="sticky top-4 z-20 bg-background/80 backdrop-blur-sm py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ScrollArea className="w-full">
                <motion.div 
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: 'spring', stiffness: 300 }
                      }}
                      className={`
                        px-6 py-3 rounded-full transition-all duration-300
                        ${filter === category 
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-secondary hover:bg-secondary/80'}
                      `}
                      onClick={() => setFilter(category)}
                    >
                      {category}
                      {filter === category && (
                        <motion.div 
                          layoutId="underline"
                          className="h-1 bg-primary-foreground mt-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </ScrollArea>
            </motion.div>

            {/* Projects Grid with Enhanced Responsiveness and Interactions */}
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                <motion.div 
                  layout 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8"
                >
                  {filteredProjects.map(project => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { 
                          type: 'spring', 
                          stiffness: 300,
                          damping: 10
                        }
                      }}
                      className="group"
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                        {/* Carousel implementation remains similar to previous version */}
                        <Carousel>
                          <CarouselContent>
                            {project.images.map((image, index) => (
                              <CarouselItem key={index}>
                                <div className="relative w-full aspect-video">
                                  <Image
                                    src={image.src}
                                    alt={`${project.title} - Screenshot ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    priority={index === 0}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious 
                            aria-label="Previous project image" 
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10" 
                          />
                          <CarouselNext 
                            aria-label="Next project image" 
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10" 
                          />
                        </Carousel>

                        {/* Project card details */}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold">{project.title}</h3>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star size={16} fill="currentColor" />
                              <span>{project.clientSatisfaction}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 flex-grow">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map(tech => (
                              <Tooltip key={tech.name}>
                                <TooltipTrigger asChild>
                                  <Badge variant="secondary">{tech.name}</Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {tech.description || 'No additional information'}
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>

                          <div className="flex gap-3 mt-auto">
                            <Button 
                              onClick={() => window.open(project.upworkLink, '_blank')}
                              className="flex-1"
                              variant="default"
                            >
                              <ExternalLink size={16} className="mr-2" />
                              Upwork Project
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => setSelectedProject(project)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-muted-foreground"
                >
                  No projects found in this category.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </section>
      </LayoutGroup>
    </TooltipProvider>
  );
}