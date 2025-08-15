import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Award, UserCheck, Star, CheckCircle,ChevronDown, Download } from 'lucide-react';

const PricingSection = ({ course, openPlan, setOpenPlan, setSelectedPlan, setShowForm }) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-10 text-center">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PDF Package (Collapsible) */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden transition-all">
          <button
            onClick={() => setOpenPlan(openPlan === 'pdf' ? null : 'pdf')}
            className="w-full flex justify-between items-center p-4 md:p-6 hover:bg-gray-700/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-500/20 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg md:text-xl font-semibold text-white">PDF Package</h3>
                <p className="text-sm md:text-2xl font-semibold text-red-400">
                  ₹{course.pricing.pdf.price}
                  <span className="ml-1 text-gray-400 text-xs md:hidden">(Click to view details)</span>
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform md:hidden ${openPlan === 'pdf' ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {(openPlan === 'pdf' || typeof window !== 'undefined' && window.innerWidth >= 768) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-6 pt-0">
                  <ul className="space-y-3 mb-6">
                    {course.pricing.pdf.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gradient-to-r from-red-500/10 to-transparent p-4 rounded-lg mb-6">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Instant Access</span>
                      <span>Lifetime Updates</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPlan('pdf');
                      setShowForm(true);
                    }}
                    className="w-full py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF Package
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Professional Package (Default Open) */}
        <div className="bg-gradient-to-br from-red-500/15 to-orange-500/15 backdrop-blur-sm rounded-xl border border-red-500/30 overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-white">Professional Package</h3>
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-2xl md:text-4xl font-bold text-white mt-2">₹{course.pricing.professional.price}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/20 p-4 rounded-lg border border-gray-700/30">
                <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Course Includes
                </h4>
                <ul className="space-y-2">
                  {course.pricing.professional.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-300">{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-black/20 p-4 rounded-lg border border-gray-700/30">
                <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Premium Benefits
                </h4>
                <ul className="space-y-2">
                  {course.pricing.professional.features.slice(3).map((feature, index) => (
                    <li key={index} className="text-sm text-gray-300">{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg mb-6">
              <div className="flex justify-between text-xs text-gray-300 mb-2">
                <span>Certificate Included</span>
                <span>Priority Support</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-full"></div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedPlan('professional');
                setShowForm(true);
              }}
              className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
            >
              <UserCheck className="w-5 h-5" />
              Enroll in Professional
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;