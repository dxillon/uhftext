import TopLoadingBar from "./TopLoadingBar";
import { useLoading } from './LoadingContext';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import CourseForm from '../components/CourseForm';
import { createClient } from '@supabase/supabase-js';
import { courses } from '../types/course';
import CourseHeader from '../CourseDetail/CourseHeader';
import CurriculumSection from '../CourseDetail/CurriculumSection';
import MaterialsCard from '../CourseDetail/MaterialsCard';
import CertificateCard from '../CourseDetail/CertificateCard';
import PricingSection from '../CourseDetail/PricingSection';
import PasswordModal from '../CourseDetail/PasswordModal';
import CertificateModal from '../CourseDetail/CertificateModal';

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
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const [passwordStatus, setPasswordStatus] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'max_attempts'
  >('idle');
  const [showPassword, setShowPassword] = useState(false);

  const handleNavigate = () => {
    navigate("/courses");
  };


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

        const pdfUrl = course?.downloadLink;

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

        const pdfUrl = course?.downloadLink;


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

  const { isLoading, stopLoading } = useLoading();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const navigationType = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationType?.type === 'navigate') {
      setIsInitialLoad(true);
      stopLoading(); // Ensure loading stops if directly accessed
    } else {
      setIsInitialLoad(false);
    }

    return () => stopLoading();
  }, [stopLoading]);



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
          resetPaymentState();
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

      <TopLoadingBar isLoading={!isInitialLoad && isLoading} onFinish={stopLoading} />

      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-28 md:pt-36 lg:pt-36">
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
            <CourseHeader course={course} />

            <div ref={contentRef} className="content-section pt-8 sm:pt-12">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <CurriculumSection
                  course={course}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                />

                <div className="flex flex-row md:flex-col gap-3 w-full md:w-64">
                  <MaterialsCard
                    setShowPasswordModal={setShowPasswordModal}
                    course={course}
                  />
                  <CertificateCard
                    setShowCertificateModal={setShowCertificateModal}
                    setPolicyAgreed={setPolicyAgreed}
                  />
                </div>
              </div>

              <PasswordModal
                showPasswordModal={showPasswordModal}
                setShowPasswordModal={setShowPasswordModal}
                passwordStatus={passwordStatus}
                setPasswordStatus={setPasswordStatus}
                pdfPassword={pdfPassword}
                setPdfPassword={setPdfPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                passwordAttempts={passwordAttempts}
                setPasswordAttempts={setPasswordAttempts}
                masterKey={masterKey}
                course={course}
                handlePasswordSubmit={handlePasswordSubmit}
                handleForgotPassword={handleForgotPassword}
              />

              <CertificateModal
                showCertificateModal={showCertificateModal}
                setShowCertificateModal={setShowCertificateModal}
                policyAgreed={policyAgreed}
                setPolicyAgreed={setPolicyAgreed}
                showNotification={showNotification}
                notificationMessage={notificationMessage}
                handleCertificateRequest={handleCertificateRequest}
              />

              <PricingSection
                course={course}
                openPlan={openPlan}
                setOpenPlan={setOpenPlan}
                setSelectedPlan={setSelectedPlan}
                setShowForm={setShowForm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;