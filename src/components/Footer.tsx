import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, LinkedinIcon, Mail, Heart } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer reveal animation
      gsap.fromTo(footerRef.current, {
        y: 60,
        opacity: 0,
        filter: 'blur(10px)'
      }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating particles animation
      gsap.utils.toArray('.footer-particle').forEach((particle: any, index) => {
        gsap.to(particle, {
          y: -20,
          x: Math.random() * 20 - 10,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3
        });
      });
    });
    return () => ctx.revert();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <footer ref={footerRef} className="relative pt-20 pb-8 bg-gradient-to-t from-background to-background/95 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => <div key={i} className="footer-particle absolute w-1 h-1 rounded-full bg-accent/20" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }} />)}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-gradient-primary mb-3 sm:mb-4">
              Sadat Ali
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed max-w-md text-sm sm:text-base">
              Full Stack Developer crafting immersive digital experiences with cutting-edge technologies. 
              Passionate about creating scalable, high-performance web applications.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://github.com/sadatali123" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-glass rounded-full flex items-center justify-center hover:scale-110 transition-all hover:accent-glow">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/sadat-ali-50353130" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-glass rounded-full flex items-center justify-center hover:scale-110 transition-all hover:accent-glow">
                <LinkedinIcon size={18} />
              </a>
              <a href="mailto:sa9621952@gmail.com" className="w-10 h-10 bg-glass rounded-full flex items-center justify-center hover:scale-110 transition-all hover:accent-glow">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Projects', path: '/projects' },
                { name: 'Contact', path: '/contact' }
              ].map(link => (
                <a 
                  key={link.name} 
                  href={link.path} 
                  className="block text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-3 text-muted-foreground">
              <div>
                <div className="text-sm">Email</div>
                <div className="text-accent">sa9621952@gmail.com</div>
              </div>
              <div>
                <div className="text-sm">Phone</div>
                <div className="text-accent">+91 6009936633</div>
              </div>
              <div>
                <div className="text-sm">Location</div>
                <div>Tripura, India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span> Copyright © Sadat Ali 2025. All Rights Reserved </span>
            
            
          </div>
          
          <button onClick={scrollToTop} className="px-4 py-2 glass-button rounded-full hover:scale-105 transition-all text-accent">
            Back to Top ↑
          </button>
        </div>

        {/* Tech Stack Badge */}
        <div className="mt-8 text-center">
          
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </footer>;
};
export default Footer;