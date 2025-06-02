import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, CheckCircle, ArrowLeft, UserCheck, BookOpen, Download, FileText, Lock, X, BookOpenCheck, CalendarDays, Award, Eye, Star, StarHalf, ChevronDown, EyeOff, Folder, Check, Shield } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import emailjs from 'emailjs-com';
import CourseForm from '../components/CourseForm';
import { createClient } from '@supabase/supabase-js';
import { courses } from '../types/course';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PricingCard = styled(motion.div)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const CourseDetail: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [openPlan, setOpenPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        address: '',
        experience: ''
    });
    const { slug } = useParams<{ slug: string }>();
    const course = courses.find(c => c.slug === slug);
    const contentRef = useRef<HTMLDivElement>(null);
    const [selectedPlan, setSelectedPlan] = useState<'pdf' | 'professional' | null>(null);
    const [policyAgreed, setPolicyAgreed] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState<{
        text: string;
        type: 'success' | 'error' | 'info';
    } | undefined>();
    const [pdfPassword, setPdfPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const masterKey = 'UHFilms2025Admin';
    const [userDetails, setUserDetails] = useState<{ name: string, phone: string } | null>(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const handleNavigate = () => {
        navigate("/courses");
    };
    const [passwordAttempts, setPasswordAttempts] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState<
        'idle' | 'loading' | 'success' | 'error' | 'max_attempts'
    >('idle');
    const [showPassword, setShowPassword] = useState(false);

    const logFormEntry = async (formData: any) => {
        try {
            if (!formData.name || !formData.email || !formData.phone) {
                throw new Error('Name, email, and phone are required');
            }

            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                ...(formData.education && { education: formData.education }),
                ...(formData.address && { address: formData.address }),
                ...(formData.experience && { experience: formData.experience }),
                ...(course?.title && { course_title: course.title }),
                ...(selectedPlan && { plan_type: selectedPlan }),
                price: selectedPlan === 'pdf'
                    ? course?.pricing.pdf.price
                    : course?.pricing.professional.price
            };

            const { error } = await supabase
                .from('public_form_submissions')
                .insert(submissionData);

            if (error) throw error;

            const timestamp = new Date().toISOString();
            await fetch('/api/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'form_entry',
                    content: `
=== FORM ENTRY LOG - ${timestamp} ===
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Education: ${formData.education || 'Not provided'}
Address: ${formData.address || 'Not provided'}
Experience: ${formData.experience || 'Not provided'}
Course: ${course?.title}
Plan Type: ${selectedPlan}
Price: ₹${selectedPlan === 'pdf' ? course?.pricing.pdf.price : course?.pricing.professional.price}
===============================
          `
                })
            });

        } catch (error) {
            console.error('Error logging form entry:', error);
            setPaymentStatus({
                text: error instanceof Error ? error.message : 'Error saving your information',
                type: 'error'
            });
            return false;
        }
        return true;
    };

    const generateUniquePassword = (email: string, courseTitle: string) => {
        const timestamp = Date.now().toString(36);
        const emailHash = email.toLowerCase().split('@')[0].replace(/[^a-z0-9]/g, '');
        const courseHash = courseTitle.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5);
        return `${emailHash}_${courseHash}_${timestamp}`;
    };

    const logPaymentDetails = async (
        status: string,
        formData: any,
        paymentId: string,
        password: string
    ) => {
        try {
            const paymentData = {
                event_type: `payment_${status.toLowerCase()}`,
                payment_id: paymentId,
                status: status,
                amount: selectedPlan === 'pdf'
                    ? course?.pricing.pdf.price
                    : course?.pricing.professional.price,
                email: formData.email,
                pdf_password: password,
                created_at: new Date().toISOString(),
                raw_data: {
                    customer: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        ...(formData.education && { education: formData.education }),
                        ...(formData.address && { address: formData.address }),
                        ...(formData.experience && { experience: formData.experience })
                    },
                    course: {
                        ...(course?.title && { title: course.title }),
                        ...(selectedPlan && { plan_type: selectedPlan }),
                        price: selectedPlan === 'pdf'
                            ? course?.pricing.pdf.price
                            : course?.pricing.professional.price
                    },
                    pdf_password: password
                }
            };

            const { data, error } = await supabase
                .from('payment_events')
                .insert([paymentData]);

            if (error) {
                console.error('Supabase error details:', {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                    hint: error.hint
                });
                throw error;
            }

            console.log('Payment logged successfully:', data);



            const timestamp = new Date().toISOString();
            await fetch('/api/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'payment',
                    content: `
=== PAYMENT LOG - ${timestamp} ===
Status: ${status}
Payment ID: ${paymentId}
Amount: ₹${selectedPlan === 'pdf' ? course?.pricing.pdf.price : course?.pricing.professional.price}
Course: ${course?.title}
Plan Type: ${selectedPlan}

Customer Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Education: ${formData.education || 'Not provided'}
- Address: ${formData.address || 'Not provided'}
- Experience: ${formData.experience || 'Not provided'}

PDF Access:
- Password: ${password}
===============================
          `
                })
            });

        } catch (error) {
            console.error('Error logging payment:', error);
            setPaymentStatus({
                text: 'Error recording payment details',
                type: 'error'
            });
            throw error;
        }
    };

    const handlePurchase = async (submittedFormData: any) => {
        try {
            setFormData(submittedFormData);
            await logFormEntry(submittedFormData);

            setPaymentStatus({
                text: 'Initializing payment...',
                type: 'info'
            });

            setUserDetails({
                name: submittedFormData.name,
                phone: submittedFormData.phone
            });

            if (!submittedFormData.email?.trim()) {
                throw new Error('Email address is required');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(submittedFormData.email.trim())) {
                throw new Error('Please enter a valid email address');
            }

            const amount = selectedPlan === 'pdf' ? course?.pricing.pdf.price : course?.pricing.professional.price;
            const password = generateUniquePassword(submittedFormData.email, course?.title || '');

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount ? amount * 100 : 0,
                currency: 'INR',
                name: 'UH Films Academy',
                description: `${course?.title} - ${selectedPlan?.charAt(0).toUpperCase()}${selectedPlan?.slice(1)} Package`,
                image: 'https://res.cloudinary.com/dbtj6orw2/image/upload/v1745759555/logo.png',
                handler: function (response: any) {
                    handlePaymentSuccess(response, submittedFormData, amount || 0, password);
                },
                modal: {
                    ondismiss: function () {
                        setPaymentStatus({
                            text: 'Payment cancelled',
                            type: 'error'
                        });
                        logPaymentDetails('CANCELLED', submittedFormData, 'N/A', password);
                    }
                },
                prefill: {
                    name: submittedFormData.name,
                    email: submittedFormData.email.trim(),
                    contact: submittedFormData.phone
                },
                theme: {
                    color: import.meta.env.VITE_RAZORPAY_THEME_COLOR || '#EF4444'
                }
            };

            const razorpay = new (window as any).Razorpay(options);

            razorpay.on('payment.failed', function (response: any) {
                setPaymentStatus({
                    text: 'Payment failed',
                    type: 'error'
                });
                logPaymentDetails('FAILED', submittedFormData, response.error.metadata.payment_id, password);
            });

            razorpay.open();
        } catch (error) {
            setPaymentStatus({
                text: error instanceof Error ? error.message : 'Failed to initialize payment',
                type: 'error'
            });
        }
    };

    const handlePaymentSuccess = async (response: any, formData: any, amount: number, password: string) => {
        try {
            setPaymentStatus({
                text: 'Payment successful!',
                type: 'success'
            });

            await logPaymentDetails('SUCCESS', formData, response.razorpay_payment_id, password);

            await emailjs.send(
                'service_7j3g0zt',
                'template_p6eabpd',
                {
                    to_name: formData.name,
                    to_email: formData.email.trim(),
                    course_name: course?.title,
                    plan_type: selectedPlan,
                    payment_id: response.razorpay_payment_id,
                    amount: amount,
                    currency: 'INR',
                    pdf_password: password,
                    course_details: `${course?.title} - ${selectedPlan} Package`,
                    access_instructions: 'Use your unique password to access course materials',
                    support_contact: 'operations@uhfilms.com'
                },
                'FY9ZTQpWBrPu84xk_'
            );

            setNotificationMessage('Order details and PDF password have been sent to your email.');
            setShowNotification(true);

            setTimeout(() => {
                setShowForm(false);
                setShowNotification(false);
                resetPaymentState();
            }, 1500);

            pollPaymentStatus(response.razorpay_payment_id, formData.email);

        } catch (error) {
            console.error('Payment processing error:', error);
            setPaymentStatus({
                text: 'Payment successful but failed to send confirmation email. Please contact support.',
                type: 'error'
            });
        }
    };

    const handlePasswordSubmit = async () => {
        try {
            setPasswordStatus('loading');
            setPasswordError('');

            // Check against master key first
            if (pdfPassword === masterKey) {
                setPasswordStatus('success');
                setPasswordAttempts(0);

                const pdfUrl = course?.pricing.pdf.downloadLink;
                
                if (!pdfUrl) {
                    throw new Error('PDF download link not available');
                }

                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = `${course?.title.replace(/\s+/g, '_')}_materials.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setNotificationMessage('PDF download started!');
                setShowNotification(true);

                setTimeout(() => {
                    setShowPasswordModal(false);
                    setPasswordStatus('idle');
                    setPdfPassword('');
                }, 2000);
                return;
            }

            // If not master key, check against stored passwords
            const { data: paymentRecords, error } = await supabase
                .from('payment_events')
                .select('raw_data')
                .ilike('raw_data->>pdf_password', `%${pdfPassword}%`)
                .order('created_at', { ascending: false })
                .limit(1);

            if (error) throw error;

            if (paymentRecords && paymentRecords.length > 0) {
                setPasswordStatus('success');
                setPasswordAttempts(0);

                const pdfUrl = `/course-pdfs/${course?.slug}.pdf`;
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = `${course?.title.replace(/\s+/g, '_')}_materials.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setNotificationMessage('PDF download started!');
                setShowNotification(true);

                setTimeout(() => {
                    setShowPasswordModal(false);
                    setPasswordStatus('idle');
                    setPdfPassword('');
                }, 2000);
            } else {
                const attemptsLeft = 4 - passwordAttempts;
                setPasswordAttempts(prev => prev + 1);
                setPasswordStatus('error');

                if (passwordAttempts >= 4) {
                    setPasswordStatus('max_attempts');
                    setPasswordError('Maximum attempts reached. Please contact support.');
                } else {
                    setPasswordError(`Incorrect password. ${attemptsLeft} attempt(s) left.`);
                }
            }
        } catch (error) {
            console.error('Download error:', error);
            setPasswordStatus('error');
            setPasswordError(error instanceof Error ? error.message : 'Download failed');
        }
    };

    const handleForgotPassword = async () => {
        try {
            setPasswordStatus('loading');
            setPasswordError('');
            navigate(
                `/contact?subject=request-pdf-password&project=${encodeURIComponent(
                    `I would like to request password for my course\n\n` +
                    `Course Name:[Your course name] \n` +
                    `Payment ID:  [Your Payment ID]\n` +
                    `Date of Purchase: [Purchase Date]\n` +
                    `Address: [Your Address]`
                )
                }`
            );
        } catch (error) {
            console.error('Error redirecting to contact page:', error);
            setPasswordStatus('error');
            setPasswordError('Failed to redirect. Please try again.');
        }
    };

    const handleCertificateRequest = () => {
        // Set notification before redirecting
        setNotificationMessage('Redirecting to contact page...');
        setShowNotification(true);

        setTimeout(() => {
            // Close modals and notifications
            setShowCertificateModal(false);
            setShowNotification(false);

            // Redirect to contact page with query parameters
            navigate(`/contact?subject=request-certificate&project=I would like to request my certificate for my ( Please specify your course name )`);
        }, 1500);
    };




    const pollPaymentStatus = async (paymentId: string, email: string) => {
        let attempts = 0;
        const maxAttempts = 10;
        const interval = setInterval(async () => {
            try {
                const { data, error } = await supabase
                    .from('payment_events')
                    .select('*')
                    .eq('payment_id', paymentId)
                    .eq('email', email)
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (error) throw error;

                if (data && data.length > 0) {
                    const status = data[0].status;
                    if (status === 'captured') {
                        setPaymentStatus({
                            text: 'Payment successfully processed!',
                            type: 'success'
                        });
                        clearInterval(interval);
                    } else if (status === 'failed') {
                        setPaymentStatus({
                            text: 'Try Again',
                            type: 'error'
                        });
                        clearInterval(interval);
                    }
                }

                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Error polling payment status:', error);
                clearInterval(interval);
            }
        }, 2000);
    };




    const resetPaymentState = () => {
        setPaymentStatus(undefined);
        setFormData({
            name: '',
            email: '',
            phone: '',
            education: '',
            address: '',
            experience: ''
        });
        setSelectedPlan(null);
    };


    if (!course) {
        return (
            <div className="min-h-screen bg-black/95 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Course Not Found</h1>
                    <Link to="/courses" className="text-white hover:text-red-500 transition-colors">
                        Return to Courses
                    </Link>
                </div>
            </div>
        );
    }

    if (showForm) {
        return (
            <CourseForm
                courseTitle={course.title}
                price={selectedPlan === 'pdf' ? course.pricing.pdf.price : course.pricing.professional.price}
                planType={selectedPlan as 'pdf' | 'professional'}
                onSubmit={handlePurchase}
                paymentStatus={paymentStatus}
                initialValues={formData}
                handleBack={() => {
                    setShowForm(false);
                    resetPaymentState(); // Add state reset here
                }}
            />
        );
    }

    return (
        <>
            <Helmet>
                <title>{course.title} | UH Films Academy</title>
                <meta name="description" content={course.description} />
                <script src="https://checkout.razorpay.com/v1/checkout.js" async />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-28 md:pt-36  lg:pt-36 ">
                <div className="container mx-auto px-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNavigate}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-red-500" />
                        View more courses
                    </motion.button>



                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] md:aspect-[21/9] mb-6 md:mb-10"
                        >
                            {/* Category Badge - Top Left */}
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

                            {/* Gradient Overlay - Responsive Strength */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 md:via-black/50 to-transparent z-10" />

                            {/* Content Container */}
                            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
                                <div className="space-y-2 md:space-y-4">
                                    {/* Title - Responsive Sizing */}
                                    <h1 className="text-white text-lg md:text-3xl lg:text-4xl font-bold leading-snug md:leading-tight line-clamp-2">
                                        {course.title}
                                    </h1>

                                    {/* Description - Responsive Sizing */}
                                    <p className="text-gray-200 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                                        {course.description}
                                    </p>

                                    {/* Meta Info - Responsive Layout */}
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

                                    {/* Instructor & Rating - Enhanced Desktop */}
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

                                        {/* Full 5-Star Rating for Desktop */}
                                        <div className="hidden md:flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                                                ))}
                                            </div>
                                            <span className="text-sm font-bold text-white ml-1">5.0</span>
                                            <span className="text-xs text-gray-300 ml-1">(120)</span>
                                        </div>

                                        {/* Compact Rating for Mobile */}
                                        <div className="md:hidden flex items-center gap-1 bg-black/30 px-2 py-1 rounded-full">
                                            <Star className="w-3 h-3 fill-yellow-400" />
                                            <span className="text-xs font-medium text-white">5.0</span>
                                        </div>
                                    </div>

                                    {/* Desktop-only Visual Elements */}
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



                        <div ref={contentRef} className="content-section  pt-8 sm:pt-12">

                            <div className="flex flex-col md:flex-row gap-4 mb-8">
                                {/* Curriculum Section */}
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



                                <div className="flex flex-row md:flex-col gap-3   w-full md:w-64">
                                    {/* PDF Access Card */}
                                    <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden ">
                                        {/* Mobile Button with Compact Points */}
                                        <div className="md:hidden">
                                            <button
                                                onClick={() => setShowPasswordModal(true)}
                                                className="w-full flex flex-col items-center "
                                            >
                                                <div className="w-full flex items-center justify-center gap-2 p-3  bg-red-500 hover:bg-red-600 text-white transition-colors">
                                                    <Download className="w-4 h-4" />
                                                    <span className="text-sm whitespace-nowrap">Download PDFs</span>
                                                </div>

                                                {/* Mobile Points - Compact Grid */}
                                                <div className="p-1 pt-2 ">
                                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs">
                                                        <li className="flex items-start gap-2 text-gray-300">
                                                            <FileText className="w-3 h-3 mt-0.5 text-green-400 flex-shrink-0" />
                                                            <span>Resources</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-gray-300">
                                                            <FileText className="w-3 h-3 mt-0.5 text-blue-400 flex-shrink-0" />
                                                            <span>Course slides</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-gray-300">
                                                            <FileText className="w-3 h-3 mt-0.5 text-purple-400 flex-shrink-0" />
                                                            <span>Notes</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-gray-300">
                                                            <FileText className="w-3 h-3 mt-0.5 text-yellow-400 flex-shrink-0" />
                                                            <span>Guides</span>
                                                        </li>
                                                    </ul>
                                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                                        Password sent on mail
                                                    </p>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden md:block">
                                            <div className="flex items-center gap-3 p-4">
                                                <div className="bg-red-500/20 p-2 rounded-lg">
                                                    <Lock className="w-4 h-4 text-red-400" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-medium text-white">Course Materials</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">Download all resources</p>
                                                </div>
                                            </div>

                                            <div className="p-4 pt-0">
                                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                                    <Folder className="w-3 h-3" />
                                                    <span>Includes:</span>
                                                </div>
                                                <ul className="space-y-2 text-xs mb-4">
                                                    <li className="flex items-start gap-2 text-gray-300">
                                                        <FileText className="w-3 h-3 mt-0.5 text-green-400" />
                                                        <span>Complete course slides</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 text-gray-300">
                                                        <FileText className="w-3 h-3 mt-0.5 text-blue-400" />
                                                        <span>Exercise worksheets</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 text-gray-300">
                                                        <FileText className="w-3 h-3 mt-0.5 text-purple-400" />
                                                        <span>Reference guides</span>
                                                    </li>
                                                </ul>

                                                <button
                                                    onClick={() => setShowPasswordModal(true)}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    <span>Download All Materials</span>
                                                </button>
                                                <p className="text-xs text-gray-500 mt-2 text-center">
                                                    Password sent after payment
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Certificate Card */}
                                    <div className="flex-1">
                                        {/* Mobile View */}
                                        <button
                                            onClick={() => setShowCertificateModal(true)}
                                            className="md:hidden w-full flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden"
                                        >
                                            {/* Colored Button Header */}
                                            <div className="w-full bg-orange-500 hover:bg-orange-600 p-3 transition-colors rounded-t-lg">
                                                <div className="flex items-center justify-center gap-2 text-white">
                                                    <Folder className="w-4 h-4" />
                                                    <span className="text-sm whitespace-nowrap">Request Certificate</span>
                                                </div>
                                            </div>

                                            {/* Mobile Content */}
                                            <div className="p-3">
                                                <ul className="grid grid-cols-2 gap-2 text-xs">
                                                    <li className="flex items-start gap-1 text-gray-300">
                                                        <Check className="w-3 h-3 mt-0.5 text-green-400" />
                                                        <span>Verified</span>
                                                    </li>
                                                    <li className="flex items-start gap-1 text-gray-300">
                                                        <Check className="w-3 h-3 mt-0.5 text-green-400" />
                                                        <span>Official badge</span>
                                                    </li>
                                                    <li className="flex items-start gap-1 text-gray-300">
                                                        <Check className="w-3 h-3 mt-0.5 text-green-400" />
                                                        <span>Shareable</span>
                                                    </li>
                                                    <li className="flex items-start gap-1 text-gray-300">
                                                        <Clock className="w-3 h-3 mt-0.5 text-gray-400" />
                                                        <span>1-2 days</span>
                                                    </li>
                                                </ul>
                                                {/* Added processing time note for mobile */}
                                                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-2">
                                                    <Clock className="w-3 h-3" />
                                                    <span>1-2 business days</span>
                                                </div>
                                            </div>
                                        </button>

                                        {/* Desktop View */}
                                        <div className="hidden md:block bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden">
                                            {/* Card Content */}
                                            <div className="p-4">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="bg-orange-500/20 p-2 rounded-lg">
                                                        <Award className="w-4 h-4 text-orange-400" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-medium text-white">Course Certificate</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">Get your completion proof</p>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                                        <Shield className="w-3 h-3" />
                                                        <span>Features:</span>
                                                    </div>
                                                    <ul className="space-y-2 text-xs">
                                                        <li className="flex items-start gap-2 text-gray-300">
                                                            <Check className="w-3 h-3 mt-0.5 text-green-400" />
                                                            <span>Official completion badge</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-gray-300">
                                                            <Check className="w-3 h-3 mt-0.5 text-green-400" />
                                                            <span>Verification ID</span>
                                                        </li>
                                                        <li className="flex items-start gap-2 text-gray-300">
                                                            <Check className="w-3 h-3 mt-0.5 text-green-400" />
                                                            <span>Shareable credential</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Desktop Action Button - Now properly rounded and colored */}
                                            <div className="px-4 pb-4">
                                                <button
                                                    onClick={() => setShowCertificateModal(true)}
                                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    <span>Request Certificate</span>
                                                </button>
                                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                                                    <Clock className="w-3 h-3" />
                                                    <span>1-2 business days</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>





                            <AnimatePresence>
                                {showPasswordModal && (
                                    <>
                                        {/* Disable body scroll when modal is open */}
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
                                                            <p className={`text-sm mb-4 ${passwordStatus === 'error' ? 'text-red-500' : 'text-green-500'
                                                                }`}>
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

                            <AnimatePresence>
                                {showCertificateModal && (
                                    <>
                                        {/* Disable body scroll when modal is open */}
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
                                                {/* Policy Agreement */}
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

                                                {/* Request Button */}
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

                                                    {/* Price - Larger and highlighted on md+ */}
                                                    <p className="text-sm md:text-2xl font-semibold text-red-400">
                                                        ₹{course.pricing.pdf.price}
                                                        <span className="ml-1 text-gray-400 text-xs md:hidden">(Click to view details)</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Hide chevron on md+ */}
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

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseDetail; 