import { Linkedin, Github, BookOpen, ExternalLink } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saad-azil-1349aa250/' },
  { label: 'GitHub', href: 'https://github.com/SaadAzil3' },
  { label: 'Blog', href: 'https://saadazil3.github.io/' },
  { label: 'Hack The Box', href: 'https://app.hackthebox.com/users/1543873' },
];

const ICON_MAP: Record<string, React.ElementType> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Blog: BookOpen,
  'Hack The Box': ExternalLink,
};

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ zIndex: 1, background: 'var(--bg-secondary)' }}
    >
      <div className="container-main pt-32 pb-16">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h2
            className="font-display font-medium uppercase tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            Let's <span style={{ color: 'var(--accent-primary)' }}>Secure</span> the Future
          </h2>
          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            Start a Conversation
          </button>
        </div>

        {/* Divider */}
        <div
          className="my-16"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        />

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Info */}
          <div>
            <p className="font-mono-code text-sm" style={{ color: 'var(--text-secondary)' }}>
              Azil Saad
            </p>
            <p className="font-mono-code text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Cybersecurity Practitioner
            </p>
            <p className="font-mono-code text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Bejaia, Algeria
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-mono-code text-xs uppercase tracking-[0.1em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
              Links
            </p>
            <div className="space-y-2">
              {QUICK_LINKS.map((link, i) => {
                const Icon = ICON_MAP[link.label] || ExternalLink;
                return (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono-code text-sm transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Icon size={14} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono-code text-xs uppercase tracking-[0.1em] mb-4" style={{ color: 'var(--text-tertiary)' }}>
              Contact
            </p>
            <a
              href="mailto:azilsaad06@gmail.com"
              className="font-mono-code text-sm block transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              azilsaad06@gmail.com
            </a>
            <a
              href="tel:+213676164995"
              className="font-mono-code text-sm block mt-2 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              +213 676 164 995
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p
          className="text-center font-mono-code text-xs mt-16"
          style={{ color: 'var(--text-tertiary)' }}
        >
          © 2026 Azil Saad. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
