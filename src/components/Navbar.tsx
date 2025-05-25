import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import styled from '@emotion/styled';
import { ArrowRight } from 'lucide-react';

  const GlassMorphButton = styled(Link)`
    background: rgba(239, 68, 68, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(239, 68, 68, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(239, 68, 68, 0.2);
      transform: translateY(-2px);
    }
  `;

  const NewBadge = styled.span`
    background: linear-gradient(225deg, #ef4444 0%, #f97316 100%);
    animation: glow 1.5s ease-in-out infinite alternate;
    font-size: 0.65rem;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;

    @keyframes glow {
      from {
        box-shadow: 0 0 5px #ef4444, 0 0 10px #ef4444, 0 0 15px #f97316;
      }
      to {
        box-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #f97316;
      }
    }
  `;


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const logoRef = useRef<HTMLDivElement>(null);

// Disable scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Logo animation
    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        rotateY: [90, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/team', label: 'Team' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' }
  ];

  return (
<nav className="fixed w-full z-50 mt-5"> 
<div className="max-w-screen-4xl mx-auto px-8 sm:px-10 lg:px-20 relative">

    {/* Background Blur Box */} 
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
className="absolute inset-x-0 top-0 mx-4 md:mx-3 h-12 md:h-20 rounded-full bg-black/60 backdrop-blur-lg border border-white/10 shadow-lg py-2"

        />
      )}
    </AnimatePresence>

    {/* Foreground: Logo + Links */}
    <div className="relative z-1 flex items-center justify-between  h-12 md:h-20 px-0">
      {/* Logo */}
      <Link to="/" className="flex items-center h-full -ml-8 md:ml-0  ">
        <div ref={logoRef} className="flex items-center h-full">
          <img
            src="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745770604/output-onlinegiftools-ezgif.com-optimize_r0ub1p.gif"
            alt="UH Films Logo"
className="h-20 sm:h-20 md:h-24 lg:h-32 object-contain transition-all duration-300"/>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-6 -mr-7">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-white text-xl font-medium transition-colors hover:text-red-400 ${ 
              location.pathname === link.path ? 'text-red-500 font-semibold' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
        <GlassMorphButton
          to="/"
          className="px-5 py-2 text-white text-base rounded-full flex items-center gap-1 relative"
        >
          <NewBadge className="absolute -top-4 -right-2">
            coming soon
          </NewBadge>
          Courses
          <ArrowRight className="w-4 h-4" />
        </GlassMorphButton>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none relative z-50"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 " />
        ) : (
          <div className="relative">
            <Menu className="h-6 w-6" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 transform translate-x-1/2 -translate-y-1/2"></span>
          </div>
        )}
      </motion.button>
    </div>
  </div>



      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-9 bg-black/80 backdrop-blur-xl"
          >
   
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative mt-24 mx-6 p-8 rounded-xl bg-gray-900/80 border border-gray-800 backdrop-blur-md"
            >
              <div className="flex flex-col space-y-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 100,
                      delay: index * 0.05
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`block text-2xl py-3 text-white hover:text-red-400 transition-colors ${
                        location.pathname === link.path ? 'font-bold text-red-500' : 'font-medium'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Courses Link with NEW Badge */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    delay: navLinks.length * 0.05
                  }}
                >
                  <Link
                    to="/"
                    className="flex items-center gap-3 text-2xl py-3 text-white group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-bold group-hover:text-red-400 transition-colors">
                      Courses
                    </span>
                    <NewBadge className="text-xs font-bold px-2 py-1">
                      Coming Soon
                    </NewBadge>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;    

