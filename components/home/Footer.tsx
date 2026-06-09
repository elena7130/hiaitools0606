import Link from 'next/link';

import { CONTACT_US_EMAIL } from '@/lib/env';

const NAV_GROUPS = [
  {
    title: 'Explore',
    links: [
      { label: 'Careers', href: '/usecase/ai-job-search' },
      { label: 'Side Hustles', href: '/usecase/ai-side-hustle' },
      { label: 'Workflows', href: '/explore' },
      { label: 'Toolkits', href: '/categories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Submit a Tool', href: '/submit' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='w-full border-t border-gray-100 bg-white'>
      <div className='mx-auto max-w-pc px-5 py-12 lg:px-0'>
        <div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
          {/* Brand */}
          <div className='flex flex-col gap-3'>
            <span className='text-2xl font-bold tracking-tight text-[#0F766E]'>HIAI</span>
            <p className='max-w-[220px] text-sm text-gray-400'>AI Career &amp; Income Platform</p>
            {CONTACT_US_EMAIL && (
              <a
                href={`mailto:${CONTACT_US_EMAIL}`}
                className='text-xs text-gray-400 hover:text-gray-600'
              >
                {CONTACT_US_EMAIL}
              </a>
            )}
          </div>

          {/* Nav groups */}
          <div className='flex gap-16'>
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className='flex flex-col gap-3'>
                <h3 className='text-xs font-semibold uppercase tracking-wider text-gray-400'>
                  {group.title}
                </h3>
                <ul className='flex flex-col gap-2'>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className='text-sm text-gray-500 hover:text-gray-900'
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400'>
          © {new Date().getFullYear()} HIAI · AI Career &amp; Income Platform
        </div>
      </div>
    </footer>
  );
}
