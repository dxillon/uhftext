import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect, lazy, Suspense, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Drama,
  TrendingUp,
  Eye,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const FormCast = lazy(() => import("../components/FormCast"));
import { mostAskedQuestions, successStories } from "../data/casted";

const GetCastedPage = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [expandedFeatured, setExpandedFeatured] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-rotate success stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleFeaturedClick = (id) => {
    setExpandedFeatured(expandedFeatured === id ? null : id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowForm(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Get Noticed – UH Films | Talent Discovery Platform</title>
        <meta
          name="description"
          content="Get discovered by top casting directors and filmmakers through UH Films' talent platform."
        />
        <link rel="canonical" href="https://www.uhfilms.in/get-noticed" />

        {/* Open Graph */}
        <meta property="og:title" content="Get Noticed – UH Films" />
        <meta
          property="og:description"
          content="Showcase your talent to industry professionals and build your film career with UH Films."
        />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content="https://www.uhfilms.in/get-noticed" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Noticed – UH Films" />
        <meta
          name="twitter:description"
          content="Showcase your talent to industry professionals and get discovered by UH Films."
        />
        <meta name="twitter:image" content="https://www.uhfilms.in/uhf.png" />
      </Helmet>

      <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
        {/* Film grain overlay */}
        <div className="fixed inset-0 bg-[url('/film-grain.png')] opacity-10 pointer-events-none z-50"></div>

        {/* Hero Section */}
        <section className="relative h-[100dvh] min-h-[600px] flex items-center justify-center bg-[linear-gradient(to_bottom,_black_7%,_rgba(127,29,29,0.5)_50%,_rgba(127,29,29,0.5)_50%,_transparent_100%)] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/film-strip-pattern.png')] opacity-5"></div>
          <div className="text-center z-10 px-4 w-full max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="w-40 h-40">
                <DotLottieReact
                  src="https://lottie.host/bb557b08-852c-4e97-b2e9-011ac825148d/YSD05pL0dU.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
                LIGHTS, CAMERA, ACTION!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl mb-6 max-w-2xl mx-auto text-gray-300 font-light"
            >
              Your journey to stardom starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 12px rgba(239,68,68,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-7 rounded-full text-md transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0"
                onClick={() =>
                  document
                    .getElementById("form-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                <Drama className="w-5 h-5 scale-150" />
                Apply Now
              </motion.button>

              <Link to="/about">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 12px rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent hover:bg-white/10 text-white font-bold py-2.5 px-7 rounded-full text-md transition-all duration-300 flex items-center gap-2 border border-white/30 mx-auto sm:mx-0"
                >
                  <Info className="w-4 h-4" />
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-6 h-6 text-red-500" />
          </motion.div>
        </section>

        {/* Form Component */}
        <div ref={formRef}>
          {showForm && (
            <Suspense
              fallback={
                <div className="min-h-[500px] flex items-center justify-center py-12">
                  <div className="animate-pulse text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-900/50"></div>
                    <p className="text-gray-400">Loading application form...</p>
                  </div>
                </div>
              }
            >
              <FormCast />
            </Suspense>
          )}
        </div>

        {/* Success Stories Carousel */}
        <section className="py-8 px-4 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
                Success Reels
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Watch how talents like you made it big in the industry
              </p>
            </div>

            <div className="relative h-[500px] md:h-[600px]">
              <div className="absolute top-5 left-0 right-0 z-30 px-4 w-full">
                <div className="flex gap-1 max-w-md mx-auto px-2">
                  {successStories.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 bg-gray-600 rounded-full overflow-hidden transition-opacity ${
                        i === currentStory ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      {i === currentStory && (
                        <motion.div
                          className="h-full bg-red-500"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 8, ease: "linear" }}
                          onAnimationComplete={() => {
                            setCurrentStory(
                              (prev) => (prev + 1) % successStories.length
                            );
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Slides */}
              <div className="relative h-full overflow-hidden">
                {successStories.map((story, index) => (
                  <div
                    key={story.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentStory
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <div className="relative w-full h-full max-w-md mx-auto">
                      {/* Profile section with glass box */}
                      <div className="absolute top-16 left-0 right-0 z-20 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-2 border-red-500/80 overflow-hidden bg-gray-800/80 ring-2 ring-white/50">
                          <img
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Text Content in glass box */}
                        <div className="mt-3 text-center backdrop-blur-sm bg-black/50 rounded-lg px-4 py-2 border border-white/10">
                          <h3 className="text-lg font-bold text-white">
                            {story.name}
                          </h3>
                          <p className="text-red-400 text-sm mt-1">
                            {story.location}
                          </p>
                        </div>

                        {/* Role Badge */}
                        <div className="mt-2 text-center backdrop-blur-sm bg-black/60 rounded-full px-3 py-1 border border-red-500/30">
                          <p className="text-xs font-medium text-red-400">
                            {story.role}
                          </p>
                        </div>
                      </div>

                      {/* Main image with subtle gradients */}
                      <div className="relative h-full rounded-xl overflow-hidden bg-gray-900 select-none">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover pointer-events-none"
                            loading="lazy"
                          />
                        </div>

                        {/* Subtle 1% gradients at top and bottom */}
                        <div className="absolute top-0 left-0 right-0 h-[10%] bg-gradient-to-b from-black to-transparent z-10"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-[1%] bg-gradient-to-t from-black to-transparent z-10"></div>

                        {/* Stronger gradients for content areas */}
                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                        {/* Quote box at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center">
                          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                            <p className="text-xl italic text-white">
                              "{story.quote}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-black/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-white">
                Most Asked Questions
              </h2>
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
                  <div
                    onClick={() => handleFeaturedClick(faq.id)}
                    className="cursor-pointer"
                  >
                    <div className="w-full px-6 py-4 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-medium text-white break-words">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-red-900/50 to-red-900/30 rounded-full px-2 py-1 whitespace-nowrap">
                            <Eye className="w-4 h-4 text-red-500" />
                            <span className="text-gray-300">
                              {faq.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                      </div>
                      {expandedFeatured === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
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
                        <p className="text-gray-400 line-clamp-2 text-sm">
                          {faq.answer}
                        </p>
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
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            },
                            opacity: { duration: 0.25, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            opacity: { duration: 0.15 },
                            height: {
                              duration: 0.2,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 bg-black/20">
                          <p className="text-gray-300 mb-4">{faq.answer}</p>
                          {faq.hasActionButton && (
                            <button
                              onClick={() =>
                                (window.location.href = faq.actionLink)
                              }
                              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                            >
                              {faq.actionText}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* New CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <div className="inline-flex flex-row items-center justify-center gap-2 sm:gap-4 bg-gradient-to-r from-red-900/30 to-black/30 border border-red-900/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                <p className="text-white/80 text-xs sm:text-sm whitespace-nowrap">
                  Didn't find what you're looking for?
                </p>
                <Link
                  to="/faq"
                  className="group inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-red-500/30 whitespace-nowrap"
                >
                  <span className="flex items-center">
                    Browse FAQ
                    <ArrowRight className="ml-1 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GetCastedPage;
