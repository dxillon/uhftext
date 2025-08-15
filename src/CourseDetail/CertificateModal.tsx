import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, Star, Shield, Clock, FileText } from 'lucide-react';

const CertificateModal = ({
  showCertificateModal,
  setShowCertificateModal,
  policyAgreed,
  setPolicyAgreed,
  showNotification,
  notificationMessage,
  handleCertificateRequest
}) => {
  return (
    <AnimatePresence>
      {showCertificateModal && (
        <>
          <style jsx global>{`
            body {
              overflow: hidden;
            }
          `}</style>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full relative max-h-[90vh] overflow-hidden"
            >
              <button
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-bold text-white mb-4">Request Course Certificate</h3>

              <p className="text-gray-400 mb-4">
                Complete the course and submit your final project to receive your certificate.
              </p>
              <p className="text-gray-400 mb-4"> For submissions / Details operations@uhfilms.com.</p>
              
              <div className="mb-6">
                <div className="bg-gray-900 rounded-lg p-4 max-h-[200px] overflow-y-auto mb-4 text-xs text-gray-400 space-y-3">
                  <h4 className="text-sm font-semibold text-white mb-2">Certificate Terms & Conditions</h4>

                  <p><strong>1. Eligibility Requirements:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Completion of all course modules and assignments</li>
                    <li>Passing score on all required assessments</li>
                    <li>Original work submission with no plagiarism</li>
                  </ul>

                  <p><strong>2. Certificate Content:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Legal name as registered in your account will be used</li>
                    <li>No nicknames, pseudonyms or offensive names permitted</li>
                    <li>Certificate details cannot be edited after issuance</li>
                  </ul>

                  <p><strong>3. Legal Provisions:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Misrepresentation of credentials is prohibited</li>
                    <li>Falsifying information may result in legal action</li>
                    <li>Certificates remain property of the institution</li>
                  </ul>

                  <p><strong>4. Usage Restrictions:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Not a substitute for accredited academic credentials</li>
                    <li>Cannot be used for misleading representations</li>
                    <li>Must not be altered or modified in any way</li>
                  </ul>

                  <p><strong>5. Verification:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Contains unique verification ID</li>
                    <li>Can be validated through our official portal</li>
                    <li>Institution reserves right to revoke if terms are violated</li>
                  </ul>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="policy-agreement"
                    checked={policyAgreed}
                    onChange={() => setPolicyAgreed(!policyAgreed)}
                    className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="policy-agreement" className="text-sm text-gray-300">
                    I understand and agree to all certificate terms and conditions above. I certify that all information provided is accurate and I accept legal responsibility for any misrepresentation.
                  </label>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={handleCertificateRequest}
                  disabled={!policyAgreed}
                  className={`w-full px-6 py-3 rounded-lg transition-colors relative overflow-hidden ${policyAgreed
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Submit Request
                  {showNotification && (
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute inset-0 bg-green-500 flex items-center justify-center"
                    >
                      {notificationMessage}
                    </motion.span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;