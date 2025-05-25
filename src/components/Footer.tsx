import React, { useEffect, useRef, useState } from 'react';
import { Link, } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail,Copyright , Phone, MapPin,  ChevronDown, Star } from 'lucide-react';
import { BsTwitterX, BsThreads } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { motion } from "framer-motion";
import anime from 'animejs';

const SocialIcon = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => {
  const iconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;

    el.addEventListener('mouseenter', () => {
      anime({
        targets: el,
        translateY: -5,
        duration: 300,
        easing: 'easeOutCubic'
      });
    });

    el.addEventListener('mouseleave', () => {
      anime({
        targets: el,
        translateY: 0,
        duration: 300,
        easing: 'easeOutCubic'
      });
    });
  }, []);

  return (
    <a 
      ref={iconRef}
      href={href}
      className="relative p-2 text-gray-400 hover:text-red-500 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      data-clickable="true"
    >
      <Icon className="w-6 h-6" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm bg-black/90 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </a>
  );
};

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);


  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    el.addEventListener('mouseenter', () => {
      anime({
        targets: el,
        translateX: [0, 5],
        color: ['#9CA3AF', '#FFFFFF'],
        duration: 300,
        easing: 'easeOutCubic'
      });
    });

    el.addEventListener('mouseleave', () => {
      anime({
        targets: el,
        translateX: [5, 0],
        color: ['#FFFFFF', '#9CA3AF'],
        duration: 300,
        easing: 'easeOutCubic'
      });
    });
  }, []);

  return (
    <Link 
      ref={linkRef}
      to={to} 
      className="text-gray-400 block py-1 hover:text-white transition-colors"
      data-clickable="true"
    >
      {children}
    </Link>
  );
};

