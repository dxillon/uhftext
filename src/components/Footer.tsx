import React, { useEffect, useRef, useState } from 'react';
import { Link, } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, X, ChevronDown } from 'lucide-react';
import { BsTwitterX, BsThreads } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
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
          button.removeEventListener('mouseenter', () => { });
          button.removeEventListener('mouseleave', () => { });
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
              className="inline-block mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-sm transition-all duration-300 font-medium tracking-normal"
            >
              Get Casted
            </Link>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
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
        </div>

        {/* Mobile Layout */}
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
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm whitespace-nowrap w-fit"
              >
                Get Casted
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

          <div className="mt-8 flex justify-center md:hidden">
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

            <div className="text-gray-400 text-sm text-center sm:text-left">
              © 2025 UH Films. All rights reserved.
            </div>






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
              <SocialIcon icon={BsTwitterX} href="https://x.com/urbanhustlefilm" label="Follow us on Twitter" />
              <SocialIcon icon={FaLinkedinIn} href="https://www.linkedin.com/company/urbanhustlefilms/" label="Follow us on LinkedIn" />
              <SocialIcon icon={Instagram} href="https://www.instagram.com/urbanhustlefilms" label="Follow us on Instagram" />
              <SocialIcon icon={BsThreads} href="https://www.threads.net/@urbanhustlefilms" label="Follow us on Threads" />
              <SocialIcon icon={Facebook} href="https://www.facebook.com/people/Urban-Hustle-Films/61573424103083" label="Follow us on Facebook" />
              <SocialIcon icon={Youtube} href="https://www.youtube.com/@urbanhustlefilms" label="Subscribe on YouTube" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 