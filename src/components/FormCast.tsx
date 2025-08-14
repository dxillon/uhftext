import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  TrendingUp,
  ArrowRight,
  Download,
  Images,
  Video,
  Star,
  Film,
  Trash2,
  Clapperboard,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import ndaPdf from "../assets/UH_Films_NDA.pdf";
import { ndaText } from "../data/casted";

// Cloudinary configuration
const CLOUD_NAME = "djl9xhj22";
const UPLOAD_PRESET = "model_images";
const CLOUDINARY_IMAGE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const CLOUDINARY_VIDEO_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_a5tly1m";
const EMAILJS_TEMPLATE_ID = "template_57jdkuq";
const EMAILJS_USER_ID = "lJX7YKVh5gsW2x9rS";

// Role types and acting styles data
const roleTypes = [
  { value: "lead", label: "Lead Role", icon: "🌟" },
  { value: "supporting", label: "Supporting Role", icon: "🎭" },
  { value: "character", label: "Character Actor", icon: "🎬" },
  { value: "background", label: "Background Extra", icon: "👥" },
  { value: "voice", label: "Voice Artist", icon: "🎙️" },
  { value: "stunt", label: "Stunt Performer", icon: "🤸" },
  { value: "model", label: "Model", icon: "📸" },
  { value: "other", label: "Other (Specify)", icon: "✨" },
];

const actingStyles = [
  { value: "method", label: "Method Acting", icon: "🧠" },
  { value: "classical", label: "Classical Theater", icon: "🎭" },
  { value: "contemporary", label: "Contemporary", icon: "🎥" },
  { value: "improvisational", label: "Improvisational", icon: "🎤" },
  { value: "meisner", label: "Meisner Technique", icon: "🎬" },
  { value: "chekhov", label: "Chekhov Technique", icon: "🎩" },
  { value: "physical", label: "Physical Theater", icon: "🕺" },
  { value: "other", label: "Other (Specify)", icon: "✨" },
];

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-1 years)", icon: "🆕" },
  { value: "intermediate", label: "Intermediate (1-5 years)", icon: "📈" },
  { value: "experienced", label: "Experienced (5-10 years)", icon: "🎯" },
  { value: "professional", label: "Professional (10+ years)", icon: "🏆" },
];

const getLabel = (list, value) => {
  const found = list.find((item) => item.value === value);
  return found ? found.label : value;
};

