import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import { Menu, X, ExternalLink, Home, Users, Info, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import styled from '@emotion/styled';
import { ArrowRight } from 'lucide-react';
import { updates } from "../data/updates";

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
  background: #ef4444;
  color: white;
  font-size: 0.55rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const logoRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % updates.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/team', label: 'Team', icon: Users },
    { path: '/about', label: 'About', icon: Info },
    { path: '/projects', label: 'Projects', icon: Folder }
  ];

  const getArticleUrl = (item) => {
    if (item.id) {
      const article = articles.find(a => a.id === item.id);
      if (article) return `/articles/${article.slug}`;
    }
    return item.link || '#';
  };

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
              className="absolute inset-x-0 top-0 mx-4 md:mx-3 h-12 md:h-20 rounded-full bg-black/60 backdrop-blur-lg border border-white/15 shadow-lg py-2"
            />
          )}
        </AnimatePresence>

        {/* Foreground: Logo + Links */}
        <div className="relative z-1 flex items-center justify-between h-12 md:h-20 px-0">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full -ml-8 md:ml-0">
            <div ref={logoRef} className="flex items-center h-full">
              <img
                src="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745770604/output-onlinegiftools-ezgif.com-optimize_r0ub1p.gif"
                alt="UH Films Logo"
                className="h-20 sm:h-20 md:h-24 lg:h-32 object-contain transition-all duration-300"
              />
            </div>
          </Link>

          {/* Mobile Text Carousel (left of menu button) */}
          <div className="md:hidden flex-1 min-w-0 mx-2 h-8 overflow-hidden relative">
            <div
              className="absolute top-0 left-0 right-0 flex flex-col transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateY(-${currentIndex * 32}px)`,
              }}
            >
              {updates.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 h-8 flex items-center justify-center"
                >
                  <Link
                    to={getArticleUrl(item)}
                    className="flex items-center max-w-full px-1"
                  >
                    <span className="text-white font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.text}
                    </span>
                    <ExternalLink className="w-3 h-3 text-red-400 flex-shrink-0 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Centered Text Carousel */}
          <div className="hidden md:flex flex-1 justify-center items-center overflow-hidden">
            <div
              className="relative h-8 w-full max-w-lg mx-auto"
              style={{ overflow: 'hidden' }}
            >
              <div
                className="absolute inset-0 flex flex-col items-end transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateY(-${currentIndex * 32}px)`,
                  right: '10%'
                }}
              >
                {updates.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 h-8 flex items-center justify-end w-full"
                  >
                    <Link
                      to={getArticleUrl(item)}
                      className="flex items-center group"
                    >
                      <span className="text-white font-medium text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mr-2 group-hover:text-red-400 transition-colors">
                        {item.text}
                      </span>
                      <ExternalLink className="w-5 h-5 text-red-400 flex-shrink-0" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 -mr-7">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col items-center text-white transition-colors hover:text-red-400 ${location.pathname === link.path ? 'text-red-500 font-semibold' : ''
                    }`}
                >
                  <Icon className="w-7 h-6 mb-1" />
                  <span className="text-[10px] font-medium">{link.label}</span>
                </Link>
              );
            })}
            <GlassMorphButton
              to="/courses"
              className="px-5 py-2 text-white text-base rounded-full flex items-center gap-1 right-2 relative"
            >
              <NewBadge className="absolute -top-4 -right-2">
                New
              </NewBadge>
              Courses
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
              <X className="h-6 w-6" />
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
              <div className="flex flex-col space-y-6">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
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
                        className={`flex items-center text-xl py-3 text-white hover:text-red-400 transition-colors ${location.pathname === link.path ? 'font-bold text-red-500' : 'font-medium'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-6 h-6 mr-4" />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

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
                    to="/courses"
                    className="flex items-center gap-3 text-xl py-3 text-white group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-bold group-hover:text-red-400 transition-colors">
                      Courses
                    </span>
                    <NewBadge className="text-xs font-bold px-2 py-1">
                      New
                    </NewBadge>
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