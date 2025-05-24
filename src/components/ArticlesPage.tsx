import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Category, SubCategory } from '../types/article';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import {  ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryFilter from '../components/CategoryFilter';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';

// Performance constants
const INITIAL_ARTICLES = 9;
const LOAD_MORE_COUNT = 6;
const MAX_ARTICLES_BEFORE_PAGINATION = 30; // Switch to pagination if more than this

const ArticlesPage: React.FC = () => {
  const articlesSectionRef = useRef<HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ARTICLES);
  const [isMobile, setIsMobile] = useState(false);
  const [usePagination, setUsePagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const smoothEaseOut = (t: number) => {
    return 1 - Math.pow(1 - t, 3); // Cubic ease-out for smoother deceleration
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

  // Simplified animation variants
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
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

  // Define our featured categories for quick access
  const featuredCategories = [
    { name: 'All Categories', value: null },
    { name: 'Trending', value: 'trending' },
    { name: 'Bollywood', value: 'bollywood' },
    { name: 'Hollywood', value: 'hollywood' },
    { name: 'International', value: 'international' }
  ];

  useEffect(() => {
    if (!usePagination || !articlesSectionRef.current) return;

    const element = articlesSectionRef.current;
    const headerHeight = 100; // Match this to your actual header height
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    // Only animate if we need to scroll more than 50px
    if (Math.abs(distance) < 50) return;

    const duration = Math.min(800, Math.max(400, Math.abs(distance) * 0.5)); // Dynamic duration based on distance
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

    // Start the animation with a slight delay to ensure everything is ready
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

      <div className="min-h-screen bg-gray-900">
        <section className="pt-32 md:pt-48 pb-16 md:pb-20 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
                Film Industry Insights
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                Dive into our collection of articles covering everything from production techniques to industry trends.
              </p>
            </div>
          </div>
        </section>

        <section ref={articlesSectionRef} className="py-8 md:py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            {/* Search and Filter Bar - Reduced animations */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <SearchBar onSearch={setSearchTerm} />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Quick access categories - Featured ones only */}
                <div className="flex flex-wrap gap-2">
                  {featuredCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryClick(category.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === category.value
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                      {category.name}
                    </button>
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
            </div>

            {/* Articles Grid/List */}
            {visibleArticles.length > 0 ? (
              <>
                <motion.div
                  className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"}
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
                <div className="flex justify-center mt-8 gap-4">
                  {usePagination ? (
                    <>
                      <div
                        className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 shadow-lg backdrop-blur-md transition-all"
                        style={{
                          background: `linear-gradient(
      135deg,
      rgba(255, 0, 0, 0.05),
      rgba(255, 255, 255, 0.02)
    )`,
                          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)',
                          WebkitBackdropFilter: 'blur(14px)',
                          backdropFilter: 'blur(14px)',
                        }}
                      >
                        {/* Previous Button */}
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="p-2.5 rounded-full transition-all duration-200 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4 text-white hover:text-red-400 transition-colors duration-200" />
                        </button>

                        {/* Page Text */}
                        <span className="px-3 text-sm font-semibold text-white tracking-wider">
                          {currentPage} <span className="opacity-40">/</span> {totalPages}
                        </span>

                        {/* Next Button */}
                        <button
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="p-2.5 rounded-full transition-all duration-200 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4 text-white hover:text-red-400 transition-colors duration-200" />
                        </button>
                      </div>

                    </>
                  ) : (
                    visibleCount < filteredArticles.length && (
                      <button
                        onClick={handleLoadMore}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
                      >
                        Load More Articles
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium text-white mb-2">No articles found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or category filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ArticlesPage;