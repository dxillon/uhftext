import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, User, Loader, Mail, MapPin, Globe, ArrowLeft, Instagram, Youtube, Facebook, Twitter, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CourseFormProps {
    courseTitle: string;
    price: number;
    planType: 'pdf' | 'professional';
    onSubmit: (formData: any) => void;
    paymentStatus?: {
        text: string;
        type: 'success' | 'error' | 'info';
    };
    handleBack: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ courseTitle, price, planType, onSubmit, paymentStatus, handleBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the form opens
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        education: '',
        experience: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onBack = () => {
        handleBack();
    };

    const [isLoading, setIsLoading] = useState(false);

    const getButtonStyle = () => {
        if (!paymentStatus) return 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600';
        switch (paymentStatus.type) {
            case 'success':
                return 'bg-gradient-to-r from-green-500 to-emerald-500';
            case 'error':
                return 'bg-gradient-to-r from-red-600 to-rose-600';
            case 'info':
                return 'bg-gradient-to-r from-blue-500 to-cyan-500';
            default:
                return 'bg-gradient-to-r from-red-500 to-orange-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-900 py-36 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-white group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-500" />
                        Back to course
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/faq')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white group bg-gray-800/50 px-4 py-2 rounded-lg"
                    >
                        <HelpCircle className="w-5 h-5 text-red-500" />
                        Have questions?
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 shadow-xl">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent inline-block">
                                    {courseTitle}
                                </h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${planType === 'professional'
                                            ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-300'
                                            : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300'
                                        }`}>
                                        {planType.charAt(0).toUpperCase() + planType.slice(1)} Package
                                    </span>
                                    <span className="text-xl font-bold text-white">₹{price}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div whileHover={{ y: -2 }}>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                                placeholder="Enter your full name"
                                            />
                                            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </motion.div>

                                    <motion.div whileHover={{ y: -2 }}>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                                placeholder="Enter your email"
                                            />
                                            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div whileHover={{ y: -2 }}>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                                placeholder="Enter your phone number"
                                            />
                                            <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                        </div>
                                    </motion.div>

                                    <motion.div whileHover={{ y: -2 }}>
                                        <label htmlFor="education" className="block text-sm font-medium text-gray-300 mb-2">
                                            Education
                                        </label>
                                        <input
                                            type="text"
                                            id="education"
                                            name="education"
                                            value={formData.education}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            placeholder="Your highest education"
                                        />
                                    </motion.div>
                                </div>

                                <motion.div whileHover={{ y: -2 }}>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                                        Address
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                            placeholder="Enter your address"
                                        />
                                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                                    </div>
                                </motion.div>

                                <motion.div whileHover={{ y: -2 }}>
                                    <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                                        Relevant Experience
                                    </label>
                                    <textarea
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                        placeholder="Tell us about your experience in filmmaking (if any)"
                                    />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <button
                                        type="submit"
                                        className={`w-full text-white py-4 rounded-lg font-semibold transition-all ${getButtonStyle()} hover:shadow-lg relative overflow-hidden group`}
                                        disabled={paymentStatus?.type === 'info' || isLoading}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <Loader className="w-5 h-5 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : paymentStatus ?
                                                (paymentStatus.type === 'error' ? 'Try Again' : paymentStatus.text)
                                                : 'Proceed to Payment'}
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 group-hover:from-white/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </button>
                                </motion.div>

                                {paymentStatus?.type === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 bg-green-500/20 text-green-400 rounded-lg flex items-center gap-2 border border-green-500/30"
                                    >
                                        <Loader className="w-5 h-5 animate-spin" />
                                        <span>Taking you back to course page...</span>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg rounded-xl p-8 h-fit border border-gray-700/50 shadow-xl"
                    >
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg mr-4">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                Contact Information
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="flex items-start bg-gray-800/30 p-4 rounded-lg border border-gray-700/50"
                            >
                                <div className="bg-red-500/20 p-3 rounded-full mr-4">
                                    <MapPin className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">Location</h3>
                                    <p className="text-gray-400 mt-1">Delhi, India</p>
                                    <p className="text-red-400 mt-1">Studio visits by appointment only</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                className="flex items-start bg-gray-800/30 p-4 rounded-lg border border-gray-700/50"
                            >
                                <div className="bg-red-500/20 p-3 rounded-full mr-4">
                                    <Phone className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">Call Us</h3>
                                    <p className="text-gray-400 mt-1">Mon-Fri, 10am-6pm IST</p>
                                    <a
                                        href="tel:+918920476445"
                                        className="text-red-400 hover:text-red-300 transition-colors block mt-1"
                                    >
                                        +91 8920476445
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                className="flex items-start bg-gray-800/30 p-4 rounded-lg border border-gray-700/50"
                            >
                                <div className="bg-red-500/20 p-3 rounded-full mr-4">
                                    <Mail className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">Email Us</h3>
                                    <p className="text-gray-400 mt-1">Our team is here to help</p>
                                    <a
                                        href="mailto:operations@uhfilms.in"
                                        className="text-red-400 hover:text-red-300 transition-colors block mt-1"
                                    >
                                        operations@uhfilms.in
                                    </a>
                                </div>
                            </motion.div>

                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { icon: Instagram, url: "https://www.instagram.com/urbanhustlefilms" },
                                        { icon: Youtube, url: "https://www.youtube.com/@urbanhustlefilms" },
                                        { icon: Facebook, url: "https://www.facebook.com/people/Urban-Hustle-Films/61573424103083" },
                                        { icon: Twitter, url: "https://x.com/urbanhustlefilm" }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            whileHover={{ y: -3, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-gray-800 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-orange-500/20 text-gray-300 hover:text-white p-3 rounded-full transition-all duration-300 shadow-sm"
                                            aria-label={social.icon.name}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="mt-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg border border-red-500/20"
                            >
                                <h3 className="text-lg font-medium text-white mb-2">Need Help?</h3>
                                <p className="text-gray-400 mb-3">Check our FAQ section for quick answers</p>
                                <motion.button
                                    whileHover={{ x: 3 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/faq')}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <HelpCircle className="w-5 h-5" />
                                    Visit FAQ Page
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;