const MobileDropdown = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!dropdownRef.current || !contentRef.current) return;
    
    if (!isOpen) {
      // First make content visible to measure its height
      contentRef.current.style.display = 'block';
      const contentHeight = contentRef.current.scrollHeight;
      
      // Reset height before animating
      dropdownRef.current.style.height = '0px';
      
      // Force reflow
      void dropdownRef.current.offsetHeight;
      
      // Animate to full height
      anime({
        targets: dropdownRef.current,
        height: contentHeight,
        opacity: 1,
        duration: 300,
        easing: 'easeOutCubic'
      });
    } else {
      // Animate to closed
      anime({
        targets: dropdownRef.current,
        height: 0,
        opacity: 0,
        duration: 300,
        easing: 'easeOutCubic',
        complete: () => {
          if (contentRef.current) {
            contentRef.current.style.display = 'none';
          }
        }
      });
    }
    
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border-b border-gray-800">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full py-3 text-gray-300 hover:text-white focus:outline-none"
      >
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        ref={dropdownRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={contentRef} className="pb-4 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);
  const getCastedButtonRef = useRef<HTMLAnchorElement>(null);
   const hasAnimated = useRef(false);


useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            anime({
              targets: entry.target.querySelectorAll('.footer-section'),
              translateY: [50, 0],
              opacity: [0, 1],
              delay: anime.stagger(100),
              duration: 800,
              easing: 'easeOutExpo'
            });

            // Disconnect observer after first animation
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Button animations
    const buttons = [
      contactButtonRef.current,
      getCastedButtonRef.current
    ].filter(Boolean);

    buttons.forEach(button => {
      if (button) {
        button.addEventListener('mouseenter', () => {
          anime({
            targets: button,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutCubic'
          });
        });

        button.addEventListener('mouseleave', () => {
          anime({
            targets: button,
            scale: 1,
            duration: 300,
            easing: 'easeOutCubic'
          });
        });
      }
    });

    return () => {
      // Cleanup button event listeners
      buttons.forEach(button => {
        if (button) {
          button.removeEventListener('mouseenter', () => {});
          button.removeEventListener('mouseleave', () => {});
        }
      }); 
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-16">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="footer-section space-y-4">
            <Link to="/" className="flex items-center space-x-2 group" data-clickable="true">
              <div className="w-[4.5rem] h-[4.5rem]">
                <img src="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745764899/FILMS_3_iblzzr.png" alt="UH Films Logo" className="w-full h-full" />
              </div>
              <span className="text-2xl font-bold text-white">UH FILM'S</span>
            </Link>
            <p className="text-white">Urban tales | Cinematic trails</p>
<Link
  to="/projects#get-casted"
  ref={getCastedButtonRef}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '9999px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(250, 126, 30, 0.4)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  }}
>
  <span
    style={{
      display: 'inline-block',
      width: '20px',
      height: '20px',
      background: 'linear-gradient(135deg, #fa7e1e, #d62976, #962fbf, #feda75)',
      WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' fill=\'white\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\'/%3E%3C/svg%3E")',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',

      WebkitMaskPosition: 'center',
      animation: 'spin 6s linear infinite',
    }}
  />
  <span style={{ lineHeight: '1' , whiteSpace: 'nowrap',}}>Get Casted</span>

  <style>
    {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
  </style>
</Link>


          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold text-white mb-4" style={{   whiteSpace: 'nowrap',}}>Quick Links</h3>
            <nav className="space-y-2">
              <FooterLink to="/team">Team</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <nav className="space-y-2">
              <FooterLink to="/articles">Articles</FooterLink>
              <FooterLink to="/courses">Courses</FooterLink>
              <FooterLink to="/projects">Projects</FooterLink>
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <nav className="space-y-2">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-4">
              <a href="mailto:operations@uhfilms.in" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors" data-clickable="true">
                <Mail className="w-5 h-5 text-red-500" />
                <span>operations@uhfilms.in</span>
              </a>
              <a href="tel:+918920476445" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors" data-clickable="true">
                <Phone className="w-5 h-5 text-red-500" />
                <span>+91 8920476445</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Delhi, INDIA</span>
              </div>


              
<div
  className="inline-flex items-center gap-4 mt-4 px-6 py-2 rounded-full shadow-lg backdrop-blur-md border border-red-600 cursor-pointer select-none overflow-x-auto no-scrollbar" 
  style={{
    background: `linear-gradient(
      135deg,
      rgba(255, 0, 0, 0.15),
      rgba(255, 0, 0, 0.05)
    )`,
    boxShadow: '0 8px 32px 0 rgba(255, 0, 0, 0.2)',
    WebkitBackdropFilter: 'blur(12px)',
    backdropFilter: 'blur(12px)',
    borderColor: 'rgba(255, 0, 0, 0.6)',
    whiteSpace: 'nowrap',
  }}
>
  <Link
    to="/contact"
    className="text-white font-semibold transition-colors duration-300 hover:text-red-300 flex-shrink-0"
  >
    Contact Us
  </Link>

  <span className="text-white/70 select-none flex-shrink-0">|</span>

  <Link
    to="/faq"
    className="text-white font-semibold transition-colors duration-300 hover:text-red-300 flex-shrink-0"
  >
    FAQ
  </Link>
</div>

            </div> 
          </div>

<div className="col-span-5 pt-4 mt-4 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
<motion.div
  className="flex justify-center items-center text-base md:text-lg font-semibold px-10 py-3 rounded-3xl text-white select-none relative overflow-hidden"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  style={{
    background: 'rgba(30, 30, 30, 0.25)',
    backdropFilter: 'blur(14px) saturate(180%)',
    WebkitBackdropFilter: 'blur(14px) saturate(180%)',

 
  }}
>
  {/* Glowing red pulse circle inside the glass box */}
  <motion.span
    aria-hidden="true"
    style={{
      position: 'absolute',
      top: '50%',
      left: '40%',
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 77, 77, 0.5)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      filter: 'blur(18px)',
      zIndex: 0,
    }}
    animate={{ scale: [1, 2.5,1], opacity: [0.4, 1, 0.4] }}
    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
  />

  {/* Content on top */}
  <motion.span
    style={{ display: 'inline-block', marginRight: 10, position: 'relative', zIndex: 1 }}
    animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
  >
    <Copyright
      size={24}
      style={{
        color: '#ff4d4d',
        textShadow: '0 0 8px rgba(255, 77, 77, 0.8)',
      }}
    />
  </motion.span>

  <span style={{ position: 'relative', zIndex: 1 }}>
    2025 UH Films. All rights reserved.
  </span>
</motion.div>








  {/* Socials */}
  <div className="flex items-center justify-center gap-5">
    {/* Logo */}
    <motion.a
      href="https://bishan-portfolio.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Bishan Portfolio"
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'inline-block' }}
    >
      <motion.img
        src="https://raw.githubusercontent.com/dxillon/portfolio/main/portfolio/src/png/vi/android-chrome-512x512.png"
        alt="Bishan Portfolio"
        className="w-9 h-9 object-contain"
      />
    </motion.a>

    {/* Social Icons */}
    <motion.a
      href="https://x.com/urbanhustlefilm"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      whileHover={{ scale: 1.2, color: '#f00' }}
      transition={{ duration: 0.3 }}
      style={{ fontSize: '1.5rem', color: 'white' }}
    >
      <BsTwitterX />
    </motion.a>

    <motion.a
      href="https://www.linkedin.com/company/urbanhustlefilms/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      whileHover={{ scale: 1.2, color: '#0077B5' }}
      transition={{ duration: 0.3 }}
      style={{ fontSize: '1.5rem', color: 'white' }}
    >
      <FaLinkedinIn />
    </motion.a>

    <motion.a
      href="https://www.instagram.com/urbanhustlefilms"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      whileHover={{ scale: 1.2, color: '#D62976' }}
      transition={{ duration: 0.3 }}
      style={{ fontSize: '1.5rem', color: 'white' }}
    >
      <Instagram />
    </motion.a>

    <motion.a
      href="https://www.threads.net/@urbanhustlefilms"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Threads"
      whileHover={{ scale: 1.2, color: '#f00' }}
      transition={{ duration: 0.3 }}
      style={{ fontSize: '1.5rem', color: 'white' }}
    >
      <BsThreads />
    </motion.a>

    <motion.a
      href="https://www.facebook.com/people/Urban-Hustle-Films/61573424103083"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      whileHover={{ scale: 1.2, color: '#0077B5' }}
      transition={{ duration: 0.3 }}
      style={{ fontSize: '1.5rem', color: 'white' }}
    >
      <Facebook />
    </motion.a>

    <motion.a
      href="https://www.youtube.com/@urbanhustlefilms"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      whileHover={{ scale: 1.2, color: '#f00' }}
      transition={{ duration: 0.3 }}
      style={{ fontSize: '1.5rem', color: 'white' }}
    >
      <Youtube />
    </motion.a>
  </div>
