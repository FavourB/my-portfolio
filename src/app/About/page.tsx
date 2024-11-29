'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CircularProgress } from '@/components/ui/circular-progress';
import { StatBox } from '@/components/ui/stat-box';
import { TimelineItem } from '@/components/ui/timeline';
import { SectionHeader } from '@/components/ui/section-header';

const skills = [
  { label: 'HTML', value: 98 },
  { label: 'JAVASCRIPT', value: 95 },
  { label: 'CSS', value: 98 },
  { label: 'TYPESCRIPT', value: 90 },
  { label: 'WORDPRESS', value: 92 },
  { label: 'FRAMEWORKS', value: 92 },
  { label: 'LIBRARIES', value: 92 },
  { label: 'REACT', value: 95 },
];

const personalInfo = {
  firstName: 'FAVOUR',
  lastName: 'BAWA',
  age: '26 Years',
  nationality: 'NIGERIAN',
  freelance: 'Available',
  address: 'Ohio, OH',
  phone: '+234 808 683 1929',
  email: 'favourbawa04@mail.com',
  LinkedIn: 'https://www.linkedin.com/in/favour-bawa-884445173/',
  languages: 'English',
};

const stats = [
  { value: '6+', label: 'YEARS OF EXPERIENCE' },
  { value: '20+', label: 'COMPLETED PROJECTS' },
  { value: '40+', label: 'HAPPY CUSTOMERS' },
  { value: '10+', label: 'AWARDS AND CERTIFICATIONS' },
];

const experience = [
  {
    date: '2020 - PRESENT',
    title: 'Co-founder, Front-End Developer',
    organization: 'N&S Tech (Nigeria)',
    description: '• Built the tech service agency in frontend, backend development, mobile development, content writing and video editing in collaboration with 6 diversely-skilled freelancers. Has led 20 staff across board to deliver 12 end-to-end 5-star projects. Developed strong skills in leadership, task management with cross-functional collaboration via Slack, Clickup and Trello for clear communication.',
  },
  {
    date: 'Apr. 2022 – Jan. 2023',
    title: 'Front-End Developer',
    organization: 'Metrodao (U.S.A)',
    description: '• Worked on a team to develop a tool for accessing services in any African language using deep learning and artificial intelligence. Collaborated with the CTO, Product Designer, Backend and DevOPs developers to test and launch the product. Comprehensively reviewed the product architecture by heuristic evaluation. Added a voice bot to the language console.',
  },
  {
    date: 'Dec. 2020 – Mar. 2021',
    title: ' Front-End Developer (Remote Workspace)',
    organization: 'Quin. Video (U.S.A)',
    description: '• Developed an EdTech video conferencing web application MVP. Consolidated skills in agile development, debugging, competitive analysis, and in developing reusable JavaScript, HTML and CSS code. Collaborated with the backend team to resolve architectural design challenges. Implemented testing feedback and reduced total bug frequency to 3%',
  },
  {
    date: 'Apr. 2021 – Jul. 2021',
    title: ' Front-End Developer (Remote Job)',
    organization: 'Frontendlabs (United Kingdom)',
    description: '• Developed key skills in leadership, communication, personnel & performance management. Coordinated, clear communication of ideas and specifications between clients and developers, from ideation to launch. Established workflows to address structural gaps. Improved project turnaround time by 60%+ without compromising development quality.',
  }
];

const education = [
  {
    date: 'Nov 2014 – Nov 2019',
    title: 'CHEMICAL ENGINEERING DEGREE',
    organization: 'UNIVERSITY OF LAGOS, (LAGOS, NIGERIA)',
    description: '• Bachelor of Science in Chemical Engineering, First Class Honours, Highest Distinction',
  },
  {
    date: '2022 – Present',
    title: 'MASTER DEGREE',
    organization: 'OHIO STATE UNIVERSITY, (OHIO, U.S.A)',
    description: '• Masters of Science in Chemical Engineering, First Class Honours',
  },
];

type FadeInSectionProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

type SkillItemProps = {
  skill: { label: string; value: number };
  index: number;
};

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <CircularProgress {...skill} />
    </motion.div>
  );
};

type TimelineItemAnimatedProps = {
  item: { date: string; title: string; organization: string; description: string };
  index: number;
  direction?: "left" | "right";
};

const TimelineItemAnimated: React.FC<TimelineItemAnimatedProps> = ({ item, direction = "left" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === "left" ? -50 : 50 }}
      transition={{ duration: 0.5 }}
    >
      <TimelineItem {...item} />
    </motion.div>
  );
};

export default function About() {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/FAVOUR BAWA - RESUME.pdf';
    link.download = 'FAVOUR BAWA - RESUME.pdf';
    link.click();
  }

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="about" className="py-8 md:py-20 overflow-x-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader title="ABOUT" highlight="ME" shadowText="RESUME" />
        </motion.div>

        {/* Personal Info Section */}
        <div className="relative mb-12 md:mb-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeInSection>
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold">PERSONAL INFOS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(personalInfo).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className="flex flex-col space-y-1 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-sm text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium">
                        {key === 'freelance' ? (
                          <span className="text-green-500">{value}</span>
                        ) : key === 'LinkedIn' ? (
                          <motion.span 
                            className="text-blue-600 flex items-center cursor-pointer hover:underline"
                            onClick={() => handleOpenLink(value)}
                            whileHover={{ scale: 1.05 }}
                          >
                            View LinkedIn <ExternalLink className="ml-1 h-4 w-4" />
                          </motion.span>
                        ) : value}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleDownloadCV}
                    className="mt-6 w-full sm:w-auto"
                    size="lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </motion.div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <StatBox {...stat} />
                  </motion.div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Skills Section */}
        <FadeInSection delay={0.3} className="mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">MY SKILLS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {skills.map((skill, index) => (
              <SkillItem key={skill.label} skill={skill} index={index} />
            ))}
          </div>
        </FadeInSection>

        {/* Experience & Education Section */}
        <FadeInSection delay={0.5}>
          <div className="relative mb-12 md:mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">EXPERIENCE</h2>
                <div className="space-y-6">
                  {experience.map((item) => (
                    <TimelineItemAnimated key={item.title} item={item} direction="left" index={0} />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">EDUCATION</h2>
                <div className="space-y-6">
                  {education.map((item) => (
                    <TimelineItemAnimated key={item.title} item={item} direction="right" index={0} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}