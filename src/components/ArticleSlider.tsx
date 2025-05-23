import React, { useRef, useEffect, useCallback } from 'react';
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
  const autoScrollInterval = useRef<NodeJS.Timeout>();
  const animationFrameId = useRef<number>();
  const lastScrollTime = useRef(0);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < 100) return; // Throttle to 10fps
    
    lastScrollTime.current = now;
    // Any scroll-related calculations can go here
  }, []);

  // Memoized article cards to prevent unnecessary re-renders
  const memoizedArticleCards = React.useMemo(() => {
    return articles.map((article) => (
      <div key={article.id} className="min-w-[280px] md:min-w-[320px] snap-start">
        <ArticleCard article={article} compact />
      </div>
    ));
  }, [articles]);

  const startAutoScroll = useCallback(() => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    autoScrollInterval.current = setInterval(() => {
      if (scrollContainerRef.current && !isDragging.current) {
        const container = scrollContainerRef.current;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10; // 10px buffer
        
        if (isAtEnd) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: 320,
            behavior: 'smooth'
          });
        }
      }
    }, autoScrollDelay);
  }, [autoScrollDelay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Initialize auto-scroll when component mounts or articles change
  useEffect(() => {
    startAutoScroll();
  }, [startAutoScroll, articles]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
    
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      if (!scrollContainerRef.current || !isDragging.current) return;
      
      const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
      const walk = (x - startX.current) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
      handleScroll();
    });
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      startAutoScroll();
    }
  };

  const handleMouseLeave = handleMouseUp;

  const scrollToDirection = useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = direction === 'left' ? -320 : 320;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 bg-black text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">{title}</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => scrollToDirection('left')}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scrollToDirection('right')}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
            <Link 
              to="/articles" 
              className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors duration-200"
            >
              View All
            </Link>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide scroll-smooth snap-x cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {memoizedArticleCards}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ArticleSlider);