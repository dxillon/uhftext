import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleVideoEnd = () => {
      document.body.style.overflow = '';
    };

    if (videoRef.current) {
      videoRef.current.playbackRate = 1.8;
      videoRef.current.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative w-[880px] mx-auto">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/djl9xhj22/video/upload/v1750781947/uhfnew_brlugf.mp4"
          autoPlay
          muted
          playsInline
          className="w-full"
          onEnded={() => document.body.style.overflow = ''}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;