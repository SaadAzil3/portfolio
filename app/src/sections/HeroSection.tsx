import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTypingAnimation } from '../hooks/useTypingAnimation';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const typingText = useTypingAnimation();
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from('.hero-label', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from('.hero-name', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.3')
        .from('.hero-handle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
        .from('.hero-typing', { opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=0.1')
        .from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.2');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center"
      style={{ zIndex: 1 }}
    >
      <div className="text-center px-6">
        {/* Label */}
        <p
          className="hero-label font-mono-code text-xs uppercase tracking-[0.15em] mb-8"
          style={{ color: 'var(--accent-primary)' }}
        >
          Penetration Tester
        </p>

        {/* Name */}
        <h1
          className="hero-name font-display font-semibold uppercase tracking-[-0.04em] leading-[0.9]"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            color: 'var(--text-primary)',
            textShadow: '0 0 80px rgba(0, 229, 160, 0.15)',
          }}
        >
          AZIL SAAD
        </h1>

        {/* Handle */}
        <p
          className="hero-handle font-mono-code mt-6"
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-tertiary)',
            letterSpacing: '0.1em',
          }}
        >
          @SA3D00N
        </p>

        {/* Typing Animation */}
        <div className="hero-typing mt-12 min-h-[1.5rem]">
          <span
            className="font-mono-code text-base"
            style={{ color: 'var(--accent-primary)' }}
          >
            _ {typingText}
            <span
              style={{
                opacity: cursorVisible ? 1 : 0,
                transition: 'opacity 0.05s',
              }}
            >
              |
            </span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
          <button onClick={() => scrollTo('#projects')} className="btn-primary">
            View My Work
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-secondary">
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div
          className="relative w-px h-12 overflow-hidden"
          style={{ background: 'var(--text-tertiary)' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-scroll-dot"
            style={{ background: 'var(--accent-primary)' }}
          />
        </div>
        <span
          className="font-mono-code text-[10px] uppercase tracking-[0.15em]"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
