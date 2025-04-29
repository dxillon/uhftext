import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, FileDown, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import Lottie from "lottie-react";
import downloadAnimation from "../downloadAnimation.json";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordSubmit: (password: string) => void;
  isIncorrectPassword: boolean;
  projectTitle: string;
  isDownloading: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onPasswordSubmit,
  isIncorrectPassword,
  projectTitle,
  isDownloading
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPasswordSubmit(password);
    setPassword('');
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2 }}
            className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-bold text-white">Confidential Document</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileDown className="w-6 h-6 text-red-500" />
                  <p className="text-gray-300 text-lg">
                    <span className="font-semibold text-white">{projectTitle}</span> Pitch-deck.pptx
                  </p>
                </div>

                {/* Request Access Button */}
                <button
                  onClick={() => window.location.href = '/contact'} // Change '/contact' to your contact page URL
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Request Access
                </button>
              </div>


              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Enter Password to Download
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-gray-800 border ${isIncorrectPassword ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 pr-12`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isIncorrectPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-3"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-400 font-medium">Incorrect Password</p>
                        <p className="text-gray-300 text-sm mt-1">
                          This is a confidential file. Unauthorized access attempts may lead to legal action.

                        </p>
                      </div>

                      {/* New small box below */}
                      <div className="bg-red-800/30 border border-red-600 rounded-md p-3">
                        <p className="text-red-300 text-sm font-bold">
                          If the password is incorrect please{' '}
                          <a
                            href="/contact"
                            className="inline-block px-2 py-0.5 border border-red-400 rounded-md text-red-300 hover:bg-red-700 hover:text-white transition text-xs"
                          >
                            contact us
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${isDownloading
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                    } text-white`}
                >
                  {isDownloading ? (
                    <Lottie animationData={downloadAnimation} loop autoplay className="w-6 h-6" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  {isDownloading ? 'Downloading...' : 'Verify & Download'}
                </button>
              </form>

              <p className="mt-6 text-xs text-gray-400 text-center">
                This document contains confidential information about the project.
                Sharing without authorization is strictly prohibited.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordModal;