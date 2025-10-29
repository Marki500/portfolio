import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
};

const createParticles = (count: number, width: number, height: number): Particle[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.6 + 0.2,
    opacity: Math.random() * 0.4 + 0.2
  }));

const Particles = ({ count = 40 }: { count?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      particles.current = createParticles(count, innerWidth, innerHeight);
    };

    let animationId: number;

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((particle) => {
        context.beginPath();
        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 6
        );
        gradient.addColorStop(0, `rgba(152, 0, 203, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(10, 12, 25, 0)');
        context.fillStyle = gradient;
        context.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        context.fill();
        particle.y -= particle.speed;
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [count]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-60" aria-hidden="true" />;
};

export default Particles;
