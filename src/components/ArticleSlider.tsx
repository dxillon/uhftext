import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ChevronLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '../types/article';
import ArticleCard from './ArticleCard';
import { Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';

interface ArticleSliderProps {
  articles: Article[];
  title: string;
  autoScrollDelay?: number;
  featuredOnly?: boolean;
}

const ArticleSlider: React.FC<ArticleSliderProps> = ({
  articles,
  title,
  autoScrollDelay = 5000,
  featuredOnly = false
}) => {

  const filteredArticles = featuredOnly
    ? articles.filter(article => article.featured)
    : articles;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const autoScrollTimeout = useRef<NodeJS.Timeout>();
  const animationFrameId = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);

  // Responsive configuration
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');

  const itemWidth = isMobile ? 240 : isTablet ? 260 : 280;
  const gapSize = isMobile ? 12 : 20;
  const visibleItems = isMobile ? 1 : isTablet ? 2 : 4;
  const peekAmount = isMobile ? 20 : isTablet ? 40 : 60;
  const containerWidth = isMobile ? '100%' :
    `${visibleItems * itemWidth + (visibleItems - 1) * gapSize + 2 * peekAmount}px`;

  // Memoized article cards
  const memoizedArticleCards = React.useMemo(() => {
    return filteredArticles.map((article) => (
      <div key={article.id} className="article-slider__item">
        <ArticleCard article={article} compact={!isMobile} />
      </div>
    ));
  }, [filteredArticles, isMobile]);

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
      {/* Shared Header */}
      {!isMobile ? (
        <div className="article-slider__header">
          <motion.h2
            className="article-slider__title "
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
                onClick={() => scrollOneItem("left")}
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
                onClick={() => scrollOneItem("right")}
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
      ) : (
        <div className="mobile-header">
          <h2 className="article-slider__title ">
            {title}
            <span className="title-underline"></span>
          </h2>

          <Link to="/articles" className="mobile-view-all-link">
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover="hover"
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
      )}

      {/* Slider Container */}
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

      {/* Mobile Scroll Buttons */}
      {isMobile && (
        <div className="mobile-scroll-controls">
          <button
            onClick={() => scrollOneItem("left")}
            className="mobile-control-button"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollOneItem("right")}
            className="mobile-control-button"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <style jsx>{`
  .article-slider {
    padding: ${isMobile ? '2rem 1rem' : '4rem 0'};
    color: #333;
    max-width: ${containerWidth};
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    will-change: transform;
    width: 100%;
    box-sizing: border-box;
  }
  
  .article-slider__header {
    margin: 0 auto ${isMobile ? '1.5rem' : '3rem'};
    padding: 0 ${isMobile ? '0' : `${peekAmount}px`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${isMobile ? '1rem' : '0'};
    width: 100%;
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
    font-size: 1.75rem;
    font-weight: 700;
    font-family: 'Playfair Display', serif;
    color: #fff;
    position: relative;
    padding-bottom: 10px;
    margin: 0;
    display: inline-block;
  }

  .article-slider__title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, #ff4d4f, transparent);
    transform: scaleX(1);
    transform-origin: left;
  }
  
  .article-slider__wrapper {
    position: relative;
    overflow: hidden;
    will-change: transform;
    width: 100%;
  }
  
  .article-slider__container {
    display: flex;
    gap: ${gapSize}px;
    padding: ${isMobile ? '0 1rem 1rem' : `0 ${peekAmount}px 2rem`};
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    cursor: grab;
    will-change: transform;
    scroll-padding: 0 ${isMobile ? '1rem' : `${peekAmount}px`};
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
    scroll-snap-align: start;
    margin-left: 0;
    transform: ${isMobile ? 'none' : 'scale(0.95)'};
    opacity: ${isMobile ? 1 : 0.9};
  }
  
  .article-slider__item:last-child {
    scroll-snap-align: end;
    margin-right: 0;
    transform: ${isMobile ? 'none' : 'scale(0.95)'};
    opacity: ${isMobile ? 1 : 0.9};
  }
  
  .article-slider__container::-webkit-scrollbar {
    display: none;
  }
  
  .article-slider__container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Mobile controls */
  .mobile-scroll-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
    padding: 0 1rem;
  }

  .mobile-control-button {
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }

  .mobile-control-button:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.2);
  }

  .mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    margin-bottom: 1.5rem;
    width: 100%;
  }

  .mobile-view-all-link {
    background: rgba(255, 255, 255, 0.15);
    padding: 6px 12px;
    font-size: 0.9rem;
    font-weight: 800;
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s, color 0.3s;
  }

  .mobile-view-all-link:hover {
    background: rgba(255, 255, 255, 0.25);
    color: #ff4d4f;
  }

  .view-all-link {
    font-size: 1rem;
    font-weight: 600;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.3s, color 0.3s;
  }

  .view-all-link:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ff4d4f;
  }

  @media (max-width: 600px) {
    .article-slider__title {
      font-size: 1.5rem;
    }
    .article-slider {
      padding: 2rem 1rem;
    }
  }
`}</style>
    </section>
  );
};

export default React.memo(ArticleSlider);