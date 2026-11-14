import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CalendarDays, ExternalLink, FileText, MapPin } from 'lucide-react';
import cybearsLogo from '../../images/logos/cybears.jpeg';
import enageoLogo from '../../images/logos/enageo.jpeg';
import htbLogo from '../../images/logos/htb.jpeg';
import cevitalLogo from '../../images/logos/cevital.jpeg';
import univBejaiaLogo from '../../images/logos/univ-bejaia.png';
import cymaenCertPdf from '../../images/certificates/cymaen26-author-certificate.pdf';
import cymaenCertPreview from '../../images/certificates/cymaen26-author-certificate.webp';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_ITEMS = [
  {
    date: 'Oct 2026 — Present',
    title: 'SOC Analyst',
    company: 'Cybears',
    logo: cybearsLogo as string | null,
    companyColor: true,
    location: '',
    description: '',
    bullets: [] as string[],
    link: null as { text: string; url: string } | null,
  },
  {
    date: 'Mar 2026',
    title: 'IT Security Intern',
    company: 'ENAGEO',
    logo: enageoLogo,
    companyColor: true,
    location: 'Hassi Messaoud, Ouargla, Algeria',
    description: '',
    bullets: [
      'Administered and supervised the corporate network: equipment monitoring, network flow analysis, and security alert tracking',
      'Collaborated with network, system, and IT support teams on daily administration and maintenance',
      'Participated in diagnosing and resolving network and system incidents',
      'Discovered IT security practices and operational processes in a corporate environment',
    ],
    link: null,
  },
  {
    date: 'Jul 2025 — Present',
    title: 'CTF Player',
    company: 'Hack The Box',
    logo: htbLogo,
    companyColor: true,
    location: 'Remote',
    description: '',
    bullets: [
      'Solved machines and Capture The Flag (CTF) challenges',
      'Analyzed and exploited vulnerabilities in Web applications, Linux, Windows, and Active Directory environments',
      'Developed practical skills in penetration testing and offensive security',
    ],
    link: { text: 'View HTB Profile', url: 'https://profile.hackthebox.com/profile/019c9445-2a72-73eb-ad7a-f34ecbef7102' },
  },
  {
    date: 'Mar 2024 — Apr 2024',
    title: 'Network Security Intern',
    company: 'Cevital Agro-industrie',
    logo: cevitalLogo,
    companyColor: true,
    location: 'Bejaia, Algeria',
    description: '',
    bullets: [
      'Simulated a multi-site corporate network architecture using GNS3 and conducted security audits',
      'Evaluated network vulnerabilities and performed penetration testing, identifying risks and proposing security measures',
      'Designed network segmentation and developed security policies compliant with industry standards',
      'Drafted a comprehensive audit report on identified vulnerabilities and delivered security artifacts',
    ],
    link: null,
  },
];

const EDUCATION_ITEMS = [
  {
    date: 'Oct 2024 — Jun 2026',
    title: "Master's in Network Administration & Security",
    company: 'University of Bejaia',
    logo: univBejaiaLogo,
    companyColor: true,
    location: 'Bejaia, Algeria',
    description: 'Focus: IT Security, Network Administration, Cybersecurity, Advanced Programming, Cryptography, LAN',
    bullets: [],
    link: null,
  },
  {
    date: 'Dec 2021 — Jun 2024',
    title: "Bachelor's in Computer Science",
    company: 'University of Bejaia',
    logo: univBejaiaLogo,
    companyColor: false,
    location: 'Bejaia, Algeria',
    description: 'Focus: Web Development, Database Administration, Networking, Cryptography',
    bullets: [],
    link: null,
  },
];

const PUBLICATION = {
  type: 'Conference Paper · Author',
  title: 'Network-Level Detectability of Telegram- and Discord-Based Command-and-Control Channels',
  venue: 'IEEE 2026 International Conference on Cyber Management and Engineering',
  venueShort: 'CyMaEn 26',
  date: 'Oct 11 — 13, 2026',
  location: 'Tlemcen, Algeria',
  topics: ['Command & Control', 'Network Detection', 'Telegram', 'Discord'],
  certificate: cymaenCertPdf,
  preview: cymaenCertPreview,
};

