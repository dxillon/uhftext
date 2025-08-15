import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, Parallax, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import 'swiper/css/thumbs';

interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  releaseDate: string;
}

interface HeroCarouselProps {
  projects: Project[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ projects }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const swiperRef = useRef<any>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const [isMobile, setIsMobile] = useState(false);

  const autoplayDelay = 5000; // 5 seconds - must match Swiper's autoplay delay

  // Reset and start the timer animation
  const startTimer = () => {
    // Clear any existing animations
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Reset state
    setProgress(0);
    setRemainingSeconds(5);
    startTimeRef.current = Date.now();

    // Start new animation
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progressValue = Math.min((elapsed / autoplayDelay) * 100, 100);
      setProgress(progressValue);
      
      const secondsRemaining = Math.ceil((autoplayDelay - elapsed) / 1000);
      setRemainingSeconds(Math.max(0, secondsRemaining));
    }, 50);
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;

    const handleAutoplay = () => {
      startTimer();
    };

    const handleSlideChange = () => {
      setActiveIndex(swiperInstance.realIndex);
      startTimer();
    };

    // Set up event listeners
    swiperInstance.on('autoplayStart', handleAutoplay);
    swiperInstance.on('slideChangeTransitionStart', handleSlideChange);

    // Initial timer start
    startTimer();

    return () => {
      // Clean up event listeners
      swiperInstance.off('autoplayStart', handleAutoplay);
      swiperInstance.off('slideChangeTransitionStart', handleSlideChange);
      
      // Clear any running intervals
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    // Initial check
    checkIfMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Carousel */}
      <div className="relative h-[60vh] md:h-[85vh]">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, EffectFade, Navigation, Pagination, Parallax, Thumbs]}
          effect="fade"
          speed={1000}
          parallax={true}
          navigation={{
            nextEl: '.hero-swiper-button-next',
            prevEl: '.hero-swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.hero-swiper-pagination',
            renderBullet: (index, className) => {
              return `<span class="${className} hero-swiper-bullet"></span>`;
            },
          }}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          loop
          className="h-full"
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full flex items-center justify-center">
                {/* Background Image with Parallax */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                  data-swiper-parallax="-30%"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                {/* Content - Centered vertically and at bottom */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-8 md:pb-16">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <h2 
                          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white leading-tight"
                          data-swiper-parallax="-300"
                        >
                          {project.title}
                        </h2>
                      </motion.div>
                      
                      <motion.p
                        className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 max-w-lg mx-auto"
                        data-swiper-parallax="-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {project.description}
                      </motion.p>
                      
                      <motion.div
                        className="flex flex-col items-center space-y-3 md:space-y-0 md:flex-row md:justify-center md:space-x-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <div className="flex items-center space-x-2 text-red-400">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm md:text-base font-medium">{project.releaseDate}</span>
                        </div>
                        
                        <Link
                          to={`/project/${project.id}`}
                          className="inline-flex items-center justify-center px-5 py-2 md:px-6 md:py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 group text-sm md:text-base"
                        >
                          <span>Explore Project</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Arrows */}
          <div className="hero-swiper-button-prev hero-swiper-button hidden md:flex"></div>
          <div className="hero-swiper-button-next hero-swiper-button hidden md:flex"></div>
          
          {/* Pagination - Modern style on slide */}
          <div className="hero-swiper-pagination !bottom-2 md:!bottom-4"></div>
        </Swiper>
      </div>

      {/* Timer Only for Mobile */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 z-20 rounded-lg backdrop-blur-sm p-2 shadow-md bg-black/30">
          <div className="relative w-8 h-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
                strokeDasharray="88"
                strokeDashoffset="0"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="88"
                strokeDashoffset={`${88 - (88 * progress) / 100}`}
                className="transition-all duration-50 ease-linear"
                style={{
                  transition: 'stroke-dashoffset 0.1s linear',
                }}
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium">
              {remainingSeconds}s
            </span>
          </div>
        </div>
      )}

      {/* Thumbnail Carousel - Desktop Only */}
      {!isMobile && (
        <div className="hidden md:block absolute bottom-4 right-10 z-20 w-auto rounded-lg  py-1 px-2 shadow-md">
          <div className="flex items-center space-x-4">
            {/* Timer Circle */}
            <div className="relative w-8 h-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                  strokeDasharray="88"
                  strokeDashoffset="0"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="88"
                  strokeDashoffset={`${88 - (88 * progress) / 100}`}
                  className="transition-all duration-50 ease-linear"
                  style={{
                    transition: 'stroke-dashoffset 0.1s linear',
                  }}
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium">
                {remainingSeconds}s
              </span>
            </div>

            {/* Thumbnails Container */}
            <div className="relative rounded-lg bg-white/10 p-1.5 overflow-hidden">
              {/* Moving Gradient Background */}
              <div className="absolute inset-0 transition-all duration-300 ease-in-out"
                style={{
                  background: `radial-gradient(
                    circle at ${16.5 + (activeIndex * 33)}% 50%, 
                    rgba(220,38,38,0.3) 30%,
                    rgba(220,38,38,0.2) 40%,
                    transparent 70%
                  )`
                }}>
              </div>
              
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={7}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Thumbs]}
                className="!w-[182px] !overflow-visible relative z-10"
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={index} className="!w-14 !h-14 relative">
                    <div className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-300
                      ${activeIndex === index ? 'ring-2 ring-red-500' : 'opacity-60'}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bullet Pagination */}
      <div className="md:hidden hero-swiper-pagination-mobile !bottom-2"></div>

      <style jsx>{`
        .hero-swiper-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .hero-swiper-button:hover {
          background-color: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }
        .hero-swiper-button::after {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .hero-swiper-button-prev {
          left: 1rem;
        }
        .hero-swiper-button-next {
          right: 1rem;
        }
        .hero-swiper-pagination, .hero-swiper-pagination-mobile {
          display: flex;
          justify-content: center;
          position: absolute;
          width: 100%;
          z-index: 10;
        }
        .hero-swiper-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid white;
          opacity: 0.7;
          margin: 0 4px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .hero-swiper-bullet-active {
          background: #ef4444;
          border-color: #ef4444;
          opacity: 1;
          transform: scale(1.2);
        }
        @media (max-width: 768px) {
          .hero-swiper-button {
            width: 32px;
            height: 32px;
          }
          .hero-swiper-button::after {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;