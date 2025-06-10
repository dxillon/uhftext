import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import { Menu, X, Theater, Drama, Podcast, LibraryBig } from 'lucide-react';
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-out-up-right-icon lucide-circle-arrow-out-up-right"><path d="M22 12A10 10 0 1 1 12 2" /><path d="M22 2 12 12" /><path d="M16 2h6v6" /></svg>
  );



    const Projector = (props: React.SVGProps<SVGSVGElement>) => (
<svg fill="#ffffff" height="35px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.40 614.40" xml:space="preserve" stroke="#ffffff" stroke-width="7.168000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path  d="M488.079,52H23.921C10.731,52,0,62.73,0,75.921V324v128c0,4.418,3.582,8,8,8h88c2.254,0,4.404-0.951,5.92-2.619 c1.516-1.669,2.258-3.899,2.043-6.144c-0.154-1.606-1.777-17.983-5.834-39.237h315.741c-4.057,21.255-5.68,37.631-5.834,39.237 c-0.215,2.244,0.527,4.475,2.043,6.144c1.516,1.668,3.666,2.619,5.92,2.619h88c4.418,0,8-3.582,8-8V324V75.921 C512,62.73,501.269,52,488.079,52z M496,75.921V316h-5.917c-4.221-8.493-14.151-30.1-23.99-63.401 C454.56,213.563,440.882,150.282,440.041,68h48.038C492.447,68,496,71.554,496,75.921z M95.771,259.232 C117.11,218.786,142.42,153.208,143.927,68h39.958c-0.524,19.915-3.015,39.613-7.427,58.944c-0.049,0.133-0.103,0.262-0.146,0.399 c-0.174,0.563-0.277,1.131-0.325,1.696c-3.225,13.678-7.414,27.168-12.565,40.416c-10.955,28.18-26.25,55.352-45.458,80.763 c-18.423,24.371-36.999,42.469-49.825,53.711C76.307,292.642,86.026,277.706,95.771,259.232z M41.472,311.974 c5.193-11.755,12.379-29.905,19.589-54.199C72.977,217.62,87.111,152.533,87.959,68h39.968 c-1.497,81.625-25.639,144.425-45.995,183.175C65.932,281.631,49.785,302.267,41.472,311.974z M197.651,98.509 C214.186,104.657,234.494,108,256,108c21.507,0,41.814-3.343,58.349-9.491c1.048,8.587,2.449,17.121,4.199,25.591 c-19.33,5.175-40.787,7.9-62.548,7.9c-21.762,0-43.218-2.724-62.548-7.9C195.201,115.629,196.603,107.096,197.651,98.509z M312.756,81.933C297.544,88.353,277.157,92,256,92c-21.157,0-41.543-3.647-56.756-10.066c0.319-4.632,0.534-9.277,0.65-13.934 h112.212C312.222,72.656,312.437,77.301,312.756,81.933z M189.827,139.696C210.365,145.139,233.054,148,256,148 c22.945,0,45.635-2.862,66.173-8.305c2.075,7.985,4.475,15.904,7.18,23.751C306.088,169.124,281.438,172,256,172 c-25.436,0-50.087-2.876-73.353-8.555C185.352,155.599,187.752,147.681,189.827,139.696z M335.933,128.686 c-0.058-0.443-0.145-0.887-0.281-1.329c-0.013-0.043-0.032-0.082-0.045-0.125c-4.453-19.424-6.965-39.219-7.492-59.232h39.958 c1.507,85.208,26.817,150.786,48.155,191.232c9.746,18.474,19.465,33.41,27.632,44.696c-12.826-11.242-31.402-29.34-49.825-53.711 c-19.209-25.411-34.503-52.583-45.458-80.763C343.382,156.094,339.168,142.484,335.933,128.686z M384.073,68h39.968 c0.848,84.533,14.982,149.62,26.898,189.775c7.216,24.316,14.409,42.478,19.603,54.231c-8.234-9.599-24.195-29.974-40.162-60.24 C409.884,212.916,385.575,149.93,384.073,68z M23.921,68h48.038c-0.841,82.282-14.52,145.563-26.052,184.599 C36.069,285.9,26.138,307.507,21.917,316H16V75.921C16,71.554,19.553,68,23.921,68z M16,332h10.76c0.005,0,0.01,0.001,0.016,0.001 c0.005,0,0.01-0.001,0.015-0.001h2.214c11.704,28.738,16.906,89.681,18.469,112H16V332z M63.524,444 c-1.398-20.751-6.152-78.486-17.491-112h6.284c13.321,16.592,22.159,45.871,27.711,71.446C80.015,403.629,80,403.813,80,404 c0,1.363,0.343,2.645,0.944,3.768c3.06,14.818,4.999,28.021,6.062,36.232H63.524z M94.775,396 c-5.666-24.71-14.401-52.298-27.396-70.559c11.834-9.328,37.309-31.237,62.995-65.107c19.52-25.739,35.197-53.25,46.654-81.807 C202.074,184.808,228.621,188,256,188c27.381,0,53.928-3.192,78.972-9.473c11.457,28.557,27.134,56.067,46.654,81.807 c25.686,33.87,51.161,55.78,62.995,65.107c-12.995,18.26-21.73,45.849-27.396,70.559H94.775z M431.057,407.766 c0.6-1.123,0.943-2.404,0.943-3.766c0-0.181-0.015-0.358-0.027-0.536c0.084-0.387,0.166-0.771,0.252-1.159 c7.217-32.631,16.675-56.811,27.464-70.305h6.279c-11.339,33.514-16.094,91.249-17.491,112h-23.487 C426.049,435.783,427.988,422.567,431.057,407.766z M464.526,444c1.562-22.316,6.759-83.25,18.47-112H496v112H464.526z"></path> </g></svg>
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