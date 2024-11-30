import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { 
  ExternalLink, 
  Star, 
  Quote, 
  CodeIcon, 
  CheckCircle
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
// Project data type with explicit image dimensions
interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  images: ProjectImage[];
  description: string;
  technologies: string[];
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
        height: 800 
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
    technologies: ['React', 'TypeScript', 'WebRTC', 'Tailwind CSS'],
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
const AnimatedBackground = () => {
  return (
    <motion.div 
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Particle-like background animation */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          animate={{
            x: [
              `${Math.random() * 100}vw`, 
              `${Math.random() * 100}vw`
            ],
            y: [
              `-10vh`, 
              `110vh`
            ],
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
            width: `${10 + Math.random() * 100}px`,
            height: `${10 + Math.random() * 100}px`,
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
};
// Project Modal Component with Image optimization
const ProjectModal: React.FC<{
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        aria-labelledby="project-modal-title"
      >
        <DialogHeader>
          <DialogTitle id="project-modal-title" className="text-3xl font-bold">
            {project.title}
          </DialogTitle>
        </DialogHeader>
        
        {/* Optimized Image Carousel */}
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {project.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full aspect-video">
                  <Image
                    src={image.src}
                    alt={`${project.title} - Screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
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
                  <Badge key={tech} variant="secondary">{tech}</Badge>
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

// Main Portfolio Component
export default function AdvancedPortfolioSection() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const categories = ['All', 'Web Application', 'Dashboard Design', 'Cross-Platform Development'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);


  return (
    <LayoutGroup>
      <section className="relative min-h-screen py-16 bg-background">
        <AnimatedBackground />
        
        <motion.div 
          className="container mx-auto px-4 max-w-6xl relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="MY"
            highlight="PORTFOLIO"
            shadowText="WORKS"
          />
        </motion.div>
          </motion.div>

          <ScrollArea className="w-full mb-10">
            <motion.div 
              className="flex justify-center gap-4 pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={`
                    px-6 py-3 rounded-full transition-all duration-300
                    ${filter === category 
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary hover:bg-secondary/80'}
                  `}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </ScrollArea>

          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="overflow-hidden group">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {project.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative w-full aspect-video">
                              <Image
                                src={image.src}
                                alt={`${project.title} - Screenshot ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
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

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={16} fill="currentColor" />
                          <span>{project.clientSatisfaction}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map(tech => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={() => window.open(project.upworkLink, '_blank')}
                          className="flex-1"
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
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </section>
    </LayoutGroup>
  );
}