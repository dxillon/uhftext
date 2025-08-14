import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  TrendingUp,
  MapPin,
  Send,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Check,
  Eye,
  AlertTriangle,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  User,
  Film,
  Camera,
  Video,
  Clapperboard,
} from "lucide-react";
import anime from "animejs";
import type { FAQItem } from "../types/faq";
import { faqData } from "../data/faq";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const subjectOptions = [
  { value: "production-inquiry", label: "Film Production Inquiry" },
  { value: "collaboration", label: "Collaboration Opportunity" },
  { value: "casting", label: "Casting Information" },
  { value: "location-scouting", label: "Location Scouting" },
  { value: "equipment-rental", label: "Equipment Rental" },
  { value: "request-access", label: "Request access for files" },
  { value: "incorrect-password", label: "Incorrect password for files" },
  { value: "general-support", label: "General Support" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

type FormField = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: FormField = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  const [formData, setFormData] = useState<FormField>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormField>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [expandedFeatured, setExpandedFeatured] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLSelectElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prefillMessage = params.get("project");
    const prefillSubject = params.get("subject");

    setFormData((prev) => ({
      ...prev,
      message: prev.message || prefillMessage || "",
      subject: prefillSubject || prev.subject,
    }));
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormField]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormField> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.phone && !/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitStatus("submitting");

      try {
        const result = await emailjs.send(
          "service_a5tly1m",
          "template_z0pckoc",
          {
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone,
            subject:
              subjectOptions.find((opt) => opt.value === formData.subject)
                ?.label || formData.subject,
            message: formData.message,
          },
          "lJX7YKVh5gsW2x9rS"
        );

        if (result.status === 200) {
          setSubmitStatus("success");
          setFormData(initialFormState);
          setTimeout(() => setSubmitStatus("idle"), 3000);
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        console.error("Failed to send email:", error);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } else {
      anime({
        targets: formRef.current,
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 500,
        easing: "easeInOutSine",
      });
    }
  };

  useEffect(() => {
    if (pageRef.current) {
      anime({
        targets: pageRef.current.querySelectorAll(".animate-in"),
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: "easeOutExpo",
      });
    }
  }, []);

  useEffect(() => {
    const addInputAnimation = (
      el: HTMLElement | null,
      labelEl: Element | null
    ) => {
      if (!el || !labelEl) return;

      el.addEventListener("focus", () => {
        anime({
          targets: labelEl,
          translateY: [-5, -5],
          translateX: [0, 5],
          color: "#ef4444",
          duration: 300,
          easing: "easeOutCubic",
        });
      });

      el.addEventListener("blur", () => {
        if (!el.value) {
          anime({
            targets: labelEl,
            translateY: [-5, -5],
            translateX: [5, 0],
            color: "#9ca3af",
            duration: 300,
            easing: "easeOutCubic",
          });
        }
      });
    };

    Object.entries(inputRefs).forEach(([key, ref]) => {
      const labelEl = formRef.current?.querySelector(`label[for="${key}"]`);
      addInputAnimation(ref.current, labelEl);
    });
  }, []);

  const mostAskedQuestions = faqData
    .filter((faq) => faq.isFeatured)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  const handleFeaturedClick = (id: string) => {
    setExpandedFeatured(expandedFeatured === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us – Urban Hustle Films</title>
        <meta
          name="description"
          content="Get in touch with Urban Hustle Films for collaborations, inquiries, and partnerships."
        />
        <link rel="canonical" href="https://uhfilms.in/contact" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Contact Us – Urban Hustle Films" />
        <meta
          property="og:description"
          content="Get in touch with Urban Hustle Films for collaborations, inquiries, and partnerships."
        />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content="https://uhfilms.in/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us – Urban Hustle Films" />
        <meta
          name="twitter:description"
          content="Get in touch with Urban Hustle Films for collaborations, inquiries, and partnerships."
        />
        <meta name="twitter:image" content="https://www.uhfilms.in/uhf.png" />
      </Helmet>

      <div ref={pageRef} className="pt-32 pb-16 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating Film Elements */}
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <Film className="w-16 h-16 text-red-500" />
        </div>
        <div className="absolute top-1/3 right-20 opacity-10 animate-float animation-delay-2000">
          <Camera className="w-16 h-16 text-blue-500" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-10 animate-float animation-delay-3000">
          <Video className="w-16 h-16 text-purple-500" />
        </div>
        <div className="absolute bottom-20 right-1/4 opacity-10 animate-float animation-delay-1000">
          <Clapperboard className="w-16 h-16 text-yellow-500" />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Header Section */}
          <section className="text-center mb-14 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block relative"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-in bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-red-500">
                Connect With Us
              </h1>
              <div className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300  max-w-2xl mx-auto animate-in"
            >
              Ready to bring your vision to life? We're excited to hear from you
              and discuss how we can help create your next masterpiece.
            </motion.p>
          </section>

          {/* FAQ Section */}
          <section className="py-12 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent rounded-3xl -z-10"></div>
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-8"
              >
                <TrendingUp className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">
                  Most Asked Questions
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mostAskedQuestions.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/30 transition-all duration-300 shadow-lg hover:shadow-red-500/10"
                  >
                    <div
                      onClick={() => handleFeaturedClick(faq.id)}
                      className="cursor-pointer"
                    >
                      <div className="w-full px-6 py-4 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-medium text-white break-words">
                              {faq.question}
                            </h3>
                            <div className="flex items-center gap-1 text-xs bg-gradient-to-r from-red-900/50 to-red-900/30 rounded-full px-2 py-1 whitespace-nowrap">
                              <Eye className="w-4 h-4 text-red-500" />
                              <span className="text-gray-300">
                                {faq.views.toLocaleString()} views
                              </span>
                            </div>
                          </div>
                        </div>
                        {expandedFeatured === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                        )}
                      </div>

                      {expandedFeatured !== faq.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-400 line-clamp-2 text-sm">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedFeatured === faq.id && (
                        <motion.div
                          key={`content-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: {
                                duration: 0.3,
                                ease: [0.04, 0.62, 0.23, 0.98],
                              },
                              opacity: { duration: 0.25, delay: 0.1 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              opacity: { duration: 0.15 },
                              height: {
                                duration: 0.2,
                                ease: [0.04, 0.62, 0.23, 0.98],
                              },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-gradient-to-br from-black/30 to-black/10">
                            <p className="text-gray-300 mb-4">{faq.answer}</p>
                            {faq.hasActionButton && (
                              <Link
                                to={faq.actionLink || "#"}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-red-500/30"
                              >
                                {faq.actionText}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center py-8 px-4"
          >
            <div className="text-center max-w-2xl mx-auto w-full">
              <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 bg-gradient-to-r from-red-900/30 to-red-900/10 border border-red-900/30 rounded-full px-6 py-3 shadow-lg w-full max-w-screen-sm text-sm overflow-hidden min-w-0 text-center sm:text-left">
                <h4 className="text-white/80 whitespace-nowrap flex-shrink-0">
                  Didn't find what you're looking for?
                </h4>
                <Link
                  to="/faq"
                  className="group inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 shadow-md hover:shadow-red-500/30"
                >
                  <span className="flex items-center">
                    More FAQ's
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
            {/* Glowing Orbs */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/20 rounded-full filter blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full filter blur-3xl -z-10"></div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-in">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-900/80 to-gray-900/50 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-2xl border border-gray-800 relative overflow-hidden"
              >
                {/* Form Background Pattern */}
                <div className="absolute inset-0 opacity-5 -z-10">
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-red-500"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-red-500"></div>
                </div>

                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
                    Get in Touch
                  </h2>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Name *
                    </label>
                    <div className="relative">
                      <input
                        ref={inputRefs.name}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-gray-800/50 border ${
                          errors.name ? "border-red-500" : "border-gray-700"
                        } rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300 placeholder-gray-500`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />{" "}
                          {errors.name}
                        </p>
                      )}
                    </div>
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
                      <div className="relative">
                        <input
                          ref={inputRefs.email}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-gray-800/50 border ${
                            errors.email ? "border-red-500" : "border-gray-700"
                          } rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300 placeholder-gray-500`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />{" "}
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-400 mb-1"
                      >
                        Phone
                      </label>
                      <div className="relative">
                        <input
                          ref={inputRefs.phone}
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-gray-800/50 border ${
                            errors.phone ? "border-red-500" : "border-gray-700"
                          } rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300 placeholder-gray-500`}
                          placeholder="+91 8920476445"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />{" "}
                            {errors.phone}
                          </p>
                        )}
                      </div>
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
                        className={`w-full bg-gray-900/70 border ${
                          errors.subject ? "border-red-500" : "border-gray-700"
                        } text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 appearance-none`}
                      >
                        <option value="" disabled className="text-gray-500">
                          Select a subject
                        </option>
                        {subjectOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            className="bg-gray-800"
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />{" "}
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="form-group">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-400 mb-1"
                    >
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        ref={inputRefs.message}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full bg-gray-800/50 border ${
                          errors.message ? "border-red-500" : "border-gray-700"
                        } rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white transition-all duration-300 placeholder-gray-500`}
                        placeholder="Tell us about your project or inquiry..."
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />{" "}
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <motion.button
                      type="submit"
                      disabled={
                        submitStatus === "submitting" ||
                        submitStatus === "success"
                      }
                      className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-300 flex items-center justify-center shadow-lg
                      ${
                        submitStatus === "success"
                          ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      } 
                      text-white relative overflow-hidden`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button shine effect */}
                      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>

                      {submitStatus === "idle" && (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}

                      {submitStatus === "submitting" && (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      )}

                      {submitStatus === "success" && (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Message Sent!
                        </>
                      )}

                      {submitStatus === "error" && (
                        <>
                          <AlertTriangle className="w-5 h-5 mr-2" />
                          Try Again
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Form note */}
                  <p className="text-sm text-gray-400 text-center mt-4">
                    Fields marked with * are required
                  </p>
                </form>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1 animate-in">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-900/70 to-gray-900/50 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-2xl border border-gray-800 h-full relative overflow-hidden"
              >
                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500 opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500 opacity-30"></div>

                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                    Contact Info
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Email */}
                  <motion.div
                    whileHover={{ translateX: 5 }}
                    className="flex items-start bg-gradient-to-r from-transparent via-red-900/10 to-transparent p-4 rounded-lg"
                  >
                    <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-3 rounded-full mr-4 flex-shrink-0">
                      <Mail className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Email Us
                      </h3>
                      <p className="text-gray-400 mt-1">
                        Our team is here to help
                      </p>
                      <a
                        href="mailto:operations@uhfilms.in"
                        className="text-red-400 hover:text-red-300 transition-colors block mt-1 group"
                      >
                        operations@uhfilms.in
                        <span className="inline-block w-0 group-hover:w-full h-0.5 bg-red-500 transition-all duration-300"></span>
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    whileHover={{ translateX: 5 }}
                    className="flex items-start bg-gradient-to-r from-transparent via-blue-900/10 to-transparent p-4 rounded-lg"
                  >
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-3 rounded-full mr-4 flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Call Us
                      </h3>
                      <p className="text-gray-400 mt-1">
                        Mon-Fri, 10am-6pm IST
                      </p>
                      <a
                        href="tel:+918920476445"
                        className="text-blue-400 hover:text-blue-300 transition-colors block mt-1 group"
                      >
                        +91 8920476445
                        <span className="inline-block w-0 group-hover:w-full h-0.5 bg-blue-500 transition-all duration-300"></span>
                      </a>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    whileHover={{ translateX: 5 }}
                    className="flex items-start bg-gradient-to-r from-transparent via-purple-900/10 to-transparent p-4 rounded-lg"
                  >
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-3 rounded-full mr-4 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Location
                      </h3>
                      <p className="text-gray-400 mt-1">Delhi, India</p>
                      <p className="text-purple-400 mt-1 group">
                        Studio visits by appointment only
                        <span className="inline-block w-0 group-hover:w-full h-0.5 bg-purple-500 transition-all duration-300"></span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Social Media */}
                  <div className="mt-12">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Follow Us
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <motion.a
                        whileHover={{ y: -3 }}
                        href="https://www.instagram.com/urbanhustlefilms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-pink-600/20 hover:to-pink-700/20 hover:text-pink-400 text-gray-300 p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-pink-500/20"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -3 }}
                        href="https://www.youtube.com/@urbanhustlefilms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600/20 hover:to-red-700/20 hover:text-red-400 text-gray-300 p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-red-500/20"
                        aria-label="YouTube"
                      >
                        <Youtube className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -3 }}
                        href="https://www.facebook.com/people/Urban-Hustle-Films/61573424103083"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600/20 hover:to-blue-700/20 hover:text-blue-400 text-gray-300 p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-blue-500/20"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -3 }}
                        href="https://x.com/urbanhustlefilm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-gray-800 to-gray-900 hover:from-sky-600/20 hover:to-sky-700/20 hover:text-sky-400 text-gray-300 p-3 rounded-full transition-all duration-300 shadow-md hover:shadow-sky-500/20"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Add these styles to your global CSS */}
        <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.05); }
          50% { transform: translate(0, 20px) scale(0.95); }
          75% { transform: translate(-20px, -10px) scale(1.03); }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
      `}</style>
      </div>
    </>
  );
};

export default ContactPage;
