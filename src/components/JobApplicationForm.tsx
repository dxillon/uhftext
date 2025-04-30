import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';
import { BsTwitterX, BsThreads } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const SocialIcon = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors duration-300"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

interface JobApplicationFormProps {
  selectedRole?: string | null;
  handleBack?: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ selectedRole, handleBack }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromUrl = params.get('role');
    if (roleFromUrl) {
      setRole(decodeURIComponent(roleFromUrl));
    } else if (selectedRole) {
      setRole(selectedRole);
    }
  }, [location.search, selectedRole]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_a5tly1m',
        'template_57jdkuq',
        formRef.current!,
        'lJX7YKVh5gsW2x9rS'
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        portfolio: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onBack = () => {
    if (handleBack) {
      handleBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Apply – Careers at Urban Hustle Films</title>
        <meta name="description" content="Apply for exciting roles in filmmaking, production, editing, and more at Urban Hustle Films." />
        <link rel="canonical" href="https://uhfilms.in/careers/apply" />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-500" />
              Back to listings
            </motion.button>

            <div className="p-8 bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800">
              {submitStatus !== 'success' ? (
                <>
                  <h2 className="text-3xl font-bold text-white mb-2">Apply for Position</h2>
                  <p className="text-xl text-red-500 font-semibold mb-8">{role}</p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="role" value={role} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                          Years of Experience *
                        </label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          required
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300 mb-2">
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Information *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Location, Degree, student etc."
                        className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Application
                        </>
                      )}
                    </button>

                    {submitStatus === 'error' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-center"
                      >
                        Error submitting application. Please try again or contact us directly.
                      </motion.p>
                    )}
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Your application has been submitted successfully. We'll be in touch soon!
                  </p>
                </motion.div>
              )}

              {/* Social Media Section - always visible but more prominent after submission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: submitStatus === 'success' ? 0 : 0.5 }}
                className={`mt-10 p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-gray-800 ${submitStatus === 'success' ? 'border-red-500' : ''
                  }`}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {submitStatus === 'success' ? 'Stay Connected With Us' : 'Follow Us for Updates'}
                </h3>
                <p className="text-gray-300 mb-4">
                  {submitStatus === 'success'
                    ? 'While you wait, connect with us on social media:'
                    : 'Stay connected with Urban Hustle Films for more opportunities and updates!'}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <SocialIcon
                    icon={Instagram}
                    href="https://www.instagram.com/urbanhustlefilms"
                    label="Follow us on Instagram"
                  />
                  <SocialIcon
                    icon={Youtube}
                    href="https://www.youtube.com/@urbanhustlefilms"
                    label="Subscribe on YouTube"
                  />
                  <SocialIcon
                    icon={Facebook}
                    href="https://www.facebook.com/people/Urban-Hustle-Films/61573424103083"
                    label="Follow us on Facebook"
                  />
                  <SocialIcon
                    icon={BsTwitterX}
                    href="https://x.com/urbanhustlefilm"
                    label="Follow us on Twitter"
                  />
                  <SocialIcon
                    icon={FaLinkedinIn}
                    href="https://www.linkedin.com/company/urbanhustlefilms/"
                    label="Follow us on LinkedIn"
                  />
                  <SocialIcon
                    icon={BsThreads}
                    href="https://www.threads.net/@urbanhustlefilms"
                    label="Follow us on Threads"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;
