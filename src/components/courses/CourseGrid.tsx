import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Course } from '../../types/course';
import { CourseCard } from './CourseCard';

export const CourseGrid = ({ courses }: { courses: Course[] }) => {
    const [visibleCourses, setVisibleCourses] = useState(6);

    const loadMoreCourses = () => {
        setVisibleCourses(prev => Math.min(prev + 3, courses.length));
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {courses.slice(0, visibleCourses).map((course, index) => (
                    <CourseCard key={course.id} course={course} index={index} />
                ))}
            </div>
            {visibleCourses < courses.length && (
                <div className="text-center mt-12">
                    <motion.button
                        onClick={loadMoreCourses}
                        className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gray-900 border border-gray-800 rounded-full hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Load More Courses ({courses.length - visibleCourses} remaining)
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.button>
                </div>
            )}
        </>
    );
};