import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {  Instagram, Linkedin,Users, BriefcaseIcon, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobApplicationForm2 from './JobApplicationForm2';
import { Helmet } from 'react-helmet-async';
import { BsTwitterX } from "react-icons/bs";

const mainTeam = [
  {
    name: "Bishanpreet Singh",
    role: "Founder & Producer",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745935032/Untitled_design_2_mcvbus.png",
    achievements: ["Trendmaker", "Story Hustler", "Vision Architect"],
    journey: "true",
    instagram: "https://instagram.com/thebishandxillon",
    x: "https://x.com/Bishandxillon",
    linkedin: "https://www.linkedin.com/in/bishanpreet-singh-2582a62b7",
    description: "Tech-savvy and creatively driven, Bishanpreet blends coding with storytelling to lead bold, boundary-pushing productions. His diverse freelancing roots in development and direction shape the innovative spirit of UH Films."
  },
  {
    name: "Harry Targotra",
    role: "Production Director",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745868468/Untitled_design_4_eu2n3m.png",
    achievements: ["Frame Whisperer", "Idea Machine", "Set Commander"],
    journey: "false",
    instagram: "https://www.instagram.com/hitt_pawan_targotra",
    linkedin: "https://www.linkedin.com/in/harry-targotra-252047356/",
    description: "From script to screen, Harry builds each series from the ground up. As DOP, he crafts rich, cinematic visuals that bring stories to life with emotional depth and visual precision."
  },
  {
    name: "Sankalp Kumar",
    role: "Executive Director",
    image: "https://res.cloudinary.com/dbtj6orw2/image/upload/v1745935240/Untitled_design_3_reofpb.png",
    achievements: ["Pixel Bender", "Gearhead", "Render King"],
    journey: "false",
    description: "Sankalp fuses data intelligence with film craft, driving strategy and storytelling. With viral campaigns and a 1M+ viewed short film, he channels audience insight into high-impact narratives."
  }
];

const departments = {
  "Writing Team": {
    description: "Our writing team crafts compelling narratives that captivate audiences. From feature films to documentaries, they bring stories to life with creativity and precision.",
    members: [

      "Aarav Mehta - Head Scriptwriter",
      "Ritika Sharma - Dialogue Writer",
      "Tanmay Iyer - Story Consultant",
      "Neha Dutta - Assistant Script Coordinator",
      "Sofia Patel - Production Coordinator",
      "Neha Sharma - Scriptwriter",
      "Sanya Kapoor - Dialogue Writer",
      "Shivani Bhatia - Storyboard Artist",
      "Aarav Mehta - Head Scriptwriter",
      "Ritika Sharma - Dialogue Writer",
      "Tanmay Iyer - Story Consultant",
      "Neha Dutta - Assistant Script Coordinator",
      "Sofia Patel - Production Coordinator",
      "Neha Sharma - Scriptwriter",
      "Sanya Kapoor - Dialogue Writer",
      "Shivani Bhatia - Storyboard Artist"
    ]
  },
  "Camera Department": {
    description: "Expert cinematographers and camera operators who capture stunning visuals. Using state-of-the-art equipment, they transform directors' visions into beautiful imagery.",
    members: [
      "Sahil Verma - Lead Video Editor",
      "Divya Kapoor - Color Grading Artist",
      "Rohan Pillai - Sound Designer",
      "Meenal Rao - VFX Supervisor",
      "Rohan Pillai - Camera Department Head",
      "Ravi Kumar - Cinematographer",
      "Vikram Joshi - Lighting Technician",
      "Sahil Verma - Lead Video Editor",
      "Divya Kapoor - Color Grading Artist",
      "Rohan Pillai - Sound Designer",
      "Meenal Rao - VFX Supervisor",
      "Rohan Pillai - Camera Department Head",
      "Ravi Kumar - Cinematographer",
      "Vikram Joshi - Lighting Technician"
    ]
  },
  "Post-Production": {
    description: "Masters of digital artistry who polish and perfect our productions. From editing to color grading, they ensure the highest quality final product.",
    members: [
      "Sahil Verma - Lead Video Editor",
      "Divya Kapoor - Color Grading Artist",
      "Rohan Pillai - Sound Designer",
      "Tanvi Mehta - Senior Video Editor",
      "Sandeep Reddy - Digital Imaging Technician",
      "Sahil Verma - Lead Video Editor",
      "Divya Kapoor - Color Grading Artist",
      "Rohan Pillai - Sound Designer",
      "Tanvi Mehta - Senior Video Editor",
      "Sandeep Reddy - Digital Imaging Technician"
    ]
  },
  "Art Department": {
    description: "Creative visionaries who design and build our worlds. They handle everything from set design to props, creating immersive environments for our stories.",
    members: [
      "Divya Kapoor - Color Grading Artist",
      "Priya Iyer - Art Director",
      "Aditi Singh - Production Designer",
      "Kiran Luthra - Art Department Assistant",
      "Divya Kapoor - Color Grading Artist",
      "Priya Iyer - Art Director",
      "Aditi Singh - Production Designer",
      "Kiran Luthra - Art Department Assistant"
    ]
  }
};

const jobOpenings = [
  {
    title: "Director of Photography (DOP)",
    description: "The Director of Photography is responsible for the visual style of the production. They collaborate with the director to create the look and feel of each scene, handling lighting, camera angles, and composition.",
    requirements: [
      "Proven experience as a DOP in film/television production.",
      "In-depth knowledge of cameras, lighting, and camera movements.",
      "Strong communication and collaboration skills.",
      "Ability to work under pressure and manage a team of camera operators."
    ]
  },

  {
    title: "Public Relations (PR) Manager",
    description: "The PR Manager handles the communication between the production and the public, managing media relations, press releases, and promotional efforts. They ensure that the production gets positive coverage in the press and engages with audiences through social media. ",
    requirements: [
      "Proven experience in public relations or communications.",
      "Strong writing and verbal communication skills.",
      "Ability to build and maintain relationships with media outlets.",
      "Proficiency in social media marketing and online branding."
    ]
  }
];

const TeamPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expandedDepartments, setExpandedDepartments] = useState<Record<string, boolean>>({});
  const scrollContainers = useRef<Record<string, HTMLDivElement | null>>({});
  const [isScrolling, setIsScrolling] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScrolling) return;

      setScrollPosition(prev => {
        return prev + 1.2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isScrolling]);

  const handleDepartmentClick = (department: string) => {
    setExpandedDepartments(prev => {
      const newState = { ...prev };
      newState[department] = !prev[department];
      return newState;
    });
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
  };

  const handleCloseForm = () => {
    setSelectedJob(null);
  };

  const getScrollTransform = (department: string) => {
    if (expandedDepartments[department]) {
      return 'translateY(0)';
    }

    const members = departments[department as keyof typeof departments].members;
    const containerHeight = members.length * 40;
    const adjustedPosition = scrollPosition % containerHeight;

    return `translateY(-${adjustedPosition}px)`;
  };

  return (
    <>
      <Helmet>
        <title>Our Team – Urban Hustle Films</title>
        <meta name="description" content="Meet the passionate creators and artists behind Urban Hustle Films." />
        <link rel="canonical" href="https://uhfilms.in/team" />
      </Helmet>

      <div className="min-h-screen pt-20 overflow-x-hidden">
        <div className="min-h-screen pt-20">
          <div className="container mx-auto px-4 py-16">
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-20"
            >
              <motion.h1
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="text-5xl font-bold text-center mb-16 text-gradient"
              >
                Leadership Team
              </motion.h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mainTeam.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="card group overflow-hidden"
                    data-clickable="true"
                  >
                    <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-red-500 font-medium">{member.role}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {member.achievements.map((achievement, i) => (
                          <span key={i} className="px-3 py-1 bg-red-500/10 rounded-full text-red-400 text-sm">
                            {achievement}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-300">{member.description}</p>
                    </div>

                    {member.journey === "true" && (
                      <div className="flex justify-between items-center mt-4 mb-6">
                        <Link to={`/journey`} className="inline-block">
                          <motion.div
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            variants={{ hover: { scale: 1.05 } }}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                          >
                            <span>View Journey</span>
                            <motion.span
                              variants={{ hover: { x: 6 } }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="group-hover:text-red-500 transition-colors duration-300"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.span>
                          </motion.div>
                        </Link>

                        <div className="flex gap-3">
                          {member.instagram && (
                            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                              <Instagram className="w-5 h-5" />
                            </a>
                          )}
                          {member.x && (
                            <a href={member.x} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                              <BsTwitterX className="w-5 h-5" />
                            </a>
                          )}
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}



                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold text-center mb-16 text-gradient">Our Teams</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(departments).map(([department, { description, members }], index) => (
                  <motion.div
                    key={department}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`card group overflow-hidden transition-all duration-300 ${expandedDepartments[department] ? 'ring-2 ring-red-500/50' : ''
                      }`}
                    onClick={() => handleDepartmentClick(department)}
                    data-clickable="true"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-red-500" />
                        {department}
                      </h3>
                      {expandedDepartments[department] ? (
                        <ChevronUp className="w-5 h-5 text-red-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <p className="text-gray-300 mb-4">{description}</p>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${expandedDepartments[department] ? 'h-auto' : 'h-[160px]'
                        }`}
                    >
                      <div
                        ref={el => scrollContainers.current[department] = el}
                        className={`transition-transform duration-1000 ${expandedDepartments[department] ? 'translate-y-0!' : ''
                          }`}
                        style={{
                          transform: getScrollTransform(department)
                        }}
                      >
                        {members.map((member, i) => (
                          <div
                            key={`${member}-${i}`}
                            className={`py-2 transition-colors duration-300 ${expandedDepartments[department]
                              ? 'text-white'
                              : 'text-gray-400 hover:text-white'
                              }`}
                          >
                            {member}
                          </div>
                        ))}
                        {!expandedDepartments[department] && [...members, ...members].map((member, i) => (
                          <div
                            key={`duplicate-${member}-${i}`}
                            className="py-2 text-gray-400 hover:text-white transition-colors"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`mt-4 text-center text-xs text-gray-500 opacity-75 ${expandedDepartments[department] ? 'block' : 'hidden'
                      }`}>
                      Click to resume scrolling
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8 text-gradient">Join Our Team</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {jobOpenings.map((job, index) => (
                    <motion.div
                      key={job.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card group h-full"
                      data-clickable="true"
                    >
                      <BriefcaseIcon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                      <p className="text-gray-400 mb-4">{job.description}</p>
                      <div className="space-y-2 mb-6">
                        <h4 className="text-sm font-semibold text-red-500">Requirements:</h4>
                        <ul className="text-gray-400 space-y-1">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => handleApplyClick(job.title)}
                        className="mt-auto inline-flex items-center justify-center px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full"
                      >
                        Apply Now
                      </button>
                    </motion.div>
                  ))}
                </div>
                <Link
                  to="/careers"
                  className="btn-primary inline-flex items-center gap-2 group"
                  data-clickable="true"
                >
                  <span>View All Positions</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.section>
          </div>

          {selectedJob && (
            <JobApplicationForm2
              selectedRole={selectedJob}
              onClose={handleCloseForm}
            />
          )}
        </div>
      </div>
    </>
  );

};

export default TeamPage;