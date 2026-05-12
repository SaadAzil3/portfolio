import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Shield, Phone, Terminal, FileText, Network, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    icon: Monitor,
    category: 'SECURITY / MONITORING',
    title: 'Enterprise Network Monitoring with Nagios',
    description: 'Built a network monitoring and intrusion detection system using Nagios Core on a simulated enterprise network with GNS3. Real-time monitoring of devices, services, and network traffic.',
    pills: ['Nagios', 'GNS3', 'SNMP', 'VMware'],
    link: 'https://saadazil3.github.io/posts/nagios/',
  },
  {
    icon: Shield,
    category: 'SECURITY / AD',
    title: 'SMB Relay Attack in Active Directory',
    description: 'Simulated and executed an SMB Relay attack exploiting NTLM authentication vulnerabilities. Analyzed security risks and proposed comprehensive mitigation strategies.',
    pills: ['Active Directory', 'NTLM', 'Windows'],
    link: '#',
  },
  {
    icon: Phone,
    category: 'VOIP / NETWORKING',
    title: 'IP-Based Telephony System with Asterisk',
    description: 'Designed and configured an open-source IP-PBX server on Linux. Managed SIP infrastructure with IVR, voicemail, and conference rooms.',
    pills: ['Asterisk', 'SIP', 'Linux', 'VoIP'],
    link: 'https://saadazil3.github.io/posts/asterisk/',
  },
  {
    icon: Terminal,
    category: 'TOOL / PYTHON',
    title: 'TCP Port Scanner',
    description: 'Lightweight Python-based TCP port scanner with multi-port and port-range scanning, banner grabbing, and adjustable timeout support.',
    pills: ['Python', 'Networking'],
    link: 'https://github.com/SaadAzil3/port_scan',
  },
  {
    icon: FileText,
    category: 'CTF / WRITEUP',
    title: 'HTB: Nibbles — CTF Writeup',
    description: "Complete walkthrough of the Hack The Box 'Nibbles' machine covering Nmap enumeration, web exploitation, and privilege escalation techniques.",
    pills: ['CTF', 'HTB', 'Linux'],
    link: 'https://saadazil3.github.io/posts/nibbles/',
  },
  {
    icon: Network,
    category: 'SECURITY / PYTHON',
    title: 'Vanessa-C2 Command & Control',
    description: 'Educational Command and Control framework built in Python for understanding adversary infrastructure and post-exploitation techniques.',
    pills: ['Python', 'Security', 'Go'],
    link: 'https://github.com/SaadAzil3/Vanessa-C2',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('.proj-card', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.proj-grid', start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={{ zIndex: 1, background: 'var(--bg-secondary)', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="container-main">
        {/* Header */}
        <div className="proj-header mb-16">
          <span className="section-label block mb-4">// PROJECTS</span>
          <h2
            className="font-display font-medium uppercase tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            Things I've Built
          </h2>
        </div>

        {/* Grid */}
        <div className="proj-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => {
            const Icon = project.icon;
            return (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-card group block p-6 rounded-lg transition-all duration-300"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Top Row */}
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
                  <span
                    className="font-mono-code text-[10px] uppercase tracking-[0.05em] px-2 py-1 rounded-full"
                    style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-tertiary)' }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display text-lg font-medium flex items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--accent-primary)' }}
                  />
                </h3>

                {/* Description */}
                <p className="text-sm mt-2 leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                {/* Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.pills.map((pill, j) => (
                    <span
                      key={j}
                      className="font-mono-code text-[10px] px-2 py-1 rounded"
                      style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/SaadAzil3?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link inline-flex items-center gap-1 transition-colors"
            style={{ color: 'var(--accent-primary)' }}
          >
            View All Projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
