import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Film, Star, Award, Users, Heart, Sparkles, Rocket, Camera, Clapperboard, Video, Music, Lightbulb, Globe } from 'lucide-react';
import anime from 'animejs';
import { Helmet } from 'react-helmet-async';

const Journey = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(springScrollY, [0, 0.2], [1, 0]);
  const scale = useTransform(springScrollY, [0, 0.2], [1, 0.8]);
  const y = useTransform(springScrollY, [0, 0.2], [0, -50]);

  useEffect(() => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1500
    });

    timeline
      .add({
        targets: '.journey-item',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200)
      })
      .add({
        targets: '.vision-card',
        opacity: [0, 1],
        translateX: [50, 0],
        delay: anime.stagger(100)
      }, '-=1000');
  }, []);

  const milestones = [
    {
      year: '2015',
      title: 'The Genesis',
      description: 'Bishanpreet Singh begins his journey in filmmaking with a passion for storytelling',
      icon: Lightbulb,
      color: 'text-yellow-500'
    },
    {
      year: '2017',
      title: 'UH Films Founded',
      description: 'Establishment of UH Films with a vision to create impactful cinema',
      icon: Film,
      color: 'text-red-500'
    },
    {
      year: '2019',
      title: 'First Major Production',
      description: 'Successfully directed and produced the first feature film under UH Films',
      icon: Camera,
      color: 'text-purple-500'
    },
    {
      year: '2020',
      title: 'Industry Recognition',
      description: 'Received acclaim for innovative storytelling and production techniques',
      icon: Award,
      color: 'text-blue-500'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Extended UH Films reach to international markets and audiences',
      icon: Globe,
      color: 'text-green-500'
    },
    {
      year: '2024',
      title: 'Innovation Leader',
      description: 'Pioneering new approaches in cinematic storytelling and production',
      icon: Sparkles,
      color: 'text-indigo-500'
    }
  ];

  const visionAreas = [
    {
      title: 'Storytelling Philosophy',
      icon: Film,
      description: 'Creating narratives that challenge perspectives and touch hearts',
      color: 'from-purple-500/20 to-purple-500/5'
    },
    {
      title: 'Creative Innovation',
      icon: Lightbulb,
      description: 'Pushing boundaries with cutting-edge production techniques',
      color: 'from-yellow-500/20 to-yellow-500/5'
    },
    {
      title: 'Cultural Impact',
      icon: Globe,
      description: 'Producing content that resonates across cultural boundaries',
      color: 'from-blue-500/20 to-blue-500/5'
    },
    {
      title: 'Future Vision',
      icon: Rocket,
      description: 'Leading the evolution of modern cinema and storytelling',
      color: 'from-red-500/20 to-red-500/5'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Bishanpreet Singh - Founder Journey | Urban Hustle Films™</title>
        <meta name="description" content="Explore the inspiring journey of Bishanpreet Singh the founder of Urban Hustle Films. Learn about the vision, struggles, and achievements behind the brand." />
        <meta name="keywords" content="Bishanpreet Singh , Bishan dxillon , Bishan singh , uhf, uh films ,Urban Hustle Films, founder journey, film production, indie cinema, hustle story" />
        <meta property="og:title" content="Bishanpreet Singh - Founder Journey | Urban Hustle Films" />
        <meta property="og:description" content="Explore the inspiring journey of Bishanpreet Singh the founder of Urban Hustle Films." />
        <meta property="og:image" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1746015970/_DSC0937_mweldt.jpg" />
        <meta property="og:url" content="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745652699/Blue_and_White_Circle_Surfing_Club_Logo_gb72rx.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div ref={containerRef} className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative h-screen flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent" />
          <div className="text-center z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-2xl md:text-3xl text-red-500 font-medium mb-4">Bishanpreet Singh</h2>
              <h1 className="text-6xl md:text-7xl font-bold">Founder's Journey</h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            >
              From vision to reality: The story of UH Films' creation and evolution
            </motion.p>
          </div>
        </motion.div>

     {/* Timeline Section */}
<div className="relative w-full py-20 overflow-hidden">
  <div className="w-full px-4 mx-auto max-w-4xl">
    <motion.h2 
      className="text-4xl md:text-5xl font-bold text-center mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      The Journey
    </motion.h2>
    
    <div className="relative w-full">
      {milestones.map((item, index) => (
        <motion.div
          key={item.year}
          className="relative w-full mb-20 pl-24"
          initial={{ 
            opacity: 0,
            y: 50,
            x: index % 2 === 0 ? -20 : 20 // Slight alternating horizontal offset
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.15
            }
          }}
          viewport={{ 
            once: true,
            margin: "-100px 0px -100px 0px" // Triggers animation earlier
          }}
        >
          {/* Year indicator */}
          <motion.div 
            className="absolute left-0 top-0 w-20 text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.1 }}
          >
            <span className="text-2xl font-bold text-red-500">{item.year}</span>
          </motion.div>
          
          {/* Timeline item */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-red-500 to-transparent -ml-px" />
            
            {/* Dot indicator */}
            <motion.div 
              className="absolute left-0 top-0 w-3 h-3 rounded-full bg-red-500 -ml-1.5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.2 }}
            />
            
            {/* Content card */}
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: index * 0.15 + 0.3 }
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                backgroundColor: 'rgba(17, 24, 39, 0.7)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {item.title}
                </motion.h3>
              </div>
              <motion.p 
                className="text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.6 }}
              >
                {item.description}
              </motion.p>
              <motion.div
                className="mt-4 flex items-center gap-2 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.7 }}
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">A milestone in our story</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>


        {/* Vision Section */}
        <div className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-20"
            >
              Founder's Vision
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {visionAreas.map((vision, index) => (
                <motion.div
                  key={vision.title}
                  className="vision-card group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${vision.color} p-8 border border-gray-800 hover:border-red-500/50 transition-all duration-500`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16" />

                    <vision.icon className="w-10 h-10 text-red-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">{vision.title}</h3>
                    <p className="text-gray-300">{vision.description}</p>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Star className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Future Vision Section */}
        <div className="py-20 bg-gradient-to-t from-red-500/10 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Looking Forward</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                "Our journey is just beginning. We're committed to pushing the boundaries of storytelling and creating cinematic experiences that leave a lasting impact."
              </p>
              <p className="text-red-500 font-medium mt-4">- Bishanpreet Singh</p>
              <div className="mt-10 flex justify-center gap-4">
                <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
                <Star className="w-8 h-8 text-red-500 animate-pulse delay-100" />
                <Star className="w-8 h-8 text-purple-500 animate-pulse delay-200" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );

};

export default Journey;
