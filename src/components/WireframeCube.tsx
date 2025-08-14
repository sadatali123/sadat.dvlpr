import { useEffect, useRef } from 'react';

const WireframeCube = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('WireframeCube: Component mounted');
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('WireframeCube: Canvas ref is null');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('WireframeCube: Could not get 2D context');
      return;
    }

    console.log('WireframeCube: Starting animation setup');

    // Set canvas size
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    let animationFrame: number;
    let angle = 0;

    const centerX = size / 2;
    const centerY = size / 2;
    const cubeSize = 50;

    // Define cube vertices (8 corners of a cube)
    const vertices = [
      [-cubeSize, -cubeSize, -cubeSize], [cubeSize, -cubeSize, -cubeSize], 
      [cubeSize, cubeSize, -cubeSize], [-cubeSize, cubeSize, -cubeSize],
      [-cubeSize, -cubeSize, cubeSize], [cubeSize, -cubeSize, cubeSize], 
      [cubeSize, cubeSize, cubeSize], [-cubeSize, cubeSize, cubeSize]
    ];

  
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
    ];

    const rotatePoint = (x: number, y: number, z: number, angleX: number, angleY: number) => {
      // Rotate around Y axis
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const tempX = x * cosY - z * sinY;
      const tempZ = x * sinY + z * cosY;

      // Rotate around X axis
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const newY = y * cosX - tempZ * sinX;
      const newZ = y * sinX + tempZ * cosX;

      return [tempX, newY, newZ];
    };

    const project = (x: number, y: number, z: number) => {
      const distance = 300;
      const scale = distance / (distance + z);
      return [
        centerX + x * scale,
        centerY + y * scale
      ];
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      angle += 0.02;

      // Rotate and project all vertices
      const projectedVertices = vertices.map(vertex => {
        const [x, y, z] = rotatePoint(vertex[0], vertex[1], vertex[2], angle * 0.7, angle);
        return project(x, y, z);
      });

      // Draw edges with gradient effect
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      edges.forEach(edge => {
        const [startVertex, endVertex] = edge;
        const [x1, y1] = projectedVertices[startVertex];
        const [x2, y2] = projectedVertices[endVertex];

        // Create gradient for each edge
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#a855f7');
        
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw vertices with glow effect
      projectedVertices.forEach(([x, y]) => {
        // Glow effect
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[200px] max-h-[200px]"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
};

export default WireframeCube;