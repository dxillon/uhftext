import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Category, SubCategory } from '../types/article';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import { ChevronLeft, ChevronRight, Film, Star, Clapperboard, Popcorn } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';

// Performance constants
const INITIAL_ARTICLES = 9;
const LOAD_MORE_COUNT = 6;
const MAX_ARTICLES_BEFORE_PAGINATION = 30;

const ArticlesPage: React.FC = () => {
  const articlesSectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ARTICLES);
  const [isMobile, setIsMobile] = useState(false);
  const [usePagination, setUsePagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Animated gradient positions
  const [gradientPositions, setGradientPositions] = useState({
    pos1: { x: 0, y: 0 },
    pos2: { x: 50, y: 50 },
    pos3: { x: 25, y: 75 }
  });

  // Update gradient positions for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPositions({
        pos1: {
          x: Math.sin(Date.now() / 3000) * 20,
          y: Math.cos(Date.now() / 4000) * 20
        },
        pos2: {
          x: 50 + Math.sin(Date.now() / 5000) * 30,
          y: 50 + Math.cos(Date.now() / 6000) * 30
        },
        pos3: {
          x: 25 + Math.sin(Date.now() / 7000) * 15,
          y: 75 + Math.cos(Date.now() / 8000) * 15
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const smoothEaseOut = (t: number) => {
    return 1 - Math.pow(1 - t, 3);
  };
  
  // Memoized filtered articles
  const filteredArticles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term);
      
      const matchesCategory = !activeCategory || article.category === activeCategory;
      const matchesSubCategory = !activeSubCategory || article.subCategory === activeSubCategory;
      
      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [searchTerm, activeCategory, activeSubCategory]);

  // Determine if we should use pagination
  useEffect(() => {
    setUsePagination(filteredArticles.length > MAX_ARTICLES_BEFORE_PAGINATION);
    setCurrentPage(1);
  }, [filteredArticles.length]);

  // Calculate visible articles based on mode
  const visibleArticles = useMemo(() => {
    if (usePagination) {
      const startIdx = (currentPage - 1) * INITIAL_ARTICLES;
      const endIdx = startIdx + INITIAL_ARTICLES;
      return filteredArticles.slice(startIdx, endIdx);
    }
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, usePagination, currentPage, visibleCount]);

  // Categories data
  const { categories, categorySubMap } = useMemo(() => {
    const uniqueCategories = new Set<Category>();
    const map: Record<Category, SubCategory[]> = {} as Record<Category, SubCategory[]>;
    
    articles.forEach(article => {
      uniqueCategories.add(article.category);
      if (!map[article.category]) {
        map[article.category] = [];
      }
      if (article.subCategory && !map[article.category].includes(article.subCategory)) {
        map[article.category].push(article.subCategory);
      }
    });
    
    return {
      categories: Array.from(uniqueCategories),
      categorySubMap: map
    };
  }, []);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset when filters change
  const resetView = useCallback(() => {
    setVisibleCount(INITIAL_ARTICLES);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    resetView();
  }, [searchTerm, activeCategory, activeSubCategory, resetView]);

  // Animation variants
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredArticles.length));
  }, [filteredArticles.length]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredArticles.length / INITIAL_ARTICLES);
  }, [filteredArticles.length]);

  const handleCategoryClick = (category: Category | null) => {
    setActiveCategory(category);
    setActiveSubCategory(null);
  };

  // Featured categories with icons
  const featuredCategories = [
    { name: 'All', value: null, icon: <Film className="w-4 h-4" /> },
    { name: 'Trending', value: 'trending', icon: <Star className="w-4 h-4" /> },
    { name: 'Bollywood', value: 'bollywood', icon: <Clapperboard className="w-4 h-4" /> },
    { name: 'Hollywood', value: 'hollywood', icon: <Popcorn className="w-4 h-4" /> },
    { name: 'International', value: 'international', icon: <Film className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (!usePagination || !articlesSectionRef.current) return;

    const element = articlesSectionRef.current;
    const headerHeight = 100;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    if (Math.abs(distance) < 50) return;

    const duration = Math.min(800, Math.max(400, Math.abs(distance) * 0.5));
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = smoothEaseOut(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    const animationFrame = requestAnimationFrame((time) => {
      setTimeout(() => requestAnimationFrame(animateScroll), 50);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [currentPage, usePagination]);

  return (


 <>
      <Helmet>
        <title>Articles & Insights | Urban Hustle Films™</title>
        <meta name="description" content="Read thought-provoking articles and behind-the-scenes stories from Urban Hustle Films™. Explore creative insights, industry tips, and our cinematic journey." />
        <meta name="keywords" content="Urban Hustle Films, UHF articles, film blog, indie filmmaking, Bishanpreet Singh, UHF stories, film production insights" />
        <meta property="og:title" content="Articles & Insights | Urban Hustle Films™" />
        <meta property="og:description" content="Explore stories, lessons, and creative insights from the Urban Hustle Films team and founder Bishanpreet Singh." />
        <meta property="og:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />
        <meta property="og:url" content="https://uhfilms.in/articles" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

    
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute opacity-20"
          style={{
            top: `${gradientPositions.pos1.y}%`,
            left: `${gradientPositions.pos1.x}%`,
            width: '80vw',
            height: '80vh',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(0,0,0,0) 70%)',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.5s ease-out',
            zIndex: 0
          }}
        />
        <div 
          className="absolute opacity-15"
          style={{
            top: `${gradientPositions.pos2.y}%`,
            left: `${gradientPositions.pos2.x}%`,
            width: '60vw',
            height: '60vh',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(0,0,0,0) 70%)',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.7s ease-out',
            zIndex: 0
          }}
        />
        <div 
          className="absolute opacity-10"
          style={{
            top: `${gradientPositions.pos3.y}%`,
            left: `${gradientPositions.pos3.x}%`,
            width: '40vw',
            height: '40vh',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(0,0,0,0) 70%)',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.9s ease-out',
            zIndex: 0
          }}
        />
      </div>

      {/* Hero Section */}
<section 
  ref={heroRef}
  className="relative pt-32 md:pt-48 pb-16 md:pb-24 text-white overflow-hidden"
>
  {/* Cinematic gradient background */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Slow-moving gradient backdrop */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 opacity-80">
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-blue-500/10 opacity-30"
        style={{
          animation: 'pan 30s linear infinite alternate',
          backgroundSize: '200% 200%'
        }}
      />
    </div>

    {/* Film grain texture - more subtle */}
    <div 
      className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjAyIiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMiIvPgo8L3N2Zz4=')] opacity-5 pointer-events-none"
      style={{ animation: 'flicker 8s infinite alternate' }}
    />

    {/* Floating film elements - slower and fewer */}
    {[...Array(5)].map((_, i) => {
      const randomSize = Math.random() * 80 + 40;
      return (
        <div 
          key={i}
          className="absolute border border-white/5 rounded-sm backdrop-blur-[1px]"
          style={{
            width: `${randomSize}px`,
            height: `${randomSize * 1.618}px`, // Golden ratio
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 15 - 7.5}deg)`,
            opacity: 0.1 + Math.random() * 0.1,
            animation: `float ${30 + Math.random() * 30}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 10}s`
          }}
        />
      );
    })}
  </div>

  {/* Content */}
  <motion.div 
    className="container mx-auto px-4 relative z-10"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.3
        }
      }
    }}
  >
    <div className="max-w-4xl">
      <motion.div 
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-full border border-white/10 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] // Smooth ease-out
          }
        }}
      >
        <Film className="w-4 h-4 text-red-300" />
        <span className="text-sm font-medium text-red-200/90">Film Industry Insights</span>
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2
          }
        }}
      >
        <span 
          className="text-transparent bg-clip-text bg-[linear-gradient(45deg,_#f43f5e,_#ec4899,_#a855f7,_#6366f1)] bg-[length:300%_300%]"
          style={{ animation: 'gradient 12s ease infinite' }}
        >
          Cinematic Universe
        </span> Awaits
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4
          }
        }}
      >
        Explore our <span className="text-white font-medium">curated collection</span> of articles covering everything from <span className="text-red-300">behind-the-scenes magic</span> to <span className="text-purple-300">industry trends</span> and <span className="text-blue-300">analysis</span>.
      </motion.p>
      
      <motion.div
        className="w-full max-w-md relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6
          }
        }}
      >
        <SearchBar onSearch={setSearchTerm} />
        <motion.div 
          className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: 1,
            transition: {
              delay: 1,
              duration: 1,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        />
      </motion.div>
    </div>
  </motion.div>

  {/* Animation styles */}
  <style jsx global>{`
    @keyframes pan {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 100%; }
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-30px) rotate(1deg); }
    }
    
    @keyframes flicker {
      0%, 100% { opacity: 0.02; }
      50% { opacity: 0.05; }
    }
  `}</style>
</section>
      
      {/* Articles Section */}
      <section ref={articlesSectionRef} className="relative py-12 md:py-16 bg-gradient-to-b from-gray-900/0 via-gray-900/30 to-gray-900">
        <div className="container mx-auto px-4 relative z-10">
          {/* Filter Section */}
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-10 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3">
              {/* Quick access categories */}
              <div className="flex flex-wrap gap-2">
                {featuredCategories.map((category) => (
                  <motion.button
                    key={category.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCategoryClick(category.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.value
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700/50'
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </motion.button>
                ))}
              </div>
              
              <CategoryFilter 
                categories={categories}
                subCategories={activeCategory ? categorySubMap[activeCategory] : []}
                activeCategory={activeCategory}
                activeSubCategory={activeSubCategory}
                onSelectCategory={(cat) => {
                  setActiveCategory(cat);
                  setActiveSubCategory(null);
                }}
                onSelectSubCategory={setActiveSubCategory}
              />
            </div>
          </motion.div>
          
          {/* Articles Grid/List */}
          {visibleArticles.length > 0 ? (
            <>
              <motion.div
                className={isMobile ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {visibleArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={itemVariants}
                      layout="position"
                      whileHover={{ y: -5 }}
                    >
                      <ArticleCard 
                        article={article} 
                        variant={isMobile ? "list" : "card"}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination/Load More Controls */}
              <motion.div 
                className="flex justify-center mt-12 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {usePagination ? (
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-full transition-all duration-200 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5 text-white hover:text-red-400 transition-colors" />
                    </button>

                    <span className="px-4 text-sm font-semibold text-white tracking-wider">
                      Page {currentPage} <span className="opacity-40">of</span> {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-full transition-all duration-200 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5 text-white hover:text-red-400 transition-colors" />
                    </button>
                  </div>
                ) : (
                  visibleCount < filteredArticles.length && (
                    <button
                      onClick={handleLoadMore}
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-full transition-all shadow-lg hover:shadow-xl"
                    >
                      Load More Articles
                    </button>
                  )
                )}
              </motion.div>
            </>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block p-4 mb-6 rounded-full bg-gray-800/50 border border-gray-700/30">
                <Film className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">No articles found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Try adjusting your search terms or category filters to find what you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
</>
  );
};

export default ArticlesPage;