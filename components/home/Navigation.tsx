'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
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

  const navLinks = NAV_LINKS.map((item) => ({ ...item, label: t(item.code) }));

  return (
    <>
      <header className='sticky left-0 top-0 z-50 flex h-[86px] border-b border-gray-200 bg-white/95 px-5 backdrop-blur-lg lg:px-0'>
        <nav className='mx-auto flex max-w-pc flex-1 items-center'>
          {/* Logo */}
          <Link href='/' title='HIAI' className='flex items-center gap-2'>
            <span className='text-3xl font-bold tracking-tight text-gray-950'>HIAI</span>
          </Link>

          {/* Desktop nav */}
          <ul className='ml-20 hidden h-full flex-1 items-center justify-center gap-x-12 lg:flex'>
            {navLinks.map((item) => (
              <li key={item.code}>
                <Link
                  href={item.href}
                  title={item.label}
                  className={cn(
                    'text-base font-medium text-gray-950 transition-colors hover:text-[#0F766E]',
                    (pathname === item.href || (pathname.includes(item.href) && item.href !== '/')) && 'text-[#0F766E]',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className='ml-auto flex items-center gap-x-5'>
            <Link
              href='/query/ai'
              title={t('search')}
              className='hidden text-gray-950 transition-colors hover:text-[#0F766E] lg:inline-flex'
            >
              <Search className='size-6' strokeWidth={2.2} />
            </Link>
            <div className='hidden lg:block'>
              <LocaleSwitcher />
            </div>
            <Link
              href='#newsletter'
              className='hidden rounded-[8px] bg-[#0F766E] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#0B5F58] lg:block'
            >
              {t('subscribe')}
            </Link>
            {/* Mobile */}
            <div className='flex items-center gap-x-3 lg:hidden'>
              <LocaleSwitcher />
              <MenuBtn open={open} onClick={() => setOpen(!open)} />
            </div>
          </div>
        </nav>
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} navLinks={navLinks} />
    </>
  );
}
