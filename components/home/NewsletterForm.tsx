'use client';

import { useState } from 'react';

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className='flex min-h-14 items-center rounded-[8px] bg-[#0F766E]/10 px-5 text-sm font-medium text-[#0F766E]'>
        You&apos;re in. Check your inbox for a confirmation.
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className='flex w-full max-w-sm gap-2'>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='flex-1 rounded-[8px] border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-950 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
        />
        <button
          type='submit'
          disabled={status === 'loading'}
          className='rounded-[8px] bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5F58] disabled:opacity-60'
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-col gap-0 sm:flex-row'>
      <input
        type='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
        className='min-h-14 flex-1 rounded-t-[8px] border border-gray-200 bg-white px-5 text-base text-gray-950 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 sm:rounded-l-[8px] sm:rounded-r-none'
      />
      <button
        type='submit'
        disabled={status === 'loading'}
        className='min-h-14 rounded-b-[8px] bg-[#0F766E] px-7 text-base font-semibold text-white transition-colors hover:bg-[#0B5F58] disabled:opacity-60 sm:rounded-l-none sm:rounded-r-[8px]'
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}
