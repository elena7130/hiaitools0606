import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { categoryMeta, getAllGuides, iconMap } from '@/lib/guides';
import type { GuideCategory } from '@/lib/guides';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'GuidesPage' });
  return { title: `${t('title')} | HIAI`, description: t('description') };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'GuidesPage' });
  const guides = getAllGuides();

  const categoryTabs: { label: string; href: string; value: GuideCategory | 'all' }[] = [
    { label: t('tabAll'), href: '/guides', value: 'all' },
    { label: 'Career', href: '/category/career', value: 'career' },
    { label: 'Automation', href: '/category/automation', value: 'automation' },
    { label: 'Learning', href: '/category/learning', value: 'learning' },
    { label: 'Tools', href: '/category/tools', value: 'tools' },
  ];

  return (
    <div className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-[980px] px-5 py-14 lg:px-0'>
        <header className='mb-10'>
          <h1 className='text-5xl font-bold text-gray-950'>{t('title')}</h1>
          <p className='mt-5 max-w-xl text-base leading-7 text-gray-700'>{t('description')}</p>
        </header>

        <div className='mb-10 flex gap-8 border-b border-gray-200'>
          {categoryTabs.map((tab, index) => (
            <Link
              key={tab.value}
              href={tab.href}
              className={`border-b-2 pb-4 text-sm font-semibold ${
                index === 0
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent text-gray-700 hover:text-[#0F766E]'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className='divide-y divide-gray-200'>
          {guides.map((guide) => {
            const Icon = iconMap[guide.icon];

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className='grid gap-7 py-8 transition-colors hover:text-[#0F766E] sm:grid-cols-[220px_1fr]'
              >
                <div className='flex h-36 items-center justify-center rounded-[4px] bg-[#0F766E]/5'>
                  <div className='flex size-14 items-center justify-center rounded-[8px] bg-[#0F766E]/10 text-[#0F766E]'>
                    <Icon className='size-7' strokeWidth={1.8} />
                  </div>
                </div>
                <div>
                  <p className='text-xs font-bold uppercase tracking-wide text-[#0F766E]'>{guide.categoryLabel}</p>
                  <h2 className='mt-2 text-xl font-bold leading-snug text-gray-950'>{guide.title}</h2>
                  <p className='mt-3 text-sm leading-6 text-gray-700'>{guide.description}</p>
                  <p className='mt-5 text-sm text-gray-500'>
                    {guide.date} <span className='px-2'>·</span> {guide.readTime}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className='mt-16 rounded-[8px] border border-gray-200 bg-gray-50 p-8 text-center'>
          <p className='text-base font-semibold text-gray-950'>{t('browseByTopic')}</p>
          <div className='mt-6 flex flex-wrap justify-center gap-3'>
            {Object.entries(categoryMeta).map(([key, meta]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className='rounded-[6px] border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#0F766E] hover:text-[#0F766E]'
              >
                {meta.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
