import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Check, AlertTriangle, Instagram, Youtube, Facebook, Twitter,User } from 'lucide-react';
import anime from 'animejs';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

// Define subject options for the dropdown
const subjectOptions = [
  { value: 'production-inquiry', label: 'Film Production Inquiry' },
  { value: 'collaboration', label: 'Collaboration Opportunity' },
  { value: 'casting', label: 'Casting Information' },
  { value: 'location-scouting', label: 'Location Scouting' },
  { value: 'equipment-rental', label: 'Equipment Rental' },
  { value: 'general-support', label: 'General Support' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' }
];

// Form field type
type FormField = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

// Initial form state
const initialFormState: FormField = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const ContactPage = () => {
  const [formData, setFormData] = useState<FormField>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormField>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const formRef = useRef<HTMLFormElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLSelectElement>(null),
    message: useRef<HTMLTextAreaElement>(null)
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormField]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<FormField> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitStatus('submitting');
      
      try {
        // Replace these with your EmailJS service details
        const result = await emailjs.send(
          'service_a5tly1m',
          'template_z0pckoc',
          {
            from_name: formData.name,
            reply_to: formData.email,
            phone_number: formData.phone,
            subject: subjectOptions.find(opt => opt.value === formData.subject)?.label || formData.subject,
            message: formData.message
          },
          'lJX7YKVh5gsW2x9rS'
        );

        if (result.status === 200) {
          setSubmitStatus('success');
          setFormData(initialFormState);
          
          // Reset form after 3 seconds
          setTimeout(() => {
            setSubmitStatus('idle');
          }, 3000);
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Failed to send email:', error);
        setSubmitStatus('error');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      }
    } else {
      // Shake the form on error
      anime({
        targets: formRef.current,
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 500,
        easing: 'easeInOutSine'
      });
    }
  };

  // Animation for page elements on mount
  useEffect(() => {
    if (pageRef.current) {
      anime({
        targets: pageRef.current.querySelectorAll('.animate-in'),
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
  }, []);

  // Add focus animations to form inputs
  useEffect(() => {
    const addInputAnimation = (el: HTMLElement | null, labelEl: Element | null) => {
      if (!el || !labelEl) return;
      
      el.addEventListener('focus', () => {
        anime({
          targets: labelEl,
          translateY: [-5, -5],
          translateX: [0, 5],
          color: '#ef4444',
          duration: 300,
          easing: 'easeOutCubic'
        });
      });
      
      el.addEventListener('blur', () => {
        if (!el.value) {
          anime({
            targets: labelEl,
            translateY: [-5, -5],
            translateX: [5, 0],
            color: '#9ca3af',
            duration: 300,
            easing: 'easeOutCubic'
          });
        }
      });
    };
    
    // Apply animations to each input field
    Object.entries(inputRefs).forEach(([key, ref]) => {
      const labelEl = formRef.current?.querySelector(`label[for="${key}"]`);
      addInputAnimation(ref.current, labelEl);
    });
  }, []);

  return (
    <>
            <Helmet>
        <title>Contact Us – Urban Hustle Films</title>
        <meta name="description" content="Get in touch with Urban Hustle Films for collaborations, inquiries, and partnerships." />
        <link rel="canonical" href="https://uhfilms.in/contact" />
      </Helmet>
    <div ref={pageRef} className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in">
            <span className="text-red-500">Connect</span>{' '}
             <span className="text-white">With Us</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-in">
            Ready to bring your vision to life? We're excited to hear from you and discuss how we can help create your next masterpiece.
          </p>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-2 animate-in">
            <div className="bg-gray-900/70 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-xl border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center  text-white">
                 <User className="w-7 h-7 text-red-500 mr-3" />
                Get in Touch
              </h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-group">
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    ref={inputRefs.name}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                {/* Email & Phone Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      ref={inputRefs.email}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label 
                      htmlFor="phone" 
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      ref={inputRefs.phone}
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-gray-800/50 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300`}
                      placeholder="+91 9876543210"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                {/* Subject Field */}
                <div className="form-group">
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Subject *
                  </label>
                  <div className="relative">
                    <select
                      ref={inputRefs.subject}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-gray-800/50 border ${errors.subject ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300 appearance-none`}
                    >
                      <option value="" disabled>Select a subject</option>
                      {subjectOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>
                
                {/* Message Field */}
                <div className="form-group">
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    ref={inputRefs.message}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-gray-800/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300`}
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-300 flex items-center justify-center
                      ${submitStatus === 'success' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'} text-white`}
                  >
                    {submitStatus === 'idle' && (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                    
                    {submitStatus === 'submitting' && (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    )}
                    
                    {submitStatus === 'success' && (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Message Sent!
                      </>
                    )}
                    
                    {submitStatus === 'error' && (
                      <>
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Try Again
                      </>
                    )}
                  </button>
                </div>
                
                {/* Form note */}
                <p className="text-sm text-gray-400 text-center mt-4">
                  Fields marked with * are required
                </p>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-1 animate-in">
            <div className="bg-gray-900/70 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-xl border border-gray-800 h-full">
              <h2 className="text-2xl font-bold mb-8 flex items-center  text-white">
                <User className="w-7 h-7 text-red-500 mr-3" />
                Contact Info
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
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
                </div>
                
                <div className="flex items-start">
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
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-500/20 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Location</h3>
                    <p className="text-gray-400 mt-1">Delhi, India</p>
                    <p className="text-red-400 mt-1">Studio visits by appointment only</p>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-10">
                  <h3 className="text-lg font-medium text-white mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://www.instagram.com/urbanhustlefilms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-red-500/20 hover:text-red-500 text-gray-300 p-3 rounded-full transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.youtube.com/@urbanhustlefilms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-red-500/20 hover:text-red-500 text-gray-300 p-3 rounded-full transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.facebook.com/people/Urban-Hustle-Films/61573424103083" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-red-500/20 hover:text-red-500 text-gray-300 p-3 rounded-full transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://x.com/urbanhustlefilm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-red-500/20 hover:text-red-500 text-gray-300 p-3 rounded-full transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
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

export default ContactPage;