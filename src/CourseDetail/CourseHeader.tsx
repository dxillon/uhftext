import { motion } from 'framer-motion';
import { Clock, User, BookOpenCheck, CalendarDays, Star } from 'lucide-react';

const CourseHeader = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] md:aspect-[21/9] mb-6 md:mb-10"
    >
      {/* Category Badge */}
      <div className="absolute top-3 left-3 md:top-6 md:left-6 z-30">
        <span className="inline-block bg-red-500 text-white text-xs md:text-sm font-bold px-2.5 md:px-3 py-1 md:py-1.5 rounded-full uppercase tracking-wider shadow-md">
          {course.category}
        </span>
      </div>

      {/* Background Image */}
      <img
        src={course.coverImage}
        alt={course.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 md:via-black/50 to-transparent z-10" />

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-white text-lg md:text-3xl lg:text-4xl font-bold leading-snug md:leading-tight line-clamp-2">
            {course.title}
          </h1>

          <p className="text-gray-200 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
            {course.description}
          </p>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4 pt-1">
            <div className="flex items-center gap-1.5 md:gap-2 bg-black/30 md:bg-transparent px-2 py-1 md:p-0 rounded-full md:rounded-none">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-red-300 flex-shrink-0" />
              <span className="text-xs md:text-sm text-white">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-black/30 md:bg-transparent px-2 py-1 md:p-0 rounded-full md:rounded-none">
              <User className="w-4 h-4 md:w-5 md:h-5 text-red-300 flex-shrink-0" />
              <span className="text-xs md:text-sm text-white">{course.instructor.name}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-black/30 md:bg-transparent px-2 py-1 md:p-0 rounded-full md:rounded-none">
              <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-red-300 flex-shrink-0" />
              <span className="text-xs md:text-sm text-white">{course.releaseDate}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-black/30 md:bg-transparent px-2 py-1 md:p-0 rounded-full md:rounded-none">
              <BookOpenCheck className="w-4 h-4 md:w-5 md:h-5 text-red-300 flex-shrink-0" />
              <span className="text-xs md:text-sm text-white">{course.modulesCount} Modules</span>
            </div>
          </div>

          {/* Instructor & Rating */}
          <div className="flex justify-between items-center pt-2 md:pt-4">
            <div className="flex items-center gap-2 md:gap-3 bg-black/30 md:bg-black/40 px-2 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-7 h-7 md:w-9 md:h-9 rounded-full object-cover border border-red-400/50 md:border-2"
              />
              <div>
                <div className="text-xs md:text-base font-medium text-white">{course.instructor.name}</div>
                <div className="text-[10px] md:text-xs text-red-200">Lead Instructor</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-white ml-1">5.0</span>
              <span className="text-xs text-gray-300 ml-1">(120)</span>
            </div>

            <div className="md:hidden flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400" />
              <span className="text-xs font-medium text-white">5.0</span>
            </div>
          </div>

          <div className="hidden md:block pt-3">
            <div className="flex justify-between items-center text-xs text-gray-300">
              <span>Certification Included</span>
              <span>Downloadable Resources</span>
              <span>24/7 Support</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent my-2"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseHeader;