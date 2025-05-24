import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Award, Play, ArrowRight, Star, Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ArticleSlider from '../components/ArticleSlider';
import { articles } from '../data/articles';
import VideoPlayer from './VideoPlayer';
import { Helmet } from 'react-helmet-async';

const upcomingProjects = [
  {
    id: "sucidefun",
    title: "Sucide Fun",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745759555/WhatsApp_Image_2025-04-27_at_17.53.32_87bee1b0_q9etqk.jpg",
    description: "Do you have the courage to see your future?",
    releaseDate: "Fall 2025"
  },
  {
    id: "agyaat",
    title: "Agyaat",
    description: "When truth is invisible, can you find it?",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745759562/WhatsApp_Image_2025-04-27_at_17.53.31_a20c2148_x5mnpk.jpg",
    releaseDate: "Fall 2025"
  },
  {
    id: "snake&lovers",
    title: "Snake & Lovers",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745762922/Snake_1_cq4u0v.png",
    description: "The paths of love are never straight",
    releaseDate: "Early 2026"
  }
];

const featuredProjects = [
  {
    title: "Moonlight",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745845529/Moonlight_-_Short_Film_cheshi.webp",
    category: "Feature Film",
    awards: "Best Cinematography",
    duration: "4:34",
    Artist: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745845532/Moonlight_-_Short_Film_abxrcs.mp4"
  },
  {
    title: "Naam main kya rhka hai ",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745843893/cold_smooth_tasty._3_wcjkyz.png",
    category: "Short Film",
    awards: "Best Naration",
    duration: "4:52",
    Artist: "Avi Kesarvani",
    videoUrl: "https://storage.googleapis.com/uhfmp4/Naam%20Main%20Kya%20Rakha%20Hai%20With%20Subs.mp4"
  },
  {
    title: "Mikaali",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/c_pad,ar_4:3/v1745837264/maxresdefault_vur854.jpg",
    category: "Trailer",
    awards: "Best visual's",
    duration: "1:28",
    Artist: "Manthan Mese",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745836248/Trailer-_MiKaali_%E0%A4%AE%E0%A5%80%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A5%80_-_A_shortfilm_by_Manthan_Mese_zjvpyl.mp4"
  },
  {
    title: "Work From Home",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745845873/Short_Film_Work_From_Home_Covid_19_Family_Drama_qbtelj.webp",
    category: "Short Film",
    awards: "Best sound designs",
    duration: "13:46",
    Artist: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745845890/Short_Film_Work_From_Home_Covid_19_Family_Drama_dpjkt3.mp4"
  },
  {
    title: "Fastack Advertisement",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/086d25e1-c650-4237-9c4c-2ff5a4832f3d.__CR0,0,970,600_PT0_SX970_V1___.png",
    category: "Advertisement",
    awards: "Best Story Telling",
    duration: "0:20",
    Artist: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745834231/Play_Mix_13_h23nxo.mp4"
  },
  {
    title: "Lailaaj",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745846167/SHORT_FILM_LAILAAJ_STORYGRAM_BOOMSLANG_PICTURES_ALLAHABAD_bebkgx.webp",
    category: "Short Film",
    awards: "Best Concept",
    duration: "5:54",
    Artist: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745846175/SHORT_FILM_LAILAAJ_STORYGRAM_BOOMSLANG_PICTURES_ALLAHABAD_yeziho.mp4"
  }
];

const Home = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; duration: string } | null>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

    if (carouselRef.current) {
      anime({
        targets: carouselRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000
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
        <meta name="description" content="Official site of Urban Hustle Films – producing bold, real, and unique stories in film and web." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://uhfilms.in/" />

        <meta property="og:title" content="Urban Hustle Films – Official Site" />
        <meta property="og:description" content="Producing bold, real, and unique stories in film and web." />
        <meta property="og:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />
        <meta property="og:url" content="https://uhfilms.in/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen"> 

        <section className="min-h-screen relative overflow-hidden">
          <div ref={carouselRef} className="absolute inset-0 z-0">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation, Pagination]}
              effect="fade"
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop
              className="h-full"
              speed={1000}
            >
              {upcomingProjects.map((project, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-screen">
                    <div
                      className="absolute inset-0 bg-cover bg-center hero-image"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        filter: 'brightness(0.3)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-1/4 left-0 right-0 text-center px-4 hero-content">
                      <motion.h2
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl font-bold mb-4 text-gray-100"
                      >
                        {project.title}
                      </motion.h2>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl text-gray-300 mb-6"
                      >
                        {project.description}
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col items-center justify-center space-y-4"
                      >
                        <div className="flex items-center space-x-2 text-red-500">
                          <Calendar className="w-5 h-5" />
                          <span>{project.releaseDate}</span>
                        </div>
                        <Link
                          to={`/project/${project.id}`}
                          className="btn-primary inline-flex items-center space-x-2 hover:scale-105 transition-transform"
                          data-clickable="true"
                        >
                          <span>Sneak peek Ahead </span>
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 text-gradient"
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="card group cursor-pointer overflow-hidden"
                  data-clickable="true"
                >
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg group">
                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div
                        className="bg-black p-3 rounded-full flex justify-center items-center w-12 h-12"
                        onClick={() => setSelectedVideo({ url: project.videoUrl, duration: project.duration })}
                      >
                        <Play className="w-10 h-10 text-red-500" />
                      </div>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Film className="w-4 h-4 text-red-500" />
                      <span>{project.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-red-500" />
                      <span>{project.awards}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-red-500" />
                      <span>{project.Artist}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVideo({ url: project.videoUrl, duration: project.duration })}
                    className="mt-4 inline-flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Watch Now</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-16 text-gradient"
            >
              Our Services
            </motion.h2>
            <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  transition={{ delay: index * 0.1 }}
                  className="card group"
                  data-clickable="true"
                >
                  <service.icon className="service-icon w-12 h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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

<div style={{
  background: `
    radial-gradient(
      ellipse 100% 70% at center 60% ,
      rgba(255, 30, 30, 0.5) 0%,
      rgba(255, 0, 60, 0.3) 30%,
      rgba(100, 0, 20, 0.1) 60%,
      rgba(0, 0, 0, 0) 100%
    )`,
  backdropFilter: 'blur(24px) saturate(200%)',
  padding: '3rem 2.5rem',
  margin: '0',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: 'inset 0 0 50px 20px rgba(0, 0, 0, 0.7)' 
}}> 
  <ArticleSlider 
    articles={articles} 
    title="Featured Articles" 
    autoScrollDelay={5000} 
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

        <VideoPlayer
          url={selectedVideo?.url || ''}
          duration={selectedVideo?.duration || '00:00'}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </div>
    </>
  );
};

export default Home;