const FormCast = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    experience: "",
    roleType: "",
    actingStyle: "",
    otherRoleType: "",
    otherActingStyle: "",
    message: "",
    photos: [],
    video: null,
    portfolioLinks: ["", ""],
  });
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [referenceId, setReferenceId] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const thingsToKnowRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToThingsToKnow = useCallback(() => {
    if (thingsToKnowRef.current) {
      const offset = 80;
      const elementPosition =
        thingsToKnowRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        scrollToThingsToKnow();
      }, 2000); // 2 second delay before scrolling
      return () => clearTimeout(timer);
    }
  }, [submitted, scrollToThingsToKnow]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_USER_ID);
  }, []);

  // Generate reference ID on component mount
  useEffect(() => {
    if (!referenceId) {
      const id =
        "CID-" +
        Date.now().toString(36).toUpperCase() +
        Math.random().toString(36).substring(2, 5).toUpperCase();
      setReferenceId(id);
    }
  }, [referenceId]);

  const validateStep = (step) => {
    const errors = {};

    if (step === 2) {
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.age || formData.age < 1)
        errors.age = "Valid age is required";
      if (!formData.email.match(/^\S+@\S+\.\S+$/))
        errors.email = "Valid email is required";
      if (!formData.phone.match(/^[\d\s\-()+]{8,}$/))
        errors.phone = "Valid phone number is required";
      if (!formData.experience)
        errors.experience = "Experience level is required";
      if (!formData.roleType)
        errors.roleType = "Preferred role type is required";
      if (!formData.actingStyle)
        errors.actingStyle = "Acting style is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    // Reset file input if we're going to reject some files
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Process files one by one with proper checks
    const newPhotos = [...formData.photos];
    let newVideo = formData.video;

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        // Strict photo limit enforcement
        if (newPhotos.length >= 2) {
          alert("Maximum 2 photos allowed. Additional photos will be ignored.");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert(`Image "${file.name}" exceeds 5MB limit and will be ignored.`);
          return;
        }

        newPhotos.push(file);
      } else if (file.type.startsWith("video/")) {
        // Video validation
        if (newVideo) {
          alert("Only 1 video allowed. Existing video will be replaced.");
        }

        if (file.size > 10 * 1024 * 1024) {
          alert(
            `Video "${file.name}" exceeds 10MB limit. Please use Google Drive for larger files.`
          );
          return;
        }

        newVideo = file;
      }
    });

    // Update state with new files
    setFormData((prev) => ({
      ...prev,
      photos: newPhotos.slice(0, 2), // Ensure we never have more than 2 photos
      video: newVideo,
    }));

    // Reset input to allow selecting the same files again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (index, e) => {
    e.preventDefault(); // Add this line
    e.stopPropagation(); // Keep this line
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    // Reset the file input value when last photo is removed
    if (formData.photos.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeVideo = (e) => {
    e.preventDefault(); // Add this line
    e.stopPropagation(); // Keep this line
    setFormData((prev) => ({
      ...prev,
      video: null,
    }));
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePortfolioLinkChange = (index, value) => {
    const newLinks = [...formData.portfolioLinks];
    newLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      portfolioLinks: newLinks,
    }));
  };

  // Add these states near your other state declarations
  const [isDownloading, setIsDownloading] = useState(false);
  const [ndaDownloaded, setNdaDownloaded] = useState(false);

  const downloadNDA = () => {
    setIsDownloading(true);

    // Add 2-second delay to simulate download time
    setTimeout(() => {
      fetch(ndaPdf)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;

          const fileName = formData.name
            ? `${formData.name.replace(/\s+/g, "_")}_NDA_Agreement.pdf`
            : "NDA_Agreement.pdf";

          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          setIsDownloading(false);
          setNdaDownloaded(true);
        })
        .catch((error) => {
          console.error("Error downloading NDA:", error);
          setIsDownloading(false);
          alert("Failed to download NDA. Please try again.");
        });
    }, 2000); // 2-second delay
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 4 && !ndaAccepted) {
      return;
    }

    if (currentStep < 4) {
      if (currentStep === 2 && !validateStep(2)) {
        return;
      }
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      if (!referenceId) {
        const id =
          "CID-" +
          Date.now().toString(36).toUpperCase() +
          Math.random().toString(36).substring(2, 5).toUpperCase();
        setReferenceId(id);
      }

      const sanitizedName = formData.name.replace(/[^a-zA-Z0-9]/g, "_");
      const folderName = `applicants/${referenceId}_${sanitizedName}`;

      const uploadPromises = formData.photos.slice(0, 2).map((photo, index) => {
        // Upload only first 2 photos
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", folderName);
        formData.append("public_id", `${folderName}/photo_${index}`);
        formData.append("resource_type", "image");

        return fetch(CLOUDINARY_IMAGE_URL, {
          method: "POST",
          body: formData,
        }).then((response) => response.json());
      });

      // Video upload with proper parameters
      let videoUrl = "";
      if (formData.video) {
        const videoFormData = new FormData();
        videoFormData.append("file", formData.video);
        videoFormData.append("upload_preset", UPLOAD_PRESET);
        videoFormData.append("folder", folderName);
        videoFormData.append("public_id", `${folderName}/video`);
        videoFormData.append("resource_type", "video"); // This is required

        try {
          const videoResponse = await fetch(CLOUDINARY_VIDEO_URL, {
            method: "POST",
            body: videoFormData,
          });

          const videoResult = await videoResponse.json();

          if (videoResult.error) {
            console.error("Cloudinary error:", videoResult.error);
            throw new Error(
              "Video upload failed: " + videoResult.error.message
            );
          }

          if (!videoResult.secure_url) {
            throw new Error("No URL returned from Cloudinary");
          }

          videoUrl = videoResult.secure_url;
          console.log("Video uploaded successfully:", videoUrl);
        } catch (videoError) {
          console.error("Video upload failed:", videoError);
          // Optionally: Continue submission without video instead of failing
          alert("Video upload failed but we'll proceed with your application");
          // throw new Error("Failed to upload video. Please try again or use a link instead.");
        }
      }

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          // Slow down as we approach 90%
          const increment = prev < 80 ? 5 : 1;
          return Math.min(prev + increment, 90);
        });
      }, 100); // Update every 100ms instead of 500ms

      const uploadResults = await Promise.all(uploadPromises);

      // Smooth transition from current progress to 100%
      let currentProgress = uploadProgress;
      const finalizeInterval = setInterval(() => {
        currentProgress = Math.min(currentProgress + 2, 100);
        setUploadProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(finalizeInterval);
        }
      }, 50);

      clearInterval(progressInterval);

      // Wait for the final animation to complete
      await new Promise((resolve) => {
        const checkComplete = setInterval(() => {
          if (currentProgress >= 100) {
            clearInterval(checkComplete);
            resolve();
          }
        }, 50);
      });

      const imageUrls = uploadResults.map((result) => result.secure_url);

      const templateParams = {
        name: formData.name,
        age: formData.age,
        email: formData.email,
        phone: formData.phone,
        experience: getLabel(experienceLevels, formData.experience),
        roleType: `Preferred Role Type: ${getLabel(
          roleTypes,
          formData.roleType
        )}`,
        actingStyle: `Acting Style: ${getLabel(
          actingStyles,
          formData.actingStyle
        )}`,
        otherRoleType:
          formData.roleType === "other" ? formData.otherRoleType : "",
        otherActingStyle:
          formData.actingStyle === "other" ? formData.otherActingStyle : "",
        role: "Modeling & Acting",
        referenceId: referenceId,
        portfolioLinks: formData.portfolioLinks
          .filter((link) => link)
          .join(", "),
        message: formData.message,
        imageUrls: imageUrls.join(", "),
        videoUrl: videoUrl || "None",
        folderLink: `https://cloudinary.com/console/media_library/folders/applicants/${referenceId}`,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff0000", "#ffffff", "#000000"],
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div>
      <section
        id="form-section"
        className="py-20 px-4 max-w-4xl mx-auto relative z-10"
      >
        {!submitted ? (
          <>
            {/* Progress Stepper */}
            <div className="flex justify-between mb-10 relative">
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-800 -z-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-900 via-red-600 to-red-900"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(currentStep - 1) * 33.33}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="flex flex-col items-center mt-2 sm:mt-0 z-10"
                >
                  <motion.div
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border-2 ${
                      currentStep > step
                        ? "border-green-500 bg-green-500"
                        : currentStep === step
                        ? "border-red-500 bg-gradient-to-br from-red-600 to-red-900"
                        : "border-gray-600 bg-gray-800"
                    } relative transition-all duration-300 shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {currentStep > step ? (
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    ) : (
                      step
                    )}
                  </motion.div>
                  <motion.p
                    className={`mt-2 text-xs sm:text-sm font-medium ${
                      currentStep === step ? "text-red-400" : "text-gray-400"
                    } transition-colors duration-300`}
                    animate={{ opacity: currentStep === step ? 1 : 0.7 }}
                  >
                    {step === 1 && "Get Started"}
                    {step === 2 && "Your Details"}
                    {step === 3 && "Media Upload"}
                    {step === 4 && "NDA & Submit"}
                  </motion.p>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-r from-red-900/30 to-black/30 p-8 rounded-xl border border-gray-800 mb-8">
                    <h2 className="text-3xl font-bold mb-6">
                      Exciting Casting Opportunity
                    </h2>
                    <p className="mb-8 text-lg text-gray-300">
                      We're casting for multiple roles in upcoming feature
                      films, commercials, and TV series. This is your chance to
                      showcase your talent and join our exclusive roster of
                      performers.
                    </p>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 15px rgba(239,68,68,0.5)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                    onClick={() => setCurrentStep(2)}
                  >
                    Begin Application
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-gradient-to-r from-red-900/20 to-black/20 p-6 rounded-xl border border-gray-800 mb-8">
                    <h2 className="text-3xl font-bold mb-6">Your Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-gray-300">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={`w-full bg-gray-900/70 border ${
                            formErrors.name
                              ? "border-red-500"
                              : "border-gray-700"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300">Age*</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          className={`w-full bg-gray-900/70 border ${
                            formErrors.age
                              ? "border-red-500"
                              : "border-gray-700"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                        />
                        {formErrors.age && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.age}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300">
                          Email*
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full bg-gray-900/70 border ${
                            formErrors.email
                              ? "border-red-500"
                              : "border-gray-700"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-300">
                          Phone*
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className={`w-full bg-gray-900/70 border ${
                            formErrors.phone
                              ? "border-red-500"
                              : "border-gray-700"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                        />
                        {formErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-gray-300">
                          Experience Level*
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className={`w-full bg-gray-900/70 border ${
                            formErrors.experience
                              ? "border-red-500"
                              : "border-gray-700"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                        >
                          <option value="">Select your experience</option>
                          {experienceLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.icon} {level.label}
                            </option>
                          ))}
                        </select>
                        {formErrors.experience && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.experience}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-gray-300">
                          Preferred Role Type*
                        </label>
                        <select
                          name="roleType"
                          value={formData.roleType}
                          onChange={handleChange}
                          className={`w-full bg-gray-900/70 border ${
                            formErrors.roleType
                              ? "border-red-500"
                              : "border-gray-700"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                        >
                          <option value="">Select preferred role type</option>
                          {roleTypes.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.icon} {role.label}
                            </option>
                          ))}
                        </select>
                        {formErrors.roleType && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.roleType}
                          </p>
                        )}
                      </div>
                      {formData.roleType === "other" && (
                        <div className="md:col-span-2">
                          <label className="block mb-2 text-gray-300">
                            Please specify your role type
                          </label>
                          <input
                            type="text"
                            name="otherRoleType"
                            value={formData.otherRoleType}
                            onChange={handleChange}
                            className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                          />
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-gray-300">
                          Acting Style*
                        </label>
                        <select
                          name="actingStyle"
                          value={formData.actingStyle}
                          onChange={handleChange}
                          className={`w-full bg-gray-900/70 border ${
                            formErrors.actingStyle
                              ? "border-red-500"
                              : "border-gray-700"
                          } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all`}
                        >
                          <option value="">Select your acting style</option>
                          {actingStyles.map((style) => (
                            <option key={style.value} value={style.value}>
                              {style.icon} {style.label}
                            </option>
                          ))}
                        </select>
                        {formErrors.actingStyle && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.actingStyle}
                          </p>
                        )}
                      </div>
                      {formData.actingStyle === "other" && (
                        <div className="md:col-span-2">
                          <label className="block mb-2 text-gray-300">
                            Please specify your acting style
                          </label>
                          <input
                            type="text"
                            name="otherActingStyle"
                            value={formData.otherActingStyle}
                            onChange={handleChange}
                            className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                          />
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <label className="block mb-2 text-gray-300">
                          Message (Optional)
                        </label>
                        <textarea
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3 - Media Upload */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-gradient-to-r from-red-900/20 to-black/20 p-6 rounded-xl border border-gray-800 mb-8">
                    <h2 className="text-3xl font-bold mb-6">Media Upload</h2>

                    {/* Single Upload Area */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">
                        Upload Media (2 photos max, 1 video max)
                      </h3>

                      <div
                        className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-red-500 transition-colors duration-300 bg-gray-900/30"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <div className="flex justify-center mb-4">
                          <svg
                            className="w-12 h-12 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                        </div>
                        <p className="mb-2">Click to upload photos or video</p>
                        <p className="text-sm text-gray-400">
                          Photos: JPG, PNG (Max 5MB each) | Video: MP4, MOV (Max
                          10MB)
                        </p>
                        <p className="text-xs text-red-400 mt-2">
                          For larger videos, please upload to Google Drive and
                          share the link below
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          multiple
                          accept="image/jpeg, image/png, video/mp4, video/quicktime"
                          className="hidden"
                        />
                      </div>

                      {/* Preview Section */}
                      <div className="mt-8">
                        <h4 className="text-lg font-medium mb-4">
                          Media Preview
                        </h4>

                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                          {/* Photo Slot 1 */}
                          <div className="relative aspect-square">
                            {formData.photos[0] ? (
                              <>
                                <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                                  <img
                                    src={URL.createObjectURL(
                                      formData.photos[0]
                                    )}
                                    alt="Preview 1"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => removePhoto(0, e)}
                                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-all"
                                  title="Remove photo"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                  <p className="text-xs text-white truncate">
                                    {formData.photos[0].name}
                                  </p>
                                  <p className="text-xs text-gray-300">
                                    {(
                                      formData.photos[0].size /
                                      1024 /
                                      1024
                                    ).toFixed(2)}
                                    MB
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                                <div className="text-center p-4">
                                  <Images className="w-6 h-6 mx-auto text-gray-500" />
                                  <p className="text-xs text-gray-400 mt-1">
                                    Photo Slot 1
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Photo Slot 2 */}
                          <div className="relative aspect-square">
                            {formData.photos[1] ? (
                              <>
                                <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                                  <img
                                    src={URL.createObjectURL(
                                      formData.photos[1]
                                    )}
                                    alt="Preview 2"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => removePhoto(1, e)}
                                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-all"
                                  title="Remove photo"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                  <p className="text-xs text-white truncate">
                                    {formData.photos[1].name}
                                  </p>
                                  <p className="text-xs text-gray-300">
                                    {(
                                      formData.photos[1].size /
                                      1024 /
                                      1024
                                    ).toFixed(2)}
                                    MB
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-full bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                                <div className="text-center p-4">
                                  <Images className="w-6 h-6 mx-auto text-gray-500" />
                                  <p className="text-xs text-gray-400 mt-1">
                                    Photo Slot 2
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Video Slot */}
                          <div className="relative aspect-square">
                            {formData.video ? (
                              <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden">
                                <video
                                  src={URL.createObjectURL(formData.video)}
                                  controls
                                  className="w-full h-full object-contain"
                                />
                                <button
                                  type="button"
                                  onClick={removeVideo}
                                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-all"
                                  title="Remove video"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                  <p className="text-xs text-white truncate">
                                    {formData.video.name}
                                  </p>
                                  <p className="text-xs text-gray-300">
                                    {(
                                      formData.video.size /
                                      1024 /
                                      1024
                                    ).toFixed(2)}
                                    MB
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                                <div className="text-center p-4">
                                  <Video className="w-6 h-6 mx-auto text-gray-500" />
                                  <p className="text-xs text-gray-400 mt-1">
                                    Video Slot
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-400">
                          <p>
                            Uploaded: {formData.photos.length} photos,{" "}
                            {formData.video ? "1" : "0"} video
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Portfolio Links Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Portfolio Links (Optional, Max 2)
                      </h3>
                      <div className="space-y-4">
                        <input
                          type="url"
                          placeholder="Website, IMDb, Showreel, etc."
                          value={formData.portfolioLinks[0]}
                          onChange={(e) =>
                            handlePortfolioLinkChange(0, e.target.value)
                          }
                          className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        />
                        <input
                          type="url"
                          placeholder="Second link (optional)"
                          value={formData.portfolioLinks[1]}
                          onChange={(e) =>
                            handlePortfolioLinkChange(1, e.target.value)
                          }
                          className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4 - NDA */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-gradient-to-r from-red-900/20 to-black/20 p-6 rounded-xl border border-gray-800 mb-8">
                    <h2 className="text-3xl font-bold mb-6">
                      NDA & Submission
                    </h2>
                    <div className="bg-gray-900/50 p-6 rounded-lg mb-6 max-h-96 overflow-y-auto custom-scrollbar border border-gray-800">
                      <h3 className="text-xl font-semibold mb-4 text-red-400">
                        Non-Disclosure Agreement
                      </h3>
                      <pre className="whitespace-pre-wrap font-sans text-gray-300 text-sm">
                        {ndaText}
                      </pre>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="accept-nda"
                          className="w-5 h-5 mr-3 rounded border-gray-300 text-red-600 focus:ring-red-500 bg-gray-800"
                          checked={ndaAccepted}
                          onChange={(e) => setNdaAccepted(e.target.checked)}
                        />
                        <label htmlFor="accept-nda" className="text-gray-300">
                          I accept the terms of the NDA*
                        </label>
                      </div>

                      <div className="flex-1">
                        <div className="relative">
                          <motion.button
                            type="button"
                            onClick={downloadNDA}
                            whileHover={{
                              scale: 1.03,
                              backgroundColor: "#ef4444",
                            }}
                            whileTap={{ scale: 0.97 }}
                            disabled={isDownloading || ndaDownloaded}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2 
                   text-sm sm:text-base text-white font-semibold 
                   ${
                     ndaDownloaded
                       ? "bg-green-600/90"
                       : "bg-gradient-to-r from-red-900/30 to-black/30"
                   } 
                   border ${
                     isDownloading
                       ? "border-gray-600"
                       : ndaDownloaded
                       ? "border-green-500/50"
                       : "border-red-900/50"
                   } 
                   rounded-full shadow-md 
                   transition-all duration-300 ${
                     isDownloading || ndaDownloaded ? "cursor-not-allowed" : ""
                   }`}
                          >
                            {isDownloading ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Downloading...
                              </>
                            ) : ndaDownloaded ? (
                              <>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Downloaded
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                Download NDA
                              </>
                            )}
                          </motion.button>
                        </div>

                        {ndaDownloaded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 bg-gray-900/80 border border-green-500/30 rounded-lg p-3 shadow-lg"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                              <div>
                                <h3 className="text-sm font-medium text-green-400 mb-1">
                                  Important Next Steps
                                </h3>
                                <ul className="text-xs text-gray-300 space-y-1.5">
                                  <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-0.5">
                                      •
                                    </span>
                                    <span>
                                      Fill in your details as{" "}
                                      <span className="font-semibold text-white">
                                        Receiving Party
                                      </span>
                                    </span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-0.5">
                                      •
                                    </span>
                                    <span>
                                      Include your CID:{" "}
                                      <span className="font-mono text-red-400 bg-gray-800/80 px-1.5 py-0.5 rounded-md">
                                        {referenceId}
                                      </span>
                                    </span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-0.5">
                                      •
                                    </span>
                                    <span>
                                      Sign and email back to us in 3 days of
                                      submission
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Upload Progress Indicator (only shown during submission) */}
                    {isSubmitting && (
                      <div className="mb-6">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-300">
                            Uploading files...
                          </span>
                          <span className="text-sm font-medium text-gray-300">
                            {uploadProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-red-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={goBack}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back
                  </motion.button>
                )}

                <div className="flex items-center gap-4 ml-auto">
                  {currentStep !== 1 && (
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          currentStep === 4 && ndaAccepted
                            ? "0 0 15px rgba(239,68,68,0.5)"
                            : "none",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className={`py-2 px-6 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                        currentStep === 4
                          ? ndaAccepted
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-600 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      disabled={
                        (currentStep === 4 && !ndaAccepted) || isSubmitting
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Processing...
                        </>
                      ) : (
                        <>
                          {currentStep === 4
                            ? "Submit Application"
                            : "Next Step"}
                          {currentStep !== 4 && (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 max-w-2xl mx-auto border border-gray-800 shadow-lg shadow-red-900/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/film-strip-pattern.png')] opacity-5"></div>
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 0.8 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">
                Application Submitted!
              </h2>
              <p className="text-xl mb-6 text-gray-300">
                Thank you for your submission. Our casting team will review your
                application and contact you if you're selected for an audition.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 15px rgba(239,68,68,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg mb-8 transition-all duration-300"
                onClick={scrollToThingsToKnow}
              >
                Things to Know Before You Audition
              </motion.button>

              <div className="bg-black p-6 rounded-lg border border-gray-800 relative z-10">
                <h3 className="text-lg font-bold mb-2">Your Reference ID</h3>
                <p className="text-2xl font-mono text-red-500 mb-4">
                  {referenceId}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-300">
                      Important:
                    </span>{" "}
                    Keep this ID safe for all future communications.
                  </p>
                  <p className="text-sm text-gray-400">
                    We've sent a confirmation with this ID to{" "}
                    <span className="text-white">{formData.email}</span>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Things to Know Section */}
      {submitted && (
        <section
          ref={thingsToKnowRef}
          className="py-12 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/film-grain.png')] opacity-10"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <TrendingUp className="w-6 h-6 text-red-500" />
              <h2 className="text-3xl font-bold text-white">
                Audition Success Guide
              </h2>
            </div>

            {/* Mobile Horizontal Scroller */}
            <div className="relative">
              {/* Navigation Arrows - Smaller and more subtle */}
              <button
                className="md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/70 border border-gray-700 hover:bg-red-600/80 transition-all shadow-md hover:scale-110"
                onClick={() =>
                  document
                    .getElementById("guide-scroller")
                    .scrollBy({ left: -300, behavior: "smooth" })
                }
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/70 border border-gray-700 hover:bg-red-600/80 transition-all shadow-md hover:scale-110"
                onClick={() =>
                  document
                    .getElementById("guide-scroller")
                    .scrollBy({ left: 300, behavior: "smooth" })
                }
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Scrolling Container - Scrollbar completely hidden */}
              <div
                id="guide-scroller"
                className="flex overflow-x-auto pb-8 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-x-hidden"
                style={{
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* Cards with subtle hover effects */}
                {[
                  {
                    icon: <Film className="w-5 h-5 text-red-400" />,
                    title: "Preparation",
                    items: [
                      "Memorize your lines thoroughly",
                      "Research the project and director's style",
                      "Prepare character-appropriate wardrobe",
                      "Get plenty of rest before audition",
                    ],
                  },
                  {
                    icon: <Clapperboard className="w-5 h-5 text-red-400" />,
                    title: "Audition Etiquette",
                    items: [
                      "Arrive 15 minutes early",
                      "Be professional with all staff",
                      "Turn off your phone completely",
                      "Bring extra headshots/resumes",
                    ],
                  },
                  {
                    icon: <Star className="w-5 h-5 text-red-400" />,
                    title: "Performance Tips",
                    items: [
                      "Make strong but flexible choices",
                      "Focus on listening and reacting",
                      "Don't break character early",
                      "Show subtlety in performance",
                    ],
                  },
                  {
                    icon: <Download className="w-5 h-5 text-red-400" />,
                    title: "After the Audition",
                    items: [
                      "Don't ask for immediate feedback",
                      "Send thank you email within 24hrs",
                      "Be patient for decisions",
                      "Keep auditioning for other projects",
                    ],
                  },
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                    className="flex-shrink-0 w-[85vw] md:w-auto snap-center mx-2 md:mx-0 relative group"
                  >
                    <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 group-hover:border-red-500/50 transition-all duration-300 shadow-lg group-hover:shadow-red-500/10 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-900/50 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
                          {card.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-red-400 group-hover:text-red-300 transition-colors">
                          {card.title}
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1 group-hover:text-red-400 transition-colors">
                              •
                            </span>
                            <span className="text-gray-300 group-hover:text-gray-100 transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Current card indicator - only visible on mobile */}
                      <div className="md:hidden absolute bottom-1  left-0 right-0 flex justify-center">
                        <div className="bg-black/70 px-2 py-1 rounded-full text-xs text-gray-300">
                          {index + 1}/4
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default FormCast;
