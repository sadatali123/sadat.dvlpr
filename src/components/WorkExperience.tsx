import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import micaLogo from '@/assets/mica-logo.png';

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal animation
      gsap.fromTo(sectionRef.current, 
        { 
          opacity: 0,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        gsap.fromTo(cards,
          {
            y: 50,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      company: "National Informatics Center (NIC), Agartala",
      role: "Full Stack Developer Intern",
      period: "Jun 2025 – Present",
      description: "As part of my internship at NIC Agartala, I am developing the backend system for an Information Service Management System to streamline public complaints and emergency reporting. I have designed role-based backend modules for citizens and authorities, implemented emergency contact categorization, and worked on secure backend data operations. The platform is being developed collaboratively to ensure scalability and robust performance.",
      logo: "/images/nic-logo.png",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      company: "Directorate of Information Technology, Agartala",
      role: "Backend Developer Intern",
      period: "Jul 2025 – Present",
      description: "During my internship at DIT Agartala, I am building backend modules for a tax management system using Spring Boot and PostgreSQL, focusing on secure API development and integration.",
      logo: "/images/dit-logo.png",
      gradient: "from-green-500/20 to-teal-500/20"
    },
    {
      company: "NIELIT Agartala",
      role: "Android Development Intern",
      period: "Jul 2024 – Sep 2024",
      description: "As a part of my internship at NIELIT Agartala, I developed a real-time chat application using Flutter and Firebase with features like user authentication and real-time messaging.",
      logo: "/images/nielit-logo.jpg",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      company: "MICA 2025 – ICFAI University, Tripura",
      role: "Web Developer",
      period: "Feb 2025 – Apr 2025",
      description: "I designed and deployed the official website for MICA 2025, an international conference hosted at ICFAI University Tripura.",
      logo: micaLogo,
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="work-experience" 
      className="relative min-h-screen bg-background py-20 overflow-hidden"
    >
     
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            🧑‍💻 Work Experience
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            My professional journey through various internships and projects, gaining valuable experience in full-stack development, backend systems, and mobile app development.
          </p>
        </div>

        {/* Experience Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {experiences.map((experience, index) => (
            <Card 
              key={index} 
              className={`experience-card group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardHeader className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center flex-shrink-0">
                    <img 
                      src={experience.logo} 
                      alt={`${experience.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground mb-1 break-words">
                      {experience.company}
                    </CardTitle>
                    <CardDescription className="text-primary font-semibold text-sm sm:text-base">
                      {experience.role}
                    </CardDescription>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                      📅 {experience.period}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {experience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse" />
    </section>
  );
};

export default WorkExperience;