import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  PaintBrush, 
  Globe, 
  Lightning
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // const skills = [
  //   { name: 'HTML', icon: Code, color: 'text-orange-400' },
  //   { name: 'CSS', icon: PaintBrush, color: 'text-blue-400' },
  //   { name: 'JavaScript', icon: Code, color: 'text-yellow-400' },
  //   { name: 'React.js', icon: Globe, color: 'text-blue-400' },
  //   { name: 'GSAP', icon: Lightning, color: 'text-green-400' },
  // ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal animation
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
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Image animation
      gsap.fromTo(imageRef.current, {
        x: -100,
        opacity: 0,
        scale: 0.8,
        rotation: -5
      }, {
        x: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Content animation
      gsap.fromTo(contentRef.current?.children || [], {
        y: 50,
        opacity: 0,
        filter: 'blur(5px)'
      }, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Skills animation
      gsap.fromTo(skillsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* profile image */}
          <div ref={imageRef} className="relative order-1 lg:order-none">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
              {/* glowing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-primary p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-background/95 backdrop-blur-sm" />
              </div>
              
              {/* profile image */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img 
                  src="\images\my_image.png"
                  alt="Sadat Ali - Web Developer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* animated background elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent animate-float" />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/30 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-4 sm:-right-8 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-neon-cyan animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          {/* content */}
          <div ref={contentRef} className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                About <span className="text-gradient-primary">Me</span>
              </h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I am a <span className="text-accent font-semibold">B.Tech Computer Science student</span> at 
                  ICFAI University Tripura with a 
                  passionate full-stack developer.
                </p>
                
                <p>
                  I have built real-world applications using the <span className="text-accent">MERN stack</span> and 
                  <span className="text-primary"> Spring Boot</span>, including a Grievance & Emergency Reporting System 
                  and the official MICA 2025 conference site.
                </p>
                
                <p>
                  I focus on writing <span className="text-neon-cyan">clean, scalable code</span> and building 
                  high-performance, visually-rich web applications with cutting-edge animations and 3D interactions.
                </p>
              </div>

              {/* Resume Download Button */}
              <div className="mt-8">
                <a
                  href="/resume.pdf"
                  download="Sadat_Ali_Resume.pdf"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold rounded-full hover:scale-105 transition-all duration-300 accent-glow"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Resume
                </a>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 lg:mt-8">
                <div className="glass-card p-3 sm:p-4 rounded-xl">
                  <div className="text-xs sm:text-sm text-muted-foreground">Email</div>
                  <div className="text-accent font-medium text-sm sm:text-base break-all">sa9621952@gmail.com</div>
                </div>
                <div className="glass-card p-3 sm:p-4 rounded-xl">
                  <div className="text-xs sm:text-sm text-muted-foreground">Phone</div>
                  <div className="text-accent font-medium text-sm sm:text-base">+91 6009936633</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-4">
            Tech <span className="text-gradient-secondary">Stack</span>
          </h3>
          
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        

          <div className="space-y-8 mb-12">
            {/* Languages */}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">Languages</h4>
              <div className="flex flex-wrap gap-3">
                {['C', 'C++', 'Python'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* frontend tech stack*/}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">Frontend</h4>
              <div className="flex flex-wrap gap-3">
                {['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Shadcn/UI'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* backend tech stack*/}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">Backend</h4>
              <div className="flex flex-wrap gap-3">
                {['Node.js', 'Express.js', 'Spring Boot'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* database */}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">Database</h4>
              <div className="flex flex-wrap gap-3">
                {['MongoDB', 'PostgreSQL', 'Supabase', 'MySQL', 'Redis', 'SQLite'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* ORM/ODM */}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">ORM/ODM</h4>
              <div className="flex flex-wrap gap-3">
                {['Mongoose', 'Prisma', 'Drizzle'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Web3 */}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">Web3</h4>
              <div className="flex flex-wrap gap-3">
                {['Solidity'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* DevOps */}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">DevOps</h4>
              <div className="flex flex-wrap gap-3">
                {['Docker', 'Kubernetes', 'CI/CD', 'Kafka'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-accent mb-4">Tools</h4>
              <div className="flex flex-wrap gap-3">
                {['Git', 'GitHub', 'Postman'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* <div ref={skillsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="glass-card p-4 sm:p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 hover:accent-glow group cursor-pointer"
              >
                <skill.icon 
                  className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${skill.color} group-hover:scale-110 transition-transform`} 
                />
                <div className="text-xs sm:text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {skill.name}
                </div>
              </div>
            ))}
          </div> */}

        </div>
      </div>

      {/* background animation */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent/10 to-transparent filter blur-xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-primary/10 to-transparent filter blur-2xl" />
    </section>
  );
};

export default AboutSection;