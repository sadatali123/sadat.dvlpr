import { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  createdAt: number;
}

const CursorEffect = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastMouseTime = useRef(Date.now());

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      setMousePos({ x: e.clientX, y: e.clientY });

      // Create particle trail (throttle to avoid too many particles)
      if (now - lastMouseTime.current > 50) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          createdAt: now
        };

        setParticles(prev => [...prev, newParticle]);
        lastMouseTime.current = now;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isEnabled]);

  // Clean up old particles
  useEffect(() => {
    if (!isEnabled) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setParticles(prev => 
        prev.filter(particle => now - particle.createdAt < 300)
          .map(particle => ({
            ...particle,
            opacity: Math.max(0, 1 - (now - particle.createdAt) / 300)
          }))
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Toggle Button */}
      {/* <button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed top-4 right-4 z-50 pointer-events-auto px-3 py-2 text-xs bg-background/80 backdrop-blur-sm border border-border rounded-md hover:bg-background/90 transition-colors"
      >
      </button> */}

      {/* Main cursor dot */}
      <div
        className="absolute w-3 h-3 rounded-full pointer-events-none transition-transform duration-100 ease-out"
        style={{
          left: mousePos.x - 6,
          top: mousePos.y - 6,
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.8) 40%, hsl(var(--accent) / 0.3) 70%, transparent 100%)',
          boxShadow: '0 0 10px hsl(var(--accent) / 0.6), 0 0 20px hsl(var(--accent) / 0.3)',
        }}
      />

      {/* Particle trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: particle.x - 3,
            top: particle.y - 3,
            opacity: particle.opacity,
            background: `hsl(var(--accent) / ${particle.opacity * 0.8})`,
            boxShadow: `0 0 ${4 * particle.opacity}px hsl(var(--accent) / ${particle.opacity * 0.4})`,
            transition: 'opacity 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
};

export default CursorEffect;