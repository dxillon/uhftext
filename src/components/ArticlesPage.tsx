import React, { useState, useEffect } from 'react';
import { Category } from '../types/article';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';

const ArticlesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  // Extract unique categories
  const categories = Array.from(new Set(articles.map(article => article.category))) as Category[];

  // Quick access categories (top 5 most used)
  const quickCategories = [...categories]
    .sort((a, b) =>
      articles.filter(article => article.category === b).length -
      articles.filter(article => article.category === a).length
    )
    .slice(0, 5);

  useEffect(() => {
    let result = articles;

    if (searchTerm) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeCategory) {
      result = result.filter(article => article.category === activeCategory);
    }

    setFilteredArticles(result);
  }, [searchTerm, activeCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

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
        transition={{ duration: 0.5 }}
      >
        <section className="pt-32 pb-16 bg-black text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Film Industry Insights</h1>
              <p className="text-xl text-gray-300 mb-8">
                Dive into our collection of articles covering everything from production techniques to industry trends.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            {/* Search and Filter Bar - Fixed horizontal scrolling */}
            <motion.div
              className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-full md:w-1/2 lg:w-1/3">
                <SearchBar onSearch={setSearchTerm} />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {quickCategories.map(category => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category === activeCategory ? null : category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.replace('-', ' ')}
                  </motion.button>
                ))}

                {/* Dropdown with proper z-index to prevent overlap */}
                <div className="relative z-10">
                  <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                  />
                </div>
              </div>
            </motion.div>

            {/* Articles Grid with animations */}
            {filteredArticles.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={itemVariants}
                      layout
                      transition={{ duration: 0.3 }}
                    >
                      <ArticleCard article={article} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-medium text-white mb-2">No articles found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or category filter to find what you're looking for.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );

};

export default ArticlesPage;