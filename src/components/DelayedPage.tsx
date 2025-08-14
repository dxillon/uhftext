// DelayedPage.tsx (new component)
import { useLoading } from './LoadingContext';
import { useEffect } from 'react';
import TopLoadingBar from './TopLoadingBar';

const DelayedPage = ({ children }: { children: React.ReactNode }) => {
  const { startLoading, stopLoading } = useLoading();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      setShowContent(true);
      stopLoading();
    }, 1500); // Match this with your TopLoadingBar duration

    return () => {
      clearTimeout(timer);
      stopLoading();
    };
  }, [startLoading, stopLoading]);

  return (
    <>
      <TopLoadingBar />
      {showContent && children}
    </>
  );
};

export default DelayedPage;