import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { categoryMeta, getGuidesByCategory } from '@/lib/guides';
import type { GuideCategory } from '@/lib/guides';
import BasePagination from '@/components/page/BasePagination';

const PAGE_SIZE = 4;

export async function generateMetadata({ params }: { params: { code: string; locale: string } }): Promise<Metadata> {
  const meta = categoryMeta[params.code as GuideCategory];

  if (!meta) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const locale = params.locale ?? 'en';
  const pathname = `/category/${params.code}`;

  return {
    title: `${meta.title} AI Guides | HIAI`,
    description: meta.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
    },
  };
}

export default function Page({ params }: { params: { code: string } }) {
  const category = params.code as GuideCategory;
  const meta = categoryMeta[category];

  if (!meta) {
    notFound();
  }

  const categoryGuides = getGuidesByCategory(category);
  const visibleGuides = categoryGuides.slice(0, PAGE_SIZE);
  const tabs = [
    { label: 'Latest', href: `/category/${category}` },
    { label: 'Popular', href: `/category/${category}` },
    { label: 'All', href: `/category/${category}` },
  ];

  return (
    <div className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-[980px] px-5 py-14 lg:px-0'>
        <header className='mb-10'>
          <h1 className='text-5xl font-bold text-gray-950'>{meta.title}</h1>
          <p className='mt-5 max-w-xl text-base leading-7 text-gray-700'>{meta.description}</p>
        </header>

        <div className='mb-10 flex gap-8 border-b border-gray-200'>
          {tabs.map((tab, index) => (
            <Link
              key={tab.label}
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
          {visibleGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className='grid gap-7 py-8 transition-colors hover:text-[#0F766E] sm:grid-cols-[220px_1fr]'
            >
              <div className='h-36 rounded-[4px] bg-gradient-to-br from-gray-100 to-gray-200' />
              <div>
                <h2 className='text-xl font-bold leading-snug text-gray-950'>{guide.title}</h2>
                <p className='mt-3 text-sm leading-6 text-gray-700'>{guide.description}</p>
                <p className='mt-5 text-sm text-gray-600'>
                  {guide.date} <span className='px-2'>.</span> {guide.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className='mt-10 flex justify-center'>
          <BasePagination
            currentPage={1}
            total={Math.max(categoryGuides.length, 1)}
            pageSize={PAGE_SIZE}
            route={`/category/${category}`}
          />
        </div>

        <div className='mt-10 flex justify-center'>
          <Link
            href='/explore'
            className='inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] hover:text-[#0B5F58]'
          >
            Browse AI tools <ArrowRight className='size-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
