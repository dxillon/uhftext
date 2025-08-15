import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if cookies were accepted
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    // Set expiration date 1 year from now
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    
    // Store acceptance with expiration
    localStorage.setItem('cookiesAccepted', 'true');
    document.cookie = `cookiesAccepted=true; expires=${expirationDate.toUTCString()}; path=/`;
    
    setIsVisible(false);
  };

  const rejectCookies = () => {
    // Set a short-lived cookie (30 days) to remember rejection
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    
    document.cookie = `cookiesAccepted=false; expires=${expirationDate.toUTCString()}; path=/`;
    setIsVisible(false);
  };

  // Check both localStorage and cookies on initial load
  useEffect(() => {
    const checkCookies = () => {
      // Check cookies first
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});

      if (cookies.cookiesAccepted === 'true') {
        localStorage.setItem('cookiesAccepted', 'true');
        return false;
      } else if (cookies.cookiesAccepted === 'false') {
        return false;
      }

      // Fallback to localStorage
      return localStorage.getItem('cookiesAccepted') !== 'true';
    };

    if (checkCookies()) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-4 right-4 max-w-sm z-50"
    >
      <div className="bg-black/90 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-gray-800">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-semibold text-white">Cookie Settings</h3>
          </div>
          <button
            onClick={rejectCookies}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          <Link to="/cookies" className="text-red-500 hover:text-red-400 ml-1">
            Learn more
          </Link>
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={rejectCookies}
            className="px-3 py-1.5 text-gray-300 text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={acceptCookies}
            className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieBanner;