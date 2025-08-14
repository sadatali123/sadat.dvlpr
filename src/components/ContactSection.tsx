import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, LinkedinIcon } from 'lucide-react';
import ThreeDEarth from './ThreeDEarth';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Form inputs animation
      gsap.fromTo('.form-input', {
        x: -50,
        opacity: 0,
        filter: 'blur(5px)'
      }, {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Contact info animation
      gsap.fromTo('.contact-info', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.contact-info',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success animation
    gsap.to('.submit-btn', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    setIsSubmitting(false);
    
    // Reset form
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Get In <span className="text-gradient-primary">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Have a project in mind or just want to say hello? Drop me a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* 3D Animation */}
          <div className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden -mt-28">
            <ThreeDEarth />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gradient-secondary">
                Let's Connect
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always interested in new opportunities and collaborations. 
                Whether you have a project idea, need technical consultation, or just want to chat about tech, feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="contact-info flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center accent-glow">
                  <Mail className="text-accent" size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-muted-foreground">sa9621952@gmail.com</div>
                </div>
              </div>

              <div className="contact-info flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center purple-glow">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">Phone</div>
                  <div className="text-muted-foreground">+91 6009936633</div>
                </div>
              </div>

              <div className="contact-info flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-cyan/10 rounded-full flex items-center justify-center neon-glow">
                  <MapPin className="text-neon-cyan" size={20} />
                </div>
                <div>
                  <div className="font-medium text-foreground">Location</div>
                  <div className="text-muted-foreground">Tripura, India</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-info pt-8">
              <h4 className="font-medium mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/sadatali123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-glass rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:accent-glow"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/sadat-ali-50353130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-glass rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:accent-glow"
                >
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent/10 to-transparent filter blur-xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-primary/10 to-transparent filter blur-2xl" />
    </section>
  );
};

export default ContactSection;