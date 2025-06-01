import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Loader, ArrowLeft, CheckCircle, XCircle, Film, Clapperboard, Camera, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';

interface JobApplicationForm2Props {
  selectedRole: string;
  onClose: () => void;
}

const JobApplicationForm2: React.FC<JobApplicationForm2Props> = ({ selectedRole, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    reel: '', // Added demo reel field
    skills: '', // Added skills/equipment field
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ffff00', '#ffffff'], // Film-like colors
      shapes: ['circle']
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_a5tly1m',
        'template_57jdkuq',
        formRef.current!,
        'lJX7YKVh5gsW2x9rS'
      );

      setSubmitStatus('success');
      fireConfetti();
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        portfolio: '',
        reel: '',
        skills: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Film reel animation component
  const FilmReel = () => (
    <div className="hidden md:block absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-20">
      <div className="relative w-32 h-48">
        <div className="absolute inset-0 bg-black rounded-lg border-4 border-gray-800 p-1">
          <div className="h-full flex flex-col gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-5 bg-gray-800 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
<>
 <Helmet>
      {/* Basic Meta Tags */}
      <title>Meet the Team | Urban Hustle Films™</title>
      <meta name="description" content="Get to know the creative minds behind Urban Hustle Films™ – a passionate team of filmmakers, developers, designers, and storytellers." />
      <meta name="keywords" content="Urban Hustle Films Team, Filmmakers, Creators, Designers, Developers, Creative Team, Crew, Urban Hustle Films Members" />
      <meta name="author" content="Urban Hustle Films™" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Meet the Team | Urban Hustle Films" />
      <meta property="og:description" content="Meet our creative team – the people behind the storytelling, visuals, tech, and innovation at Urban Hustle Films™." />
      <meta property="og:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />
      <meta property="og:url" content="https://uhfilms.in/team" />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Meet the Team | Urban Hustle Films" />
      <meta name="twitter:description" content="Explore the brilliant team behind the visuals, code, and stories at Urban Hustle Films™." />
      <meta name="twitter:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://uhfilms.in/team/apply" />

      {/* Favicon (Optional if already included globally) */}
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjAyIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] pointer-events-none"></div>

      {/* Film set lights */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-red-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none"></div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-gray-900/90 backdrop-blur-lg rounded-lg border border-gray-800 p-6 md:p-8 w-full max-w-2xl my-8 shadow-2xl overflow-hidden"
      >
        {/* Film clapper decoration */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <Clapperboard className="w-10 h-10 text-red-500" />
        </div>

        {/* Film reel decoration */}
        <FilmReel />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="flex items-center justify-center text-gray-400 hover:text-white absolute top-4 right-4 md:top-6 md:right-6 bg-black/50 rounded-full p-1 border border-gray-700"
        >
          <XCircle className="w-6 h-6" />
        </motion.button>

        {submitStatus !== 'success' ? (
          <div className="space-y-6">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-500" />
              <span className="text-sm font-mono">BACK TO LISTINGS</span>
            </motion.button>

            <div className="flex items-center gap-3 mb-2">
              <Camera className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
                FILM CREW APPLICATION
              </h2>
            </div>
            
            <div className="mb-6 p-3 bg-black/50 border border-gray-800 rounded-lg flex items-center gap-2">
              <Film className="w-5 h-5 text-red-500" />
              <p className="text-lg font-medium">{selectedRole}</p>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="role" value={selectedRole} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileHover={{ y: -2 }} className="space-y-1">
                  <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    placeholder="John Doe"
                  />
                </motion.div>
                
                <motion.div whileHover={{ y: -2 }} className="space-y-1">
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileHover={{ y: -2 }} className="space-y-1">
                  <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    placeholder="+1 234 567 8900"
                  />
                </motion.div>
                
                <motion.div whileHover={{ y: -2 }} className="space-y-1">
                  <label htmlFor="experience" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                    Experience (Years) *
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    placeholder="3+ years"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div whileHover={{ y: -2 }} className="space-y-1">
                  <label htmlFor="portfolio" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                    Portfolio Link
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    placeholder="https://yourportfolio.com"
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="space-y-1">
                  <label htmlFor="reel" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                    Demo Reel Link
                  </label>
                  <input
                    type="url"
                    id="reel"
                    name="reel"
                    value={formData.reel}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                    placeholder="https://vimeo.com/yourreel"
                  />
                </motion.div>
              </div>

              <motion.div whileHover={{ y: -2 }} className="space-y-1">
                <label htmlFor="skills" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                  Skills / Equipment *
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  required
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Cinematography, RED Komodo, Adobe Premiere"
                />
              </motion.div>

              <motion.div whileHover={{ y: -2 }} className="space-y-1">
                <label htmlFor="message" className="block text-xs md:text-sm font-medium text-gray-300 font-mono uppercase tracking-wider">
                  Cover Letter / Notes *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black/40 border border-gray-700 rounded px-4 py-2.5 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Tell us about your experience, availability, and why you're a good fit..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-800 to-red-900 text-white py-3 md:py-3.5 rounded font-mono text-sm md:text-base uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-red-900/50 hover:border-red-500 transition-all duration-300 relative overflow-hidden group mt-4"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 md:w-5 md:h-5" />
                      <span>SUBMIT APPLICATION</span>
                    </>
                  )}
                </span>
              </motion.button>

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-red-400 text-center py-2 px-3 bg-red-900/30 rounded border border-red-800/50 flex items-center gap-2 justify-center text-sm mt-4"
                >
                  <XCircle className="w-4 h-4" />
                  Error submitting application. Please try again.
                </motion.div>
              )}
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-6 md:py-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-5 bg-black/50 p-5 rounded-full border border-green-500/30 inline-block"
            >
              <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-500" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-white mb-3 font-mono"
            >
              APPLICATION RECEIVED
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-24 h-0.5 bg-red-500 mb-5 mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 mb-6 max-w-md mx-auto text-sm md:text-base"
            >
              Thank you for applying to Urban Hustle Films. We'll review your submission and contact you soon.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="px-6 py-2.5 bg-black/50 text-white rounded border border-gray-700 hover:bg-gray-800 transition-all duration-300 text-sm md:text-base font-mono uppercase tracking-wider"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              RETURN TO LISTINGS
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
        </>
  );
};

export default JobApplicationForm2;