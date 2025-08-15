import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, ChevronDown  } from 'lucide-react';

const CurriculumSection = ({ course, openIndex, setOpenIndex }) => {
  return (
    <div className="flex-1 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4">
      <h2 className="text-xl font-bold text-white mb-4">Course Curriculum</h2>
      <div className="grid gap-2">
        {course.curriculum.map((module, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={module.title}
              layout
              initial={{ borderRadius: 12 }}
              className="bg-gray-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/30"
              whileHover={{ borderColor: "rgba(239, 68, 68, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                layout
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-4 py-3 sm:px-6 sm:py-5 flex justify-between items-center text-left"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-1">
                  <motion.h3
                    className="text-white font-semibold text-base sm:text-lg"
                    animate={{ color: isOpen ? "#ef4444" : "#ffffff" }}
                    transition={{ duration: 0.2 }}
                  >
                    {module.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 text-xs sm:text-base mt-1"
                    animate={{ opacity: isOpen ? 0.8 : 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {module.description}
                  </motion.p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 ml-2 sm:ml-4">
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs">
                    <motion.div
                      animate={{
                        rotate: isOpen ? 360 : 0,
                        color: isOpen ? "#ef4444" : "#f87171"
                      }}
                      transition={{
                        rotate: {
                          duration: 3,
                          ease: "linear",
                          repeat: isOpen ? Infinity : 0
                        },
                        color: { duration: 0.3 }
                      }}
                    >
                      <Clock className="w-4 h-4 text-current" />
                    </motion.div>
                    <span className="text-xs sm:text-sm whitespace-nowrap">
                      {module.duration}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    layout
                    initial={{
                      opacity: 0,
                      height: 0,
                      paddingBottom: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      paddingBottom: "1rem"
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      paddingBottom: 0
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                    className="px-4 sm:px-6 overflow-hidden"
                  >
                    <ul className="space-y-2 sm:space-y-3 text-xs sm:text-base text-gray-300">
                      {Array.isArray(module.points) ? (
                        module.points.map((point, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start gap-2 sm:gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                          >
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mt-0.5 sm:mt-1 flex-shrink-0" />
                            <span className="leading-relaxed">{point}</span>
                          </motion.li>
                        ))
                      ) : (
                        <li className="text-gray-400 text-xs sm:text-sm italic">No topics listed.</li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CurriculumSection;