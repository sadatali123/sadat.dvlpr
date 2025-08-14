import Navigation from '@/components/Navigation';
import FloatingElements from '@/components/FloatingElements';
import CursorEffect from '@/components/CursorEffect';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';

const Projects = () => {
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
        <ProjectsSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Projects;