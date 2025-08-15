// components/home/FeaturedProjects.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Film, Star, Clock, Users, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../data/home';
type Props = {
    onSelect: (video: { url: string; duration: string }) => void;
};

interface FeaturedProjectsProps {
    onSelect: (video: { url: string; duration: string }) => void;
}

const FeaturedProjects: React.FC<Props> = ({ onSelect }) => {

    return (
        <section className="py-16 bg-black/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 left-20 w-60 h-60 bg-red-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-80 h-80 bg-red-500/5 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                        Featured Projects
                    </h2>
                    <div className="mx-auto w-24 h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.slice(0, 6).map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                            transition={{ delay: index * 0.15, duration: 0.4 }}
                            className={`card group cursor-pointer ${index >= 3 ? 'hidden lg:block' : ''}`}
                            data-clickable="true"
                        >
                            <div className="relative aspect-video mb-4 overflow-hidden rounded-xl group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    <div
                                        className="bg-black/90 p-3 rounded-full flex justify-center items-center w-12 h-12 hover:scale-110 transition-transform"
                                        onClick={() => onSelect({ url: project.videoUrl, duration: project.duration })}
                                    >
                                        <Play className="w-6 h-6 text-red-500" />
                                    </div>
                                </div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-2">
                                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{project.title}</h3>

                                <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Film className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        <span className="truncate">{project.category}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        <span className="truncate">{project.awards}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        <span>{project.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        <span className="truncate">{project.Artist}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onSelect({ url: project.videoUrl, duration: project.duration })}
                                    className="w-full py-2 px-4 bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 rounded-lg flex items-center justify-center space-x-2"
                                >
                                    <Play className="w-4 h-4" />
                                    <span>Watch Now</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center mt-10"
                >
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 rounded-lg shadow-lg hover:shadow-red-500/20"
                    >
                        View All Projects
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>


    );
};

export default FeaturedProjects;
