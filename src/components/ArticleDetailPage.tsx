import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { FileWarning, ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Article } from '../types/article';
import { articles } from '../data/articles';
import { formatDate } from '../utills/formatters';
import ArticleSlider from '../components/ArticleSlider';
import { motion, AnimatePresence } from 'framer-motion';
import { useNewsletter } from '../hooks/useNewsletter';
import { Helmet } from 'react-helmet-async';

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const {
    email,
    setEmail,
    isLoading,
    isSubscribed,
    error,
    handleSubscribe
  } = useNewsletter();

  useEffect(() => {
    const currentArticle = articles.find(article => article.slug === slug) || null;
    setArticle(currentArticle);

    if (currentArticle) {
      const related = articles
        .filter(a => a.category === currentArticle.category && a.id !== currentArticle.id)
        .slice(0, 6);
      setRelatedArticles(related);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);



  if (!article) {
    return (
 <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <FileWarning className="mx-auto w-16 h-16 text-red-500" />
        </motion.div>

        <h2 className="text-3xl font-extrabold mb-3">Article Not Found</h2>
        <p className="text-gray-400 mb-6">
          The article you're looking for either doesn't exist or may have been removed.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/articles')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-5 h-5 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-500" />
          Return to Articles
        </motion.button>
      </div>
    </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${article.title} | Urban Hustle Films™`}</title>

        <meta
          name="description"
          content={
            article.summary?.length
              ? article.summary.map(s => s.replace(/^•\s*/, '')).join(' | ')
              : 'Explore inspiring stories and insights from Urban Hustle Films™.'
          }
        />

        <meta
          name="keywords"
          content={
            article.tags?.length
              ? `Urban Hustle Films, ${article.tags.join(', ')}, Bishanpreet Singh`
              : 'Urban Hustle Films, Bishanpreet Singh'
          }
        />

        <meta property="og:title" content={`${article.title} | Urban Hustle Films™`} />
        <meta
          property="og:description"
          content={
            article.summary?.length
              ? article.summary.map(s => s.replace(/^•\s*/, '')).join(' | ')
              : 'Explore insights and untold stories from Urban Hustle Films™.'
          }
        />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content={`https://urbanhustlefilms.com/articles/${article.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white min-h-screen"
      >
        {/* Hero Section */}
        <motion.section
          className="relative !pt-0 !mt-0"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-[60vh] relative overflow-hidden ">
            <motion.img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            <div className="absolute inset-x-0 bottom-0 container mx-auto px-4 pb-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >


                <div className="flex flex-wrap gap-2 mb-4">
                  <motion.span
                    className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    {article.category.replace('-', ' ')}
                  </motion.span>
                  {article.subCategory && (
                    <motion.span
                      className="px-3 py-1 bg-gray-800 text-white text-sm font-medium rounded-md"
                      whileHover={{ scale: 1.05 }}
                    >
                      {article.subCategory.replace('-', ' ')}
                    </motion.span>
                  )}
                </div>

                <motion.h1
                  className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {article.title}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap items-center text-gray-200 gap-4 md:gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{article.readTimeMinutes} min read</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Article Content */}
        <section className="py-16">

          <div className="container mx-auto px-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
               onClick={() => navigate('/articles')}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-500" />
              Return to articles...
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <motion.div
                className="lg:col-span-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >

                {/* Added Summary Section */}
                {article.summary && (
                  <motion.div
                    className="mb-12 p-6 bg-gray-900 rounded-xl border border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-red-500">Article Summary</h3>
                    <ul className="space-y-3">
                      {article.summary.map((point, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (index * 0.1) }}
                        >
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-300">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}


                <div className="prose prose-lg prose-invert max-w-none">
                  <motion.div
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  />
                </div>

                {article.tags && article.tags.length > 0 && (
                  <motion.div
                    className="mt-12 pt-6 border-t border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Tagged with:</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-full"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + (index * 0.1) }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="lg:col-span-4 space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div>
                      <h3 className="text-lg font-bold">{article.author.name}</h3>
                      <p className="text-sm text-gray-400">{article.author.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {article.author.bio}
                  </p>
                  <Link
                    to="#"
                    className="text-red-500 hover:text-red-400 text-sm font-medium inline-flex items-center gap-1"
                  >
                    View all articles <span>→</span>
                  </Link>
                </motion.div>

                <motion.div
                  className="rounded-xl overflow-hidden border border-gray-800"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Newsletter signup"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 bg-gray-900">
                    <h3 className="text-xl font-bold mb-2">Join Our Newsletter</h3>
                    <p className="text-gray-300 mb-4">
                      Stay updated with the latest film industry insights and exclusive content.
                    </p>

                    {isSubscribed ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-green-900/30 text-green-400 rounded-md text-center"
                      >
                        Thanks for subscribing!
                      </motion.div>
                    ) : (

                      <form
                        className="space-y-3"
                        onSubmit={(e) => {
                          e.preventDefault(); // Add this to prevent default form submission
                          handleSubscribe(e);
                        }}
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : 'Subscribe Now'}
                        </button>
                        {error && (
                          <p className="text-red-500 text-sm mt-2">
                            {error}
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
          >
            <ArticleSlider
              articles={relatedArticles}
              title="Related Articles"
              autoScrollDelay={5000}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ArticleDetailPage;