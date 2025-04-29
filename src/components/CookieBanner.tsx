import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookiesAccepted');
    if (!hasAccepted) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-4 right-4 max-w-sm"
    >
      <div className="bg-black/90 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-gray-800">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-semibold text-white">Cookie Settings</h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
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