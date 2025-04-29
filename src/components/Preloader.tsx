import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';

const Preloader = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    if (videoRef.current) {
      videoRef.current.playbackRate = 1.8;
    }

    return () => {
      // Restore scroll after unmount
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative w-[880px] mx-auto">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dbtj6orw2/video/upload/v1745685398/unyzy7z0deaokc9mpq1m.mp4"
          autoPlay
          muted
          playsInline
          className="w-full"
        />
      </div>
    </motion.div>
  );
};

export default Preloader