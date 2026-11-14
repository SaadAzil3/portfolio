import { useState, useEffect } from 'react';

const PHRASES = [
  'soc analyst @ cybears | offensive security background',
  'web pentesting | network pentesting | bug bounty',
  'breaking in to make it secure | offensive security',
  'next up: ai security | red teaming',
];

const TYPE_SPEED = 50;
const ERASE_SPEED = 30;
const PAUSE_AFTER_TYPE = 1000;
const PAUSE_AFTER_ERASE = 500;

type Phase = 'TYPING' | 'PAUSE_AFTER_TYPE' | 'ERASING' | 'PAUSE_AFTER_ERASE';

export function useTypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<Phase>('TYPING');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentPhrase = PHRASES[phraseIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'TYPING') {
      timer = setTimeout(() => {
        const next = charIndex + 1;
        setDisplayText(currentPhrase.slice(0, next));
        setCharIndex(next);
        if (next >= currentPhrase.length) setPhase('PAUSE_AFTER_TYPE');
      }, TYPE_SPEED);
    } else if (phase === 'PAUSE_AFTER_TYPE') {
      timer = setTimeout(() => {
        setPhase('ERASING');
      }, PAUSE_AFTER_TYPE);
    } else if (phase === 'ERASING') {
      timer = setTimeout(() => {
        const next = charIndex - 1;
        setDisplayText(currentPhrase.slice(0, next));
        setCharIndex(next);
        if (next <= 0) setPhase('PAUSE_AFTER_ERASE');
      }, ERASE_SPEED);
    } else if (phase === 'PAUSE_AFTER_ERASE') {
      timer = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        setPhase('TYPING');
      }, PAUSE_AFTER_ERASE);
    }

    return () => clearTimeout(timer);
  }, [phase, charIndex, currentPhrase]);

  return displayText;
}
