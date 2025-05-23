import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Category, SubCategory } from '../types/article';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { motion, AnimatePresence } from "framer-motion";

// Performance constants
const INITIAL_ARTICLES = 9;
const LOAD_MORE_COUNT = 6;
const MAX_ARTICLES_BEFORE_PAGINATION = 30; // Switch to pagination if more than this

const ArticlesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ARTICLES);
  const [isMobile, setIsMobile] = useState(false);
  const [usePagination, setUsePagination] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
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

  return (
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
      
      <section className="py-8 md:py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar - Reduced animations */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <SearchBar onSearch={setSearchTerm} />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
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
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-white">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
                    >
                      Next
                    </button>
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
  );
};

export default ArticlesPage;