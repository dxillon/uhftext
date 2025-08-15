import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Download, Share2, QrCode } from "lucide-react";
import {
  FaXTwitter,
  FaThreads,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";

const QRModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const closeModal = () => {
    // If opened via direct link (/qr), go to home
    // If opened via footer button on another page, go back to that page
    if (location.pathname === "/qr") {
      navigate("/");
    } else {
      navigate(-1); // Go back in history
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Connect with UH Films",
          text: "Check out UH Films - Urban Tales | Cinematic Trails",
          url: window.location.origin, 
        });
      } else {
        navigator.clipboard.writeText(window.location.origin);
        alert("Home page link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = "/qr.png";
    link.download = "uhfilms-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
      <div className="relative bg-black rounded-lg p-6 max-w-md w-full mx-auto border-2 border-red-600">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-center text-white">
            Show your love ❤️
          </h2>

          <div className="border-2 border-red-600 p-4 rounded-lg bg-white">
            <img
              src="/qr.png"
              alt="QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={downloadQR}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
            >
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>

          <div className="w-full mt-6">
            <h3 className="text-center font-semibold mb-4 text-white">
              Follow Us
            </h3>

            <div className="grid grid-cols-2 gap-5">
              {/* First Column */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-red-500">
                  @bishan dxillon
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/thebishandxillon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaInstagram size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bishandxillon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href="https://x.com/Bishandxillon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaXTwitter size={22} />
                  </a>
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-red-500">
                  @urbanhsutlefilms
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.instagram.com/urbanhustlefilms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaInstagram size={22} />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/urbanhustlefilms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  <a
                    href="https://www.threads.net/@urbanhustlefilms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaThreads size={22} />
                  </a>
                  <a
                    href="https://www.youtube.com/@urbanhustlefilms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaYoutube size={22} />
                  </a>

                  <a
                    href="https://x.com/urbanhustlefilm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <FaXTwitter size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
