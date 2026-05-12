import { useEffect, useRef } from 'react';

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const ALL_CHARS = CHARS + KATAKANA;

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId: number;
    let columns: { y: number; speed: number; chars: string[] }[] = [];
    let fontSize = 14;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const numCols = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: numCols }, () => ({
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        chars: Array.from({ length: Math.ceil(canvas.height / fontSize) + 5 }, () =>
          ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)]
        ),
      }));
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      columns.forEach((col, i) => {
        const x = i * fontSize;

        // Draw trailing characters
        for (let j = 0; j < 15; j++) {
          const charY = col.y - j * fontSize;
          if (charY > 0 && charY < canvas.height) {
            const alpha = Math.max(0, 1 - j / 15) * 0.4;
            ctx.fillStyle = `rgba(0, 229, 160, ${alpha})`;
            const charIdx = Math.floor((col.y / fontSize - j)) % col.chars.length;
            ctx.fillText(col.chars[Math.abs(charIdx)], x, charY);
          }
        }

        // Draw leading character brighter
        if (col.y > 0 && col.y < canvas.height) {
          ctx.fillStyle = '#00E5A0';
          const leadIdx = Math.floor(col.y / fontSize) % col.chars.length;
          ctx.fillText(col.chars[Math.abs(leadIdx)], x, col.y);
        }

        col.y += col.speed * fontSize;

        if (col.y > canvas.height + 200) {
          col.y = -Math.random() * 500;
          col.speed = 0.5 + Math.random() * 1.5;
        }

        // Random character swap
        if (Math.random() < 0.05) {
          const swapIdx = Math.floor(Math.random() * col.chars.length);
          col.chars[swapIdx] = ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];
        }
      });

      if (!reducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.12 }}
    />
  );
}
