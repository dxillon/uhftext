import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, FileText, AlertCircle, HelpCircle, ArrowLeft, MessageCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PolicyPage = () => {
    // Scroll to top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>

            <Helmet>
                {/* Primary Meta Tags */}
                <title>Refund, Shipping & Cancellation Policy | UH Films</title>
                <meta
                    name="description"
                    content="Read UH Films' detailed refund, shipping, and cancellation policy. Transparent terms for online digital film courses and services at uhfilms.in."
                />
                <meta
                    name="keywords"
                    content="UH Films refund policy, shipping policy, cancellation policy, online film course refund, digital course cancellation, uhfilms.in terms"
                />
                <meta name="author" content="UH Films" />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content="Refund, Shipping & Cancellation Policy | UH Films" />
                <meta
                    property="og:description"
                    content="Clear and transparent policies for refunds, shipping, and cancellations for all digital film courses and services offered by UH Films."
                />
                <meta property="og:url" content="https://uhfilms.in/policies" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="UH Films" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Refund, Shipping & Cancellation Policy | UH Films" />
                <meta
                    name="twitter:description"
                    content="Get clarity on our refund, shipping, and cancellation policies. UH Films ensures full transparency for all digital services and courses."
                />

                {/* Canonical URL */}
                <link rel="canonical" href="https://uhfilms.in/policies" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 pt-40 pb-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:w-3/4"
                        >
                            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-center md:text-left">
                                        Policies & Terms
                                    </h1>
                                    <p className="mt-3 text-gray-400 max-w-3xl text-center md:text-left">
                                        Comprehensive guidelines for our digital courses and services. Please read carefully before making a purchase.
                                    </p>
                                </div>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors md:self-end mb-1"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Back to Home
                                </Link>
                            </div>

                            {/* Digital Delivery Policy */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-16 bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-orange-500/20 p-3 rounded-full">
                                        <FileText className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Digital Delivery Policy</h2>
                                </div>

                                <div className="space-y-6 text-gray-300">
                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-orange-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">Instant Access to Digital Content</h3>
                                        <ul className="space-y-3 list-disc pl-5">
                                            <li>All course materials (PDFs, videos, resources) are delivered digitally immediately after successful payment</li>
                                            <li>You will receive an email with login credentials within 15 minutes of payment confirmation</li>
                                            <li>Check your spam folder if you don't see the email in your inbox</li>
                                            <li>Access is granted through our secure learning portal using the credentials provided</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-red-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">No Physical Products</h3>
                                        <ul className="space-y-3 list-disc pl-5">
                                            <li>All our courses are 100% digital - no physical materials will be shipped</li>
                                            <li>You are responsible for ensuring your device meets the technical requirements to access the content</li>
                                            <li>We recommend downloading all materials for offline access within 30 days of purchase</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-blue-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">Technical Requirements</h3>
                                        <ul className="space-y-3 list-disc pl-5">
                                            <li>Modern web browser (Chrome, Firefox, Safari, Edge) with JavaScript enabled</li>
                                            <li>PDF reader software for downloadable materials</li>
                                            <li>Stable internet connection for streaming content</li>
                                            <li>Minimum 2GB RAM and 500MB storage space on your device</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Refund Policy */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mb-16 bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-red-500/20 p-3 rounded-full">
                                        <AlertCircle className="w-6 h-6 text-red-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Refund Policy</h2>
                                </div>

                                <div className="space-y-6 text-gray-300">
                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-red-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">Refund Eligibility</h3>
                                        <ul className="space-y-3 list-disc pl-5">
                                            <li>Refund requests must be submitted within 24 hours of purchase</li>
                                            <li>No refunds will be processed after accessing any course materials</li>
                                            <li>Duplicate payments are eligible for 100% refund</li>
                                            <li>Technical issues must be reported within 24 hours for refund consideration</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-orange-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">Non-Refundable Situations</h3>
                                        <ul className="space-y-3 list-disc pl-5">
                                            <li>After downloading or accessing any course materials</li>
                                            <li>If 24 hours have passed since purchase</li>
                                            <li>For change of mind after accessing the course portal</li>
                                            <li>Failure to meet technical requirements on your device</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-green-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">Refund Process</h3>
                                        <ol className="space-y-3 list-decimal pl-5">
                                            <li>Email refund request to <span className="text-orange-400">refunds@uhfilms.in</span> within 24 hours</li>
                                            <li>Include your order number and reason for refund</li>
                                            <li>Our team will verify eligibility within 3 business days</li>
                                            <li>Approved refunds processed within 5-7 business days to original payment method</li>
                                            <li>You'll receive email confirmation upon completion</li>
                                        </ol>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Cancellation Policy */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-purple-500/20 p-3 rounded-full">
                                        <Clock className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Cancellation Policy</h2>
                                </div>

                                <div className="space-y-6 text-gray-300">
                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-purple-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">Cancellation Timeframe</h3>
                                        <ul className="space-y-3 list-disc pl-5">
                                            <li>Purchase cancellations must be requested within 24 hours of payment</li>
                                            <li>No cancellations allowed after accessing any course materials</li>
                                            <li>All cancellations are subject to verification</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-orange-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">How to Cancel</h3>
                                        <ol className="space-y-3 list-decimal pl-5">
                                            <li>Send email to <span className="text-orange-400">support@uhfilms.in</span> with subject "CANCELLATION REQUEST"</li>
                                            <li>Include your full name, order number, and purchase details</li>
                                            <li>Our team will confirm cancellation within 24 business hours</li>
                                            <li>Upon approval, access will be revoked and refund processed</li>
                                        </ol>
                                    </div>

                                    <div className="p-5 bg-gray-800/40 rounded-lg border-l-4 border-red-500">
                                        <h3 className="font-semibold text-white mb-3 text-lg">Important Notes</h3>
                                        <ul className="space-y-3 list-disc pl-5">
                                            <li>Any downloaded materials must be deleted upon cancellation</li>
                                            <li>Attempting to retain materials after cancellation violates our terms</li>
                                            <li>Abuse of cancellation policy may result in account suspension</li>
                                            <li>No cancellations for partially completed courses</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Quick Action Buttons - Mobile Only */}
                            <div className="lg:hidden fixed bottom-6 left-0 right-0 flex justify-center gap-4 px-4 z-10">
                                <Link
                                    to="/contact"
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full shadow-lg transition-all"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Contact Us
                                </Link>
                                <Link
                                    to="/faq"
                                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-3 rounded-full shadow-lg transition-all"
                                >
                                    <HelpCircle className="w-5 h-5" />
                                    FAQ
                                </Link>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="lg:w-1/4 lg:sticky lg:self-start lg:top-28"
                        >
                            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-orange-400" />
                                    Support Center
                                </h3>

                                <div className="space-y-6">
                                    {/* Quick Action Buttons */}
                                    <div className="space-y-3">
                                        <Link
                                            to="/contact"
                                            className="flex items-center justify-between gap-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:text-orange-200 px-4 py-3 rounded-lg transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <MessageCircle className="w-5 h-5" />
                                                <span>Contact Support</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                        <Link
                                            to="/faq"
                                            className="flex items-center justify-between gap-3 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/30 text-gray-300 hover:text-white px-4 py-3 rounded-lg transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <HelpCircle className="w-5 h-5" />
                                                <span>FAQ Section</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-4 pt-4 border-t border-gray-700/50">
                                        <h4 className="font-medium text-white">Get in Touch</h4>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-orange-500/20 p-2 rounded-full mt-1">
                                                <MapPin className="w-4 h-4 text-orange-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Location</h4>
                                                <p className="text-gray-400 text-sm">Delhi, India</p>
                                                <p className="text-orange-400 text-xs mt-1">Studio visits by appointment only</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-orange-500/20 p-2 rounded-full mt-1">
                                                <Phone className="w-4 h-4 text-orange-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Call Us</h4>
                                                <p className="text-gray-400 text-sm">Mon-Fri, 10am-6pm IST</p>
                                                <a href="tel:+918920476445" className="text-orange-400 hover:text-orange-300 text-sm block mt-1 transition-colors">
                                                    +91 8920476445
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-orange-500/20 p-2 rounded-full mt-1">
                                                <Mail className="w-4 h-4 text-orange-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Email Us</h4>
                                                <a href="mailto:operations@uhfilms.in" className="text-orange-400 hover:text-orange-300 text-sm block mt-1 transition-colors">
                                                    operations@uhfilms.in
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Emergency Notice */}
                                    <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 mt-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                            <p className="text-sm text-red-300">
                                                For urgent issues outside business hours, please email with "URGENT" in the subject line. Response within 12 hours guaranteed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PolicyPage;