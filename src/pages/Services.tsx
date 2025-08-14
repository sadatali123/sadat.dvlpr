import Navigation from '@/components/Navigation';
import FloatingElements from '@/components/FloatingElements';
import CursorEffect from '@/components/CursorEffect';
import ServicesSection from '@/components/ServicesSection';
import Footer from '@/components/Footer';

const Services = () => {
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
        <ServicesSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Services;