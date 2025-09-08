import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Github, Linkedin, Mail, Twitter, Instagram, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IconCloud } from './ui/interactive-icon-cloud';

const IntroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const iconCloudRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 3.5
    }); 

    // Headline animation
    tl.fromTo(headlineRef.current, {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power2.out"
    });

    // Subtitle animation
    tl.fromTo(subtitleRef.current, {
      y: 30,
      opacity: 0,
      filter: 'blur(8px)'
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power2.out"
    }, "-=0.6");

    // CTA animation
    tl.fromTo(ctaRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4");

    // 3D cloud animation
    tl.fromTo(iconCloudRef.current, {
      x: 100,
      opacity: 100,
      filter: 'blur(10px)'
    }, {
      x: 0,
      opacity: 100,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: "power2.out"
    }, "-=1");

    // CTA hover animations
    const handleCTAEnter = () => {
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    const handleCTALeave = () => {
      gsap.to(ctaRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    const ctaElement = ctaRef.current;
    if (ctaElement) {
      ctaElement.addEventListener('mouseenter', handleCTAEnter);
      ctaElement.addEventListener('mouseleave', handleCTALeave);
    }
    return () => {
      if (ctaElement) {
        ctaElement.removeEventListener('mouseenter', handleCTAEnter);
        ctaElement.removeEventListener('mouseleave', handleCTALeave);
      }
      tl.kill();
    };
  }, []);
  const downloadResume = () => {
    const resumeUrl = "./public/my_cv.pdf"; // resume URL
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sadat_Ali_Resume.pdf';
    link.click();
  };

  const techStackSlugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "postman",
    "androidstudio",
    "sonarqube",
    "figma"
  ];
    return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Icon Cloud - Hidden on mobile for performance */}
      <div ref={iconCloudRef} className="lg:block absolute right-0 top-0 w-1/2 h-full z-0 flex items-center justify-center">
        <div className="w-full max-w-lg h-96 mt-20">
          <IconCloud iconSlugs={techStackSlugs} />
        </div>
      </div>
 

      {/* Content Layout */}
      <div ref={heroRef} className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen pt-20 lg:pt-0">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <h1 ref={headlineRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient-primary">Sadat</span>
              <br />
              <span className="text-gradient-secondary">Full Stack Developer</span>
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">I build high-performance applications that empower businesses and inspire users.</p>

            {/* Hire-me, view projects, resume Buttons */}
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/contact"
                ref={ctaRef} 
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold rounded-full text-base sm:text-lg shadow-2xl hover:shadow-accent/25 transition-all duration-300 accent-glow"
              >
                <span className="relative z-10">Hire Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </Link>
              
              <Link 
                to="/projects"
                className="px-6 sm:px-6 py-3 sm:py-3 border-2 border-primary text-primary font-semibold rounded-full text-base sm:text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                View Projects
              </Link>

              <button 
                onClick={downloadResume}
                className="flex items-center justify-center w- gap-2 px-6 sm:px-6 py-3 sm:py-3 border-2 border-accent text-accent font-semibold rounded-full text-base sm:text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Download size={18} />
                <span className="hidden sm:inline">View Resume</span>
                <span className="sm:hidden">Resume</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              <a href="https://github.com/sadatali123" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a href="https://linkedin.com/in/sadat-ali-50353130b" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a href="sa9621952@gmail.com" className="p-2 sm:p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a> */}
              <a href="https://www.instagram.com/ali__2729_/" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Side -  Floating animation elements  */}
          <div className="hidden lg:flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md h-96 relative ml-80 mt-[28rem] ">
              
              {/* Floating circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 animate-float" />
              </div>
              {/* <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-neon-cyan/30 animate-float" style={{
              animationDelay: '1s'
            }} /> */}
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-primary/20 animate-float" style={{
              animationDelay: '2s'
            }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-muted-foreground" size={24} />
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
    </section>;
};
export default IntroSection;