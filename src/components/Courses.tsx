import TopLoadingBar from './TopLoadingBar';
import { useLoading } from './LoadingContext';
import { useEffect, useRef, useState } from 'react';
import { Users } from 'lucide-react'; 
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { courses } from '../types/course';
import { 
    FloatingParticles, 
    InteractiveBadge, 
    RotatingText, 
    StudentCounter, 
    useStudentCounter, 
    CourseGrid 
} from '../components/courses'; 

const Courses = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const studentCount = useStudentCounter();
    const x = useMotionValue(0);
    const background = useTransform(
        x,
        [0, 100],
        [
            'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
            'linear-gradient(135deg, #0f0f0f 0%, #2a1a1a 50%, #0f0f0f 100%)'
        ]
    );

    useEffect(() => {
        const bgAnimation = animate(x, [0, 100, 0], {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        });

        return () => bgAnimation.stop();
    }, [x]);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const navigationType = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationType?.type === 'navigate') {
      setIsInitialLoad(true);
    } else {
      setIsInitialLoad(false);
      startLoading();
    }

    return () => {
      stopLoading();
    };
  }, []);


  
    return (
      <>
<Helmet>
  <title>Film Courses | Learn Cinematography, Direction & Editing – Urban Hustle Films</title>
  <meta name="description" content="Master the art of filmmaking with Urban Hustle Films. Enroll in our hands-on courses covering cinematography, direction, editing, and more." />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://uhfilms.in/courses" />
  <meta property="og:title" content="Film Courses | Learn Cinematography, Direction & Editing – Urban Hustle Films" />
  <meta property="og:description" content="Join expert-led courses from Urban Hustle Films and gain real-world filmmaking skills in cinematography, directing, and editing." />
  <meta property="og:image" content="https://www.uhfilms.in/uhf.png" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://uhfilms.in/courses" />
  <meta name="twitter:title" content="Film Courses | Learn Cinematography, Direction & Editing – Urban Hustle Films" />
  <meta name="twitter:description" content="Hands-on filmmaking training with Urban Hustle Films. Learn from professionals in the field." />
  <meta name="twitter:image" content="https://www.uhfilms.in/uhf.png" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://uhfilms.in/courses" />

  {/* Structured Data (JSON-LD) */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Urban Hustle Films – Cinematic Mastery Program",
        "description": "Hands-on filmmaking courses in cinematography, directing, editing, and more taught by industry professionals.",
        "provider": {
          "@type": "Organization",
          "name": "Urban Hustle Films",
          "sameAs": "https://uhfilms.in"
        }
      }
    `}
  </script>
</Helmet>
        
 <TopLoadingBar isLoading={!isInitialLoad && isLoading} onFinish={stopLoading} />
    
        <motion.div
            className="min-h-screen py-32 md:py-32 relative overflow-hidden"
            style={{ background }}
            ref={containerRef}
        >
            <FloatingParticles />
            
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-2xl"></div>
                <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-gradient-to-br from-yellow-500/10 to-pink-500/10 blur-2xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-center mb-12 md:mb-16"
                >
                    <InteractiveBadge>
                        <RotatingText />
                    </InteractiveBadge>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 leading-tight">
                        Cinematic <span className="text-white">Mastery</span>
                    </h1>

                    <StudentCounter count={studentCount} />

                    <motion.p
                        className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        Transform your filmmaking skills with our <span className="text-orange-400">dynamic, hands-on</span> courses taught by industry experts
                    </motion.p>
                </motion.div>

                <CourseGrid courses={courses} />

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="inline-flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-full px-5 py-2">
                        <Users className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-orange-400 font-medium">
                            <span className="text-white font-bold">{studentCount.toLocaleString()}+</span> students enrolled worldwide
                        </span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
         
      </>
    );
};
export default Courses;