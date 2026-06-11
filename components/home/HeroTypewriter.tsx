'use client';

import { useEffect, useState } from 'react';

const FULL = 'Learn AI,\nApply AI,\nboost your career.';
const LINE_KEYS = ['learn', 'apply', 'career'];
const SPEED = 55;

export default function HeroTypewriter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= FULL.length) return undefined;
    const t = setTimeout(() => setCount((c) => c + 1), SPEED);
    return () => clearTimeout(t);
  }, [count]);

  const typed = FULL.slice(0, count);
  const lines = typed.split('\n');
  const done = count >= FULL.length;

  return (
    <h1
      aria-label={FULL.replaceAll('\n', ' ')}
      className='max-w-2xl text-5xl font-bold leading-tight text-gray-950 lg:text-6xl'
    >
      {lines.map((line, i) => (
        <span key={LINE_KEYS[i]} aria-hidden='true' className='block'>
          {i === 2 ? <span className='text-[#0F766E]'>{line}</span> : line}
          {!done && i === lines.length - 1 && (
            <span className='ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[2px] animate-pulse rounded-sm bg-[#0F766E] align-middle' />
          )}
        </span>
      ))}
    </h1>
  );
}
