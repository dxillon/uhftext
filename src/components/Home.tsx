import React, { useEffect, useRef, useState, lazy, Suspense, } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Award, Play, ArrowRight, Star, Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import 'swiper/css';
import HeroCarousel from '../components/HeroCarousel';
import ArticleSlider from '../components/ArticleSlider';
import { articles } from '../data/articles';
const VideoPlayer = lazy(() => import('./VideoPlayer'));
// import CourseSlider from '../components/CourseSlider';
import { Helmet } from 'react-helmet-async';
import { upcomingProjects } from '../data/home';
import FeaturedProjects from '../components/FeaturedProjects'
import ErrorBoundary from '../../scripts/ErrorBoundary'; 


const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; duration: string } | null>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (heroTextRef.current) {
      const text = heroTextRef.current;
      text.innerHTML = text.textContent!.replace(/\S/g, "<span class='inline-block'>$&</span>");

      anime({
        targets: heroTextRef.current.querySelectorAll('span'),
        translateY: [-20, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(100)
      });
    }

    const observerStats = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll('.stat-number'),
              innerHTML: [0, el => el.getAttribute('data-value')],
              round: 1,
              easing: 'easeInOutExpo',
              duration: 2000,
              delay: anime.stagger(200)
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observerStats.observe(statsRef.current);
    }

    const observerServices = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll('.service-icon'),
              scale: [0, 1],
              rotate: [45, 0],
              opacity: [0, 1],
              easing: 'easeOutElastic(1, .5)',
              duration: 1600,
              delay: anime.stagger(150)
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observerServices.observe(servicesRef.current);
    }

    return () => {
      observerStats.disconnect();
      observerServices.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Urban Hustle Films – Home</title>
        <meta name="description"
          content="UH Films - Urban Tales | Cinematic Trails. Discover cinematic stories and projects by Urban Hustle Films™." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://uhfilms.in/" />

        <meta property="og:title" content="Urban Hustle Films – Official Site" />
        <meta property="og:description" content="Producing bold, real, and unique stories in film and web." />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content="https://uhfilms.in/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen">

        <section className="relative overflow-hidden">
          <HeroCarousel projects={upcomingProjects} />
        </section>

        <FeaturedProjects onSelect={setSelectedVideo} />



        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}  // Prevent re-animation
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 text-gradient"
            >
              Our Services
            </motion.h2>

            <div
              ref={servicesRef}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Camera,
                  title: "Film Production",
                  description: "Professional film production services for all your creative needs."
                },
                {
                  icon: Film,
                  title: "Web Series",
                  description: "Engaging web series that capture and retain audience attention."
                },
                {
                  icon: Award,
                  title: "Post Production",
                  description: "Expert post-production services to perfect your content."
                },
                {
                  icon: Play,
                  title: "Content Strategy",
                  description: "Strategic content planning and distribution services."
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}  // Prevent re-animation
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="card group p-6 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors"
                  data-clickable="true"
                >
                  <service.icon className="service-icon w-10 h-10 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>





{/* 
        <div
          style={{
            background: `
      radial-gradient(
        ellipse 100% 50% at center 50%,
        rgba(255, 230, 200, 0.7) 0%,
        rgba(255, 190, 150, 0.5) 25%,
        rgba(255, 150, 130, 0.2) 50%,
        rgba(0, 0, 0, 0) 80%
      ),
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.15) 0%,
        transparent 15%,
        transparent 85%,
        rgba(0, 0, 0, 0.15) 100%
      )
    `,
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            padding: 'clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2.5rem)',
            margin: 0,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
      inset 0 12px 40px -15px rgba(0, 0, 0, 0.25),
      inset 0 -12px 40px -15px rgba(0, 0, 0, 0.25)
    `,
            width: '100%',
            boxSizing: 'border-box',
            '::before': {
              content: '""',
              position: 'absolute',
              inset: '20px 20px 15px 20px',
              background: `
        radial-gradient(
          circle at center,
          rgba(255, 230, 200, 0.25) 0%,
          transparent 65%
        )
      `,
              pointerEvents: 'none',
              zIndex: 1,
              borderRadius: '8px'
            },
            '::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: `rgba(0, 0, 0, 0.05)`,
              pointerEvents: 'none',
              zIndex: 1
            }
          }}
        >
          <CourseSlider
            style={{
              maxWidth: '100%',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
              borderRadius: '6px'
            }}
          />
        </div> */}



        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "100+", label: "Projects Completed" },
                { number: "50+", label: "Happy Clients" },
                { number: "10+", label: "Awards Won" },
                { number: "5+", label: "Years Experience" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="stat-number text-4xl font-bold text-gradient mb-2" data-value={stat.number}>0</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>




        <div
          style={{
            background: `
      radial-gradient(
        ellipse 100% 70% at center 60%,
        rgba(255, 30, 30, 0.5) 0%,
        rgba(255, 0, 60, 0.3) 30%,
        rgba(100, 0, 20, 0.1) 60%,
        rgba(0, 0, 0, 0) 100%
      )
    `,
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            padding: 'clamp(1rem, 4vw, 3rem) clamp(0.75rem, 4vw, 2rem)',
            margin: 0,
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 50px 20px rgba(0, 0, 0, 0.7)',
            width: '100%',
            boxSizing: 'border-box',
            transition: 'padding 0.3s ease'
          }}
        >
          <ArticleSlider
            articles={articles}
            title="Featured Articles"
            autoScrollDelay={5000}
            featuredOnly={true}
            style={{
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          />
        </div>


        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">About us</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                UH Films is a dynamic and forward-thinking film production company committed to storytelling that resonates, inspires, and entertains. Founded with a passion for cinema and a drive for innovation, UH Films specializes in creating high-quality content across genres—from independent films and documentaries to branded content and commercial projects.
                We blend creativity with cutting-edge technology to deliver powerful visual narratives that connect deeply with audiences.
              </p>
              <Link
                to="/about"
                className="btn-primary inline-flex items-center gap-2 group"
                data-clickable="true"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {selectedVideo && (
          <ErrorBoundary>
            <Suspense fallback={<div className="text-center text-white py-10">Loading video...</div>}>
              <VideoPlayer
                url={selectedVideo.url}
                duration={selectedVideo.duration}
                isOpen={true}
                onClose={() => setSelectedVideo(null)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </>
  );
};

export default Home;
