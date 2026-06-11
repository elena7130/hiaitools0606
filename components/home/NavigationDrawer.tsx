'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

type NavLink = { code: string; href: string; label: string };

function NavDrawerItem({ isActive, name }: { isActive: boolean; name: string }) {
  return (
    <li
      className={cn(
        'flex h-12 w-full items-center justify-between rounded-[8px] border border-gray-200 bg-white px-4',
        isActive && 'border-[#0F766E] bg-[#0F766E]/5',
      )}
    >
      <div className={cn('size-2 rounded-full bg-gray-300', isActive && 'bg-[#0F766E]')} />
      <div className={cn('text-sm font-medium text-gray-700', isActive && 'text-[#0F766E]')}>{name}</div>
    </li>
  );
}

export default function NavigationDrawer({
  open,
  setOpen,
  navLinks,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: NavLink[];
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(open);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const onClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const onRoute = (route: string) => {
    router.push(route);
    onClose();
  };

  return (
    <>
      <div
        className={cn('fixed z-50 h-screen w-screen overflow-hidden bg-black/60', isOpen ? 'block' : 'hidden')}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed right-0 top-[86px] z-[99999] h-[calc(100%-86px)] w-[300px] transform bg-white shadow-lg transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='flex size-full flex-col gap-3 px-5 py-6'>
          {navLinks.map((item) => (
            <button type='button' key={item.code} onClick={() => onRoute(item.href)}>
              <NavDrawerItem
                name={item.label}
                isActive={pathname === item.href || (pathname.includes(item.href) && item.href !== '/')}
              />
              <span className='sr-only'>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
