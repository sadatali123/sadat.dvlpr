import Navigation from '@/components/Navigation';
import FloatingElements from '@/components/FloatingElements';
import CursorEffect from '@/components/CursorEffect';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      {/* Background Elements */}
      <FloatingElements />
      
      {/* Cursor Effect */}
      <CursorEffect />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="pt-20">
        <AboutSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;