</div>
        </div> 

 {/* Mobile Layout */}
<div className="md:hidden space-y-8 px-4">
  <div className="flex flex-col items-center space-y-4">
    <Link to="/" className="flex items-center space-x-3" data-clickable="true">
      <div className="w-16 h-16">
        <img
          src="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745764899/FILMS_3_iblzzr.png"
          alt="UH Films Logo"
          className="w-full h-full"
        />
      </div>
      <span className="text-2xl font-extrabold text-white tracking-wide">UH FILM'S</span>
    </Link>
    <p className="text-white text-center text-sm italic tracking-wide opacity-80">
      Urban tales | Cinematic trails
    </p>

    <div className="flex gap-4 w-full justify-center px-4">
<Link
  to="/projects#get-casted"
  ref={getCastedButtonRef}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    borderRadius: '9999px',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.boxShadow = '0 6px 16px rgba(250, 126, 30, 0.4)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  }}
>
  <span
    style={{
      display: 'inline-block',
      width: '20px',
      height: '20px',
      background: 'linear-gradient(135deg, #fa7e1e, #d62976, #962fbf, #feda75)',
      WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 24 24\' fill=\'white\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\'/%3E%3C/svg%3E")',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      WebkitMaskPosition: 'center',
      animation: 'spin 6s linear infinite',
    }}
  />
  <span style={{ lineHeight: '1' }}>Get Casted</span>

  <style>
    {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
  </style>
</Link>

      <Link
        to="/contact"
        ref={contactButtonRef}
        className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm whitespace-nowrap w-fit"
      >
        Contact Us
      </Link>
    </div>
  </div>

  <div className="flex justify-center">
    <div className="flex flex-wrap items-center justify-center gap-3">
      <SocialIcon icon={BsTwitterX} href="https://x.com/urbanhustlefilm" label="Twitter" />
      <SocialIcon icon={FaLinkedinIn} href="https://www.linkedin.com/company/urbanhustlefilms/" label="LinkedIn" />
      <SocialIcon icon={Instagram} href="https://www.instagram.com/urbanhustlefilms" label="Instagram" />
      <SocialIcon icon={BsThreads} href="https://www.threads.net/@urbanhustlefilms" label="Threads" />
      <SocialIcon icon={Facebook} href="https://www.facebook.com/people/Urban-Hustle-Films/61573424103083" label="Facebook" />
      <SocialIcon icon={Youtube} href="https://www.youtube.com/@urbanhustlefilms" label="YouTube" />
    </div>
  </div>

  <div className="space-y-4">
    <MobileDropdown title="Quick Links">
      <FooterLink to="/team">Team</FooterLink>
      <FooterLink to="/about">About</FooterLink>
      <FooterLink to="/careers">Careers</FooterLink>
    </MobileDropdown>

    <MobileDropdown title="Resources">
      <FooterLink to="/articles">Articles</FooterLink>
      <FooterLink to="/courses">Courses</FooterLink>
      <FooterLink to="/projects">Projects</FooterLink>
    </MobileDropdown>

    <MobileDropdown title="Legal">
      <FooterLink to="/privacy">Privacy Policy</FooterLink>
      <FooterLink to="/cookies">Cookie Policy</FooterLink>
      <FooterLink to="/terms">Terms & Conditions</FooterLink>
    </MobileDropdown>
  </div>

  
<div className="mt-8 flex justify-center">
  <div className="text-gray-300 text-base md:text-lg flex items-center gap-3 select-none">
    <span className="font-semibold">Have questions?</span>
    <Link
      to="/faq"
      className="font-semibold text-red-500 border-b-2 border-transparent hover:border-red-500 transition-all duration-300"
    >
      FAQ
    </Link>
  </div>
</div>

  
  <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">

  <motion.div
  className="flex justify-center items-center text-base md:text-lg font-medium px-6"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.5 }}
  style={{
    color: '#d1d5db',
    background: 'linear-gradient(90deg, #6c5ce7, #636e72)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'black',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
  }}
>
  <motion.span
    style={{ display: 'inline-block', marginRight: 6 }}
    animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
  >
   <Copyright
  size={22}
  style={{
    color: '#8B0000', // Deep red for high contrast
    textShadow: '0 0 4px rgba(255, 0, 0, 0.6), 0 0 8px rgba(0, 0, 0, 0.4)',
  }}
/>
  </motion.span>
  2025 UH Films. All rights reserved.
</motion.div>

            
            <div className="hidden md:flex items-center justify-center gap-5">
              <a
                href="https://bishan-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Bishan Portfolio"
              >
                <img
                  src="https://raw.githubusercontent.com/dxillon/portfolio/main/portfolio/src/png/vi/android-chrome-512x512.png"
                  alt="Bishan Portfolio"
                  className="w-9 h-9 object-contain hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 