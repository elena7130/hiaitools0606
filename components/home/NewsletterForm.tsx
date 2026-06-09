'use client';

import { useState } from 'react';

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // TODO: wire to Beehiiv / Resend API
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <div className='flex items-center gap-2 rounded-xl bg-[#0F766E]/10 px-5 py-3 text-sm font-medium text-[#0F766E]'>
        ✓ You&apos;re in! Check your inbox for a confirmation.
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
          className='flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
        />
        <button
          type='submit'
          disabled={status === 'loading'}
          className='rounded-xl bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60'
        >
          {status === 'loading' ? '...' : 'Join'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='flex w-full flex-col gap-3 sm:flex-row'>
      <input
        type='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email address'
        className='flex-1 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20'
      />
      <button
        type='submit'
        disabled={status === 'loading'}
        className='rounded-2xl bg-[#0F766E] px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60'
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
      </button>
    </form>
  );
}
