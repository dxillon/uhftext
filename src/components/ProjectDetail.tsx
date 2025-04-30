import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Film, Users, Award, Clock, Calendar, Star, Play, Heart, ArrowLeft, FileDown } from 'lucide-react';
import PasswordModal from '../components/PasswordModal';
import usePasswordProtectedDownload from '../hooks/usePasswordProtectedDownload';
import { Helmet } from 'react-helmet-async';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would normally come from an API or database
  const projectDetails = {
    "agyaat": {
      title: "Agyaat",
      shouldCover: true,
      shouldDim: true,
      image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745759562/WhatsApp_Image_2025-04-27_at_17.53.31_a20c2148_x5mnpk.jpg",
      description: "When truth is invisible, can you find it?",
      releaseDate: "Fall 2025",
      duration: "10 episodes",
      genre: "Fiction",
      rating: "PG-13",
      budget: "TBR",
      status: "In Production",
      synopsis: "Agyaat is a gripping psychological mystery thriller that delves into the unknown, where reality and perception blur. Set against the backdrop of a seemingly normal town, a series of strange, unexplainable events begins to unravel the lives of those involved. With each twist, the characters are forced to confront their deepest fears and secrets, questioning whether the world they know is real or a dangerous illusion. The show challenges the boundaries of sanity, diving into the shadows of the human mind and the eerie silence of the unknown.",
      team: {
        director: "Harry Targotra ,Bishanpreet",
        producer: "Bishanpreet , TBR",
        writer: "Harry Targotra , Sam",
        cinematographer: "TBR",
        composer: "TBR"
      },
      cast: [
        "Casting in process."
      ],
      pitchdeckUrl: "https://example.com/pitchdeck-last-horizon.pdf",
      password: "agyaat2025+1"
    },
    "sucidefun": {
      title: "Sucide Fun",
      shouldCover: true,
      shouldDim: true,
      image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745759555/WhatsApp_Image_2025-04-27_at_17.53.32_87bee1b0_q9etqk.jpg",
      description: "Do you have the courage to see your future?",
      releaseDate: "Fall 2025",
      duration: "8 Episodes",
      genre: "Fiction",
      rating: "A",
      budget: "TBD",
      status: "Writing",
      synopsis: "Suicide Fun is a dark, mysterious thriller where curiosity and fate collide. A young boy's search for answers about his future takes him down a path filled with chilling encounters and unsettling twists. As he unravels secrets beyond his control, he must face the terrifying consequences of knowing too much. In a world where destiny might not be as it seems, every answer leads to more questions, and every step forward may be one toward destruction.",
      team: {
        director: "TBD",
        producer: "TBD",
        writer: "Harry Targotra, Jhujar Singh",
        cinematographer: "TBD",
        composer: "TBD"
      },
      cast: [
        "TBD"
      ],
      pitchdeckUrl: "https://example.com/pitchdeck-urban-legends.pdf",
      password: "sucidefun2025+2"
    },
    "snake&lovers": {
      title: "Snake & Lovers",
      image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745852895/Snake_2_dz80lv.png",
      shouldCover: true,
      shouldDim: true,
      description: "A psychological thriller that will keep you guessing",
      releaseDate: "Early 2026",
      duration: "8 episodes",
      genre: "Psychological Thriller",
      rating: "R",
      budget: "TBR",
      status: "Writing, Pre-production",
      synopsis: "Snake & Lovers is an emotional rollercoaster that follows the heart-wrenching journey of a boy navigating the chaos of heartbreak and self-discovery. After falling for a girl at school, his world is turned upside down as his relationship takes unexpected turns. Caught between love, rejection, and a thirst for validation, he embarks on a path of self-hustle and growth. As the story unfolds, he learns the true meaning of love, sacrifice, and personal strength. The series blends the intensity of youth, the pain of unrequited love, and the relentless pursuit of success.",
      team: {
        director: "Bishanpreet , TBR",
        producer: "Bishanpreet",
        writer: "Harry Targotra , Jhujar Singh",
        cinematographer: "TBD",
        composer: "TBD"
      },
      cast: [
        "Casting  in process."
      ],
      pitchdeckUrl: "https://example.com/pitchdeck-silent-echo.pdf",
      password: "s&l2026+3"
    }
  };

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
    handlePasswordSubmit
  } = usePasswordProtectedDownload({
    correctPassword: project.password,
    fileUrl: project.pitchdeckUrl
  });

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{project.title} – Urban Hustle Films</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://uhfilms.in/project/${id}`} />
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
                  backgroundSize: project.shouldCover ? 'cover' : 'contain',
                  backgroundPosition: 'center 25%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              {project.shouldDim && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 100%)',
                    filter: 'brightness(1.5) contrast(1.3) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
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
                  <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                  <p className="text-gray-300 leading-relaxed">{project.synopsis}</p>
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
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-4">Production Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Status</span>
                      <span className="text-red-500 font-semibold">{project.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Budget</span>
                      <span>{project.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-2xl font-bold text-white mb-4">Creative Team</h2>
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