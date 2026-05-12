import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_ITEMS = [
  {
    date: 'Mar 2026',
    title: 'Network and IT Security Intern',
    company: 'ENAGEO',
    companyColor: true,
    location: 'Hassi Messaoud, Ouargla, Algeria',
    description: 'Network and IT security internship in the energy sector, gaining hands-on experience with enterprise security infrastructure.',
    bullets: [],
    link: null,
  },
  {
    date: 'Jul 2025 — Present',
    title: 'CTF Player',
    company: 'Hack The Box',
    companyColor: true,
    location: 'Remote',
    description: 'Solving CTF challenges to perfect penetration testing skills. Intensively practicing ethical hacking on real-world attack scenarios.',
    bullets: [],
    link: { text: 'View HTB Profile', url: 'https://app.hackthebox.com/users/1543873' },
  },
  {
    date: 'Mar 2024 — Apr 2024',
    title: 'Network Security Intern',
    company: 'Cevital Agro-industrie',
    companyColor: true,
    location: 'Bejaia, Algeria',
    description: '',
    bullets: [
      'Simulated enterprise network architecture using GNS3',
      'Conducted vulnerability assessments on Layer 2 enterprise networks',
      'Implemented penetration testing to identify potential risks and proposed effective solutions',
      'Delivered a detailed report on network vulnerabilities and mitigation strategies',
    ],
    link: null,
  },
];

const EDUCATION_ITEMS = [
  {
    date: 'Oct 2024 — Jul 2026',
    title: "Master's in Network Administration & Security",
    company: 'University of Bejaia',
    companyColor: true,
    location: 'Bejaia, Algeria',
    description: 'Focus: Network Security, Network Administration, Cybersecurity, Advanced Programming, LAN',
    bullets: [],
    link: null,
  },
  {
    date: 'Dec 2021 — Jun 2024',
    title: "Bachelor's in Computer Science",
    company: 'University of Bejaia',
    companyColor: false,
    location: 'Bejaia, Algeria',
    description: 'Focus: Web Development, Database Administration, Networking, Cryptography',
    bullets: [],
    link: null,
  },
];

function TimelineCard({ item, index }: { item: typeof EXPERIENCE_ITEMS[0]; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <div
      key={index}
      className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}
    >
      {/* Node */}
      <div
        className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10"
        style={{ background: 'var(--accent-primary)', top: '1.5rem' }}
      />

      {/* Content */}
      <div className={`pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'}`}>
        <div
          className="p-6 rounded-lg transition-all duration-300 hover:border-[var(--accent-primary)]"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
        >
          <span
            className="font-mono-code text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {item.date}
          </span>
          <h3
            className="font-display text-lg font-medium mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {item.title}
          </h3>
          <p
            className="text-sm font-semibold mt-1"
            style={{ color: item.companyColor ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
          >
            {item.company}
          </p>
          <p
            className="font-mono-code text-xs mt-1"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {item.location}
          </p>
          {item.description && (
            <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {item.description}
            </p>
          )}
          {item.bullets.length > 0 && (
            <ul className="mt-3 space-y-1">
              {item.bullets.map((b, j) => (
                <li key={j} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-primary)' }}>›</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
          {item.link && (
            <a
              href={item.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent-primary)' }}
            >
              {item.link.text}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Timeline({ items, itemClass, lineClass }: {
  items: typeof EXPERIENCE_ITEMS;
  itemClass: string;
  lineClass: string;
}) {
  return (
    <div className="relative">
      {/* Center Line */}
      <div
        className={`${lineClass} hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2`}
        style={{ background: 'var(--border-subtle)' }}
      />
      <div
        className={`${lineClass} md:hidden absolute left-4 top-0 bottom-0 w-0.5`}
        style={{ background: 'var(--border-subtle)' }}
      />

      {/* Items */}
      <div className="space-y-12">
        {items.map((item, i) => (
          <div key={i} className={itemClass}>
            <TimelineCard item={item} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Experience timeline animations
      gsap.fromTo('.exp-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power2.inOut', transformOrigin: 'top',
          scrollTrigger: { trigger: '.exp-timeline', start: 'top 80%' },
        }
      );
      gsap.fromTo('.exp-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-timeline', start: 'top 75%' },
        }
      );
      gsap.fromTo('.exp-node',
        { scale: 0 },
        { scale: 1, duration: 0.3, stagger: 0.2, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.exp-timeline', start: 'top 75%' },
        }
      );

      // Education timeline animations
      gsap.fromTo('.edu-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.edu-header', start: 'top 80%' },
        }
      );
      gsap.fromTo('.edu-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power2.inOut', transformOrigin: 'top',
          scrollTrigger: { trigger: '.edu-timeline', start: 'top 80%' },
        }
      );
      gsap.fromTo('.edu-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.edu-timeline', start: 'top 75%' },
        }
      );
      gsap.fromTo('.edu-node',
        { scale: 0 },
        { scale: 1, duration: 0.3, stagger: 0.2, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.edu-timeline', start: 'top 75%' },
        }
      );

      gsap.fromTo('.exp-cert',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-cert', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative"
      style={{ zIndex: 1, background: 'var(--bg-primary)', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="container-main">
        {/* Experience Header */}
        <div className="exp-header mb-16">
          <span className="section-label block mb-4">// EXPERIENCE</span>
          <h2
            className="font-display font-medium uppercase tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            Where I've Worked
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="exp-timeline">
          <Timeline
            items={EXPERIENCE_ITEMS}
            itemClass="exp-item"
            lineClass="exp-line"
          />
        </div>

        {/* Education Header */}
        <div id="education" className="edu-header mt-24 mb-16">
          <span className="section-label block mb-4">// EDUCATION</span>
          <h2
            className="font-display font-medium uppercase tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            Where I Studied
          </h2>
        </div>

        {/* Education Timeline */}
        <div className="edu-timeline">
          <Timeline
            items={EDUCATION_ITEMS}
            itemClass="edu-item"
            lineClass="edu-line"
          />
        </div>

        {/* Certification Banner */}
        <div
          className="exp-cert mt-24 p-8 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-6"
          style={{
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(0, 229, 160, 0.05) 100%)',
            border: '1px solid rgba(0, 229, 160, 0.3)',
          }}
        >
          <Award size={48} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
          <div className="flex-1">
            <h3 className="font-display text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
              Certified Network Security Practitioner (CNSP)
            </h3>
            <p className="font-mono-code text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              The SecOps Group — Oct 2025
            </p>
          </div>
          <a
            href="https://candidate.speedexam.net/certificate.aspx?SSTATE=am4131EniU8ntjp4bO5mXXjy101lp6buC91oVyWcW8AZFckRQyL/VjRuNVRBo03Qi74ZenK2Kpzco32jy8yekDrBDr2Lu2hQyX0rUi0XgBE="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs whitespace-nowrap flex-shrink-0"
          >
            Verify Certificate →
          </a>
        </div>
      </div>
    </section>
  );
}
