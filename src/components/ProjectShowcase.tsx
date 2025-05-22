import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Star, Clock, Calendar, Users, ChevronDown, ChevronUp, Loader2 , Check,Play} from 'lucide-react';
import Select from 'react-select';
import emailjs from '@emailjs/browser';
import VideoPlayer from './VideoPlayer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet-async';

onst upcomingProjects = [
  {
    id: "sucidefun",
    title: "Suicide Fun",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745759555/WhatsApp_Image_2025-04-27_at_17.53.32_87bee1b0_q9etqk.jpg",
    description: "Do you have the courage to see your future?",
    releaseDate: "Fall 2025",
    status: "In Development"
  },
  {
    id: "agyaat",
    title: "Agyaat",
    description: "When truth is invisible, can you find it?",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745759562/WhatsApp_Image_2025-04-27_at_17.53.31_a20c2148_x5mnpk.jpg",
    releaseDate: "Fall 2025",
    status: "Pre-production"
  },
  
  {
    id: "snake&lovers",
    title: "Snake & Lovers",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745762922/Snake_1_cq4u0v.png",
    description: "The paths of love are never straight",
    releaseDate: "Early 2026",
    status: "Writing"
  }
];

const featuredProjects = [
 {
    id: 1,
    title: "Moonlight",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745845529/Moonlight_-_Short_Film_cheshi.webp",
    description: "A visually stunning short film exploring themes of isolation and connection under the moonlight.",
    status: "Best Cinematography",
    duration: "4:34",
    director: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745845532/Moonlight_-_Short_Film_abxrcs.mp4"
  },
  {
    id: 2,
    title: "Naam main kya rhka hai",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745843893/cold_smooth_tasty._3_wcjkyz.png",
    description: "A thought-provoking short film that questions identity and the meaning behind names in our society.",
    status: "Best Narration",
    duration: "4:52",
    director: "Avi Kesarvani",
    videoUrl: "https://storage.googleapis.com/uhfmp4/Naam%20Main%20Kya%20Rakha%20Hai%20With%20Subs.mp4"
  },
  {
    id: 3,
    title: "Mikaali",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/c_pad,ar_4:3/v1745837264/maxresdefault_vur854.jpg",
    description: "A gripping trailer showcasing the visual masterpiece that tells a powerful story of resilience.",
    status: "Best Visuals",
    duration: "1:28",
    director: "Manthan Mese",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745836248/Trailer-_MiKaali_%E0%A4%AE%E0%A5%80%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A5%80_-_A_shortfilm_by_Manthan_Mese_zjvpyl.mp4"
  },
  {
    id: 4,
    title: "Work From Home",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745845873/Short_Film_Work_From_Home_Covid_19_Family_Drama_qbtelj.webp",
    description: "A family drama capturing the challenges and unexpected moments of togetherness during the COVID-19 lockdown.",
    status: "Best Sound Design",
    duration: "13:46",
    director: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745845890/Short_Film_Work_From_Home_Covid_19_Family_Drama_dpjkt3.mp4"
  },
  {
    id: 5,
    title: "Fastack Advertisement",
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/086d25e1-c650-4237-9c4c-2ff5a4832f3d.__CR0,0,970,600_PT0_SX970_V1___.png",
    description: "A creative and engaging advertisement that tells a compelling story in just 20 seconds.",
    status: "Best Story Telling",
    duration: "0:20",
    director: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745834231/Play_Mix_13_h23nxo.mp4"
  },
  {
    id: 6,
    title: "Lailaaj",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745846167/SHORT_FILM_LAILAAJ_STORYGRAM_BOOMSLANG_PICTURES_ALLAHABAD_bebkgx.webp",
    description: "An innovative short film with a unique concept that challenges conventional storytelling methods.",
    status: "Best Concept",
    duration: "5:54",
    director: "Avi Kesarvani",
    videoUrl: "https://res.cloudinary.com/dbtj6orw2/video/upload/v1745846175/SHORT_FILM_LAILAAJ_STORYGRAM_BOOMSLANG_PICTURES_ALLAHABAD_yeziho.mp4"
  }
];

const roleTypes = [
  { value: 'actor', label: 'Actor' },
  { value: 'extra', label: 'Extra' },
  { value: 'voice', label: 'Voice Artist' },
  { value: 'stunts', label: 'Stunts' }
];

const actingStyles = [
  { value: 'method', label: 'Method Acting' },
  { value: 'protagonist', label: 'Protagonist' },
  { value: 'antagonist', label: 'Antagonist' },
  { value: 'emotional', label: 'Emotional Roles' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'action', label: 'Action' }
];

const ProjectShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; duration: string } | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const featuredProjectsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const getcastProjectsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    phone: '',
    portfolio: '',
    roleTypes: [],
    actingStyles: [],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        experience: formData.experience,
        phone: formData.phone,
        portfolio: formData.portfolio,
        roleTypes:  `Role Type's: ${formData.roleTypes.map(role => role.label).join(', ')}`, 
        actingStyles: `Best In: ${formData.actingStyles.map(style => style.label).join(', ')}`,
        message: formData.message
      };

      await emailjs.send(
        'service_a5tly1m',
        'template_57jdkuq',
        templateParams,
        'lJX7YKVh5gsW2x9rS'
      );

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsFormVisible(false);
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          experience: '',
          phone: '',
          portfolio: '',
          roleTypes: [],
          actingStyles: [],
          message: ''
        });
      }, 1700);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (location.hash === '#get-casted') {
      const element = document.getElementById('get-casted');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

    return (
        <>
  <Helmet>
      {/* Basic Meta Tags */}
      <title>Projects | Urban Hustle Films™</title>
      <meta name="description" content="Explore the latest creative projects from Urban Hustle Films™ – from web apps to music videos, short films, and design innovation." />
      <meta name="keywords" content="Urban Hustle Films, Creative Projects, Short Films, Music Videos, Web Development, Animation, VFX, Design Portfolio" />
      <meta name="author" content="Urban Hustle Films™" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Projects | Urban Hustle Films" />
      <meta property="og:description" content="See what we've been working on – a dynamic portfolio of digital creativity and storytelling." />
      <meta property="og:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />
      <meta property="og:url" content="https://uhfilms.in/projects" />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Projects | Urban Hustle Films" />
      <meta name="twitter:description" content="Explore our latest creative and digital projects from music to tech." />
      <meta name="twitter:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://uhfilms.in/projects" />
      </Helmet>

    <div className="min-h-screen pt-20 bg-black">


      <section className="relative py-24 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />
    <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbtj6orw2/image/upload/v1747864204/FILM_S_jhhj0l.svg')] bg-cover bg-center opacity-35 blur-sm" />
  </div>
  
  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
        UH FILMS
      </h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
      >
        Premium cinematic experiences and groundbreaking productions
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex flex-wrap justify-center gap-4"
      >
<button 
  onClick={() => featuredProjectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 flex items-center gap-2"
>
  <Play className="w-5 h-5" />
  Explore Productions
</button>
        <Link 
          to="/about" 
          className="px-8 py-3 border border-gray-600 hover:border-red-500 text-gray-300 hover:text-white rounded-full transition-all duration-300"
        >
          Our Story
        </Link>
      </motion.div>
    </motion.div>
  </div>
</section>

{/* Upcoming Projects Section */}
<section className="py-16 container mx-auto px-4 ">
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-4xl font-bold text-center mb-12 text-gradient"
  >
    Upcoming Projects
  </motion.h2>

  {/* Mobile Carousel - Only visible on mobile (hidden on md and above) */}
  <div className="block md:hidden px-4 relative pb-10">
  <Swiper
    modules={[Autoplay, Pagination, Navigation]}
    spaceBetween={20}
    slidesPerView={1}
    centeredSlides={true}
    loop={true}
    autoplay={{
      delay: 1500,
      disableOnInteraction: true,
    }}
    pagination={{
      clickable: true,
      dynamicBullets: true,
      el: '.swiper-pagination', // Add custom pagination container class
    }}
    navigation={{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }}
    speed={800}
    touchRatio={1.5}
    grabCursor={true}
  >
      {upcomingProjects.map((project, index) => (
        <SwiperSlide key={project.id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300 mx-auto max-w-md"
          >
            {/* Project Card Content */}
            <div className="relative h-48">
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-red-500 block">{project.status}</span>
                  <span className="text-gray-400 text-sm">{project.releaseDate}</span>
                </div>
                <Link 
                  to={`/project/${project.id}`}
                  className="bg-transparent border border-gray-700 text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:border-red-800 hover:text-white transition-all duration-300"
                >
                  Know More
                </Link>
              </div> 
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
 <div className="absolute bottom-0 left-0 right-0">
    <div className="flex items-center justify-center">
      {/* Previous Button - Small with spacing */}
      <div className="swiper-button-prev !relative !text-red-500 !w-3 !h-3 !mr-14" />
      
      {/* Pagination Dots - Perfectly Centered */}
      <div className="swiper-pagination !absolute left-1/2 transform -translate-x-1/2" style={{ width: 'auto' }} />
      
      {/* Next Button - Small with spacing */}
      <div className="swiper-button-next !relative !text-red-500 !w-3 !h-3 !ml-14" />
    </div>
  </div>
  </div>

  {/* Desktop Grid - Only visible on md screens and above (hidden on mobile) */}
  <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
    {upcomingProjects.map((project, index) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300"
      >
        <div className="relative h-48">
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm">{project.description}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-red-500 block">{project.status}</span>
              <span className="text-gray-400 text-sm">{project.releaseDate}</span>
            </div>
            <Link 
              to={`/project/${project.id}`}
              className="bg-transparent border border-gray-700 text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:border-red-800 hover:text-white transition-all duration-300"
            >
              Know More
            </Link>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* Casting Call-to-Action */}
       <section ref={getcastProjectsRef} id="get-casted" className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg font-semibold">
                Want to be in our shows and series? Get cast now!
              </span>
              {isFormVisible ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence>
              {isFormVisible && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-8 max-w-2xl mx-auto"
                >
                  <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Experience (years) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Portfolio URL
                        </label>
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Role Types *
                        </label>
                        <Select
                          isMulti
                          options={roleTypes}
                          value={formData.roleTypes}
                          onChange={(selected) => setFormData({ ...formData, roleTypes: selected || [] })}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            control: (base) => ({
                              ...base,
                              background: 'rgb(31, 41, 55)',
                              borderColor: 'rgb(75, 85, 99)',
                              '&:hover': {
                                borderColor: 'rgb(239, 68, 68)'
                              }
                            }),
                            menu: (base) => ({
                              ...base,
                              background: 'rgb(31, 41, 55)'
                            }),
                            option: (base, state) => ({
                              ...base,
                              background: state.isFocused ? 'rgb(55, 65, 81)' : 'transparent',
                              color: 'white'
                            }),
                            multiValue: (base) => ({
                              ...base,
                              background: 'rgb(239, 68, 68)'
                            }),
                            multiValueLabel: (base) => ({
                              ...base,
                              color: 'white'
                            }),
                            multiValueRemove: (base) => ({
                              ...base,
                              color: 'white',
                              ':hover': {
                                background: 'rgb(185, 28, 28)',
                                color: 'white'
                              }
                            })
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Best In *
                        </label>
                        <Select
                          isMulti
                          options={actingStyles}
                          value={formData.actingStyles}
                          onChange={(selected) => setFormData({ ...formData, actingStyles: selected || [] })}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          styles={{
                            control: (base) => ({
                              ...base,
                              background: 'rgb(31, 41, 55)',
                              borderColor: 'rgb(75, 85, 99)',
                              '&:hover': {
                                borderColor: 'rgb(239, 68, 68)'
                              }
                            }),
                            menu: (base) => ({
                              ...base,
                              background: 'rgb(31, 41, 55)'
                            }),
                            option: (base, state) => ({
                              ...base,
                              background: state.isFocused ? 'rgb(55, 65, 81)' : 'transparent',
                              color: 'white'
                            }),
                            multiValue: (base) => ({
                              ...base,
                              background: 'rgb(239, 68, 68)'
                            }),
                            multiValueLabel: (base) => ({
                              ...base,
                              color: 'white'
                            }),
                            multiValueRemove: (base) => ({
                              ...base,
                              color: 'white',
                              ':hover': {
                                background: 'rgb(185, 28, 28)',
                                color: 'white'
                              }
                            })
                          }}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Additional Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

 <button
  type="submit"
  disabled={isSubmitting || submitSuccess}
  className={`w-full text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
    ${
      submitSuccess 
        ? 'bg-green-600 hover:bg-green-700' 
        : isSubmitting 
          ? 'bg-red-700' 
          : 'bg-red-600 hover:bg-red-700'
    }
    ${(isSubmitting || submitSuccess) ? 'cursor-not-allowed' : ''}
  `}
>
  <AnimatePresence mode="wait">
    {isSubmitting ? (
      <motion.span
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-2"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        Submitting...
      </motion.span>
    ) : submitSuccess ? (
      <motion.span
        key="success"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2"
      >
        <Check className="h-5 w-5" />
        Submitted!
      </motion.span>
    ) : (
      <motion.span
        key="default"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Submit Application
      </motion.span>
    )}
  </AnimatePresence>
</button>

                    {submitSuccess && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-green-500 text-center"
                      >
                        Thank you for your interest! We'll contact you if we find a suitable role matching your profile.
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={featuredProjectsRef} className="py-16 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12 text-gradient"
        >
          All Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300"
            >
              <div className="relative aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300">{project.description}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Star className="w-4 h-4 text-red-500" />
                    <span>{project.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>{project.duration}</span>
                  </div>
                  
                                   <div className="flex items-center gap-2 text-gray-400">
                    <Camera className="w-4 h-4 text-red-500" />
                    <span>{project.director}</span>
                  </div>
                  {project.videoUrl && (
        <button
          onClick={() => setSelectedVideo({ url: project.videoUrl, duration: project.duration })}
          className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors text-sm"
        > 
          <Play className="w-3 h-3" />
          <span>Watch Now</span>
        </button>
      )}
 
                </div>
              </div>
            </motion.div>
          ))}
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

export default ProjectShowcase;