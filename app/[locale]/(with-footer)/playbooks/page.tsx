import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getAllPlaybooks } from '@/lib/guides';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'PlaybooksPage' });
  return { title: `${t('title')} | HIAI`, description: t('description') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'PlaybooksPage' });
  const playbooks = getAllPlaybooks();

  return (
    <div className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-[980px] px-5 py-14 lg:px-0'>
        <header className='mb-12'>
          <h1 className='text-5xl font-bold text-gray-950'>{t('title')}</h1>
          <p className='mt-5 max-w-xl text-base leading-7 text-gray-700'>{t('description')}</p>
        </header>

        <div className='grid gap-6 sm:grid-cols-2'>
          {playbooks.map((playbook) => (
            <Link
              key={playbook.slug}
              href={`/playbooks/${playbook.slug}`}
              className='group flex flex-col rounded-[8px] border border-gray-200 bg-white p-8 transition-colors hover:border-[#0F766E]'
            >
              <div className='mb-6 flex size-14 items-center justify-center rounded-[8px] bg-[#0F766E]/10 text-[#0F766E]'>
                <BookOpen className='size-7' strokeWidth={1.8} />
              </div>
              <h2 className='text-xl font-bold leading-snug text-gray-950 group-hover:text-[#0F766E]'>
                {playbook.title}
              </h2>
              <p className='mt-3 text-sm leading-6 text-gray-700'>{playbook.description}</p>
              <div className='mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-[#0F766E]'>
                {t('readPlaybook')} <ArrowRight className='size-4' />
              </div>
            </Link>
          ))}

          <div className='flex flex-col rounded-[8px] border border-dashed border-gray-300 bg-gray-50 p-8'>
            <div className='mb-6 flex size-14 items-center justify-center rounded-[8px] bg-gray-200 text-gray-400'>
              <BookOpen className='size-7' strokeWidth={1.8} />
            </div>
            <h2 className='text-xl font-bold text-gray-400'>{t('comingSoon')}</h2>
            <p className='mt-3 text-sm leading-6 text-gray-400'>{t('comingSoonDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
