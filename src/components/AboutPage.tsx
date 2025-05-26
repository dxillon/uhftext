import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, Heart, Star, Award, Film, Users, Briefcase, Square } from 'lucide-react';
import anime from 'animejs';
import { Helmet } from 'react-helmet-async';

const teamMembers = [
  {
    name: "Bhishanpreet Singh",
    role: "Founder & Director",
    background: "A multi-talented creative force, Bhishanpreet Singh brings a rare combination of tech expertise and artistic vision to UH Films. With a diverse freelancing background across web development, Android app development, backend systems, film direction, and digital marketing, he seamlessly blends technology with storytelling.",
    keyRoles: [ 
      "Company leadership and strategic direction",
      "Scriptwriting & screenplay development",
      "Cinematography, editing, and visual storytelling",
      "Digital content production & marketing strategy",
      "Oversight of technical projects (web/mobile)"
    ],
    notableWork: [
      "Directed multiple short films and branded visuals for local startups and YouTube channels",
      "Built high-performance web apps and Android applications as a freelancer for clients across India",
      "Specializes in animation and video editing, blending cinematic storytelling with motion design",
      "Leads UH Films' digital marketing initiatives, ensuring maximum reach and impact for each project"
    ]
  },
  {
    name: "Harry Targotra",
    role: "Director & Writer",
    background: "A visionary director with over 15 years of experience in both fiction and non-fiction series. Known for creating immersive narratives, Harry has directed and written several critically acclaimed films and series across various genres, blending real-life stories with imaginative fiction.",
    keyRoles: [
      "Director of All Projects",
      "Writer for Fiction and Non-Fiction Series",
      "Creative Visionary",
      "Script Development"
    ],
    notableWork: [
      "Director & Writer for *Agyaat* (Mystery Thriller Series)",
      "Director of *Beyond Hanwell* (Psychological Thriller)",
      "Creator & Writer for *Trail of Blood* (Fictional Drama)",
      "Director of *Suicide Fun* (Non-Fictional Exploration)"
    ]
  },
  {
    name: "Sankalp Kumar",
    role: "Chief Executive Officer",
    background: "Sankalp Kumar is a seasoned professional with extensive expertise in data analytics, growth marketing, strategic brand development, and customer insights across diverse industries and geographies. His work reflects a strong command over AI/ML-based decision-making models, performance marketing, and strategic consulting tailored for both global corporations and regional campaigns. Sankalp bridges marketing strategy with cinematic storytelling. Having led successful SEO and growth campaigns in the US truck market and political sectors, he now channels his insight into scriptwriting, campaign films, and digital distribution. His short film 'Unheard Echoes' gained 1M+ views, showcasing his strength in emotionally driven content and high-impact execution.",
    keyRoles: [
      "Data analytics and AI/ML-powered decision-making",
      "Growth marketing and performance optimization",
      "Strategic brand development and customer insights",
      "Scriptwriting and campaign film production",
      "Digital distribution and brand positioning"
    ],
    notableWork: [
      "Directed short film 'Unheard Echoes' (1M+ views)",
      "Led AI/ML transformation in price elasticity modeling for Global Beverage Giant, UAE",
      "Engineered predictive pricing and competitive analysis for Dubai’s Largest FMCG Company",
      "Optimized customer-centric strategy for Food & Beverage Retailer, Riyadh",
      "Improved GDPR compliance and customer experience at Harry's Inc, UK"
    ],
    skills: [
      "Data & Analytics: AI/ML, Python, R, Predictive Modeling, Time Series",
      "Marketing Platforms: Google Ads, Meta Ads, Hubspot, Freshsales",
      "Performance Marketing: SEO, SEM, Lead Generation, Campaign Optimization",
      "Dashboards & Visualization: Tableau, Excel, SQL, Google Analytics",
      "Creative Strategy: Brand Positioning, Content Marketing, Film Promotion"
    ]
  },
  {
    name: "Shaurya Chaudhary",
    role: "Design Director & CGI Specialist",
    background: "Shaurya is a boundary-pushing visual artist with a deep passion for CGI, 3D art, motion graphics, and surreal world-building. At UH Films, he leads creative direction in graphic design, conceptual modeling, and cinematic visual development. His work stands out for its blend of clean aesthetics, futuristic elements, and emotionally resonant storytelling through motion.",
    keyRoles: [
      "Leads creative direction in graphic design, conceptual modeling, and cinematic visual development",
      "Designs and develops innovative CGI art, 3D visualizations, and motion graphics",
      "Works collaboratively with directors and producers to ensure artistic consistency and impact",
      "Creates compelling, emotionally resonant visual storytelling through digital mediums",
      "Incorporates cutting-edge technologies and techniques to push the boundaries of design"
    ],
    notableWork: [
      "Led visual direction for various high-profile CGI projects at UH Films",
      "Pioneered the use of advanced CGI techniques to craft surreal, otherworldly visuals",
      "Developed immersive 3D models and motion graphics for a variety of cinematic projects",
      "Known for blending futuristic and organic visual elements into cohesive designs"
    ]
  },
  {
    name: "Rahul Abhua",
    role: "Filmmaker | Screenwriter | Actor",
    background: "Rahul is an award-winning filmmaker and screenwriter based in Mumbai, known for his gripping narratives and cinematic direction. With over 45 short films, 2 feature web series—KAKORI and BHASUDI—and work across documentaries, advertisements, and branded content, Rahul is one of the strongest narrative voices at UH Films. He is a registered SWA member and has written multiple OTT projects, with approved scripts currently in production. His storytelling also extends into print, with his book ‘Main Shunya Hi Sahi’ published in 2020. Whether as a director, editor, DOP, or writer, Rahul’s versatility adds unmatched depth to the team’s cinematic offerings.",
    keyRoles: [
      "Directed 2 feature web series (KAKORI and BHASUDI)",
      "Created 45+ award-winning short films (13 awards, 19 nominations)",
      "Writer/Director for multiple OTT projects (in progress)",
      "Directed ad films for brands, influencers & platforms like Radio Mirchi",
      "Authored Main Shunya Hi Sahi – available on Amazon & Flipkart"
    ],
    notableWork: [
      "RJ Naved shoot for Radio Mirchi (2019)",
      "Documentary on women’s rights for Jamia Millia Islamia (2018)",
      "Interview shoot of Rajat Sharma (India TV) for RED FM (2018)"
    ]
  },
  {
    name: "Nishant Wankhade",
    role: "Cinematographer | Photographer | Producer",
    background: "Nishant is a versatile cinematographer, photographer, and producer, with a diverse portfolio of ad films, music videos, web series, and brand campaigns. His work spans Nike (Jordan), Oppo, Nestlé, Licious, Neeman’s, Santoor, and IFP, bringing a strong balance of creative direction and technical finesse. Whether he’s writing scripts for celebrity influencer campaigns, editing high-impact reels, or operating the camera in the streets of India, Nishant brings a textured, real, and vibrant feel to every project. His ability to deliver full-stack content—from concept to final edit—makes him a creative force within UH Films.",
    keyRoles: [
      "2nd Photographer for Nike Jordan 11's street campaign",
      "Scriptwriter for Oppo Find X7 Ultra (feat. Rajeev Masand & Anubhav Sinha)",
      "DOP for Licious, Nestlé, Tulsea Creatives, Indian Super League",
      "Editor for Troovy Foods & social content across platforms",
      "Photographer for Nature’s Basket eCommerce catalogue",
      "Set Lead & Talent Manager for Santoor, Neeman’s Ad Films",
      "BTS Photographer for UN-backed Refugee Film",
      "Cinematographer for short films, music videos & art documentaries",
      "DOP Intern on Lionsgate’s Jugaadistan (2021)",
      "Former photographer at RDKLU, Delhi fashion label"
    ],
    notableWork: [
      "2nd Photographer for Nike Jordan 11's street campaign",
      "Scriptwriter for Oppo Find X7 Ultra (feat. Rajeev Masand & Anubhav Sinha)",
      "DOP for Licious, Nestlé, Tulsea Creatives, Indian Super League",
      "Editor for Troovy Foods & social content across platforms",
      "Photographer for Nature’s Basket eCommerce catalogue",
      "Set Lead & Talent Manager for Santoor, Neeman’s Ad Films",
      "BTS Photographer for UN-backed Refugee Film",
      "Cinematographer for short films, music videos & art documentaries",
      "DOP Intern on Lionsgate’s Jugaadistan (2021)",
      "Former photographer at RDKLU, Delhi fashion label",
      " education: BA English (Hons) – Vivekananda Institute of Professional Studies\nDiploma in Filmmaking & Photography – DCOP, Delhi"
    ]
  },
  {
    name: "Mayur Srivastava",
    role: "Designer | Storyteller | Creative Technologist",
    background: "Mayur blends graphic design, storytelling, and interactive technology to create experiences that resonate. With a background in UX/UI, branding, digital media, and experimental storytelling, he adds a bold, thoughtful, and refined touch to all visual aspects of UH Films’ identity. His personal design philosophy is shaped by minimalism, narrative clarity, and aesthetic coherence. Whether it’s designing a film’s look and feel, branding for clients, or creative experiments that live on the web, Mayur’s versatility across mediums brings depth to the team’s creative landscape.",
    keyRoles: [
      "UX/UI Design for websites, applications, and films",
      "Brand identity creation and visual communication",
      "Creative direction for experimental storytelling and digital media",
      "Collaborating with directors and producers to define visual aesthetics",
      "Story-driven design for interactive experiences and installations"
    ],
    notableWork: [
      "Design and branding for various independent film projects",
      "Creative direction for interactive web experiences and installations",
      "Collaborated on film aesthetics, visual narratives, and identity design for UH Films",
      "Conceived and executed design concepts for several startup brands"
    ]
  },
  {
    name: "Shrish Bhatt Saravu",
    role: "Creative Consultant & VFX/3D Specialist",
    background: "Shrish Bhatt Saravu is a versatile digital artist and filmmaker with a deep passion for visual storytelling, 3D design, VFX, and independent cinema. With a strong foundation in multiple disciplines like CGI, editing, and direction, Shrish brings an imaginative, detail-driven approach to UH Films.",
    keyRoles: [
      "Creative consultation for film aesthetics and visual tone",
      "3D modeling, motion graphics, and VFX supervision",
      "Independent short film direction and experimental visuals",
      "Narrative design and digital concept art",
      "Ideation and execution of emotionally resonant visuals"
    ],
    notableWork: [
      "Directed multiple experimental short films and animations showcased on his portfolio",
      "Created immersive 3D visuals and visual effects for a wide range of projects",
      "Strong command over tools like Blender, Adobe After Effects, and DaVinci Resolve",
      "Known for infusing cinematic depth into abstract and futuristic ideas"
    ]
  }
];

