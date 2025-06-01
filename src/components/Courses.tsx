import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User, Star, Play, ArrowRight, Film, Zap, ChevronRight, Users, BarChart2, Award, Video, Camera, Mic, Edit3, Sparkles } from 'lucide-react';
import { courses } from '../types/course';
import anime from 'animejs';
import styled from '@emotion/styled';



const BestSellerBadge = () => {
    return (
        <div className="absolute top-2 md:top-2 left-0 z-10 h-7 md:h-8 flex items-center overflow-visible">
            {/* Main ribbon - mostly black with subtle red gradient */}
            <div className="relative h-full bg-gradient-to-r from-black via-black to-red-900 text-white text-xs md:text-sm font-bold flex items-center px-3 pl-4 md:px-4 md:pl-5 rounded-r-full shadow-md">
                {/* Ribbon shine effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-r-full pointer-events-none" />

                {/* Pulsing sparkle icon - slightly larger on desktop */}
                <div className="animate-pulse mr-1.5">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-200" />
                </div>

                {/* Text */}
                <span className="text-[11px] md:text-[13px] tracking-wide">BEST SELLER</span>
            </div>

            {/* Shadow under ribbon */}
            <div className="absolute -bottom-0.5 left-0 right-1 h-1 bg-gradient-to-r from-black/10 to-transparent blur-[1px] -z-10" />
        </div>
    );

};




// Helper functions
const generateParticles = (count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            id: i,
            size: Math.random() * 6 + 3,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 15 + 15
        });
    }
    return particles;
};


const rotatingTexts = [
    { text: "Interactive Learning", icon: <Zap className="w-4 h-4 text-orange-500" /> },
    { text: "Hands-on Projects", icon: <Edit3 className="w-4 h-4 text-orange-500" /> },
    { text: "Expert Instructors", icon: <User className="w-4 h-4 text-orange-500" /> },
    { text: "Real-world Skills", icon: <Award className="w-4 h-4 text-orange-500" /> },
    { text: "Community Support", icon: <Users className="w-4 h-4 text-orange-500" /> }
];



const courseIcons = {
    cinematography: <Camera className="w-4 h-4" />,
    directing: <Video className="w-4 h-4" />,
    editing: <Edit3 className="w-4 h-4" />,
    sound: <Mic className="w-4 h-4" />,
    default: <Film className="w-4 h-4" />
};

// Student counter (persistent using localStorage)
const useStudentCounter = () => {
    const [count, setCount] = useState(() => {
        // Initialize from localStorage or start at 10 if no value exists
        const savedCount = localStorage.getItem('studentCount');
        return savedCount ? parseInt(savedCount) : 10;
    });

    useEffect(() => {
        const getIncrement = (currentCount: number) => {
            if (currentCount < 100) return 1;
            if (currentCount < 1000) return 2;
            if (currentCount < 10000) return 3;
            return 4;
        };

        const getDelay = (currentCount: number) => {
            if (currentCount < 100) return 3000; // 3s
            if (currentCount < 1000) return 5000; // 5s
            if (currentCount < 10000) return 8000; // 8s
            return 12000; // 12s
        };

        const updateCounter = () => {
            setCount((prev) => {
                const increment = getIncrement(prev);
                const newCount = prev + increment;
                localStorage.setItem('studentCount', newCount.toString()); // Persist
                return newCount;
            });
        };

        const timer = setInterval(updateCounter, getDelay(count));

        return () => clearInterval(timer);
    }, [count]);

    return count;
};

// Styled components
const CourseCard = styled(motion.div)`
  position: relative;
  isolation: isolate;
  perspective: 1000px;
  will-change: transform;
  
  .course-content {
    transform-style: preserve-3d;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 8px 25px -10px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    .course-content {
      transform: translateY(-6px) rotateX(4deg) scale(1.02);
      box-shadow: 0 15px 35px -10px rgba(255, 69, 0, 0.25);
    }
    
    .play-icon {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    
    .course-image {
      transform: scale(1.06);
    }
    
    .course-icon {
      transform: scale(1.2) rotate(10deg);
      background: linear-gradient(135deg, #ff8a00, #ff0058);
    }
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
  
  .particle {
    position: absolute;
    background: rgba(255, 69, 0, 0.12);
    border-radius: 50%;
    pointer-events: none;
    will-change: transform;
  }
`;

