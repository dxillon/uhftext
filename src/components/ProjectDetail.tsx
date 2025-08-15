import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate,Link } from "react-router-dom";
import {
  Film,
  Users,
  Award,
  Clock,
  Calendar,
  Star,
  Play,
  Heart,
  ArrowLeft,
  FileDown,
} from "lucide-react";
import PasswordModal from "../components/PasswordModal";
import { projectDetails } from "../data/projectdetail";
import usePasswordProtectedDownload from "../hooks/usePasswordProtectedDownload";
import { Helmet } from "react-helmet-async";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectDetails[id as keyof typeof projectDetails];

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <h1 className="text-2xl text-white">Project not found</h1>
      </div>
    );
  }

  const {
    isModalOpen,
    isIncorrectPassword,
    isDownloading,
    openModal,
    closeModal,
    handlePasswordSubmit,
  } = usePasswordProtectedDownload({
    correctPassword: project.password,
    fileUrl: project.pitchdeckUrl,
  });

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>{project.title} – Urban Hustle Films</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://uhfilms.in/project/${id}`} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${project.title} – Urban Hustle Films`}
        />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content={`https://uhfilms.in/project/${id}`} />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${project.title} – Urban Hustle Films`}
        />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content="https://www.uhfilms.in/uhf.png" />
      </Helmet>

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <div className="relative h-[60vh] overflow-hidden">
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: project.shouldCover ? "cover" : "contain",
                  backgroundPosition: "center 25%",
                  backgroundRepeat: "no-repeat",
                }}
              />
              {project.shouldDim && (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%)",
                    filter:
                      "brightness(1.5) contrast(1.3) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                  }}
                />
              )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="container mx-auto px-4 h-full flex items-end pb-16">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ zIndex: 1 }}
                className="text-white"
              >
                <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>{project.releaseDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-red-500" />
                    <span>{project.genre}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-red-500" />
                    <span>{project.rating}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
              <motion.button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-gray-300 group"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowLeft className="w-5 h-5 transition-colors duration-300 group-hover:text-red-500" />
                <span>Back to Home</span>
              </motion.button>

              <motion.button
                onClick={openModal}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileDown className="w-5 h-5" />
                <span>Download Pitch deck</span>
              </motion.button>
            </div>
          </div>

          <div className="container mx-auto px-4 py-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="md:col-span-2"
              >
                <div className="card mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Synopsis
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.synopsis}
                  </p>
                </div>

                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.cast.map((member, index) => (
                      <motion.div
                        key={member}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <Users className="w-5 h-5 text-red-500" />
                        <span>{member}</span>
                      </motion.div>
                    ))}
                  </div>
                  {project.showGetCasted && (
                    <div className="mt-4 flex justify-end">
                      <Link
                        to="/get-noticed"
                        className="relative overflow-hidden group"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "8px 20px",
                          borderRadius: "9999px",
                          background:
                            "linear-gradient(135deg, rgba(250, 126, 30, 0.15), rgba(214, 41, 118, 0.15), rgba(150, 47, 191, 0.15), rgba(254, 218, 117, 0.15))",
                          color: "white",
                          fontSize: "16px",
                          fontWeight: "600",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                          textDecoration: "none",
                          zIndex: "1",
                        }}
                      >
                        {/* Animated gradient overlay */}
                        <span
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(250, 126, 30, 0.3), rgba(214, 41, 118, 0.3), rgba(150, 47, 191, 0.3), rgba(254, 218, 117, 0.3))",
                            zIndex: "-1",
                          }}
                        />

                        {/* Rotating star icon */}
                        <span
                          className="inline-block w-6 h-6"
                          style={{
                            background:
                              "linear-gradient(135deg, #fa7e1e, #d62976, #962fbf, #feda75)",
                            WebkitMaskImage:
                              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E\")",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskSize: "contain",
                            WebkitMaskPosition: "center",
                            animation: "spin 6s linear infinite",
                          }}
                        />
                        <span className="relative z-10">Get Casted</span>

                        {/* Glow effect on hover */}
                        <span
                          className="absolute -inset-1 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, #fa7e1e, #d62976, #962fbf, #feda75)",
                            zIndex: "-2",
                          }}
                        />

                        <style>
                          {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
                        </style>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Production Details
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Status</span>
                      <span className="text-red-500 font-semibold">
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Budget</span>
                      <span>{project.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Creative Team
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(project.team).map(([role, name], index) => (
                      <motion.div
                        key={role}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between text-gray-300"
                      >
                        <span className="capitalize">{role}</span>
                        <span className="font-semibold">{name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Password Modal */}
          <PasswordModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onPasswordSubmit={handlePasswordSubmit}
            isIncorrectPassword={isIncorrectPassword}
            projectTitle={project.title}
            isDownloading={isDownloading}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
