import { AnimatePresence, motion } from 'framer-motion';
import { X, Eye, EyeOff, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const PasswordModal = ({
  showPasswordModal,
  setShowPasswordModal,
  passwordStatus,
  setPasswordStatus,
  pdfPassword,
  setPdfPassword,
  passwordError,
  setPasswordError,
  showPassword,
  setShowPassword,
  passwordAttempts,
  setPasswordAttempts,
  masterKey,
  course,
  handlePasswordSubmit,
  handleForgotPassword
}) => {
  return (
    <AnimatePresence>
      {showPasswordModal && (
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
              className="bg-gray-800 rounded-xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordStatus('idle');
                  setPasswordError('');
                  setPdfPassword('');
                  setShowPassword(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-bold text-white mb-4">Access Course Materials</h3>

              {passwordStatus === 'max_attempts' ? (
                <div className="text-center">
                  <p className="text-red-500 mb-4">Maximum attempts reached</p>
                  <Link
                    to={{
                      pathname: "/contact",
                      search: `?subject=incorrect-pdf-password&project=${encodeURIComponent(
                        `I would like to request password for my course\n\n` +
                        `Course Name:[Your course name] \n` +
                        `Payment ID:  [Your Payment ID]\n` +
                        `Date of Purchase: [Purchase Date]\n` +
                        `Address: [Your Address]\n\n` +
                        `We will share your password on your email `
                      )}`
                    }}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 mb-4">
                    Enter the password to download the PDF
                  </p>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={pdfPassword}
                      onChange={(e) => setPdfPassword(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-4 pr-10"
                      placeholder="Enter PDF password"
                      disabled={passwordStatus === 'loading'}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {passwordError && (
                    <p className={`text-sm mb-4 ${passwordStatus === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                      {passwordError}
                    </p>
                  )}

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handlePasswordSubmit}
                      disabled={passwordStatus === 'loading' || !pdfPassword}
                      className={`${passwordStatus === 'loading' ? 'bg-blue-500' :
                        passwordStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50`}
                    >
                      {passwordStatus === 'loading' ? 'Verifying...' :
                        passwordStatus === 'success' ? 'Downloading...' : 'Access PDF'}
                    </button>

                    <button
                      onClick={handleForgotPassword}
                      disabled={passwordStatus === 'loading'}
                      className="text-gray-400 hover:text-white text-sm disabled:opacity-50"
                    >
                      Forgot password? <span className="text-red-400">Contact support</span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;