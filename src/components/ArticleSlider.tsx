import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ChevronLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '../types/article';
import ArticleCard from './ArticleCard';
import { Link } from 'react-router-dom';

interface ArticleSliderProps {
  articles: Article[];
  title: string;
  autoScrollDelay?: number;
}

const ArticleSlider: React.FC<ArticleSliderProps> = ({ 
  articles, 
  title, 
  autoScrollDelay = 5000 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoScrollTimeout = useRef<NodeJS.Timeout>();
  const animationFrameId = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);
  
  // Configuration
  const itemWidth = 280;
  const gapSize = 20;
  const visibleItems = 4;
  const peekAmount = 60;
  const containerWidth = visibleItems * itemWidth + (visibleItems - 1) * gapSize + 2 * peekAmount;

  // Memoized article cards
  const memoizedArticleCards = React.useMemo(() => {
    return articles.map((article) => (
      <div key={article.id} className="article-slider__item">
        <ArticleCard article={article} compact />
      </div>
    ));
  }, [articles]);

  // Smooth scroll to position using CSS transitions
  const smoothScrollTo = useCallback((target: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    
    // Enable CSS transition
    container.style.transition = 'scroll-left 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    container.style.scrollBehavior = 'smooth';
    
    // Set the scroll position
    container.scrollLeft = target;
    
    // Remove transition after scroll completes
    const onScrollEnd = () => {
      container.style.transition = 'none';
      container.style.scrollBehavior = 'auto';
      container.removeEventListener('scroll', onScrollEnd);
    };
    
    container.addEventListener('scroll', onScrollEnd, { passive: true });
    
    // Fallback in case scroll event doesn't fire
    setTimeout(() => {
      container.style.transition = 'none';
      container.style.scrollBehavior = 'auto';
    }, 600);
  }, []);

  // Scroll by one item
  const scrollOneItem = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const currentScroll = container.scrollLeft;
    const scrollAmount = itemWidth + gapSize;
    
    let target = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : currentScroll + scrollAmount;
    
    // Snap to item boundary
    const maxScroll = container.scrollWidth - container.clientWidth;
    target = Math.min(maxScroll, target);
    
    smoothScrollTo(target);
  }, [smoothScrollTo, itemWidth, gapSize]);

  // Auto-scroll handler
  const startAutoScroll = useCallback(() => {
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
    }

    const scrollNext = () => {
      if (!isDragging.current && !isHovered && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 10) {
          // Reset to start with no animation for seamless loop
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = 0;
          setTimeout(() => {
            smoothScrollTo(itemWidth + gapSize);
          }, 50);
        } else {
          scrollOneItem('right');
        }
      }
      autoScrollTimeout.current = setTimeout(scrollNext, autoScrollDelay);
    };

    autoScrollTimeout.current = setTimeout(scrollNext, autoScrollDelay);
  }, [autoScrollDelay, isHovered, scrollOneItem, smoothScrollTo, itemWidth, gapSize]);

  // Drag handlers with momentum scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    
    // Disable smooth scrolling during drag
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'auto';
    }
    
    clearTimeout(autoScrollTimeout.current);
    cancelAnimationFrame(animationFrameId.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    
    const x = e.clientX;
    const walk = (x - startX.current) * 1.5; // Reduced multiplier for smoother drag
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handlePointerUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      
      // Add momentum to the scroll
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const currentScroll = container.scrollLeft;
        const snapPoint = Math.round(currentScroll / (itemWidth + gapSize)) * (itemWidth + gapSize);
        smoothScrollTo(snapPoint);
      }
      
      startAutoScroll();
    }
  };

  // Initialize and clean up
  useEffect(() => {
    startAutoScroll();
    return () => {
      clearTimeout(autoScrollTimeout.current);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [startAutoScroll]);

  return (
    <section className="article-slider">
      <div className="article-slider__header">
        <motion.h2 
          className="article-slider__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
          <span className="title-underline"></span>
        </motion.h2>
        
        <motion.div 
          className="article-slider__controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="controls-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollOneItem('left')}
              className="control-button"
              aria-label="Scroll left"
            >
              <motion.span whileHover={{ color: "#ff4d4f" }} className="icon-wrapper">
                <ChevronLeft size={22} />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollOneItem('right')}
              className="control-button"
              aria-label="Scroll right"
            >
              <motion.span whileHover={{ color: "#ff4d4f" }} className="icon-wrapper">
                <ChevronRight size={22} />
              </motion.span>
            </motion.button>

            <div className="divider" />

            <Link to="/articles" className="view-all-link">
              <motion.div
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                variants={{ hover: { scale: 1.05 } }}
                className="flex items-center gap-2 group"
              >
                <span>View All</span>
                <motion.span
                  variants={{ hover: { x: 6 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group-hover:text-red-500 transition-colors duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
      
      <div className="article-slider__wrapper">
        <div 
          ref={scrollContainerRef}
          className="article-slider__container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {memoizedArticleCards}
        </div>
      </div>

      <style jsx>{`
        .article-slider {
          padding: 4rem 0;
          color: #333;
          max-width: ${containerWidth}px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        
        .article-slider__header {
          margin: 0 auto 3rem;
          padding: 0 ${peekAmount}px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .article-slider__controls {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(14px);
          transition: background 0.3s ease;
          will-change: transform;
        }
        
        .controls-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .control-button {
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          will-change: transform;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: color 0.2s ease;
        }
        
        .divider {
          height: 24px;
          width: 1px;
          background: rgba(255, 255, 255, 0.15);
        }
        
        .view-all-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #fff;
          font-weight: 500;
          font-size: 0.875rem;
          padding: 6px 10px;
          border-radius: 8px;
          transition: color 0.3s, background 0.3s;
        }

        .view-all-link:hover {
          color: #ff4d4f;
        }

        .article-slider__title {
          font-size: 2.25rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #fff;
          position: relative;
          padding-bottom: 8px;
          will-change: transform;
        }
        
        .article-slider__title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #f00, transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        }
        
        .article-slider:hover .article-slider__title::after {
          transform: scaleX(1);
        }
        
        .article-slider__wrapper {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        
        .article-slider__container {
          display: flex;
          gap: ${gapSize}px;
          padding: 0 ${peekAmount}px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          cursor: grab;
          padding-bottom: 2rem;
          margin-bottom: -2rem;
          will-change: transform;
        }
        
        .article-slider__container:active {
          cursor: grabbing;
        }
        
        .article-slider__item {
          flex: 0 0 ${itemWidth}px;
          scroll-snap-align: center;
          transform: translateZ(0);
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          will-change: transform;
        }
        
        .article-slider__item:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        
        .article-slider__item:first-child {
          position: relative;
          margin-left: -${peekAmount}px;
          opacity: 0.8;
          transform: translateX(${peekAmount/2}px) scale(0.95);
        }
        
        .article-slider__item:last-child {
          position: relative;
          margin-right: -${peekAmount}px;
          opacity: 0.8;
          transform: translateX(-${peekAmount/2}px) scale(0.95);
        }
        
        .article-slider__container::-webkit-scrollbar {
          display: none;
        }
        
        .article-slider__container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default React.memo(ArticleSlider);
