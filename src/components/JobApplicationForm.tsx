import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Loader, ArrowLeft, Film, Clapperboard, Camera, Video } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';
import { BsTwitterX } from 'react-icons/bs';
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';

const SocialIcon = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-red-900 rounded-lg text-white transition-all duration-300 border border-gray-700"
    aria-label={label}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm">{label}</span>
  </motion.a>
);

interface JobApplicationFormProps {
  selectedRole?: string | null;
  handleBack?: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ selectedRole, handleBack }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromUrl = params.get('role');
    if (roleFromUrl) {
      setRole(decodeURIComponent(roleFromUrl));
    } else if (selectedRole) {
      setRole(selectedRole);
    }
  }, [location.search, selectedRole]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    reel: '',
    skills: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#ef4444', '#3b82f6'],
      shapes: ['circle', 'square']
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
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
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

  const onBack = () => {
    if (handleBack) {
      handleBack();
    } else {
      navigate(-1);
    }
  };

  // Film reel animation frames
  const FilmReel = () => (
    <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-10 md:opacity-20">
      <div className="relative w-40 h-64">
        <div className="absolute inset-0 bg-black rounded-lg border-4 border-gray-800 p-1">
          <div className="h-full flex flex-col gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-800 rounded-sm"></div>
            ))}
          </div>
        </div>
        <div className="absolute -inset-2 border border-gray-700 rounded-lg"></div>
      </div>
    </div>
  );

  return (
        <>
      <Helmet>
        <title>Apply – Careers at Urban Hustle Films</title>
        <meta name="description" content="Apply for exciting roles in filmmaking, production, editing, and more at Urban Hustle Films." />
        <link rel="canonical" href="https://uhfilms.in/careers/apply" />
      </Helmet>
          
    <div className="min-h-screen py-20 bg-black bg-opacity-90 relative overflow-hidden">
      {/* Film grain overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMiIvPgo8L3N2Zz4=')] opacity-5 pointer-events-none"></div>

      {/* Film set lights */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-500" />
            <span className="font-mono text-sm">BACK TO LISTINGS</span>
          </motion.button>

          <div className="relative p-8 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg">
            {/* Film clapper decoration */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <Clapperboard className="w-12 h-12 text-red-600" />
            </div>

            {/* Film reel decoration - only on desktop */}
            <div className="hidden md:block">
              <FilmReel />
            </div>

            {submitStatus !== 'success' ? (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Camera className="w-8 h-8 text-red-500" />
                  <h2 className="text-3xl font-bold text-white font-mono tracking-tight">
                    APPLICATION FORM
                  </h2>
                </div>
                
                <div className="mb-8 p-4 bg-black/50 border border-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-500">
                    <Film className="w-5 h-5" />
                    <p className="text-lg font-medium">{role}</p>
                  </div>
                </div>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="role" value={role} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    
                    <motion.div whileHover={{ y: -2 }}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }}>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        PHONE *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                        placeholder="+1 234 567 8900"
                      />
                    </motion.div>
                    
                    <motion.div whileHover={{ y: -2 }}>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        YEARS OF EXPERIENCE *
                      </label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                        placeholder="3+ years"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }}>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        PORTFOLIO LINK
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                        placeholder="https://yourportfolio.com"
                      />
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }}>
                      <label htmlFor="reel" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                        DEMO REEL LINK
                      </label>
                      <input
                        type="url"
                        id="reel"
                        name="reel"
                        value={formData.reel}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                        placeholder="https://vimeo.com/yourreel"
                      />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ y: -2 }}>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      KEY SKILLS / EQUIPMENT *
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      required
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                      placeholder="Cinematography, RED Komodo, Adobe Premiere"
                    />
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      COVER LETTER / MRESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-red-500 focus:border-transparent font-mono placeholder-gray-500"
                      placeholder="Tell us about your experience, availability, and why you're a good fit..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-800 hover:bg-red-700 text-white py-4 rounded-lg font-mono tracking-wider text-sm uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-red-900 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          SUBMITTING...
                        </>
                      ) : (
                        <>
                          <Video className="w-5 h-5" />
                          SUBMIT APPLICATION
                        </>
                      )}
                    </span>
                  </motion.button>

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-red-900/30 rounded-lg border border-red-800 text-red-300 text-center font-mono text-sm"
                    >
                      ERROR: Submission failed. Please try again or contact us directly.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
              >
                <div className="mb-8 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-6 bg-black/50 p-6 rounded-full border border-green-500/30"
                  >
                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-white mb-4 font-mono tracking-tight"
                  >
                    APPLICATION RECEIVED
                  </motion.h2>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="w-32 h-1 bg-red-500 mb-6 mx-auto"
                  />
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg text-gray-300 mb-8 max-w-md mx-auto"
                  >
                    Thank you for applying to Urban Hustle Films. We'll review your submission and be in touch soon.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={onBack}
                    className="px-8 py-3 bg-black/50 text-white rounded-lg border border-gray-700 hover:bg-gray-800 transition-all duration-300 font-mono text-sm uppercase tracking-wider"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    BACK TO CAREERS
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Social Media Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: submitStatus === 'success' ? 1.2 : 0 }}
              className={`mt-12 pt-6 border-t border-gray-800 ${submitStatus === 'success' ? 'border-green-500/30' : 'border-red-500/30'}`}
            >
              <h3 className="text-lg font-bold text-white mb-4 font-mono tracking-tight text-center">
                {submitStatus === 'success' ? 'STAY CONNECTED' : 'FOLLOW OUR WORK'}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <SocialIcon 
                  icon={Instagram} 
                  href="https://www.instagram.com/urbanhustlefilms" 
                  label="Instagram" 
                />
                <SocialIcon 
                  icon={Youtube} 
                  href="https://www.youtube.com/@urbanhustlefilms" 
                  label="YouTube" 
                />
                <SocialIcon 
                  icon={BsTwitterX} 
                  href="https://x.com/urbanhustlefilm" 
                  label="Twitter/X" 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
        </>
  );
};

export default JobApplicationForm;