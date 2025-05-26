import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, ChevronDown, ChevronUp, ArrowRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqData } from '../data/faq';
import type { FAQItem } from '../types/faq';
import { Helmet } from 'react-helmet-async';


const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [expandedFeatured, setExpandedFeatured] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<FAQItem[]>(faqData);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchRef = useRef<HTMLInputElement>(null);

  const QUESTIONS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = faqData.filter(faq => {
        const searchLower = searchTerm.toLowerCase();
        return (
          faq.question.toLowerCase().includes(searchLower) ||
          faq.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
        );
      });
      setFilteredQuestions(results);
      setNoResults(results.length === 0);
      setCurrentPage(1);
    } else {
      setFilteredQuestions(faqData);
      setNoResults(false);
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const mostAskedQuestions = faqData
    .filter(faq => faq.isFeatured)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  const handleQuestionClick = (id: string) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

  const handleFeaturedClick = (id: string) => {
    setExpandedFeatured(expandedFeatured === id ? null : id);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (

    <>
      <Helmet>
        <title>Frequently Asked Questions | [Your Brand or Studio Name]</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about our film production services, equipment rentals, crew support, and more."
        />
        <meta name="keywords" content="film production FAQ, video production help, film crew questions, rental FAQs, support, filmmaking tips" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Frequently Asked Questions | [Your Brand]" />
        <meta property="og:description" content="Browse our FAQ section to quickly find answers related to film production and services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.uhfilms.in/faq" />
        <meta property="og:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Film Production FAQs" />
        <meta name="twitter:description" content="Have a question about filmmaking or our services? Find your answers here." />
        <meta name="twitter:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />

        {/* Structured Data: FAQ Schema (replace with dynamic values if needed) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.slice(0, 3).map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>


      <div className="min-h-screen pt-0 bg-black">
        {/* Hero Section with Search */}
        <section className={`relative ${searchTerm ? 'py-20' : 'py-56'} overflow-hidden bg-gradient-to-b from-red-900/20 to-black`}>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                How can we help you?
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Find answers to commonly asked questions about our production services
              </p>

              <div className="relative max-w-2xl mx-auto">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your question... or find FAQ below..."
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Most Asked Questions - Hidden when searching */}

        {!searchTerm && (
          <section className="py-12 bg-black/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Most Asked Questions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mostAskedQuestions.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/30 transition-all duration-300"
                  >
                    <div onClick={() => handleFeaturedClick(faq.id)} className="cursor-pointer">
                      <div className="w-full px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex items-center gap-1 text-xs bg-gray-800/70 rounded-full px-2 py-1 whitespace-nowrap flex-shrink-0">
                            <Eye className="w-4 h-4 text-red-500" />
                            <span className="text-gray-300">{faq.views.toLocaleString()} views</span>
                          </div>
                          <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                        </div>
                        {expandedFeatured === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-red-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>

                      {/* Preview when collapsed */}
                      {expandedFeatured !== faq.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-400 line-clamp-2 text-sm">{faq.answer}</p>
                        </motion.div>
                      )}
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {expandedFeatured === faq.id && (
                        <motion.div
                          key={`content-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                              opacity: { duration: 0.25, delay: 0.1 }
                            }
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              opacity: { duration: 0.15 },
                              height: { duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-black/20">
                            <p className="text-gray-300 mb-4">{faq.answer}</p>
                            {faq.hasActionButton && (
                              <Link
                                to={faq.actionLink || '#'}
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                              >
                                {faq.actionText}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Bar - Hidden when no results */}
        {!noResults && !searchTerm && (
          <div className="flex justify-center py-8 px-4 bg-transparent">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 bg-red-900/20 border border-red-900/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md w-full max-w-screen-sm text-xs sm:text-sm overflow-hidden min-w-0 text-center sm:text-left">
                <h4 className="text-white/80 whitespace-nowrap flex-shrink-0">
                  Didn't find what you're looking for?
                </h4>

                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm rounded-full transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <span className="flex items-center">
                    Contact us
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}

        {/* All Questions */}
        <section className={`${searchTerm ? 'pt-4 pb-12 bg-black' : ''}`}>
          <div className="container mx-auto px-4">
            <AnimatePresence>
              {noResults ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    No results found for "{searchTerm}"
                  </h3>
                  <p className="text-gray-400 mb-6">Try different search terms or</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Contact Our Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {searchTerm ? 'Search Results' : 'All Questions'}
                  </h2>

                  {paginatedQuestions.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => handleQuestionClick(faq.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex items-center gap-1 text-xs bg-gray-800/70 rounded-full px-2 py-1 whitespace-nowrap flex-shrink-0">
                            <Eye className="w-4 h-4 text-red-500" />
                            <span className="text-gray-300">{faq.views.toLocaleString()} views</span>
                          </div>
                          <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                        </div>

                        {selectedQuestion === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-red-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      <AnimatePresence>
                        {selectedQuestion === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: 'auto',
                              opacity: 1,
                              transition: {
                                height: { duration: 0.3, ease: "easeInOut" },
                                opacity: { duration: 0.2, delay: 0.1 }
                              }
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                opacity: { duration: 0.1 },
                                height: { duration: 0.2, ease: "easeInOut" }
                              }
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 bg-black/20">
                              <p className="text-gray-300 mb-4">{faq.answer}</p>
                              {faq.hasActionButton && (
                                <Link
                                  to={faq.actionLink || '#'}
                                  className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                                >
                                  {faq.actionText}
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-center mt-12"
                    >
                      <div className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full px-4 py-2">

                        {/* Prev Button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-2 rounded-full hover:bg-gray-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-400" />
                        </button>

                        {/* Current Page / Total Pages */}
                        <span className="flex items-center text-sm font-medium text-gray-300 space-x-2">
                          <span className="w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full shadow-md transition-all duration-300">
                            {currentPage}
                          </span>
                          <span className="text-gray-500 text-sm">/</span>
                          <span className="text-gray-400">{totalPages}</span>
                        </span>

                        {/* Next Button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-full hover:bg-gray-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQPage;