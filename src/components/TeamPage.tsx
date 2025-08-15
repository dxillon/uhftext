import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Users,
  BriefcaseIcon,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import JobApplicationForm2 from "./JobApplicationForm2";
import { BsTwitterX } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import { mainTeam, departments, jobOpenings } from "../data/team";

const TeamPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [expandedDepartments, setExpandedDepartments] = useState<
    Record<string, boolean>
  >({});
  const scrollContainers = useRef<Record<string, HTMLDivElement | null>>({});
  const [isScrolling, setIsScrolling] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [playedAnimations, setPlayedAnimations] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScrolling) return;
      setScrollPosition((prev) => prev + 1.2);
    }, 50);
    return () => clearInterval(interval);
  }, [isScrolling]);

  const handleDepartmentClick = (department: string) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
  };

  const handleCloseForm = () => {
    setSelectedJob(null);
  };

  const getScrollTransform = (department: string) => {
    if (expandedDepartments[department]) return "translateY(0)";
    const member1 =
      departments[department as keyof typeof departments]?.member1 || [];
    const containerHeight = member1.length * 40;
    const adjustedPosition = scrollPosition % containerHeight;
    return `translateY(-${adjustedPosition}px)`;
  };

  return (
    <>
      <Helmet>
        <title>Meet the Team | Urban Hustle Films™</title>
        <meta
          name="description"
          content="Get to know the creative minds behind Urban Hustle Films™ – a passionate team of filmmakers, developers, designers, and storytellers."
        />
        <meta
          name="keywords"
          content="Urban Hustle Films Team, Filmmakers, Creators, Designers, Developers, Creative Team, Crew, Urban Hustle Films Members"
        />
        <meta name="author" content="Urban Hustle Films™" />
        <meta
          property="og:title"
          content="Meet the Team | Urban Hustle Films"
        />
        <meta
          property="og:description"
          content="Meet our creative team – the people behind the storytelling, visuals, tech, and innovation at Urban Hustle Films™."
        />
        <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />
        <meta property="og:url" content="https://uhfilms.in/team" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Meet the Team | Urban Hustle Films"
        />
        <meta
          name="twitter:description"
          content="Explore the brilliant team behind the visuals, code, and stories at Urban Hustle Films™."
        />
        <meta name="twitter:image" content="https://www.uhfilms.in/uhf.png" />
        <link rel="canonical" href="https://uhfilms.in/team" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <div className="min-h-screen pt-20 overflow-x-hidden">
        <div className="container mx-auto px-4 py-16">
          {/* Leadership Team */}
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
                  animate={
                    playedAnimations[`member-${index}`]
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  onViewportEnter={() => {
                    if (!playedAnimations[`member-${index}`]) {
                      setPlayedAnimations((prev) => ({
                        ...prev,
                        [`member-${index}`]: true,
                      }));
                    }
                  }}
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
                      <h3 className="text-2xl font-semibold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-red-500 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-4 p-4">
                    <div className="flex flex-wrap gap-2">
                      {member.achievements.map((ach, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-red-500/10 rounded-full text-red-400 text-sm"
                        >
                          {ach}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300">{member.description}</p>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
                      {member.journey === "true" && (
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
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                              }}
                              className="group-hover:text-red-500 transition-colors duration-300"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.span>
                          </motion.div>
                        </Link>
                      )}
                      <div className="flex gap-3 ml-auto">
                        {member.instagram && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-pink-500 transition-colors"
                          >
                            <Instagram className="w-5 h-5" />
                          </a>
                        )}
                        {member.x && (
                          <a
                            href={member.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                          >
                            <BsTwitterX className="w-5 h-5" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Departments Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
              Our Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(departments).map(
                ([department, deptData], index) => {
                  const isExpanded = expandedDepartments[department];
                  const membersToShow = isExpanded
                    ? deptData.member2 || []
                    : [...deptData.member1, ...deptData.member1];

                  return (
                    <motion.div
                      key={department}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={
                        playedAnimations[`dept-${index}`]
                          ? { opacity: 1, x: 0 }
                          : {}
                      }
                      onViewportEnter={() => {
                        if (!playedAnimations[`dept-${index}`]) {
                          setPlayedAnimations((prev) => ({
                            ...prev,
                            [`dept-${index}`]: true,
                          }));
                        }
                      }}
                      transition={{ delay: index * 0.1 }}
                      className={`card group overflow-hidden transition-all duration-300 ${
                        isExpanded ? "ring-2 ring-red-500/50" : ""
                      }`}
                      onClick={() => handleDepartmentClick(department)}
                      data-clickable="true"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                          <Users className="w-6 h-6 text-red-500" />
                          {department}{" "}
                          <span hidden>
                            {isExpanded ? "Member2" : "Member1"}
                          </span>
                        </h3>

                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-red-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">
                        {deptData.description}
                      </p>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? "h-auto" : "h-[160px]"
                        }`}
                      >
                        <div
                          ref={(el) =>
                            (scrollContainers.current[department] = el)
                          }
                          className="transition-transform duration-1000"
                          style={{ transform: getScrollTransform(department) }}
                        >
                          {membersToShow.map((member, i) => (
                            <div
                              key={`${member}-${i}`}
                              className={`py-2 transition-colors duration-300 ${
                                isExpanded
                                  ? "text-white"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`mt-4 text-center text-xs text-white opacity-75 ${
                          isExpanded ? "block" : "hidden"
                        }`}
                      >
                        Click to resume scrolling
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </motion.section>

          {/* Careers Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-gradient">
              Join Our Team
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {jobOpenings.map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      playedAnimations[`job-${index}`]
                        ? { opacity: 1, y: 0 }
                        : {}
                    }
                    onViewportEnter={() => {
                      if (!playedAnimations[`job-${index}`]) {
                        setPlayedAnimations((prev) => ({
                          ...prev,
                          [`job-${index}`]: true,
                        }));
                      }
                    }}
                    transition={{ delay: index * 0.1 }}
                    className="card group h-full"
                    data-clickable="true"
                  >
                    <BriefcaseIcon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{job.description}</p>
                    <div className="space-y-2 mb-6">
                      <h4 className="text-sm font-semibold text-red-500">
                        Requirements:
                      </h4>
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
