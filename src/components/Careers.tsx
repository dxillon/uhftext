import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronRight, ChevronUp, ChevronDown, Clock, MapPin, DollarSign, ArrowRight, ArrowLeft, X } from 'lucide-react';
import JobApplicationForm from './JobApplicationForm';
import { Helmet } from 'react-helmet-async';
import { jobOpenings } from '../data/job';

const Careers = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const categoryRefs = useRef<{[key: string]: HTMLElement | null}>({});

  // Group jobs by category
  const categories = {
    'Fast Recruiting': jobOpenings.filter(job => job.fastRecruiting),
    'Writing': jobOpenings.filter(job => job.category === '2'),
    'Pre & Post Production': jobOpenings.filter(job => job.category === '3'),
    'Social Media': jobOpenings.filter(job => job.category === '4'),
    'Graphic Design & Editing': jobOpenings.filter(job => job.category?.split(" ").includes("5")),
    'Development': jobOpenings.filter(job => job.category === '6')
  };

  // Carousel state for each category
  const [carouselPositions, setCarouselPositions] = useState<Record<string, number>>(
    Object.keys(categories).reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );

  const handleBack = () => {
    setSelectedJob(null);
    setExpandedJob(null);
  };

  const toggleJobExpand = (jobTitle: string) => {
    setExpandedJob(expandedJob === jobTitle ? null : jobTitle);
  };

  const nextJob = (category: string, jobs: any[], isMobile = false) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSwipeDirection('left');
    
    const increment = isMobile ? 1 : 3;
    setCarouselPositions(prev => ({
      ...prev,
      [category]: Math.min(prev[category] + increment, jobs.length - 1)
    }));
    
    setTimeout(() => {
      setIsTransitioning(false);
      setSwipeDirection(null);
    }, 500);
  };

  const prevJob = (category: string, jobs: any[], isMobile = false) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSwipeDirection('right');
    
    const decrement = isMobile ? 1 : 3;
    setCarouselPositions(prev => ({
      ...prev,
      [category]: Math.max(prev[category] - decrement, 0)
    }));
    
    setTimeout(() => {
      setIsTransitioning(false);
      setSwipeDirection(null);
    }, 500);
  };

  const clearCategoryFilter = () => {
    setActiveCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.touches[0].target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === 0) return;
    
    const target = e.touches[0].target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = (category: string, jobs: any[]) => {
    if (touchStartX === 0) return;
    
    const distance = touchStartX - touchEndX;
    
    setTouchStartX(0);
    setTouchEndX(0);
    
    if (Math.abs(distance) < 50) return;
    
    if (distance > 50) {
      nextJob(category, jobs);
    } else if (distance < -50) {
      prevJob(category, jobs);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      const headerHeight = 80;
      const elementPosition = formRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Smooth scroll to category
  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (selectedJob) {
      scrollToForm();
    }
  }, [selectedJob]);

  return (
    <>
      <Helmet>
        <title>Careers – Join Urban Hustle Films</title>
        <meta name="description" content="Explore career opportunities with Urban Hustle Films and become part of a bold creative movement." />
        <link rel="canonical" href="https://uhfilms.in/careers" />
        <meta property="og:title" content="Careers – Join Urban Hustle Films" />
        <meta property="og:description" content="Explore career opportunities with Urban Hustle Films and become part of a bold creative movement." />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content="https://uhfilms.in/careers" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers – Join Urban Hustle Films" />
        <meta name="twitter:description" content="Explore career opportunities with Urban Hustle Films and become part of a bold creative movement." />
        <meta name="twitter:image" content="https://www.uhfilms.in/uhf.png" />
      </Helmet>

      <div className="min-h-screen pt-20 bg-black text-white">
        {/* Hero Section with Category Filter - Hidden when form is open */}
        {!selectedJob && (
          <section className="relative bg-gradient-to-b from-black via-black/90 to-black/80">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://uhfilms.in/pattern.svg')] opacity-5"></div>
              <motion.div 
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-20 left-10 w-32 h-32 bg-red-600/20 rounded-full blur-xl"
              />
              <motion.div 
                animate={{ 
                  x: [0, -80, 0],
                  y: [0, 60, 0],
                  rotate: [0, -8, 0]
                }}
                transition={{ 
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-10 right-10 w-40 h-40 bg-red-600/15 rounded-full blur-xl"
              />
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Join Our <span className="text-red-600">Creative</span> Revolution
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
              >
                Shape the future of storytelling with Urban Hustle Films. Work on groundbreaking projects with industry pioneers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto px-4">
                  {Object.keys(categories).map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => scrollToCategory(category.replace(/\s+/g, '-').toLowerCase())}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-900/50 hover:bg-gray-800 border border-gray-700 rounded-full text-xs md:text-sm transition-all whitespace-nowrap"
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex justify-center"
              >
                <div className="w-20 h-1 bg-red-600 rounded-full"></div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Gradient transition - Hidden when form is open */}
        {!selectedJob && (
          <div className="h-24 mb-10 bg-gradient-to-b from-black/80 via-red-900/20 to-black"></div>
        )}

        {/* Job Listings by Category */}
        {selectedJob ? (
          <JobApplicationForm ref={formRef} selectedRole={selectedJob} handleBack={handleBack} />
        ) : ( 
          <div className="container mx-auto px-4 py-8 -mt-16">
            {Object.entries(categories).map(([category, jobs]) => (
              <section 
                key={category} 
                id={category.replace(/\s+/g, '-').toLowerCase()}
                ref={el => categoryRefs.current[category.replace(/\s+/g, '-').toLowerCase()] = el}
                className="mb-20 scroll-mt-16"
              >
                <h2 className="text-2xl md:text-2xl font-bold mb-6  flex items-center">
                  <span className="bg-red-600 w-2 h-8 mr-3 rounded-full"></span>
                  {category} 
                </h2>

                {/* Desktop - Grid with slider for >3 jobs */}
                <div className="hidden md:block">
                  <div className="relative">
                    {/* Navigation Controls */}
                    {jobs.length > 3 && (
                      <div className="absolute right-0 -top-11 flex items-center space-x-4">
                        <div className="text-sm text-gray-400">
                          {Math.floor(carouselPositions[category] / 3) + 1} / {Math.ceil(jobs.length / 3)}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => prevJob(category, jobs)}
                            disabled={carouselPositions[category] === 0}
                            className={`p-2 rounded-full transition-all ${
                              carouselPositions[category] === 0 
                                ? 'text-gray-600 cursor-not-allowed' 
                                : 'text-white bg-gray-800 hover:bg-gray-700'
                            }`}
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => nextJob(category, jobs)}
                            disabled={carouselPositions[category] >= jobs.length - 3}
                            className={`p-2 rounded-full transition-all ${
                              carouselPositions[category] >= jobs.length - 3 
                                ? 'text-gray-600 cursor-not-allowed' 
                                : 'text-white bg-gray-800 hover:bg-gray-700'
                            }`}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Slider Container */}
                    <div className="relative min-h-[380px]">
                      <AnimatePresence custom={swipeDirection}>
                        <motion.div
                          key={`group-${Math.floor(carouselPositions[category]/3)}`}
                          custom={swipeDirection}
                          initial={{ x: swipeDirection === 'left' ? '100%' : '-100%', opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: swipeDirection === 'left' ? '-100%' : '100%', opacity: 0 }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            duration: 0.5
                          }}
                          className="absolute top-0 left-0 w-full grid grid-cols-3 gap-6"
                        >
                          {jobs
                            .slice(
                              Math.floor(carouselPositions[category] / 3) * 3,
                              Math.floor(carouselPositions[category] / 3) * 3 + 3
                            )
                            .map((job) => (
                              <motion.div
                                key={job.title}
                                className={`bg-gray-900/80 border border-gray-800 rounded-xl p-2  transition-all duration-300 relative group ${
                                  expandedJob === job.title ? 'h-auto' : 'h-[300px]'
                                }`} 
                                whileHover={{ y: -5 }}
                              >
                                {/* Job card content */}
                                {job.fastRecruiting && (
                                  <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md z-10">
                                    Fast Recruiting
                                  </div>
                                )}
                                
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                                    <p className="text-red-500 font-medium">{job.department}</p>
                                  </div>
                                  <Briefcase className="w-6 h-6 text-red-500 mt-1" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="flex items-center gap-2 text-gray-300">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span>{job.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-300">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span>{job.type}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-300">
                                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                                    <span>{job.salary}</span>
                                  </div>
                                </div>

                                <p className="text-gray-400 mb-4 line-clamp-2">{job.description}</p>

                                {expandedJob === job.title ? (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mb-4">
                                      <h4 className="text-sm font-semibold text-red-500 mb-2">Requirements:</h4>
                                      <ul className="text-gray-400 space-y-1">
                                        {job.requirements.map((req, i) => (
                                          <li key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" />
                                            <span>{req}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="flex space-x-3 mt-4">
                                      <button
                                        onClick={() => setSelectedJob(job.title)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                                      >
                                        <span>Apply Now</span>
                                        <ChevronRight className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => toggleJobExpand(job.title)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
                                      >
                                        <span>Show Less</span>
                                        <ChevronUp className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </motion.div>
                                ) : (
                                  <button
                                    onClick={() => toggleJobExpand(job.title)}
                                    className="w-[200px] flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all group-hover:bg-gray-700 absolute bottom-4 left-2 right-2"
                                  >
                                    <span>View Details</span>
                                    <ChevronDown className="w-4 h-4" />
                                  </button>
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                {/* Mobile - Carousel with side peek */}
                <div className="md:hidden relative w-full">
                  {/* Carousel */}
                  <div 
                    className="w-full "
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(category, jobs)}
                  >
                    <div className="relative px-4">
  

                      {/* Current Job Card with side peek */}
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-sm mx-auto relative">

                          
                          <AnimatePresence mode="wait">
                            {jobs.length > 0 && (
                              <motion.div
                                key={`job-${carouselPositions[category]}`}
                                initial={{ 
                                  opacity: 0, 
                                  x: swipeDirection === 'left' ? 50 : swipeDirection === 'right' ? -50 : 0 
                                }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ 
                                  opacity: 0, 
                                  x: swipeDirection === 'left' ? -50 : swipeDirection === 'right' ? 50 : 0 
                                }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 300, 
                                  damping: 30 
                                }}
                                className={`bg-gray-900/80 border border-gray-800 rounded-xl p-6 relative shadow-lg ${
                                  expandedJob === jobs[carouselPositions[category]].title ? 'min-h-[500px]' : 'min-h-[315px]'
                                }`}
                              >
                                {jobs[carouselPositions[category]].fastRecruiting && (
                                  <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md z-10">
                                    Fast Recruiting
                                  </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                      {jobs[carouselPositions[category]].title}
                                    </h3>
                                    <p className="text-red-500 font-medium">
                                      {jobs[carouselPositions[category]].department}
                                    </p>
                                  </div>
                                  <Briefcase className="w-6 h-6 text-red-500 mt-1" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-300">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{jobs[carouselPositions[category]].location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{jobs[carouselPositions[category]].type}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{jobs[carouselPositions[category]].salary}</span>
                                  </div>
                                </div>

                                {expandedJob === jobs[carouselPositions[category]].title ? (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="overflow-hidden"
                                  >
                                    <p className="text-gray-400 mb-4">{jobs[carouselPositions[category]].description}</p>

                                    <div className="mb-8">
                                      <h4 className="text-sm font-semibold text-red-500 mb-2">
                                        Requirements:
                                      </h4>
                                      <ul className="text-gray-400 space-y-1 text-sm">
                                        {jobs[carouselPositions[category]].requirements.map((req, i) => (
                                          <li key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" />
                                            <span>{req}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="flex space-x-3 absolute bottom-2 left-6 right-6">
                                      <button
                                        onClick={() => setSelectedJob(jobs[carouselPositions[category]].title)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                                      >
                                        <span>Apply Now</span>
                                        <ChevronRight className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => toggleJobExpand(jobs[carouselPositions[category]].title)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
                                      >
                                        <span>Show Less</span>
                                        <ChevronUp className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </motion.div>
                                ) : (
                                  <>
                                    <p className="text-gray-400 mb-4 line-clamp-2">
                                      {jobs[carouselPositions[category]].description}
                                    </p>
                                    <div className="flex space-x-3 absolute bottom-6 left-6 right-6">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedJob(jobs[carouselPositions[category]].title);
                                        }}
                                        onTouchStart={(e) => e.stopPropagation()}
                                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                                      >
                                        <span>Apply Now</span>
                                        <ChevronRight className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleJobExpand(jobs[carouselPositions[category]].title);
                                        }}
                                        onTouchStart={(e) => e.stopPropagation()}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
                                      >
                                        <span>Details</span>
                                        <ChevronDown className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>

                  {jobs.length > 1 && (
                    <div className="flex justify-center mt-6 px-4">
                      <div className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 py-2">
                        <button
                          onClick={() => prevJob(category, jobs)}
                          disabled={carouselPositions[category] === 0 || isTransitioning}
                          className={`p-2 rounded-full ${
                            carouselPositions[category] === 0 || isTransitioning
                              ? "text-gray-600"
                              : "text-white bg-gray-800 hover:bg-gray-700"
                          }`}
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="text-gray-400 text-sm flex items-center">
                          <span className="text-white font-medium">{carouselPositions[category] + 1}</span>
                          <span className="mx-2">/</span>
                          <span>{jobs.length}</span>
                        </div>
                        <button
                          onClick={() => nextJob(category, jobs)}
                          disabled={carouselPositions[category] === jobs.length - 1 || isTransitioning}
                          className={`p-2 rounded-full ${
                            carouselPositions[category] === jobs.length - 1 || isTransitioning
                              ? "text-gray-600"
                              : "text-white bg-gray-800 hover:bg-gray-700"
                          }`}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Careers;