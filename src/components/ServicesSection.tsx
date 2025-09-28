import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Smartphone, 
  Code,
  Cloud,
  Palette,
  MessageCircle,
  Rocket,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      subtitle: "Frontend / Backend / Full Stack",
      description: "I build responsive, high-performance websites — from simple static pages to full SaaS platforms.",
      pricing: [
        { type: "Static Website (Portfolio / Landing Page)", price: "₹4,000 – ₹7,000" },
        { type: "Dynamic Website (Blog / CMS-based Site)", price: "₹7,000 – ₹15,000" },
        { type: "Full-Stack Web App (with DB, Auth, Admin Panel)", price: "₹15,000 – ₹50,000+" }
      ],
      techStack: "React.js, Next.js, Node.js, Express.js, Tailwind CSS, Prisma, MongoDB, PostgreSQL"
    },
    {
      icon: Smartphone,
      title: "Android App Development",
      subtitle: "Modern & Elegant Apps",
      description: "Using Flutter or Java, I develop Android apps with real-time features and seamless backend integration.",
      pricing: [
        { type: "Basic App (Info-based, Offline)", price: "₹7,000 – ₹12,000" },
        { type: "Feature-Rich App (Firebase, Real-time Chat, API Integration)", price: "₹15,000 – ₹35,000+" }
      ]
    },
    {
      icon: Code,
      title: "API Development & Backend Services",
      subtitle: "Secure & Scalable APIs",
      description: "Secure and scalable REST or GraphQL APIs that power your frontend or mobile apps with clean architecture.",
      pricing: [
        { type: "Standalone API (Auth, CRUD, etc.)", price: "₹6,000 – ₹18,000" },
        { type: "Integrated with Frontend (Complete Flow)", price: "₹20,000+" }
      ]
    },
    {
      icon: Cloud,
      title: "DevOps & Deployment",
      subtitle: "Zero Downtime Deployments",
      description: "Smooth deployments with zero downtime. I handle infrastructure setup, CI/CD, and production-level reliability.",
      pricing: [
        { type: "VPS / Cloud Setup & App Deployment", price: "₹2,000 – ₹5,000" },
        { type: "Docker, Nginx, PM2, CI/CD Pipelines, Cloudflare setup", price: "₹4,000 – ₹10,000+" }
      ]
    },
    {
      icon: Palette,
      title: "UI/UX Design Consulting",
      subtitle: "User-First Design",
      description: "Clean, user-first design that blends usability with modern visuals. Perfect for web and mobile applications.",
      pricing: [
        { type: "Wireframes + Design Feedback", price: "₹1,500 – ₹4,000" },
        { type: "Complete UI Design (Figma)", price: "₹5,000 – ₹10,000+" }
      ]
    },
    // {
    //   icon: MessageCircle,
    //   title: "Technical Mentorship / Consulting",
    //   subtitle: "Real-Time Guidance",
    //   description: "Need clarity on a stack? Stuck in your code? I offer real-time guidance, best practices, and deep dives into projects.",
    //   pricing: [
    //     { type: "1:1 Session (1 Hour)", price: "₹700" },
    //     { type: "Project Guidance / Code Review", price: "₹1,000 – ₹2,500/session" }
    //   ]
    // }
  ];

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

      // Header animation
      gsap.fromTo(headerRef.current?.children || [], {
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
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Services animation
      gsap.fromTo(servicesRef.current?.children || [], {
        y: 80,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
            At <span className="text-accent font-semibold">sadat.dvlpr</span>, I deliver clean, efficient, and scalable software solutions tailored to your needs. 
            Whether you're a business, startup, or solo founder — I turn your ideas into high-performance digital products with modern tools and best practices.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="space-y-14">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:accent-glow group"
            >
              <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
                {/* Service Header */}
                <div className="xl:w-1/3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform flex-shrink-0">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground break-words">{service.title}</h3>
                      <p className="text-accent font-medium text-sm sm:text-base">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                    {service.description}
                  </p>
                  {service.techStack && (
                    <div className="glass-card p-3 sm:p-4 rounded-xl">
                      <div className="text-xs sm:text-sm font-medium text-accent mb-2">Tech Stack:</div>
                      <div className="text-xs sm:text-sm text-muted-foreground break-words">{service.techStack}</div>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="xl:w-2/3">
                  <div className="space-y-3 sm:space-y-4">
                    {service.pricing.map((item, pIndex) => (
                      <div key={pIndex} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-xl bg-background/50 border border-glass-border">
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-foreground font-medium text-sm sm:text-base break-words">{item.type}</span>
                        </div>
                        <span className="text-lg sm:text-xl font-bold text-accent self-start sm:self-center">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notes Section */}
        <div className="mt-16 glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">🧾</span>
            Notes
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Pricing depends on complexity, features, and scope</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Discounts available for long-term or multi-project work</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>All work is contract-based with clear timelines</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Payments via UPI / Bank Transfer (PhonePe Invoice)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">📩</span>
              Ready to start?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Let's build something incredible together. Reach out at{' '}
              <a 
                href="mailto:services@sadatali.dev" 
                className="text-accent font-semibold hover:underline"
              >
                services@sadatali.dev
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent to-primary text-accent-foreground font-semibold rounded-full hover:scale-105 transition-all duration-300 accent-glow text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Get Started
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 glass-button border border-accent/30 text-accent font-semibold rounded-full hover:bg-accent/10 transition-all duration-300 text-sm sm:text-base"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent/10 to-transparent filter blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-tr from-primary/10 to-transparent filter blur-2xl" />
    </section>
  );
};

export default ServicesSection;