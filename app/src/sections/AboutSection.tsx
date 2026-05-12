import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import aboutImage from '../../images/about_me_image.png';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: '4+', label: 'Security Projects' },
  { number: '12', label: 'GitHub Repos' },
  { number: '0.5+', label: 'Years Experience' },
  { number: '1', label: 'Certification' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-photo', 
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('.about-text', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('.about-stat', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{ zIndex: 1, background: 'var(--bg-primary)', paddingTop: '12rem', paddingBottom: '8rem' }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-start">
          {/* Left: Photo */}
          <div className="about-photo">
            <div
              className="relative max-w-[320px] md:max-w-none mx-auto md:mx-0 overflow-hidden rounded-lg group"
              style={{ border: '2px solid rgba(0, 229, 160, 0.3)' }}
            >
              <img
                src={aboutImage}
                alt="Azil Saad"
                className="w-full aspect-[3/4] object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ border: '2px solid var(--accent-primary)' }}
              />
            </div>
            <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
              <MapPin size={14} style={{ color: 'var(--text-tertiary)' }} />
              <span className="font-mono-code text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Bejaia, Algeria
              </span>
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <span className="about-text section-label block mb-4">// ABOUT</span>
            <h2
              className="about-text font-display font-medium uppercase leading-none tracking-[-0.02em] mb-8"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>Pentester</span>, Security Researcher, Network Security Enthusiast 
            </h2>

            <p className="about-text text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              I'm Azil Saad (SA3D00N) — a cybersecurity practitioner and Master's student in Network Administration & Security at the University of Bejaia, Algeria. I specialize in penetration testing and network security with real-world experience from both academic projects and industry internships.
            </p>

            <p className="about-text leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
              Pursuing a Master's in Network Administration & Security (2024–2026). Former Network Security Intern at Cevital Agro-industrie — one of Algeria's largest enterprises. Active CTF Player on HackTheBox. Certified Network Security Practitioner (CNSP). Open to collaboration on security research, CTF challenges & write-ups.
            </p>

            {/* Stats */}
            <div className="about-stats grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="about-stat p-4 rounded"
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  <div
                    className="font-display text-2xl md:text-3xl font-medium"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="font-mono-code text-[10px] mt-1 uppercase tracking-[0.05em]"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
