import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LogoProcessor from './LogoProcessor';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo('.nav-item', {
      y: -20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.2, 
      ease: "power2.out"
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Open animation
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.fromTo('.mobile-nav-item', {
        x: 50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
        delay: 0.2
      });
    } else {
      // Close animation
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.5,
        ease: "power2.in"
      });
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    gsap.to('.mobile-menu', {
      x: '100%',
      duration: 0.5,
      ease: "power2.in"
    });
  };

  const getNavPath = (item: string) => {
    switch(item.toLowerCase()) {
      case 'home': return '/';
      case 'about': return '/about';
      case 'services': return '/services';
      case 'projects': return '/projects';
      case 'contact': return '/contact';
      default: return '/';
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`sticky top-0 left-0 right-0 z-40 transition-all duration-100 ${
        isScrolled ? 'glass-card backdrop-blur-xl' : ''
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="nav-item">
              <Link 
                to="/"
                className="hover:scale-105 block"
              >
                <LogoProcessor
                  originalSrc="\images\my_logo.png"
                  alt="Sadat Logo"
                  className="w-12 h-9 sm:w-16 sm:h-12"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item, index) => (
                <Link
                  key={item}
                  to={getNavPath(item)}
                  className={`nav-item text-foreground/80 hover:text-accent transition-colors relative group ${
                    location.pathname === getNavPath(item) ? 'text-accent' : ''
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                    location.pathname === getNavPath(item) ? 'w-full' : 'w-0'
                  }`} />
                </Link>
              ))}
              
              {/* hire me button in navbar */}
              <Link 
                to="/contact"
                className="nav-item glass-button px-6 py-2 rounded-full text-accent border border-accent/30 hover:bg-accent/10 transition-all hover:scale-105 accent-glow"
              >
                Hire Me
              </Link>
            </div>

            {/* menu buttob for mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden nav-item text-foreground hover:text-accent transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div className="mobile-menu fixed top-0 right-0 h-full w-full max-w-sm bg-background/95 backdrop-blur-xl z-50 transform translate-x-full border-l border-glass-border">
        <div className="p-4 sm:p-6 pt-16 sm:pt-20">
          <div className="space-y-4 sm:space-y-6">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item, index) => (
              <Link
                key={item}
                to={getNavPath(item)}
                onClick={closeMenu}
                className={`mobile-nav-item block w-full text-left text-lg sm:text-xl text-foreground/80 hover:text-accent transition-colors ${
                  location.pathname === getNavPath(item) ? 'text-accent' : ''
                }`}
              >
                {item}
              </Link>
            ))}
            
            <div className="pt-4 sm:pt-6 border-t border-glass-border">
              <Link
                to="/contact"
                onClick={closeMenu}
                className="mobile-nav-item w-full glass-button px-4 sm:px-6 py-2 sm:py-3 rounded-full text-accent border border-accent/30 hover:bg-accent/10 transition-all block text-center"
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navigation;