const InteractiveBadge = styled(motion.div)`
  position: relative;
  overflow: hidden;
  z-index: 1;
  min-width: 180px; // Ensure consistent width
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 136, 0, 0.2) 0%,
      rgba(255, 0, 88, 0.2) 100%
    );
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -60%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 45%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0) 55%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: shine 4s infinite;
  }
  
  @keyframes shine {
    0% { 
      transform: translateX(-100%) rotate(30deg); 
    }
    20% {
      opacity: 1;
    }
    100% { 
      transform: translateX(100%) rotate(30deg);
      opacity: 0;
    }
  }
`;

const Courses: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [visibleCourses, setVisibleCourses] = useState(6);
    const studentCount = useStudentCounter();
    const particles = generateParticles(20);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [satisfactionRate, setSatisfactionRate] = useState(0);
    const x = useMotionValue(0);
    const background = useTransform(
        x,
        [0, 100],
        [
            'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
            'linear-gradient(135deg, #0f0f0f 0%, #2a1a1a 50%, #0f0f0f 100%)'
        ]
    );


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const duration = 2000; // Animation duration in ms
        const startTime = Date.now();

        const animateRate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentRate = Math.floor(progress * 97);
            setSatisfactionRate(currentRate);

            if (progress < 1) {
                requestAnimationFrame(animateRate);
            }
        };

        animateRate();
    }, []);



    useEffect(() => {
        // Course cards animation - only runs once
        const animation = anime({
            targets: '.course-card:lt(6)', // Only target first 6 cards
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(80),
            easing: 'easeOutBack'
        });


        // Floating particles animation
        particles.forEach(particle => {
            anime({
                targets: `.particle-${particle.id}`,
                translateX: [0, anime.random(-40, 40)],
                translateY: [0, anime.random(-40, 40)],
                duration: particle.duration * 1000,
                delay: particle.delay * 1000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
            });
        });

        // Background gradient animation
        const bgAnimation = animate(x, [0, 100, 0], {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        });

        return () => {
            animation.pause();
            bgAnimation.stop();
        };
    }, [x, visibleCourses]);

    const loadMoreCourses = () => {
        setVisibleCourses(prev => Math.min(prev + 3, courses.length));
    };

    const getCourseIcon = (category: string) => {
        const normalizedCategory = category.toLowerCase();
        return courseIcons[normalizedCategory as keyof typeof courseIcons] || courseIcons.default;
    };

    return (
        <motion.div
            className="min-h-screen py-32 md:py-32 relative overflow-hidden"
            style={{ background }}
        >
            {/* Floating particles background */}
            <FloatingParticles ref={particlesRef}>
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className={`particle particle-${particle.id}`}
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            opacity: Math.random() * 0.6 + 0.3
                        }}
                    />
                ))}
            </FloatingParticles>

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>

            {/* Floating abstract shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-2xl"></div>
                <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-gradient-to-br from-yellow-500/10 to-pink-500/10 blur-2xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative">
                {/* Hero section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-center mb-12 md:mb-16"
                >
                    <InteractiveBadge
                        className="inline-flex items-center gap-2 bg-gray-900/80 border border-gray-800 rounded-full px-6 py-1.5 mb-6 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            key={`icon-${currentTextIndex}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {rotatingTexts[currentTextIndex].icon}
                        </motion.div>
                        <motion.span
                            key={`text-${currentTextIndex}`}
                            className="text-sm text-orange-400 font-medium"
                            initial={{ opacity: 0, x: 5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {rotatingTexts[currentTextIndex].text}
                        </motion.span>
                    </InteractiveBadge>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 leading-tight">
                        Cinematic <span className="text-white">Mastery</span>
                    </h1>

                    <motion.div
                        className="flex items-center justify-center gap-2 text-gray-400 text-sm sm:text-base mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Users className="w-5 h-5 text-orange-500" />
                        <span>{studentCount.toLocaleString()}+ students enrolled</span>
                        <BarChart2 className="w-5 h-5 text-green-500 ml-3" />
                        <span>{satisfactionRate}% satisfaction rate</span>
                    </motion.div>

                    <motion.p
                        className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Transform your filmmaking skills with our <span className="text-orange-400">dynamic, hands-on</span> courses taught by industry experts
                    </motion.p>
                </motion.div>

                {/* Courses grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                    {courses.slice(0, visibleCourses).map((course, index) => (
                        <CourseCard
                            key={course.id}
                            className="course-card"
                            initial={index < 6 ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={index < 6 ? {
                                delay: 0.1 + index * 0.1,
                                type: 'spring'
                            } : { duration: 0 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <Link to={`/course/${course.slug}`} className="block h-full group">
                                <div className="h-full bg-gradient-to-br from-gray-900/80 to-gray-900 rounded-xl overflow-hidden border border-gray-800/50 hover:border-orange-500/30 transition-all duration-400 shadow-lg sm:shadow-xl shadow-black/20">

                                    {course.bestSeller && <BestSellerBadge />}

                                    <div className="course-content h-full flex flex-col">
                                        {/* Course image */}
                                        <div className="relative h-28 sm:h-36 md:h-40 overflow-hidden">
                                            <motion.img
                                                src={course.coverImage}
                                                alt={course.title}
                                                className="w-full h-full object-cover course-image"
                                                initial={{ scale: 1 }}
                                                whileHover={{ scale: 1.06 }}
                                                transition={{ duration: 0.4 }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />


                                            {/* Course icon */}
                                            <motion.div
                                                className="course-icon absolute top-3 right-3 bg-gray-900/80 border border-gray-700/50 rounded-lg p-2 backdrop-blur-sm transition-all duration-300"
                                                whileHover={{
                                                    scale: 1.2,
                                                    rotate: 10,
                                                    background: 'linear-gradient(135deg, #ff8a00, #ff0058)'
                                                }}
                                            >
                                                {getCourseIcon(course.category)}
                                            </motion.div>

                                            {/* Badges */}
                                            <div className="absolute bottom-3 left-3 flex gap-2">
                                                <motion.span
                                                    className="bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {course.category}
                                                </motion.span>
                                                {course.featured && (
                                                    <motion.span
                                                        className="bg-gradient-to-r from-yellow-500/90 to-yellow-600/90 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                                        whileHover={{ scale: 1.05 }}
                                                        animate={{
                                                            boxShadow: hoveredCard === index
                                                                ? '0 0 12px rgba(234, 179, 8, 0.4)'
                                                                : '0 0 0px rgba(234, 179, 8, 0)'
                                                        }}
                                                    >
                                                        <Star className="w-3 h-3 fill-current" />
                                                        <span>Featured</span>
                                                    </motion.span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Course content */}
                                        <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                                            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-400 text-xs mb-2 sm:mb-3 line-clamp-2 flex-1">
                                                {course.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-800/50">
                                                <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                                                        {course.duration}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                                                        {course.instructor.name.split(' ')[0]}
                                                    </span>
                                                </div>

                                                <motion.div
                                                    className="text-orange-500 flex items-center text-xs font-medium group-hover:text-orange-400 transition-colors"
                                                    whileHover={{ x: 3 }}
                                                >
                                                    <span>Explore</span>
                                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </CourseCard>
                    ))}
                </div>
                {/* Load More button */}
                {visibleCourses < courses.length && (
                    <div className="text-center mt-12">
                        <motion.button
                            onClick={loadMoreCourses}
                            className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gray-900 border border-gray-800 rounded-full hover:bg-gray-800 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Load More Courses ({courses.length - visibleCourses} remaining)
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.button>
                    </div>
                )}
                {/* Student counter footer */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="inline-flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-full px-5 py-2">
                        <Users className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-orange-400 font-medium">
                            <span className="text-white font-bold">{studentCount.toLocaleString()}+</span> students enrolled worldwide
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Courses; 