const coreServices = [
  {
    icon: Film,
    title: "Film Production",
    points: [
      "Full-service film production",
      "Script development and storyboarding",
      "Location scouting and management",
      "Professional crew coordination"
    ]
  },
  {
    icon: Users,
    title: "Creative Direction",
    points: [
      "Artistic vision development",
      "Visual storytelling",
      "Brand identity integration",
      "Creative team leadership"
    ]
  },
  {
    icon: Star,
    title: "Post-Production",
    points: [
      "Professional video editing",
      "Color grading and correction",
      "Sound design and mixing",
      "Visual effects and animation"
    ]
  },
  {
    icon: Award,
    title: "Content Strategy",
    points: [
      "Market research and analysis",
      "Target audience identification",
      "Distribution planning",
      "Marketing integration"
    ]
  },
  {
    icon: Briefcase,
    title: "Project Management",
    points: [
      "Budget planning and control",
      "Timeline management",
      "Resource allocation",
      "Quality assurance"
    ]
  }
];

const AboutPage = () => {
  const teamRef = useRef<HTMLDivElement>(null);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll('.team-member'),
              translateY: [100, 0],
              opacity: [0, 1],
              duration: 1200,
              delay: anime.stagger(150),
              easing: 'easeOutExpo'
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMember = (name: string) => {
    setExpandedMember(expandedMember === name ? null : name);
  };

  return (
    <>
      <Helmet>
        <title>Our Team – Urban Hustle Films</title>
        <meta name="description" content="Meet the passionate creators and artists behind Urban Hustle Films." />
        <link rel="canonical" href="https://uhfilms.in/team" />
      </Helmet>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Mission & Vision */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white mb-20"
          >
            <motion.h1
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="text-5xl font-bold text-center mb-16"
            >
              About Us
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-black/30 rounded-lg backdrop-blur-sm border border-gray-800"
              >
                <Target className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-300">
                  To nurture fresh talent, deliver impactful stories, and push creative boundaries through cinematic excellence and collaborative spirit.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-8 bg-black/30 rounded-lg backdrop-blur-sm border border-gray-800"
              >
                <Rocket className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-300">
                  To become a trailblazer in the film and digital content industry by producing iconic works that reflect truth, emotion, and imagination.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-8 bg-black/30 rounded-lg backdrop-blur-sm border border-gray-800"
              >
                <Heart className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <p className="text-gray-300">
                  Creativity, integrity, and excellence in every project we undertake.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Core Services */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-black/20 rounded-lg backdrop-blur-sm border border-gray-800 text-white"
                >
                  <service.icon className="w-8 h-8 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-20"
            ref={teamRef}
          >
            <h2 className="text-4xl font-bold text-center mb-16 text-gradient">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  className={`team-member p-6 bg-black/20 backdrop-blur-sm border border-gray-800 rounded-xl transition-all duration-300 ${expandedMember === member.name ? 'scale-105' : ''
                    }`}
                  onClick={() => toggleMember(member.name)}
                  data-clickable="true"
                  style={{
                    willChange: 'box-shadow', // Optimization for smooth transition
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 15px 5px rgba(239, 68, 68, 0.5)', // Red outline with blur effect
                  }}
                  transition={{ boxShadow: '0.3s ease-in-out' }} // Smooth transition for the shadow
                >
                  <div className="flex justify-between items-start mb-4 ">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-red-500">{member.role}</p>
                    </div>
                    <div className="flex flex  whitespace-nowrap items-center gap-2 text-white ml-12 }}">
                      <span
                        className={`text-sm transition-colors duration-300 ${expandedMember === member.name ? 'text-white' : 'text-red-500'
                          }`}
                      >
                        {expandedMember === member.name ? 'Hide Details' : 'More Details'}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedMember === member.name ? 180 : 0 }}
                        className={`text-l ${expandedMember === member.name ? 'text-red-500' : 'text-white'}`}
                      >
                        ↓
                      </motion.div>


                    </div>
                  </div>

                  <motion.div
                    animate={{ height: expandedMember === member.name ? 'auto' : '100px' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Background</h4>
                        <p className="text-gray-300">{member.background}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Key Roles</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {member.keyRoles.map((role, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div >
                        <h4 className="text-lg font-semibold text-white mb-2">Notable Work</h4>
                        <ul className="space-y-2 pl-6">
                          {member.notableWork.map((work, index) => (
                            <li key={index} className="text-gray-300 flex items-start pl-6">
                              {/* Custom diamond bullet using Square icon */}
                              <Square className="w-2 h-2 text-purple-500 fill-current  mr-2 mt-1.5  transform rotate-45 flex-shrink-0  ml-[-18px]" />
                              <span>{work}</span> {/* Text */}
                            </li>
                          ))}
                        </ul>
                        {member.skills && (
                          <div className="mt-4">
                            <h4 className="text-lg font-semibold text-white mb-2">Skills</h4>
                            <ul className="space-y-2">
                              {member.skills.map((skill, index) => (
                                <li key={index} className="text-gray-300">
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block mr-2" />
                                  {skill}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
      </>
      );
      
};

      export default AboutPage