import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Information Service",
      description: "A comprehensive MERN stack application for reporting and managing grievances with real-time notifications and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Express"],
      gradient: "from-blue-500 to-purple-600",
      demo: "https://your-project-demo-url.com",
      github: "https://github.com/sadatali123"
    },
    // {
    //   title: "MICA 2025 Conference Site",
    //   description: "Official conference website with registration system, speaker profiles, and event management built with modern web technologies.",
    //   tech: ["React", "TypeScript", "Tailwind", "Supabase"],
    //   gradient: "from-green-500 to-teal-600",
    //   demo: "https://your-mica-demo-url.com",
    //   github: "https://github.com/sadatali123"
    // },
    {
      title: "Zerodha Clone",
      description: "A Zerodha-inspired trading platform clone with payment integration, user authentication and reponsive design.",
      tech: ["React", "Express.js", "Material UI", "Mongoose", "Jwt"],
      gradient: "from-orange-500 to-red-600",
      demo: "https://your-ecommerce-demo-url.com",
      github: "https://github.com/sadatali123/Zerodha-Clone"
    },
    {
      title: "AI Chatbot",
      description: "An AI-powered chatbot designed using api integration to provide real-time responses and enhance user engagement.",
      tech: ["React","Node.js", "Express.js", "MongoDB"],
      gradient: "from-purple-500 to-pink-600",
      demo: "https://your-chat-app-demo-url.com",
      github: "https://github.com/sadatali123/AI-Chatbot"
    },
    {
      title: "Portfolio",
      description: "A modern 3D portfolio combining animations, interactivity, and responsive design to showcase my work.",
      tech: ["TypeScript", "Three.js", "shadcn", "Tailwind CSS"],
      gradient: "from-cyan-500 to-blue-600",
      demo: "https://your-analytics-demo-url.com",
      github: "https://github.com/sadatali123/sadat.dvlpr"
    },
    {
      title: "MICA 2025 Conference Site",
      description: "Official conference website with registration system, speaker profiles, and event management built with modern web technologies.",
      tech: ["HTML", "CSS", "javascript", " Express.js",  "MongoDB"],
      gradient: "from-indigo-500 to-purple-600",
      demo: "https://mica.net.in/",
      github: "https://github.com/sadatali123/MICA-2025"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
      gsap.fromTo(sectionRef.current, {
        opacity: 0,
        filter: 'blur(10px)'
      }, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Cards animation
      gsap.fromTo(cardsRef.current?.children || [], {
        y: 100,
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)'
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Hover animations for cards
      gsap.utils.toArray('.project-card').forEach((card: any) => {
        const handleEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Showcasing innovative solutions built with cutting-edge technologies
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass-card p-6 rounded-2xl hover:purple-glow transition-all duration-300 group relative overflow-hidden"
            >
              {/* Project Header */}
              <div className="relative z-10">
                <div className={`h-2 w-16 bg-gradient-to-r ${project.gradient} rounded-full mb-6`} />
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-secondary/50 rounded-full text-secondary-foreground border border-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-primary text-accent-foreground rounded-lg hover:scale-105 transition-transform text-sm font-medium"
                  >
                    <Globe size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass-button rounded-lg hover:scale-105 transition-transform text-sm font-medium"
                  >
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
              
              {/* Floating Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ExternalLink size={48} />
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/sadatali123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 glass-button rounded-full text-accent border border-accent/30 hover:bg-accent/10 transition-all hover:scale-105 accent-glow"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent filter blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-tl from-cyan-500/10 to-transparent filter blur-2xl" />
    </section>
  );
};

export default ProjectsSection;