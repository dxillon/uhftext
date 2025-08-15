import TopLoadingBar from "./components/TopLoadingBar";
import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import QRModal from "./components/QRModal";
import TeamPage from "./components/TeamPage";
import AboutPage from "./components/AboutPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookiePolicy from "./components/CookiePolicy";
import ContactPage from "./components/ContactPage";
import PolicyPage from "./components/PolicyPage";
import TermsConditions from "./components/TermsConditions";
import ProjectDetail from "./components/ProjectDetail";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";
import Careers from "./components/Careers";
import Preloader from "./components/Preloader";
import JobApplicationForm from "./components/JobApplicationForm";
import JobApplicationForm2 from "./components/JobApplicationForm2";
import Journey from "./components/Journey";
import ArticlesPage from "./components/ArticlesPage";
import ArticleDetailPage from "./components/ArticleDetailPage";
import ProjectShowcase from "./components/ProjectShowcase";
import NotFound from "./components/NotFound";
import FAQPage from "./components/FAQPage";
import GetCastedPage from "./components/GetCastedPage";
import { Analytics } from "@vercel/analytics/react";
import { LoadingProvider } from "./components/LoadingContext";
const Courses = lazy(() => import("./components/Courses"));
const CourseDetail = lazy(() => import("./components/CourseDetail"));
// make sure this exists

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Custom cursor logic
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setTimeout(
        () => setFollowerPosition({ x: e.clientX, y: e.clientY }),
        100
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor ${isClicking ? "scale-50" : ""}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`custom-cursor-follower ${isClicking ? "scale-150" : ""}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
        }}
      />
    </>
  );
};

// Top bar loader wrapper for specific pages
const DelayedPage = ({ children }: { children: React.ReactNode }) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent && <TopLoadingBar onFinish={() => setShowContent(true)} />}
      {showContent && children}
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setContentReady(true), 500); // delay for animation
    }, 1200); // match your video duration
    return () => clearTimeout(timer);
  }, []);

  return (

      <LoadingProvider>
        <ScrollToTop />
        <div className="bg-black min-h-screen">
          <CustomCursor />
          <AnimatePresence mode="wait">
            {loading && <Preloader />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {contentReady && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {!loading && <Navbar />}
                
   {location.pathname === '/qr' && <QRModal />}
                
                <Suspense
                  fallback={
                    <div className="text-white text-center py-20">
                      Loading...
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/qr" element={null} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/about-us" element={<AboutPage />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/jobs" element={<Careers />} />
                    <Route path="/internships-uhfilms" element={<Careers />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route
                      path="/careers/apply"
                      element={<JobApplicationForm />}
                    />
                    <Route
                      path="/team/apply"
                      element={<JobApplicationForm2 />}
                    />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/cookies" element={<CookiePolicy />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                    <Route path="/refund-policy" element={<PolicyPage />} />
                    <Route path="/shipping-policy" element={<PolicyPage />} />
                    <Route path="/policies" element={<PolicyPage />} />
                    <Route
                      path="/cancellation-policy"
                      element={<PolicyPage />}
                    />
                    <Route path="/articles" element={<ArticlesPage />} />
                    <Route path="/blogs" element={<ArticlesPage />} />
                    <Route
                      path="/articles/:slug"
                      element={<ArticleDetailPage />}
                    />
                    <Route path="/journey" element={<Journey />} />
                    <Route path="/bishanpreet-journey" element={<Journey />} />

                    <Route path="/bishan" element={<TeamPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/ask-us" element={<FAQPage />} />

                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:slug" element={<CourseDetail />} />

                    <Route path="/watch" element={<ProjectShowcase />} />
                    <Route path="/projects" element={<ProjectShowcase />} />
                    <Route path="/get-noticed" element={<GetCastedPage />} />
<Route path="/getnoticed" element={<GetCastedPage />} />
                    <Route path="/casting" element={<GetCastedPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>

                <Footer />
              </motion.div>
            )}
          </AnimatePresence>

          <Analytics />
          <CookieBanner />
        </div>
      </LoadingProvider>

  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
