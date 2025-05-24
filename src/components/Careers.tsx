import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Clock, MapPin, DollarSign } from 'lucide-react';
import JobApplicationForm from './JobApplicationForm';
import { Helmet } from 'react-helmet-async';

const jobOpenings = [
  {
    title: "T-Shirt Designer",
    department: "Design",
    location: "Remote",
    type: "Freelance/Part-time",
    salary: "Competitive",
    fastRecruiting: true,  
    description: "Create bold, urban-themed t-shirt designs for our streetwear line. Perfect for students or fresh graduates looking to build their portfolio. Quick hiring process!",
    requirements: [
      "Basic knowledge of design tools (Photoshop/Illustrator/Canva)",
      "Creative and understands urban culture",
      "No formal experience required (share your portfolio if available)",
      "Can work with quick turnarounds",
      "Students welcome to apply!"
    ]
  },
    {
    title: "Internship",
    department: "Any",
    location: "Remote",
    type: "Intern's",
    salary: "Commision , Stipend",
    fastRecruiting: true,  
description: "Create bold, urban-themed t-shirt designs for our streetwear line. Perfect for students or fresh graduates looking to build their portfolio. Quick hiring process!",
  requirements: [
    "Basic knowledge of design tools (Photoshop/Illustrator/Canva)",
    "Creative and understands urban culture",
    "No formal experience required (share your portfolio if available)",
    "Can work with quick turnarounds",
    "Students welcome to apply!"
  ]
},
  
  {
    title: "Screenwriter",
    department: "Writing",
    location: "Delhi, India / Remote",
    type: "Full-time",
    salary: "Competitive",
    description: "The Screenwriter is responsible for crafting the script, including the dialogue, story structure, and character arcs. They collaborate with the director to ensure the script aligns with the overall vision for the project.",
    requirements: [
      "Strong writing skills with a focus on storytelling.",
      "Proven experience writing for film/television in various genres.",
      "Ability to develop complex characters and plots.",
      "Experience in script formatting and adhering to industry standards."

    ]
  },
  {
    title: "Producer",
    department: "All-Production",
    location: "Delhi, India",
    type: "Full-time",
    salary: "Per Project",
    description: "The Producer oversees all aspects of the production, from budgeting and scheduling to managing the crew and ensuring everything stays on track. They are responsible for securing financing and managing the project through pre-production, filming, and post-production.",
    requirements: [
      "Proven experience in film production management.",
      "Strong leadership, organizational, and problem-solving skills.",
      "Ability to manage multiple departments and tight deadlines.",
      "Experience with budgeting, scheduling, and logistics."
    ]
  },
  {
    title: "VFX Artist",
    department: "post-production",
    location: "Delhi, India / Remote",
    type: "Project-based",
    salary: "Per project",
    description: "The VFX Artist is responsible for creating and integrating visual effects that enhance the story, including computer-generated imagery (CGI), digital effects, and compositing. They collaborate with the director to create seamless, visually impactful elements.",
    requirements: [
      "Experience with VFX software like Adobe After Effects, Nuke, or Houdini.",
      "Ability to create and integrate realistic visual effects.",
      "Strong understanding of compositing and 3D animation.",
      "Attention to detail and the ability to work under tight deadlines."
    ]
  },
  {
    title: "Sound Designer",
    department: "Post-Production",
    location: "Delhi, India",
    type: "Project-based",
    salary: "Per project",
    description: "The Sound Designer is responsible for creating and editing the auditory elements of the production, including sound effects, ambience, and dialogue editing. They work with the director to enhance the emotional tone through sound.",
    requirements: [
      "Proven experience in sound editing and sound design.",
      "Proficiency with sound design software like Pro Tools, Logic Pro, or Audition.",
      "Knowledge of audio recording techniques and equipment.",
      "Ability to work with the director to match sound design with visual storytelling."

    ]
  },
  {
    title: "Costume Designer",
    department: "Production",
    location: "Project location",
    type: "Project-based",
    salary: "Per project",
    description: "The Costume Designer designs and creates the wardrobe for the production, helping to reflect the characters’ personalities and the overall theme of the story. They collaborate closely with the director and actors to ensure the costumes fit the characters' roles.",
    requirements: [
      "Proven experience in costume design for film, theater, or television.",
      "Strong creativity and knowledge of historical and cultural costume styles.",
      "Ability to work within budget and time constraints.",
      "Experience in tailoring and fabric selection."
    ]
  },
  {
    title: "Cinematographer",
    department: "Marketing",
    location: "Delhi, India",
    type: "Project-based",
    salary: "Competitive",
    description: "The Cinematographer is responsible for the technical aspects of camera operation, lighting, and shot composition. They work closely with the director to achieve the desired visual aesthetic and convey the mood and tone of the story.",
    requirements: [
      "Proven experience as a cinematographer with expertise in camera equipment and lighting.",
      "Strong understanding of visual composition, framing, and shot planning.",
      "Ability to collaborate with the director to achieve the intended look of the film.",
      "Experience in both traditional film and digital formats."
    ]
  },
  {
    title: "Production Designer",
    department: "Art",
    location: "Project locations",
    type: "Project-based",
    salary: "Per project",
    description: "The Production Designer creates the visual concept for the film, designing sets, props, and the overall aesthetic of the production. They collaborate with the director and other designers to create a cohesive and immersive world for the film.",
    requirements: [
      "Experience in set design, art direction, or production design.",
      "Strong creative vision and attention to detail.",
      "Ability to work collaboratively with the director and other departments.",
      "Proficiency in design software like SketchUp or AutoCAD."
    ]
  },
  {
    title: "Editor & Animations",
    department: "Post-production",
    location: "Delhi, India / Remote",
    type: "Full-time",
    salary: "Per project",
    description: "The Editor & Animator is responsible for cutting and assembling raw footage into the final film, ensuring the story flows smoothly. They also create animations and visual effects to enhance the storytelling experience",
    requirements: [
      "Proficiency in editing software like Adobe Premiere Pro, Final Cut Pro, or Avid Media Composer.",
      "Experience with animation software such as After Effects or Blender.",
      "Strong sense of pacing, storytelling, and continuity.",
      "Ability to work in a fast-paced environment and meet tight deadlines."
    ]
  }
];
const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  // Handle going back to the job listings
  const handleBack = () => {
    setSelectedJob(null); // Reset selected job to show listings again
  };

  return (
    <>
      <Helmet>
        <title>Careers – Join Urban Hustle Films</title>
        <meta name="description" content="Explore career opportunities with Urban Hustle Films and become part of a bold creative movement." />
        <link rel="canonical" href="https://uhfilms.in/careers" />
      </Helmet>

      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center text-white mb-4"
          >
            Join Our Creative Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-center max-w-2xl mx-auto mb-16"
          >
            Be part of groundbreaking film projects and work with industry professionals
            in a creative and collaborative environment.
          </motion.p>

          {!selectedJob ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/20 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-black/30 transition-all duration-300 relative"
                  data-clickable="true"
                >
                    {job.fastRecruiting && (
    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
      Fast Recruiting
    </div>
  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                      <p className="text-red-500">{job.department}</p>
                    </div>
                    <Briefcase className="w-6 h-6 text-red-500" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4">{job.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-red-500 mb-2">Requirements:</h4>
                    <ul className="text-gray-400 space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job.title)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/20"
>
                    <span>Apply Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <JobApplicationForm selectedRole={selectedJob} handleBack={handleBack} />
          )}
        </div>
      </div>
    </>
  );
};

export default Careers;