function TimelineCard({ item, index, nodeClass }: { item: typeof EXPERIENCE_ITEMS[0]; index: number; nodeClass: string }) {
  const isLeft = index % 2 === 0;
  return (
    <div
      key={index}
      className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}
    >
      {/* Node */}
      <div
        className={`${nodeClass} absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10`}
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
          <div className="flex items-start gap-4">
            {item.logo && (
              <img
                src={item.logo}
                alt={`${item.company} logo`}
                width={48}
                height={48}
                loading="lazy"
                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                style={{ border: '1px solid var(--border-subtle)', background: '#fff' }}
              />
            )}
            <div className="min-w-0">
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
              {item.location && (
                <p
                  className="font-mono-code text-xs mt-1"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {item.location}
                </p>
              )}
            </div>
          </div>
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

function Timeline({ items, itemClass, lineClass, nodeClass }: {
  items: typeof EXPERIENCE_ITEMS;
  itemClass: string;
  nodeClass: string;
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
            <TimelineCard item={item} index={i} nodeClass={nodeClass} />
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

      gsap.fromTo('.cred-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cred-header', start: 'top 80%' },
        }
      );
      gsap.fromTo('.exp-pub',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-pub', start: 'top 80%' },
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
            nodeClass="exp-node"
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
            nodeClass="edu-node"
            lineClass="edu-line"
          />
        </div>

        {/* Research & Certifications Header */}
        <div id="credentials" className="cred-header mt-24 mb-16">
          <span className="section-label block mb-4">// RESEARCH &amp; CERTIFICATIONS</span>
          <h2
            className="font-display font-medium uppercase tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            What I've Earned
          </h2>
        </div>

        {/* Publication Card */}
        <article
          className="exp-pub rounded-lg overflow-hidden grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] transition-colors duration-300 hover:border-[var(--accent-primary)]"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
        >
          {/* Certificate preview */}
          <a
            href={PUBLICATION.certificate}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${PUBLICATION.venueShort} author certificate (PDF)`}
            className="group relative flex items-center justify-center p-6 md:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <img
              src={PUBLICATION.preview}
              alt={`Author certificate issued by ${PUBLICATION.venueShort} to Saad Azil`}
              width={1400}
              height={991}
              loading="lazy"
              className="w-full h-auto rounded transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' }}
            />
            <span
              className="absolute inset-0 flex items-center justify-center gap-2 font-mono-code text-xs uppercase tracking-[0.1em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ background: 'rgba(10, 10, 10, 0.7)', color: 'var(--accent-primary)' }}
            >
              <FileText size={16} />
              Open PDF
            </span>
          </a>

          {/* Details */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <span
              className="font-mono-code text-xs uppercase tracking-[0.1em]"
              style={{ color: 'var(--accent-primary)' }}
            >
              {PUBLICATION.type}
            </span>
            <h3
              className="font-display text-xl md:text-2xl font-medium mt-3 leading-snug"
              style={{ color: 'var(--text-primary)' }}
            >
              {PUBLICATION.title}
            </h3>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Presented at the {PUBLICATION.venue}{' '}
              <span style={{ color: 'var(--text-primary)' }}>({PUBLICATION.venueShort})</span>.
            </p>
            <div
              className="flex flex-wrap gap-x-6 gap-y-2 mt-4 font-mono-code text-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={14} style={{ color: 'var(--accent-primary)' }} />
                {PUBLICATION.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} style={{ color: 'var(--accent-primary)' }} />
                {PUBLICATION.location}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2 mt-6">
              {PUBLICATION.topics.map((topic) => (
                <li
                  key={topic}
                  className="font-mono-code text-xs px-3 py-1 rounded"
                  style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
                >
                  {topic}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href={PUBLICATION.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs whitespace-nowrap"
              >
                View Author Certificate →
              </a>
            </div>
          </div>
        </article>

        {/* Certification Banner */}
        <div
          className="exp-cert mt-8 p-8 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-6"
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
