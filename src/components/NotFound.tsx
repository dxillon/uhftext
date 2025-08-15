import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Clapperboard, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 Not Found – Urban Hustle Films</title>
        <meta name="description" content="Page not found. Return to the home page of Urban Hustle Films." />
        <link rel="canonical" href="https://uhfilms.in/404" />
      </Helmet>

      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <AlertCircle className="w-24 h-24 text-red-500" />
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >

                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold text-white mb-4"
            >
              Scene Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg mb-8"
            >
              Looks like this scene didn't make the final cut. Let's get you back to the main storyline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 border border-gray-700 text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                <Clapperboard className="w-5 h-5" />
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center text-gray-500"
          >
            Error Code: 404 | Take: 1 | Scene: Missing
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;