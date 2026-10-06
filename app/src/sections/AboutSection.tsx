import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import aboutImage from '../../images/about_me_image.jpeg';

gsap.registerPlugin(ScrollTrigger);

const LEARNING = ['AI Security', 'Red Teaming'];

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
                Algiers, Algeria
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
              <span style={{ color: 'var(--accent-primary)' }}>Pentester</span>, Bug Bounty Hunter, Offensive Security 
            </h2>

            <p className="about-text text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              I'm Azil Saad (SA3D00N) — a penetration tester focused on offensive security. I spend my time on web application and network pentesting, bug bounty hunting, and Active Directory attacks, backed by a Master's degree in Network Administration & Security from the University of Bejaia, Algeria.
            </p>

            <p className="about-text leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              I sharpen my skills as an active CTF player on Hack The Box, and I've applied them in industry as a Network Security Intern at Cevital Agro-industrie, where I ran penetration tests and security audits, and as an IT Security Intern at ENAGEO. Certified Network Security Practitioner (CNSP). My background in network administration and detection (SIEM, Wazuh) helps me think about how attacks are seen from the defender's side.
            </p>

            {/* Currently Learning */}
            <div className="about-text flex flex-wrap items-center gap-2 mb-12">
              <span className="font-mono-code text-xs uppercase tracking-[0.1em] mr-2" style={{ color: 'var(--text-tertiary)' }}>
                Currently learning:
              </span>
              {LEARNING.map((topic) => (
                <span
                  key={topic}
                  className="font-mono-code text-xs px-3 py-1 rounded"
                  style={{ border: '1px dashed rgba(0, 229, 160, 0.5)', color: 'var(--accent-primary)' }}
                >
                  {topic}
                </span>
              ))}
            </div>

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
