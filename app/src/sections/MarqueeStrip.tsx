import Marquee from 'react-fast-marquee';

const ITEMS = [
  { text: 'NETWORK SECUIRTY', highlight: false },
  { text: 'PENETRATION TESTING', highlight: true },
  { text: 'AZIL SAAD — SA3D00N', highlight: true },
  { text: 'ETHICAL HACKING', highlight: false },
  { text: 'APPLICATION SECURITY', highlight: false },
  { text: 'CTF PLAYER', highlight: false },
  { text: 'ACTIVE DIRECTORY', highlight: false },
  { text: 'BUG BOUNTY HUNTER', highlight: false },
];

export default function MarqueeStrip() {
  return (
    <div
      className="w-full py-4 overflow-hidden"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <Marquee speed={80} gradient={false} pauseOnHover>
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-mono-code text-sm uppercase tracking-[0.05em] mx-4 whitespace-nowrap"
              style={{
                color: item.highlight ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              {item.text}
            </span>
            <span
              className="text-sm mx-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
