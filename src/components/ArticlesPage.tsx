import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Category, SubCategory } from '../types/article';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';

// Performance constants
const INITIAL_ARTICLES = 9;
const LOAD_MORE_COUNT = 6;
const WINDOW_BUFFER = 5; // Extra items to render outside viewport

const ArticlesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ARTICLES);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Memoized filtered articles
  const filteredArticles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.content.toLowerCase().includes(term);
      
      const matchesCategory = !activeCategory || article.category === activeCategory;
      const matchesSubCategory = !activeSubCategory || article.subCategory === activeSubCategory;
      
      return matchesSearch && matchesCategory && matchesSubCategory;
    });
  }, [searchTerm, activeCategory, activeSubCategory]);

  // Virtualization - only render visible articles
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollTop);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportHeight(window.innerHeight);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      handleResize(); // Initialize
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate visible range for virtualization
  const getVisibleRange = useCallback(() => {
    if (isMobile) {
      const itemHeight = 120; // Approximate height of mobile list items
      const startIdx = Math.max(0, Math.floor(scrollPosition / itemHeight) - WINDOW_BUFFER);
      const endIdx = Math.min(
        visibleCount - 1,
        startIdx + Math.ceil(viewportHeight / itemHeight) + WINDOW_BUFFER * 2
      );
      return { startIdx, endIdx };
    }
    return { startIdx: 0, endIdx: visibleCount - 1 };
  }, [scrollPosition, viewportHeight, visibleCount, isMobile]);

  const { startIdx, endIdx } = getVisibleRange();
  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const virtualizedArticles = visibleArticles.slice(startIdx, endIdx + 1);

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

  // Quick access categories
  const quickCategories = useMemo(() => {
    return [...categories]
      .sort((a, b) => 
        articles.filter(article => article.category === b).length -
        articles.filter(article => article.category === a).length
      )
      .slice(0, 6);
  }, [categories]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_ARTICLES);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [searchTerm, activeCategory, activeSubCategory]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredArticles.length));
  }, [filteredArticles.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced stagger for better performance
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 }, // Reduced motion for performance
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3 // Faster animation
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  // Dropdown click handler
  const handleCategorySelect = (category: Category | null) => {
    setActiveCategory(category);
    setActiveSubCategory(null);
  };

  const handleSubCategorySelect = (subCategory: SubCategory | null) => {
    setActiveSubCategory(subCategory);
  };

  const canLoadMore = visibleCount < filteredArticles.length;

  return (
        <>
      <Helmet>
        <title>Articles & Insights | Urban Hustle Films™</title>
        <meta name="description" content="Read thought-provoking articles and behind-the-scenes stories from Urban Hustle Films™. Explore creative insights, industry tips, and our cinematic journey." />
        <meta name="keywords" content="Urban Hustle Films, UHF articles, film blog, indie filmmaking, Bishanpreet Singh, UHF stories, film production insights" />
        <meta property="og:title" content="Articles & Insights | Urban Hustle Films™" />
        <meta property="og:description" content="Explore stories, lessons, and creative insights from the Urban Hustle Films team and founder Bishanpreet Singh." />
        <meta property="og:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />
        <meta property="og:url" content="https://urbanhustlefilms.com/articles" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }} // Faster page transition
    >
      <section className="pt-32 md:pt-48 pb-16 md:pb-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl"
            initial={{ y: -10, opacity: 0 }} // Reduced motion
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">Film Industry Insights</h1>
            <p className="text-lg md:text-xl text-gray-300">
              Dive into our collection of articles covering everything from production techniques to industry trends.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-8 md:py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}
          <motion.div 
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-full md:w-1/2 lg:w-1/3">
              <SearchBar onSearch={setSearchTerm} />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {quickCategories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => handleCategorySelect(category === activeCategory ? null : category)}
                  className={`whitespace-nowrap px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.03 }} // Reduced hover effect
                  whileTap={{ scale: 0.98 }}
                >
                  {category.replace(/-/g, ' ')}
                </motion.button>
              ))}
              
              <div className="relative z-30"> {/* Increased z-index */}
                <CategoryFilter 
                  categories={categories}
                  subCategories={activeCategory ? categorySubMap[activeCategory] : []}
                  activeCategory={activeCategory}
                  activeSubCategory={activeSubCategory}
                  onSelectCategory={handleCategorySelect}
                  onSelectSubCategory={handleSubCategorySelect}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Articles Container with virtualization */}
          <div 
            ref={containerRef}
            className="overflow-y-auto" 
            style={{ height: '60vh' }}
          >
            {visibleArticles.length > 0 ? (
              <>
                {isMobile ? (
                  <motion.div
                    className="space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      paddingTop: `${startIdx * 120}px`,
                      paddingBottom: `${Math.max(0, (visibleArticles.length - endIdx - 1) * 120)}px`
                    }}
                  >
                    <AnimatePresence>
                      {virtualizedArticles.map((article) => (
                        <motion.div
                          key={article.id}
                          variants={mobileItemVariants}
                          layout
                          transition={{ duration: 0.2 }}
                        >
                          <ArticleCard 
                            article={article} 
                            variant="list" 
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {virtualizedArticles.map((article) => (
                        <motion.div
                          key={article.id}
                          variants={itemVariants}
                          layout
                          transition={{ duration: 0.2 }}
                        >
                          <ArticleCard 
                            article={article} 
                            variant="card"
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-medium text-white mb-2">No articles found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or category filter to find what you're looking for.
                </p>
              </motion.div>
            )}
          </div>
          
          {canLoadMore && (
            <motion.div 
              className="flex justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <button
                onClick={loadMore}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Load More Articles
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
              </>
  );
};

export default ArticlesPage;