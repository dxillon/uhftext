import React, { useRef, useEffect } from 'react';
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

  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    
    autoScrollInterval.current = setInterval(() => {
      if (scrollContainerRef.current && !isDragging.current) {
        const container = scrollContainerRef.current;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;
        
        if (isAtEnd) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 320;
        }
      }
    }, autoScrollDelay);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [autoScrollDelay]);

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
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    startAutoScroll();
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      startAutoScroll();
    }
  };

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
          {articles.map((article) => (
            <div key={article.id} className="min-w-[280px] md:min-w-[320px] snap-start">
              <ArticleCard article={article} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleSlider;