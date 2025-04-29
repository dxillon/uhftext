import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart, Shield, Bell, Eye, Loader, CheckCircle } from 'lucide-react';
import anime from 'animejs';
import { Helmet } from 'react-helmet-async';

const CookiePolicy = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const cookieTypes = [
    {
      icon: Settings,
      title: "Essential Cookies",
      description: "Essential cookies are necessary for the website to function correctly. These cookies help in accessing secure areas of the site, ensuring the basic functionality of the website such as user sessions and security measures. Without these cookies, services like logging into your account or saving your preferences cannot be provided. They are strictly required for the operation of the site and cannot be disabled.",
      examples: ["Authentication", "Security", "Session", "Prefrences"]
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      description: "Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. These cookies allow us to improve the user experience by providing insights into how visitors engage with the site. For a production website, understanding user behavior can help optimize content placement, showreels, and portfolio displays for better engagement.",
      examples: ["Page Views", "Traffic", "Time Spent", "Clicks"]
    },
    {
      icon: Bell,
      title: "Functionality Cookies",
      description: "Functionality cookies enable a more personalized experience by remembering your preferences and choices. On a film production website, these cookies can store video preferences, language settings, and customize content based on your previous visits. They ensure that the website works efficiently with enhanced features tailored to your usage, providing a more seamless experience.",
      examples: ["Languages", "Theme Settings", "Video Preferences", "Customization"]
    },
    {
      icon: Eye,
      title: "Marketing Cookies",
      description: "Marketing cookies are used to track visitors across websites and deliver targeted advertisements based on interests and browsing habits. For a film production website, these cookies help deliver relevant content, promote new films, campaigns, or special events, and track the effectiveness of marketing strategies. They enable the website to tailor advertising to your interests and provide a more personalized advertising experience.",
      examples: ["Tracking", "Ads", "Campaigns", "Retargating"]
    }
  ];

  const handleCookieManagement = () => {
    setLoading(true);
    setIsDeleted(false);

    anime({
      targets: '.cookie-delete-animation',
      scale: [1, 0],
      opacity: [1, 0],
      duration: 1500,
      easing: 'easeInOutQuad'
    });

    setTimeout(() => {
      setLoading(false);
      setIsDeleted(true);

      anime({
        targets: '.success-message',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .5)'
      });

      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Cookie Policy – Urban Hustle Films</title>
        <meta name="description" content="Understand how we use cookies to improve your browsing experience." />
        <link rel="canonical" href="https://uhfilms.in/cookies" />
      </Helmet>

      <div className="min-h-screen pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 py-16"
        >
          <motion.div className="text-center mb-16">
            <motion.h1
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="text-4xl font-bold text-white mb-8 text-gradient"
            >
              Cookie Policy
            </motion.h1>
            <Cookie className="w-16 h-16 text-red-500 mx-auto mb-8" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 max-w-3xl mx-auto"
            >
              We use cookies to enhance your browsing experience and provide personalized services while navigating our production house website. Cookies are small text files stored on your device that allow us to remember your preferences, analyze site traffic, and optimize the content we provide. By utilizing these technologies, we aim to improve your interaction with our website, ensuring a smooth, secure, and tailored experience. This policy outlines how we use cookies, the different types of cookies employed, and how we prioritize your privacy and data security as we deliver content and services that meet your needs.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:bg-white/5 transition-all duration-300"
              >
                <type.icon className="w-8 h-8 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold text-white mb-4">{type.title}</h2>
                <p className="text-gray-300 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example) => (
                    <span key={example} className="px-3 py-1 bg-red-500/10 rounded-full text-red-400 text-sm">
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 p-8 card text-center"
          >
            <Shield className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">Your Cookie Choices</h2>
            <p className="text-gray-300 mb-6">
              You can manage your cookie preferences at any time. While essential cookies are necessary for website functionality,
              you have control over other cookie types through your browser settings.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary cookie-delete-animation"
              onClick={handleCookieManagement}
              disabled={loading || isDeleted}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Deleting Cookies...
                </span>
              ) : isDeleted ? (
                <span className="flex items-center gap-2 success-message">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Cookies Deleted
                </span>
              ) : (
                'Manage Cookies'
              )}
            </motion.button>

            {showMessage && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 text-green-500"
              >
                All cookies have been successfully deleted!
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default CookiePolicy;