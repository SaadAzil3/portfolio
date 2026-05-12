import { useEffect, useRef } from 'react';

const NUM_DOTS = 6;
const RADIUS = 12;
const LERP_LEADER = 0.45;
const LERP_TRAIL = 0.3;

export default function GooeyCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots = Array.from({ length: NUM_DOTS }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
    }));

    const target = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    let animId: number;

    const animate = () => {
      // Clear canvas instead of fillRect so we don't hide the DOM
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Leader follows mouse
      dots[0].x += (target.x - dots[0].x) * LERP_LEADER;
      dots[0].y += (target.y - dots[0].y) * LERP_LEADER;

      // Trailers follow previous dot
      for (let i = 1; i < NUM_DOTS; i++) {
        dots[i].x += (dots[i - 1].x - dots[i].x) * LERP_TRAIL;
        dots[i].y += (dots[i - 1].y - dots[i].y) * LERP_TRAIL;
      }

      // Draw all dots
      for (let i = 0; i < NUM_DOTS; i++) {
        const alpha = 0.6 - (i / NUM_DOTS) * 0.3;
        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 160, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 999, filter: 'blur(16px) contrast(120%)' }}
    />
  );
}
