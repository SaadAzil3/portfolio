import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    label: 'Technical Skills',
    tags: ['IT Risk Analysis', 'Network Security', 'Infrastructure Monitoring', 'Cybersecurity', 'Penetration Testing', 'Access Management', 'VoIP', 'VPN', 'Firewalls', 'Linux & Windows Admin', 'Virtualization', 'Containerization', 'Web Security'],
    featured: ['Penetration Testing', 'Cybersecurity', 'Network Security', 'Web Security'],
  },
  {
    label: 'Tools & Platforms',
    tags: ['pfSense', 'Wireshark', 'Nagios', 'Kali Linux', 'Cisco', 'GNS3', 'VMware', 'VirtualBox', 'Docker', 'Active Directory', 'Asterisk', 'Git & GitHub', 'Metasploit', 'Burp Suite', 'Nmap', 'SQLMap'],
    featured: ['Kali Linux', 'Nmap', 'Wireshark', 'Metasploit'],
  },
  {
    label: 'Programming',
    tags: ['Python', 'Bash', 'Go'],
    featured: ['Python'],
  },
];

const PROFICIENCY = [
  { label: 'Network Security', value: 90 },
  { label: 'Penetration Testing', value: 85 },
  { label: 'System Administration', value: 80 },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('.skills-category', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-categories', start: 'top 75%' },
        }
      );
      gsap.fromTo('.skill-tag', 
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-categories', start: 'top 70%' },
        }
      );
      gsap.fromTo('.skill-bar-fill', 
        { width: '0%' },
        { width: (_, target) => target.dataset.width, duration: 1.2, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.skill-bars', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative"
      style={{ zIndex: 1, background: 'var(--bg-primary)', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="container-main">
        {/* Header */}
        <div className="skills-header mb-16">
          <span className="section-label block mb-4">// SKILLS</span>
          <h2
            className="font-display font-medium uppercase tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            Tools of the Trade
          </h2>
        </div>

        {/* Categories */}
        <div className="skills-categories space-y-10">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div key={ci} className="skills-category">
              <h3
                className="text-base font-semibold mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map((tag, ti) => {
                  const isFeatured = cat.featured.includes(tag);
                  return (
                    <span
                      key={ti}
                      className="skill-tag font-mono-code text-sm px-4 py-2 rounded transition-all duration-200 cursor-default"
                      style={{
                        background: 'var(--bg-secondary)',
                        color: isFeatured ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        border: `1px solid ${isFeatured ? 'rgba(0, 229, 160, 0.5)' : 'var(--border-subtle)'}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.color = 'var(--accent-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = isFeatured ? 'rgba(0, 229, 160, 0.5)' : 'var(--border-subtle)';
                        e.currentTarget.style.color = isFeatured ? 'var(--accent-primary)' : 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <div className="skill-bars mt-16 space-y-6 max-w-2xl">
          {PROFICIENCY.map((bar, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <span className="font-mono-code text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {bar.label}
                </span>
                <span className="font-mono-code text-xs" style={{ color: 'var(--accent-primary)' }}>
                  {bar.value}%
                </span>
              </div>
              <div
                className="h-1 rounded-full"
                style={{ background: 'var(--border-subtle)' }}
              >
                <div
                  className="skill-bar-fill h-1 rounded-full"
                  data-width={`${bar.value}%`}
                  style={{
                    background: 'var(--accent-primary)',
                    width: `${bar.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
