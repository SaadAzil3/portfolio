import { useEffect, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'About', target: '#about' },
  { label: 'Experience', target: '#experience' },
  { label: 'Education', target: '#education' },
  { label: 'Projects', target: '#projects' },
  { label: 'Skills', target: '#skills' },
  { label: 'Blog', target: '#blog' },
  { label: 'Contact', target: '#contact' },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (visible) {
      gsap.to('.nav-bar', { y: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to('.nav-bar', { y: '-100%', duration: 0.3, ease: 'power3.in' });
    }
  }, [visible]);

  const scrollTo = (target: string) => {
    setMobileOpen(false);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="nav-bar fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          transform: 'translateY(-100%)',
        }}
      >
        <div className="container-main flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono-code text-sm font-semibold tracking-[0.1em]"
            style={{ color: 'var(--accent-primary)' }}
          >
            SA3D00N
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="nav-link"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('#contact')}
            className="hidden md:block text-sm font-semibold uppercase tracking-[0.08em] px-5 py-2 rounded transition-all duration-300"
            style={{
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-primary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent-primary)';
            }}
          >
            Get In Touch
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--text-primary)',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{ background: 'var(--bg-primary)' }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="font-display text-2xl font-medium uppercase tracking-[0.02em]"
              style={{ color: 'var(--text-primary)' }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
