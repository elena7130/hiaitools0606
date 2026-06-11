'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const TAGS = ['Career', 'Learning', 'Automation', 'Productivity'];

export default function SubmitToolModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', url: '', tag: '', description: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('loading');
    try {
      const res = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed');
      }
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      <button
        type='button'
        aria-label='Close submit tool dialog'
        className='absolute inset-0 bg-black/40'
        onClick={onClose}
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='submit-tool-title'
        className='relative z-10 w-full max-w-[480px] rounded-[12px] bg-white shadow-xl'
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-100 px-6 py-5'>
          <div>
            <h2 id='submit-tool-title' className='text-base font-bold text-gray-950'>
              Submit a Tool
            </h2>
            <p className='mt-0.5 text-sm text-gray-500'>Know a great AI tool? Share it with the community.</p>
          </div>
          <button
            type='button'
            aria-label='Close'
            onClick={onClose}
            className='flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
          >
            <X className='size-4' />
          </button>
        </div>

        {status === 'success' ? (
          <div className='flex flex-col items-center px-6 py-12 text-center'>
            <div className='mb-4 flex size-12 items-center justify-center rounded-full bg-[#0F766E]/10 text-2xl'>✓</div>
            <p className='text-base font-bold text-gray-950'>Thanks for submitting!</p>
            <p className='mt-1 text-sm text-gray-500'>We&apos;ll review your suggestion and add it to the list.</p>
            <button
              type='button'
              onClick={onClose}
              className='mt-6 rounded-[8px] bg-[#0F766E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5F58]'
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4 px-6 py-5'>
            {/* Name */}
            <div>
              <label htmlFor='tool-name' className='block text-sm font-semibold text-gray-700'>
                Tool Name <span className='text-red-500'>*</span>
                <input
                  id='tool-name'
                  type='text'
                  required
                  placeholder='e.g. Notion AI'
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className='mt-1.5 w-full rounded-[8px] border border-gray-200 px-3.5 py-2.5 text-sm font-normal text-gray-950 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
                />
              </label>
            </div>

            {/* URL */}
            <div>
              <label htmlFor='tool-url' className='block text-sm font-semibold text-gray-700'>
                Website URL <span className='text-red-500'>*</span>
                <input
                  id='tool-url'
                  type='url'
                  required
                  placeholder='https://example.com'
                  value={form.url}
                  onChange={(e) => set('url', e.target.value)}
                  className='mt-1.5 w-full rounded-[8px] border border-gray-200 px-3.5 py-2.5 text-sm font-normal text-gray-950 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
                />
              </label>
            </div>

            {/* Tag */}
            <div>
              <label htmlFor='tool-category' className='block text-sm font-semibold text-gray-700'>
                Category
                <select
                  id='tool-category'
                  value={form.tag}
                  onChange={(e) => set('tag', e.target.value)}
                  className='mt-1.5 w-full rounded-[8px] border border-gray-200 px-3.5 py-2.5 text-sm font-normal text-gray-950 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
                >
                  <option value=''>Select a category</option>
                  {TAGS.map((t) => (
                    <option key={t} value={t.toLowerCase()}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Description */}
            <div>
              <label htmlFor='tool-description' className='block text-sm font-semibold text-gray-700'>
                Description
                <textarea
                  id='tool-description'
                  rows={3}
                  placeholder='What does this tool do? Who is it for?'
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  className='mt-1.5 w-full resize-none rounded-[8px] border border-gray-200 px-3.5 py-2.5 text-sm font-normal text-gray-950 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
                />
              </label>
            </div>

            {/* Email */}
            <div>
              <label htmlFor='submitter-email' className='block text-sm font-semibold text-gray-700'>
                Your Email <span className='text-red-500'>*</span>
                <input
                  id='submitter-email'
                  type='email'
                  required
                  placeholder='you@example.com'
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className='mt-1.5 w-full rounded-[8px] border border-gray-200 px-3.5 py-2.5 text-sm font-normal text-gray-950 outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
                />
              </label>
            </div>

            {error && <p className='text-sm text-red-500'>{error}</p>}

            <div className='flex justify-end gap-3 pt-1'>
              <button
                type='button'
                onClick={onClose}
                className='rounded-[8px] border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={status === 'loading'}
                className='rounded-[8px] bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5F58] disabled:opacity-60'
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Tool'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
