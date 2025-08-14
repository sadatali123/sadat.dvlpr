import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import FloatingElements from '@/components/FloatingElements';
import CursorEffect from '@/components/CursorEffect';
import HeroSection from '@/components/IntroSection';
import WorkExperience from '@/components/WorkExperience';
import Footer from '@/components/Footer';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent initial flash by hiding content
    document.body.style.overflow = 'hidden';
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        {/* Background Elements */}
        <FloatingElements />
        
        {/* Cursor Effect */}
        <CursorEffect />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Sections */}
        <main>
          <HeroSection />
          <WorkExperience />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;