import Link from 'next/link';
import { Linkedin, Mail, Twitter } from 'lucide-react';

const NAV_GROUPS = [
  {
    title: 'Explore',
    links: [
      { label: 'Guides', href: '/category/career' },
      { label: 'Workflows', href: '/playbooks/ai-job-search-playbook' },
      { label: 'Resources', href: '/explore' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: 'mailto:hiaitools520@gmail.com' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms-of-service' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Subscribe', href: '/#newsletter' },
      { label: 'Contact', href: 'mailto:hiaitools520@gmail.com' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='w-full border-t border-gray-200 bg-white'>
      <div className='mx-auto grid max-w-pc gap-12 px-5 py-12 lg:grid-cols-[1.3fr_2fr] lg:px-0'>
        <div>
          <Link href='/' className='text-3xl font-bold tracking-tight text-gray-950'>
            HIAI
          </Link>
          <p className='mt-5 max-w-[260px] text-base leading-7 text-gray-700'>
            Helping you learn, apply and grow your careerwith AI.
          </p>
          <div className='mt-6 flex gap-5 text-gray-700'>
            <a href='https://www.linkedin.com' target='_blank' rel='noreferrer' aria-label='LinkedIn'>
              <Linkedin className='size-5' />
            </a>
            <a href='https://twitter.com' target='_blank' rel='noreferrer' aria-label='Twitter'>
              <Twitter className='size-5' />
            </a>
            <a href='mailto:hiaitools520@gmail.com' aria-label='Email'>
              <Mail className='size-5' />
            </a>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className='text-base font-bold text-gray-950'>{group.title}</h3>
              <ul className='mt-4 space-y-3'>
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link href={link.href} className='text-base text-gray-700 hover:text-[#0F766E]'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='mx-auto max-w-pc px-5 pb-8 text-center text-sm text-gray-600 lg:px-0'>
        © {new Date().getFullYear()} HIAI. All rights reserved.
      </div>
    </footer>
  );
}
