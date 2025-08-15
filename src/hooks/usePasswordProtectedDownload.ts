import { useState, useEffect } from 'react';

interface UsePasswordProtectedDownloadProps {
  correctPassword: string;
  fileUrl: string;
}

export function usePasswordProtectedDownload({
  correctPassword,
  fileUrl,
}: UsePasswordProtectedDownloadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Add styles to prevent scrolling while maintaining position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scrolling and position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      // Cleanup: ensure scroll is restored when component unmounts
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsIncorrectPassword(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsIncorrectPassword(false);
    setIsDownloading(false);
  };

  const handlePasswordSubmit = async (password: string) => {
    if (password === correctPassword) {
      // Password is correct, start download animation
      setIsDownloading(true);
      
      try {
        // Create a download link
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        
        // Simulate a small delay for the download animation
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Trigger the download
        link.click();
        document.body.removeChild(link);
        
        // Close the modal after a brief delay
        setTimeout(() => {
          closeModal();
        }, 500);
      } catch (error) {
        console.error('Download failed:', error);
        setIsDownloading(false);
      }
    } else {
      // Password is incorrect
      setIsIncorrectPassword(true);
      setIsDownloading(false);
    }
  };

  return {
    isModalOpen,
    isIncorrectPassword,
    isDownloading,
    openModal,
    closeModal,
    handlePasswordSubmit,
  };
}

export default usePasswordProtectedDownload;