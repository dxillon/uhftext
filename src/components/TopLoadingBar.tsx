// TopLoadingBar.tsx
import { useLoading } from './LoadingContext';
import React, { useState, useEffect } from 'react';

const TopLoadingBar = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(30);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timer = setTimeout(() => setProgress(0), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div
        className="h-full transition-all duration-300 ease-out bg-[linear-gradient(to_right,#f97316,#dc2626,#facc15,#000000)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TopLoadingBar;