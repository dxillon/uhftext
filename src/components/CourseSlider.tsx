import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { articles } from '../data/articles';
import { courses } from '../types/course';
import { ArrowRight, ChevronRight, Zap, Star, Award, Users, Clock, Check, Film, Video, BookOpen, Code, Camera, Lightbulb, Shield } from 'lucide-react';

// Animation variants
const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};


const BestSellerBadge = () => (
    <span className="absolute z-10 flex items-center overflow-hidden border border-white/50 shadow-sm bg-gradient-to-br from-yellow-100 to-yellow-300 text-amber-800 font-semibold rounded px-2.5 py-1 text-[10px] top-2 right-2 md:top-4 md:right-4 md:px-3 md:py-1.5 md:text-[12px] md:font-bold">

        {/* Star icon with spin animation */}
        <svg
            className="w-[10px] h-[10px] mr-1 md:w-[14px] md:h-[14px] md:mr-1.5 animate-spin-slow"
            viewBox="0 0 24 24"
            fill="#92400e"
            stroke="#92400e"
            strokeWidth="1.5"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>

        Best Seller

        {/* Custom slow spin animation */}
        <style>{`
      @keyframes spinSlow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spinSlow 10s linear infinite;
      }
    `}</style>
    </span>
);






const ArticleBox = ({ articleId }: { articleId: string }) => {
    const article = articles.find(a => a.id === articleId);

    if (!article) return null;

    return (
        <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/60 border border-gray-700/50 rounded-2xl p-5 relative overflow-hidden group h-full"
        >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-500/30 blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/30 blur-3xl opacity-30"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="text-xs font-medium px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full">
                            {article.category}
                        </span>
                        <h4 className="text-sm font-semibold text-white mt-1 line-clamp-1">{article.title}</h4>
                    </div>
                </div>

                <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                <p className="text-xs text-gray-300 mb-2 flex-1 line-clamp-3">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400">
                        {article.readTimeMinutes} min read
                    </span>
                    <Link
                        to={`/articles/${article.slug}`}
                        className="inline-flex items-center text-xs font-medium text-blue-400 hover:text-blue-300 group"
                    >
                        Read Article
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const CourseSlider: React.FC = () => {
    const [activeTab, setActiveTab] = useState('featured');
    const [hasAnimated, setHasAnimated] = useState(false);
    const navigate = useNavigate();

    // Featured courses (first 6)
    const featuredCourses = courses.slice(0, 6);

    // Benefits data
    const benefits = [
        { icon: <Award className="w-5 h-5 text-yellow-400" />, text: "Industry-recognized certs" },
        { icon: <Users className="w-5 h-5 text-blue-400" />, text: "100K+ students" },
        { icon: <Clock className="w-5 h-5 text-green-400" />, text: "Self-paced" },
        { icon: <Check className="w-5 h-5 text-purple-400" />, text: "Practical projects" }
    ];

    // Instructors data
    const instructors = [
        { name: "Sarah Chen", expertise: "Cinematography", projects: "45+ indie films", icon: <Camera className="w-4 h-4 text-pink-500" /> },
        { name: "James Rodriguez", expertise: "Directing", projects: "Sundance winner", icon: <Video className="w-4 h-4 text-blue-500" /> },
        { name: "Mia Johnson", expertise: "Editing", projects: "10M+ views", icon: <Film className="w-4 h-4 text-purple-500" /> }
    ];

    const handleViewportEnter = () => {
        if (!hasAnimated) {
            setHasAnimated(true);
        }
    };

    return (
        <section className="py-12 relative overflow-hidden">
            {/* Floating elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-3xl opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 relative">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    onViewportEnter={handleViewportEnter}
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white relative pb-4">
                        Featured Courses
                        {/* Visual divider */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 flex justify-center">
                            <div className="w-full max-w-xs">
                                <div className="h-full bg-gradient-to-r from-transparent via-orange-400 to-transparent">
                                    <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>
                                </div>
                            </div>
                        </div>
                    </h2>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/courses')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-orange-400 transition-colors"
                    >
                        <span>View All Courses</span>
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>

                {/* Mobile View - 4 Course Boxes */}
                <div className="lg:hidden">
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {featuredCourses.slice(0, 4).map((course, index) => (
                            <motion.div
                                key={`mobile-${course.id}`}
                                variants={fadeInUp}
                                className="bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-lg border border-gray-700/50 overflow-hidden relative"
                            >
                                {course.bestSeller && <BestSellerBadge />}

                                <div className="p-4 flex flex-col h-full">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-md flex items-center justify-center mb-3">
                                        <Film className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-white line-clamp-1">{course.title}</h3>
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{course.description}</p>
                                    </div>
                                    <Link
                                        to={`/course/${course.slug}`}
                                        className="inline-flex items-center mt-3 text-xs text-orange-400 hover:text-orange-300 font-medium"
                                    >
                                        Explore <ArrowRight className="w-3 h-3 ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Benefits - Mobile */}
                    <motion.div
                        className="mt-6 grid grid-cols-2 gap-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={`mobile-benefit-${index}`}
                                variants={fadeInUp}
                                className="bg-gray-800/40 rounded-lg p-3 flex items-center gap-2"
                            >
                                {benefit.icon}
                                <span className="text-xs text-gray-300">{benefit.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block relative">
                    {/* Background Accent */}
                    <div className="absolute inset-0 " />

                    {/* First Row: Course | Features | Course */}
                    <motion.div
                        className="grid grid-cols-3 gap-6 relative"  // Changed from grid-cols-4 to grid-cols-3
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.12 }
                            }
                        }}
                    >
                        {/* First Course */}
                        {featuredCourses[0] && (
                            <motion.div
                                key={`desktop-course-${featuredCourses[0].id}`}
                                variants={fadeInUp}
                                whileHover={{ y: -4 }}
                                className="bg-gradient-to-br from-gray-900/70 to-gray-800/80 rounded-2xl border border-gray-700/40 shadow-md overflow-hidden col-span-1 group hover:shadow-xl transition-all duration-300 relative"
                            >
                                {featuredCourses[0].bestSeller && <BestSellerBadge />}

                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={featuredCourses[0].coverImage}
                                        alt={featuredCourses[0].title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                </div>

                                <div className="p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 text-xs rounded bg-orange-500/20 text-orange-400 font-medium">
                                            {featuredCourses[0].category}
                                        </span>
                                        {featuredCourses[0].featured && (
                                            <span className="px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-400 font-medium flex items-center gap-1">
                                                <Star className="w-3 h-3" /> Featured
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold text-white truncate">{featuredCourses[0].title}</h3>

                                    <Link
                                        to={`/course/${featuredCourses[0].slug}`}
                                        className="inline-flex items-center text-sm text-orange-400 font-medium hover:text-orange-300"
                                    >
                                        Explore Course
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {/* Features Box - Middle */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl border border-gray-700/40 p-5 col-span-1 relative overflow-hidden"
                        >
                            {/* Glowing Element */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full opacity-30"></div>

                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-orange-400" />
                                Why Choose Us?
                            </h3>

                            <div className="space-y-3">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1">{benefit.icon}</div>
                                        <p className="text-sm text-gray-300">{benefit.text}</p>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate('/courses')}
                                className="mt-6 w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            >
                                Start Learning <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>

                        {/* Second Course */}
                        {featuredCourses[1] && (
                            <motion.div
                                key={`desktop-course-${featuredCourses[1].id}`}
                                variants={fadeInUp}
                                whileHover={{ y: -4 }}
                                className="bg-gradient-to-br from-gray-900/70 to-gray-800/80 rounded-2xl border border-gray-700/40 shadow-md overflow-hidden col-span-1 group hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={featuredCourses[1].coverImage}
                                        alt={featuredCourses[1].title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                </div>

                                <div className="p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 text-xs rounded bg-orange-500/20 text-orange-400 font-medium">
                                            {featuredCourses[1].category}
                                        </span>
                                        {featuredCourses[1].featured && (
                                            <span className="px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-400 font-medium flex items-center gap-1">
                                                <Star className="w-3 h-3" /> Featured
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold text-white truncate">{featuredCourses[1].title}</h3>

                                    <Link
                                        to={`/course/${featuredCourses[1].slug}`}
                                        className="inline-flex items-center text-sm text-orange-400 font-medium hover:text-orange-300"
                                    >
                                        Explore Course
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Second Row: Article | Additional Course | Article */}
                    <motion.div
                        className="grid grid-cols-3 gap-6 mt-6"  // Changed from grid-cols-4 to grid-cols-3
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.12, delayChildren: 0.2 }
                            }
                        }}
                    >
                        {/* First Article */}
                        <div className="col-span-1">
                            <ArticleBox articleId="1" />
                        </div>

                        {/* Additional Course - Middle */}
                        {featuredCourses[2] && (
                            <motion.div
                                key="educators-feature-box"
                                variants={fadeInUp}
                                className="col-span-1 bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-xl border border-gray-700/50 p-4 relative overflow-hidden group"
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Floating elements */}
                                <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-purple-500/20 blur-xl opacity-30"></div>
                                <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-full bg-blue-500/15 blur-lg opacity-30"></div>

                                {/* Subtle grid pattern */}
                                <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+CjxwYXRoIGQ9Ik02IDBMMCA2IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>

                                <div className="relative z-10 h-full flex flex-col">
                                    {/* Header with accent line */}
                                    <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-700/50 relative">
                                        <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-md">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-white tracking-tight">Our Teaching Edge</h3>
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-3.5">
                                        {[
                                            { icon: <Video className="w-4 h-4 text-purple-400" />, text: "Learn from award-winning filmmakers", color: "purple" },
                                            { icon: <Code className="w-4 h-4 text-blue-400" />, text: "Hands-on projects with real feedback", color: "blue" },
                                            { icon: <Clock className="w-4 h-4 text-green-400" />, text: "Learn anytime, anywhere", color: "green" },
                                            { icon: <Award className="w-4 h-4 text-orange-400" />, text: "Certificates that matter", color: "orange" }
                                        ].map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-200">
                                                <div className={`p-1.5 rounded-md bg-${feature.color}-500/10 backdrop-blur-sm border border-gray-700/20`}>
                                                    {feature.icon}
                                                </div>
                                                <p className="text-sm text-gray-200 font-medium leading-snug">{feature.text}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Subtle footer */}
                                    <div className="mt-4 pt-3 border-t border-gray-700/30">
                                        <p className="text-xs text-gray-400 font-mono tracking-wide">"Learn by creating, not just watching"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Second Article */}
                        <div className="col-span-1">
                            <ArticleBox articleId="2" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CourseSlider;