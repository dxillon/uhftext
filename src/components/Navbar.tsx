import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import { Menu, X, Theater, Drama, Podcast, Projector, LibraryBig } from 'lucide-react';
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
  background: linear-gradient(225deg, #ef4444 0%, #f97316 100%);
  animation: glow 1.5s ease-in-out infinite alternate;
  font-size: 0.55rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999pxdata:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtYXJyb3ctb3V0LXVwLXJpZ2h0LWljb24gbHVjaWRlLWNpcmNsZS1hcnJvdy1vdXQtdXAtcmlnaHQiPjxwYXRoIGQ9Ik0yMiAxMkExMCAxMCAwIDEgMSAxMiAyIi8+PHBhdGggZD0iTTIyIDIgMTIgMTIiLz48cGF0aCBkPSJNMTYgMmg2djYiLz48L3N2Zz4=;

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const CircleArrowOutUpRight = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
	x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;"
	xml:space="preserve"><style type="text/css">
	.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
	.st1{fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;}
</style><path d="M88.7,77.7h-2.2c0-1.6-0.9-3-2.1-3.8v-9.8V26.5C84.4,17.9,77.5,11,69,11H31.5c-8.5,0-15.4,6.9-15.4,15.4v37.6v9.8  c-1.3,0.8-2.1,2.2-2.1,3.8h-3.3c-2.5,0-4.5,2-4.5,4.5v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1c0-1.4,1.1-2.5,2.5-2.5h3.5  c1.4,0,2.5,1.1,2.5,2.5v0.3c-1.6,0.7-2.8,2.3-2.8,4.2v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1c0-1.4,1.1-2.5,2.5-2.5H22  c1.4,0,2.5,1.1,2.5,2.5v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1c0-2.3-1.7-4.1-3.9-4.5v0c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5  v0.6c-1.3,0.8-2.2,2.2-2.2,3.9v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1c0-1.4,1.1-2.5,2.5-2.5H37c1.4,0,2.5,1.1,2.5,2.5v1c0,0.6,0.4,1,1,1  s1-0.4,1-1v-1c0-2.3-1.7-4.1-3.9-4.5v0c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5v0.6c-1.3,0.8-2.2,2.2-2.2,3.9v1  c0,0.6,0.4,1,1,1s1-0.4,1-1v-1c0-1.4,1.1-2.5,2.5-2.5H52c1.4,0,2.5,1.1,2.5,2.5v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1  c0-2.3-1.7-4.1-3.9-4.5v0c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5v0.6c-1.3,0.8-2.2,2.2-2.2,3.9v1c0,0.6,0.4,1,1,1  s1-0.4,1-1v-1c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1c0-2.3-1.7-4.1-3.9-4.5v0  c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5v0.6c-1.3,0.8-2.2,2.2-2.2,3.9v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1  c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1c0-2.3-1.7-4.1-3.9-4.5v0c0-1.4,1.1-2.5,2.5-2.5  h3.5c1.4,0,2.5,1.1,2.5,2.5v1c0,0.6,0.4,1,1,1s1-0.4,1-1v-1C93.3,79.7,91.2,77.7,88.7,77.7z M79.2,43C73.7,38.6,69.1,20,69,19.8  c0-0.1-0.1-0.2-0.1-0.3c1.1-1,1.9-2,2.5-3.1c1.3,6.5,4.6,20.6,9.4,26.6H79.2z M76.1,45h0.7c-0.9,1.2-2.1,3.2-3.4,5.8H27.5  c-1.5-2.7-3-4.6-4-5.8h0.2c0.6,0,1-0.4,1-1c0-0.5-0.3-0.8-0.7-0.9c5.3-5.4,9.4-17.4,10.6-21.4c4,2.3,9.5,3.6,15.7,3.6  c6.9,0,13-1.7,17-4.4c0.7,2.9,4.4,16.3,9.2,22.1h-0.3c-0.6,0-1,0.4-1,1S75.6,45,76.1,45z M50.3,23.3c-10.1,0-18.7-4.1-19.8-9.2  c2.4,1.4,10.7,5.6,20.8,5.6c5.9,0,12.5-1.5,18.8-5.8C69.2,19.1,60.5,23.3,50.3,23.3z M32.7,13h35.1C53.3,22.1,37.9,15.7,32.7,13z   M32.8,20.5c-1.1,3.4-6,18.6-11.9,22.5h-1.4c4.9-6.1,8.2-20.7,9.5-27C29.7,17.7,31.1,19.2,32.8,20.5z M18.1,46.9  c1.5,2.4,3.9,7.2,6.3,16.2h-6.3V46.9z M26.5,63.1C26.5,63.1,26.5,63.1,26.5,63.1c-2.8-10.5-5.7-15.7-7.3-18.1h1.6  c1.2,1.3,6.2,7,9.9,18.1H26.5z M32.8,63.1C32.8,63.1,32.8,63.1,32.8,63.1c-1.3-4.1-2.8-7.5-4.2-10.3h43.9c-1.2,2.8-2.5,6.2-3.6,10.3  c0,0,0,0,0,0H32.8z M79.3,45h1.8c-1.6,2.4-4.5,7.6-7.3,18.1c0,0,0,0,0,0H71C74,52.1,78.2,46.4,79.3,45z M82.4,46.6v16.5h-6.6  C78.4,53.7,80.9,48.9,82.4,46.6z M82.4,26.5v15.5c-5.3-6.1-8.8-24.2-9.6-28.3C78.4,15.2,82.4,20.4,82.4,26.5z M27.4,13.7  c-0.8,4.2-4.2,21.6-9.3,27.9V26.5C18.1,20.5,22,15.4,27.4,13.7z M20.7,82.2h-1.9c0-1.9-1.1-3.5-2.8-4.1v-0.3c0-1.4,1.1-2.5,2.5-2.5  H22c1.4,0,2.5,1.1,2.5,2.5v0C22.4,78.1,20.7,80,20.7,82.2z M35.7,82.2h-2.2c-0.1,0-0.2,0-0.3,0v0c0-1.7-0.9-3.1-2.2-3.9v-0.6  c0-1.4,1.1-2.5,2.5-2.5H37c1.4,0,2.5,1.1,2.5,2.5v0C37.4,78.1,35.7,80,35.7,82.2z M50.7,82.2h-2.2c-0.1,0-0.2,0-0.3,0v0  c0-1.7-0.9-3.1-2.2-3.9v-0.6c0-1.4,1.1-2.5,2.5-2.5H52c1.4,0,2.5,1.1,2.5,2.5v0C52.4,78.1,50.7,80,50.7,82.2z M65.7,82.2h-2.2  c-0.1,0-0.2,0-0.3,0v0c0-1.7-0.9-3.1-2.2-3.9v-0.6c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5v0C67.4,78.1,65.7,80,65.7,82.2z   M71.6,77.7c0-2.5-2-4.5-4.5-4.5h-3.5c-2.5,0-4.5,2-4.5,4.5v0c-0.1,0-0.2,0-0.3,0h-2.2c0-2.5-2-4.5-4.5-4.5h-3.5  c-2.5,0-4.5,2-4.5,4.5v0c-0.1,0-0.2,0-0.3,0h-2.2c0-2.5-2-4.5-4.5-4.5h-3.5c-2.5,0-4.5,2-4.5,4.5v0c-0.1,0-0.2,0-0.3,0h-2.2  c0-2.5-2-4.5-4.5-4.5h-3.5c-0.1,0-0.3,0-0.4,0v-8.2h64.3v8.2c-0.1,0-0.3,0-0.4,0h-3.5c-2.5,0-4.5,2-4.5,4.5v0c-0.1,0-0.2,0-0.3,0  H71.6z M80.7,82.2h-2.2c-0.1,0-0.2,0-0.3,0v0c0-1.7-0.9-3.1-2.2-3.9v-0.6c0-1.4,1.1-2.5,2.5-2.5h3.5c1.4,0,2.5,1.1,2.5,2.5v0  C82.4,78.1,80.7,80,80.7,82.2z"/>
</svg>
  );


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
    { path: '/', label: 'Hall', icon: Theater },
    { path: '/team', label: 'Crew', icon: Drama },
    { path: '/about', label: 'About', icon: Podcast },
    { path: '/projects', label: 'Theater', icon: Projector }
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
      <div className="max-w-screen-4xl mx-auto px-8 sm:px-10 lg:px-18 relative">
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
                    <CircleArrowOutUpRight className="w-3 h-3 text-red-400 flex-shrink-0 ml-1" />
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
                      <CircleArrowOutUpRight className="w-3 h-3 text-red-400 flex-shrink-0 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 -mr-6.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex flex-col items-center text-white transition-colors hover:text-red-400 ${location.pathname === link.path ? 'text-red-500 font-semibold' : ''
                    }`}
                >
                  <Icon className="w-7 h-7 mb-1 " />
                  <span
                    className="  text-[12px]  font-medium  tracking-wider  leading-relaxed   font-sans  text-white  drop-shadow-md  "
                  >
                    {link.label}
                  </span>

                </Link>
              );
            })}
            <GlassMorphButton
              to="/courses"
              className=" group px-3 py-2.5 text-[22px] font-medium text-white text-base rounded-full flex items-center  gap-1.5 relative"
            >
              <LibraryBig className="transition-colors duration-300 group-hover:text-red-400 " />
              <span className="leading-tight text-[22px]">Course's</span>
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
                    <NewBadge className="text-xs font-bold px-2 py-1">
                      New
                    </NewBadge>
                    <span className="font-bold group-hover:text-red-400 transition-colors">
                      Course's
                    </span>

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