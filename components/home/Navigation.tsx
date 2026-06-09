'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

import LocaleSwitcher from '../LocaleSwitcher';
import MenuBtn from './MenuBtn';
import NavigationDrawer from './NavigationDrawer';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
  }));

  return (
    <>
      <header className='sticky left-0 top-0 z-50 flex h-[64px] border-b border-gray-100 bg-white/90 px-5 backdrop-blur-lg lg:px-0'>
        <nav className='mx-auto flex max-w-pc flex-1 items-center'>
          {/* Logo */}
          <Link href='/' title='HIAI' className='flex items-center gap-2'>
            <span className='text-xl font-bold tracking-tight text-[#0F766E]'>HIAI</span>
          </Link>

          {/* Desktop nav */}
          <ul className='ml-10 hidden h-full flex-1 items-center gap-x-8 lg:flex'>
            {NavLinks.map((item) => (
              <li key={item.code}>
                <Link
                  href={item.href}
                  title={item.label}
                  className={cn(
                    'text-sm font-medium text-gray-500 transition-colors hover:text-gray-900',
                    (pathname === item.href || (pathname.includes(item.href) && item.href !== '/')) &&
                      'text-gray-900',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className='ml-auto flex items-center gap-x-3'>
            <div className='hidden lg:block'>
              <LocaleSwitcher />
            </div>
            <Link
              href='#newsletter'
              className='hidden rounded-2xl bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] lg:block'
            >
              {t('newsletter')}
            </Link>
            {/* Mobile */}
            <div className='flex items-center gap-x-3 lg:hidden'>
              <LocaleSwitcher />
              <MenuBtn open={open} onClick={() => setOpen(!open)} />
            </div>
          </div>
        </nav>
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
    </>
  );
}
