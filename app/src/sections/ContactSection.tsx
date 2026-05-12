import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Linkedin, Github, BookOpen, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_CARDS = [
  { icon: Mail, label: 'EMAIL', value: 'azilsaad06@gmail.com', href: 'mailto:azilsaad06@gmail.com' },
  { icon: Phone, label: 'PHONE', value: '+213 676 164 995', href: 'tel:+213676164995' },
  { icon: MapPin, label: 'LOCATION', value: 'Bejaia, Algeria', href: null },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/saad-azil-1349aa250/' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/SaadAzil3' },
  { icon: BookOpen, label: 'Blog', href: 'https://saadazil3.github.io/' },
  { icon: Twitter, label: 'X/Twitter', href: 'https://x.com/azil_saad' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('.contact-card', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-cards', start: 'top 80%' },
        }
      );
      gsap.fromTo('.social-btn', 
        { scale: 0 },
        { scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.social-row', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative"
      style={{ zIndex: 1, background: 'var(--bg-primary)', paddingTop: '12rem', paddingBottom: '8rem' }}
    >
      <div className="container-main text-center">
        {/* Header */}
        <div className="contact-header">
          <span className="section-label block mb-4">// CONTACT</span>
          <h2
            className="font-display font-medium uppercase tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}
          >
            Let's Work Together
          </h2>
          <p
            className="text-lg mt-4 mx-auto max-w-xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Open to Networking, collaboration on security research, and new opportunities
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-cards grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          {CONTACT_CARDS.map((card, i) => {
            const Icon = card.icon;
            const content = (
              <div
                className="contact-card p-8 rounded-lg transition-all duration-300 text-center"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={32} style={{ color: 'var(--accent-primary)', margin: '0 auto' }} />
                <span
                  className="font-mono-code text-[10px] mt-4 block tracking-[0.05em]"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {card.label}
                </span>
                <span
                  className="text-lg font-medium mt-1 block"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {card.value}
                </span>
              </div>
            );
            return card.href ? (
              <a key={i} href={card.href} className="block">
                {content}
              </a>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="social-row flex items-center justify-center gap-6 mt-16">
          {SOCIAL_LINKS.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ border: '1px solid var(--border-subtle)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.background = 'var(--accent-primary)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.color = 'var(--bg-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'transparent';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.color = 'var(--text-secondary)';
                }}
                aria-label={social.label}
              >
                <Icon size={20} style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
