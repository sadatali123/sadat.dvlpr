import Navigation from '@/components/Navigation';
import FloatingElements from '@/components/FloatingElements';
import CursorEffect from '@/components/CursorEffect';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Contact = () => {
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
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;