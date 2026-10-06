import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BLOG_POSTS = [
  {
    date: 'Jan 11, 2026',
    title: 'Design and Configuration of an IP-Based Telephony System via Asterisk — Part II',
    description: 'Implementing advanced features such as IVR and Conference rooms on the Asterisk PBX system.',
    tags: ['CCNA', 'Networking', 'VoIP'],
    link: 'https://saadazil3.github.io/posts/asterisk-part-2/',
  },
  {
    date: 'Dec 26, 2025',
    title: 'Design and Configuration of an IP-Based Telephony System via Asterisk — Part I',
    description: 'Building a simple VoIP system within a LAN using Asterisk on Linux — SIP users, voice calls, and basic configuration.',
    tags: ['CCNA', 'Networking', 'VoIP'],
    link: 'https://saadazil3.github.io/posts/asterisk/',
  },
  {
    date: 'Aug 30, 2025',
    title: 'Enterprise Network Monitoring and Intrusion Detection with Nagios Core',
    description: 'Building a network monitoring and intrusion detection system using Nagios Core on a simulated enterprise network.',
    tags: ['Projects', 'Security', 'Networking'],
    link: 'https://saadazil3.github.io/posts/nagios/',
  },
  {
    date: 'Aug 20, 2025',
    title: 'HTB: Nibbles Writeup',
    description: 'A retired Hack The Box machine walkthrough covering enumeration, web exploitation, and privilege escalation.',
    tags: ['CTF', 'HTB'],
    link: 'https://saadazil3.github.io/posts/nibbles/',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('.blog-card', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.blog-carousel', start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative"
      style={{ zIndex: 1, background: 'var(--bg-secondary)', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="container-main">
        {/* Header */}
        <div className="blog-header flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <span className="section-label block mb-4">// BLOG</span>
            <h2
              className="font-display font-medium uppercase tracking-[-0.02em]"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
            >
              Latest Writeups
            </h2>
          </div>
          <a
            href="https://saadazil3.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ color: 'var(--accent-primary)' }}
          >
            View All →
          </a>
        </div>

        {/* Swipeable carousel on mobile, 2x2 grid from md up */}
        <div
          className="blog-carousel flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory -mx-6 px-6 scroll-px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible"
        >
          {BLOG_POSTS.map((post, i) => (
            <a
              key={i}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card flex flex-col flex-shrink-0 w-[85%] md:w-auto snap-start p-6 rounded-lg transition-all duration-300 group"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
            >
              <span
                className="font-mono-code text-[10px]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {post.date}
              </span>
              <h3
                className="font-display text-base font-medium mt-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {post.title}
              </h3>
              <p
                className="text-sm mt-2 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="font-mono-code text-[10px] px-2 py-1 rounded"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--accent-primary)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                className="inline-flex items-center gap-1 mt-auto pt-4 text-sm font-medium transition-colors"
                style={{ color: 'var(--accent-primary)' }}
              >
                Read More
                <ExternalLink size={12} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
