import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About HIAI | HIAI',
  description: 'Learn about HIAI and the mission behind our practical AI guides, workflows, and tools.',
};

const stats = [
  { value: '500+', label: 'Guides' },
  { value: '50K+', label: 'Readers' },
  { value: '30+', label: 'Playbooks' },
  { value: '1', label: 'Mission' },
];

export default function Page() {
  return (
    <div className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-pc px-5 py-14 lg:px-0'>
        <header className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-950 lg:text-5xl'>About HIAI</h1>
          <p className='mt-4 text-base leading-7 text-gray-700'>
            Helping professionals learn, apply, and grow with AI.
          </p>
        </header>

        <div className='grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]'>
          <div className='max-w-2xl space-y-8'>
            <section>
              <h2 className='text-xl font-bold text-gray-950'>Our Mission</h2>
              <p className='mt-3 text-base leading-8 text-gray-700'>
                HIAI is dedicated to sharing practical AI guides, workflows, and resources that help professionals work
                smarter, learn faster, and advance their careers.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-bold text-gray-950'>Why I Built HIAI</h2>
              <p className='mt-3 text-base leading-8 text-gray-700'>
                As a network engineer and lifelong learner, I believe AI is a powerful force multiplier. I built HIAI to
                document real experiences and share what actually works.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-bold text-gray-950'>Let&apos;s Connect</h2>
              <p className='mt-3 text-base leading-8 text-gray-700'>
                Have a question or feedback? I&apos;d love to hear from you.
              </p>
              <Link
                href='mailto:hiaitools520@gmail.com'
                className='mt-5 inline-flex h-12 items-center rounded-[8px] bg-[#0F766E] px-6 text-sm font-semibold text-white hover:bg-[#0B5F58]'
              >
                Contact Me
              </Link>
            </section>
          </div>

          <div className='h-80 rounded-[4px] bg-gradient-to-br from-gray-100 to-gray-200' />
        </div>

        <div className='mt-12 grid grid-cols-2 rounded-[4px] border border-gray-200 bg-white md:grid-cols-4'>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className='border-b border-r border-gray-200 p-6 text-center last:border-r-0 md:border-b-0'
            >
              <p className='text-2xl font-bold text-gray-950'>{stat.value}</p>
              <p className='mt-1 text-sm text-gray-600'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
