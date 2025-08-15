import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  ChevronDown,
  ChevronUp,
  Users,
  Square,
  Zap,
} from "lucide-react";
import anime from "animejs";
import { Helmet } from "react-helmet-async";
import { teamMembers, coreServices } from "../data/abt";
import AbtHero from '../components/AbtHero'

const AboutPage = () => {
  const teamRef = useRef<HTMLDivElement>(null);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll(".team-member"),
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: "easeOutCubic", // smoother easing
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMember = (name: string) => {
    setExpandedMember(expandedMember === name ? null : name);
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Helmet>
        <title>About | Urban Hustle Films</title>
        <meta
          name="description"
          content="Discover the DNA of Urban Hustle Films — a visionary production company crafting cinematic experiences through bold storytelling and disruptive creativity."
        />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="About | Urban Hustle Films" />
        <meta
          property="og:description"
          content="Dive into the story, vision, and creative arsenal of Urban Hustle Films."
        />
        <meta
          property="og:image"
          content="https://www.uhfilms.in/uhf.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uhfilms.in/about" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | Urban Hustle Films" />
        <meta
          name="twitter:description"
          content="Behind the scenes of Urban Hustle Films — where cinematic storytelling is born."
        />
        <meta
          name="twitter:image"
          content="https://www.uhfilms.in/uhf.png"
        />
      </Helmet>


      {/* ==================== */}
      {/* HERO SECTION */}
      {/* ==================== */}
      <AbtHero />


      {/* ==================== */}
      {/* DNA SECTION */}
      {/* ==================== */}
      <section className="relative bg-black py-16 sm:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.h2
                initial={{ x: -50 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight"
              >
                <span className="block">THE URBAN HUSTLE</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-300 block">
                  DNA
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-red-200 text-base sm:text-lg mb-6 sm:mb-8"
              >
                We're not just filmmakers — we're visual revolutionaries. Our
                approach combines raw talent with technical mastery to create
                work that doesn't just get seen, it gets remembered.
              </motion.p>

              {/* Pointers */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-5"
              >
                <div className="flex items-start gap-4 text-left">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Disruptive Creativity
                    </h3>
                    <p className="text-red-300 text-sm sm:text-base">
                      We challenge conventions and redefine what's possible in
                      visual storytelling.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Precision Craft
                    </h3>
                    <p className="text-red-300 text-sm sm:text-base">
                      Every frame is meticulously composed for maximum impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Collaborative Fire
                    </h3>
                    <p className="text-red-300 text-sm sm:text-base">
                      We thrive on creative friction that sparks extraordinary
                      results.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Image Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
            >
              {/* Outer Frame */}
              <div className="absolute -top-2 -right-2 -bottom-2 -left-2 sm:-top-3 sm:-right-3 sm:-bottom-3 sm:-left-3 border-2 border-red-900/50 rounded-xl rotate-3 pointer-events-none"></div>

              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-black to-red-900/20 rounded-lg overflow-hidden border border-red-900/30 p-1 sm:p-2">
                <div className="aspect-w-16 aspect-h-9 w-full h-48 sm:h-64 md:h-80 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center rounded-md shadow-inner" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ==================== */}
      {/* SERVICES SECTION */}
      {/* ==================== */}
      <section className="relative bg-black py-24 overflow-hidden">
        {/* Section title */}
        <div className="container mx-auto px-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-300">
              OUR CREATIVE ARSENAL
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-red-300 text-center max-w-xl mx-auto mt-4 text-base md:text-lg"
          >
            The tools and expertise we wield to bring visionary concepts to life
          </motion.p>
        </div>

        {/* Responsive Section */}
        <div className="container mx-auto px-4">
          {/* Grid layout for md+ screens */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg border border-red-900/30 bg-gradient-to-b from-black to-red-900/10 hover:to-red-900/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 p-8 h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-red-600/20 group-hover:bg-red-600/40 transition-all duration-300">
                    <service.icon className="h-7 w-7 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <ul className="space-y-3">
                    {service.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-red-200"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Accordion for mobile screens */}
          <div className="md:hidden space-y-4">
            {coreServices.map((service, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className="border border-red-900/30 rounded-lg overflow-hidden bg-gradient-to-b from-black to-red-900/10"
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between px-4 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-red-600/20 rounded flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-red-500" />
                      </div>
                      <h3 className="text-white text-lg font-semibold">
                        {service.title}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-red-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-red-400" />
                    )}
                  </button>

                  {/* Accordion content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-red-200 text-sm"
                      >
                        <ul className="space-y-3 mt-2">
                          {service.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-2 h-2 mt-2 bg-red-500 rounded-full flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ==================== */}
      {/* TEAM SECTION */}
      {/* ==================== */}
      <section className="relative bg-black py-20 overflow-hidden">
        {/* Section title */}
        <div className="container mx-auto px-4 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-300">
              THE VISIONARIES
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-red-300 text-center max-w-2xl mx-auto mt-6"
          >
            The brilliant minds who transform ideas into visual masterpieces
          </motion.p>
        </div>

        {/* Team members */}
        <div className="container mx-auto px-4" ref={teamRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className={`team-member relative overflow-hidden rounded-xl border border-red-900/30 bg-gradient-to-b from-black to-red-900/10 transition-all duration-300 ${expandedMember === member.name ? "scale-[1.02]" : ""
                  }`}
                onClick={() => toggleMember(member.name)}
                data-clickable="true"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px 10px rgba(239, 68, 68, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-red-500 font-medium">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span
                        className={`text-sm transition-colors duration-300 ${expandedMember === member.name
                          ? "text-white"
                          : "text-red-500"
                          }`}
                      >
                        {expandedMember === member.name
                          ? "Hide Details"
                          : "More Details"}
                      </span>
                      <motion.div
                        animate={{
                          rotate: expandedMember === member.name ? 180 : 0,
                        }}
                        className={`text-xl ${expandedMember === member.name
                          ? "text-red-500"
                          : "text-white"
                          }`}
                      >
                        ↓
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      height: expandedMember === member.name ? "auto" : "100px",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Background
                        </h4>
                        <p className="text-white ">{member.background}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Key Roles
                        </h4>
                        <ul className="grid grid-cols-2 gap-3">
                          {member.keyRoles.map((role, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-white"
                            >
                              <span className="text-red-500 font-semibold">
                                {index + 1})
                              </span>
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Notable Work
                        </h4>
                        <ul className="space-y-2">
                          {member.notableWork.map((work, index) => (
                            <li
                              key={index}
                              className="text-white flex items-start"
                            >
                              <Square className="w-2 h-2 text-purple-500 fill-current mr-2 mt-1.5 transform rotate-45 flex-shrink-0" />
                              <span>{work}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {member.skills && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {member.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-sm rounded-full bg-red-900/30 text-white border border-red-900/50"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutPage;
