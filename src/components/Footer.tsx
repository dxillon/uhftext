import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, X } from 'lucide-react';
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

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll('.footer-section'),
              translateY: [50, 0],
              opacity: [0, 1],
              delay: anime.stagger(100),
              duration: 800,
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Button animation on hover
    const button = contactButtonRef.current;
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

    return () => observer.disconnect();
  }, []);


  return (
    <footer ref={footerRef} className="relative bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="footer-section space-y-4">
            <Link to="/" className="flex items-center space-x-2 group" data-clickable="true">
              <div className="w-[4.5rem] h-[4.5rem]">
                <img src="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745764899/FILMS_3_iblzzr.png" alt="UH Films Logo" className="w-full h-full" />
              </div>
              <span className="text-2xl font-bold text-white">UH FILM'S</span>
            </Link>
            <p className="text-gray-400">Urban tales | Cinematic trails</p>
          </div>

          <div className="footer-section">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/team">Team</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
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
              <Link
                to="/contact"
                ref={contactButtonRef}
                className="inline-block mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-sm transition-all duration-300 font-medium tracking-normal"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              © 2025 UH Films. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5 overflow-hidden ">
              <a
                href="https://bishan-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Bishan Portfolio"
              >
                <img
                  src="https://raw.githubusercontent.com/dxillon/portfolio/main/portfolio/src/png/vi/android-chrome-512x512.png
"
                  alt="Bishan Portfolio"
                  className="w-9 h-9 object-contain hover:scale-110 transition-transform duration-300"
                />
              </a>
              <SocialIcon icon={BsTwitterX} href="https://x.com/urbanhustlefilm" label="Follow us on Twitter" />
              <SocialIcon icon={FaLinkedinIn} href="https://www.linkedin.com/company/urbanhustlefilms/" label="Follow us on LinkedIn" />
              <SocialIcon icon={Instagram} href="https://www.instagram.com/urbanhustlefilms" label="Follow us on Instagram" />
              <SocialIcon icon={BsThreads} href="https://www.threads.net/@urbanhustlefilms" label="Follow us on Twitter" />
              <SocialIcon icon={Facebook} href="https://www.facebook.com/people/Urban-Hustle-Films/61573424103083" label="Follow us on Facebook" />
              <SocialIcon icon={Youtube} href="https://www.youtube.com/@urbanhustlefilms" label="Subscribe on YouTube" />
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;