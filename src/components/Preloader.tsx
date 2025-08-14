import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress);
      }
    });

    // Animate progress bar visual
    tl.to(".progress-bar", {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
    }, 0);

    // Animate text
    tl.from(".preloader-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, 0.5);

    // Exit animation
    tl.to(".preloader-content", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
      delay: 0.5
    });

    tl.to(".preloader", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="preloader-content text-center">
        {/* Animated Logo/Text */}
        <div className="preloader-text mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-gradient-primary mb-4">
            Sadat
          </h1>
          <p className="text-muted-foreground text-lg tracking-wider">
            Full Stack Developer
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Loading</span>
            <span className="text-sm text-accent font-mono">{progress}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="progress-bar h-full bg-gradient-to-r from-accent to-primary rounded-full w-0 neon-glow"
            />
          </div>
        </div>

        {/* Floating Dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full bg-accent/30 animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;