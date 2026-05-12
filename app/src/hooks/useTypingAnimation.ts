import { useState, useEffect } from 'react';

const PHRASES = [
  'securing networks | building tools | hunting threats',
  'penetration testing | vulnerability analysis | ctf player',
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
      if (charIndex < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, TYPE_SPEED);
      } else {
        setPhase('PAUSE_AFTER_TYPE');
      }
    } else if (phase === 'PAUSE_AFTER_TYPE') {
      timer = setTimeout(() => {
        setPhase('ERASING');
      }, PAUSE_AFTER_TYPE);
    } else if (phase === 'ERASING') {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, ERASE_SPEED);
      } else {
        setDisplayText('');
        setPhase('PAUSE_AFTER_ERASE');
      }
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
