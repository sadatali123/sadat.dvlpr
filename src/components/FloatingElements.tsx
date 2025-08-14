import { useEffect } from 'react';
import { gsap } from 'gsap';

const FloatingElements = () => {
  useEffect(() => {
    // Animate floating orbs
    gsap.utils.toArray('.floating-orb').forEach((orb: any, index) => {
      gsap.to(orb, {
        y: -30,
        x: Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.5
      });
    });

    // Animate floating particles
    gsap.utils.toArray('.floating-particle').forEach((particle: any, index) => {
      gsap.to(particle, {
        y: -50,
        x: Math.random() * 30 - 15,
        rotation: 360,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: index * 0.3
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="floating-orb absolute rounded-full opacity-20"
          style={{
            width: `${60 + Math.random() * 100}px`,
            height: `${60 + Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, hsl(${180 + Math.random() * 90} 100% 70% / 0.3), transparent)`,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Small Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="floating-particle absolute w-1 h-1 rounded-full bg-accent/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full filter blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-neon-purple/5 to-transparent rounded-full filter blur-2xl" />
    </div>
  );
};

export default FloatingElements;