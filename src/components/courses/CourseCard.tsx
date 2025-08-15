import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User, Star, ArrowRight, Film, Camera, Mic, Edit3, Sparkles } from 'lucide-react';
import { Course } from '../../types/course';

const courseIcons = {
    cinematography: <Camera className="w-4 h-4" />,
    directing: <Film className="w-4 h-4" />,
    editing: <Edit3 className="w-4 h-4" />,
    sound: <Mic className="w-4 h-4" />,
    default: <Film className="w-4 h-4" />
};

const BestSellerBadge = () => {
    return (
        <motion.div 
            className="absolute top-2 right-2 z-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" />
                <span>BESTSELLER</span>
            </div>
        </motion.div>
    );
};

export const CourseCard = ({ course, index }: { course: Course; index: number }) => {
    const getCourseIcon = (category: string) => {
        const normalizedCategory = category.toLowerCase();
        return courseIcons[normalizedCategory as keyof typeof courseIcons] || courseIcons.default;
    };

    return (
        <motion.div
            className="course-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.03 }}
        >
            <Link to={`/course/${course.slug}`} className="block h-full group">
                <div className="h-full bg-gradient-to-br from-gray-900/80 to-gray-900 rounded-xl overflow-hidden border border-gray-800/50 hover:border-orange-500/30 transition-all duration-400 shadow-lg sm:shadow-xl shadow-black/20">
                  
                    
                    <div className="course-content h-full flex flex-col">
                        <div className="relative h-28 sm:h-36 md:h-40 overflow-hidden">
                            <motion.img
                                src={course.coverImage}
                                alt={course.title}
                                className="w-full h-full object-cover course-image"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.4 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              {course.bestSeller && <BestSellerBadge />}
                            <div className="absolute bottom-3 left-3 flex gap-2">
                                <motion.span
                                    className="bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {getCourseIcon(course.category)}
                                    <span>{course.category}</span>
                                </motion.span>
                                
                                {course.featured && (
                                    <motion.span
                                        className="bg-gradient-to-r from-yellow-500/90 to-yellow-600/90 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                        whileHover={{ scale: 1.05 }}
                                        animate={{
                                            boxShadow: '0 0 12px rgba(234, 179, 8, 0.4)'
                                        }}
                                    >
                                        <Star className="w-3 h-3 fill-current" />
                                        <span>Featured</span>
                                    </motion.span>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                                {course.title}
                            </h3>
                            <p className="text-gray-400 text-xs mb-2 sm:mb-3 line-clamp-2 flex-1">
                                {course.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-800/50">
                                <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                                        {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                                        {course.instructor.name.split(' ')[0]}
                                    </span>
                                </div>
                                
                                <motion.div
                                    className="text-orange-500 flex items-center text-xs font-medium group-hover:text-orange-400 transition-colors"
                                    whileHover={{ x: 3 }}
                                >
                                    <span>Explore</span>
                                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};