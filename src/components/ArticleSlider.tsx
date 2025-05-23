import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const itemWidth = 320; // Width of each article card

  // Memoized article cards for performance
  const memoizedArticleCards = React.useMemo(() => {
    return articles.map((article) => (
      <div 
        key={article.id} 
        className="article-slider__item"
      >
        <ArticleCard article={article} compact />
      </div>
    ));
  }, [articles]);

  // Smooth scroll to specific position
  const smoothScrollTo = useCallback((target: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const start = container.scrollLeft;
    const distance = target - start;
    const duration = Math.min(800, Math.max(300, Math.abs(distance) * 0.8));
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      container.scrollLeft = start + distance * easedProgress;
      
      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  // Scroll one item in direction
  const scrollOneItem = useCallback((direction: 'left' | 'right' | 'reset') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const currentScroll = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const maxScroll = container.scrollWidth - containerWidth;
    
    let target: number;
    
    if (direction === 'reset') {
      target = 0;
    } else if (direction === 'left') {
      target = Math.max(0, currentScroll - itemWidth);
    } else {
      target = currentScroll + itemWidth > maxScroll - 10 ? 
               0 : 
               currentScroll + itemWidth;
    }

    smoothScrollTo(target);
  }, [smoothScrollTo]);

  // Auto-scroll handler
  const startAutoScroll = useCallback(() => {
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
    }

    const scrollNext = () => {
      if (!isDragging.current && !isHovered) {
        scrollOneItem('right');
      }
      autoScrollTimeout.current = setTimeout(scrollNext, autoScrollDelay);
    };

    autoScrollTimeout.current = setTimeout(scrollNext, autoScrollDelay);
  }, [autoScrollDelay, isHovered, scrollOneItem]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.clientX;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handlePointerUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      startAutoScroll();
    }
  };

  // Initialize and clean up
  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollTimeout.current) clearTimeout(autoScrollTimeout.current);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [startAutoScroll]);

  return (
    <section className="article-slider">
      <div className="article-slider__header">
        <h2 className="article-slider__title">{title}</h2>
        <div className="article-slider__controls">
          <button 
            onClick={() => scrollOneItem('left')}
            className="article-slider__control"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scrollOneItem('right')}
            className="article-slider__control"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
          <Link 
            to="/articles" 
            className="article-slider__view-all"
          >
            View All
          </Link>
        </div>
      </div>
      
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

      <style jsx>{`
        .article-slider {
          padding: 3rem 1rem;
          background: #000;
          color: white;
        }
        
        .article-slider__header {
          max-width: 1200px;
          margin: 0 auto 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .article-slider__title {
          font-size: 1.75rem;
          font-weight: bold;
          font-family: serif;
        }
        
        .article-slider__controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .article-slider__control {
          padding: 0.5rem;
          border-radius: 50%;
          background: #333;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .article-slider__control:hover {
          background: #444;
        }
        
        .article-slider__view-all {
          font-size: 0.875rem;
          font-weight: 500;
          color: #f00;
          transition: color 0.2s;
        }
        
        .article-slider__view-all:hover {
          color: #f44;
        }
        
        .article-slider__container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding-bottom: 1.5rem;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          cursor: grab;
        }
        
        .article-slider__container:active {
          cursor: grabbing;
        }
        
        .article-slider__item {
          flex: 0 0 300px;
          scroll-snap-align: start;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }
        
        /* Hide scrollbar */
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
