import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import { categoryMeta, guides, iconMap } from '@/lib/guides';
import HeroTypewriter from '@/components/home/HeroTypewriter';
import NewsletterForm from '@/components/home/NewsletterForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const pathname = '/';

  return {
    metadataBase: new URL(baseUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
      languages: {
        'x-default': `${baseUrl}/`,
        en: `${baseUrl}/en${pathname}`,
        pt: `${baseUrl}/pt${pathname}`,
        de: `${baseUrl}/de${pathname}`,
        es: `${baseUrl}/es${pathname}`,
        fr: `${baseUrl}/fr${pathname}`,
        ja: `${baseUrl}/ja${pathname}`,
        ru: `${baseUrl}/ru${pathname}`,
        'zh-CN': `${baseUrl}/zh-CN${pathname}`,
        'zh-TW': `${baseUrl}/zh-TW${pathname}`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/`,
      siteName: 'HIAI',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

export const revalidate = RevalidateOneHour;

export default function Page() {
  const latestGuides = guides.slice(0, 3);
  const topics = Object.entries(categoryMeta);

  return (
    <div className='min-h-screen w-full bg-white text-gray-950'>
      <section className='border-b border-gray-100 bg-white'>
        <div className='mx-auto flex max-w-pc flex-col items-center px-5 pb-14 pt-20 text-center lg:px-0 lg:pb-20 lg:pt-28'>
          <HeroTypewriter />

          <div className='mt-10 flex w-full max-w-xl flex-col gap-4 sm:flex-row'>
            <div className='flex flex-1 items-start gap-3 rounded-[12px] border border-gray-200 bg-gray-50 px-5 py-4 text-left'>
              <span className='mt-0.5 text-xl'>🎯</span>
              <div>
                <p className='text-sm font-bold text-gray-950'>Career Track</p>
                <p className='mt-1 text-sm leading-6 text-gray-500'>
                  Use AI to upskill, stand out, and land higher-paying roles
                </p>
              </div>
            </div>
            <div className='flex flex-1 items-start gap-3 rounded-[12px] border border-gray-200 bg-gray-50 px-5 py-4 text-left'>
              <span className='mt-0.5 text-xl'>🚀</span>
              <div>
                <p className='text-sm font-bold text-gray-950'>Builder Track</p>
                <p className='mt-1 text-sm leading-6 text-gray-500'>Use AI to launch and grow a small business solo</p>
              </div>
            </div>
          </div>

          <p className='mt-8 text-base text-gray-500'>Follow real experiments with real results, updated weekly.</p>

          <Link
            href='#newsletter'
            className='mt-8 inline-flex h-14 items-center rounded-[8px] bg-[#0F766E] px-10 text-base font-semibold text-white transition-colors hover:bg-[#0B5F58]'
          >
            Pick Your Track
          </Link>
        </div>
      </section>

      <section className='mx-auto max-w-pc px-5 py-14 lg:px-0'>
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='text-3xl font-bold text-gray-950'>Latest Guides</h2>
          <Link
            href='/category/career'
            className='inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] hover:text-[#0B5F58]'
          >
            View all guides <ArrowRight className='size-4' />
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-9 md:grid-cols-3'>
          {latestGuides.map((guide) => {
            const Icon = iconMap[guide.icon];

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className='group flex min-h-[340px] flex-col rounded-[8px] border border-gray-200 bg-white p-8 transition-colors hover:border-[#0F766E]'
              >
                <div className='mb-7 flex size-16 items-center justify-center rounded-[8px] bg-[#0F766E]/10 text-[#0F766E]'>
                  <Icon className='size-8' strokeWidth={1.8} />
                </div>
                <p className='text-xs font-bold uppercase text-[#0F766E]'>{guide.categoryLabel}</p>
                <h3 className='mt-4 text-2xl font-bold leading-tight text-gray-950 group-hover:text-[#0F766E]'>
                  {guide.title}
                </h3>
                <p className='mt-4 text-base leading-7 text-gray-700'>{guide.description}</p>
                <div className='mt-auto flex items-center justify-between pt-8 text-sm text-gray-600'>
                  <span>
                    {guide.date} <span className='px-2'>.</span> {guide.readTime}
                  </span>
                  <ArrowRight className='size-5' />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className='mx-auto max-w-pc px-5 pb-14 lg:px-0'>
        <h2 className='mb-8 text-3xl font-bold text-gray-950'>Browse by Topic</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {topics.map(([key, topic]) => {
            const Icon = iconMap[topic.icon];

            return (
              <Link
                key={key}
                href={`/category/${key}`}
                className='group flex min-h-[240px] flex-col items-center justify-center rounded-[8px] border border-gray-200 bg-white p-8 text-center transition-colors hover:border-[#0F766E]'
              >
                <Icon className='size-10 text-[#0F766E]' strokeWidth={1.8} />
                <h3 className='mt-7 text-xl font-bold text-gray-950'>{topic.title}</h3>
                <p className='mt-4 text-base leading-7 text-gray-700'>{topic.description}</p>
                <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E]'>
                  Explore <ArrowRight className='size-4' />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section id='newsletter' className='mx-auto max-w-pc px-5 pb-16 lg:px-0'>
        <div className='grid items-center gap-8 rounded-[8px] border border-gray-200 bg-gray-50 px-8 py-10 md:grid-cols-[1fr_1.1fr] lg:px-14'>
          <div className='flex items-center gap-8'>
            <div className='flex size-16 shrink-0 items-center justify-center rounded-[8px] bg-[#0F766E] text-white'>
              <Mail className='size-8' strokeWidth={1.8} />
            </div>
            <div>
              <h2 className='text-3xl font-bold text-gray-950'>Weekly AI Insights</h2>
              <p className='mt-3 max-w-lg text-base leading-7 text-gray-700'>
                No spam. Just practical AI workflows, tools, and career tips.
              </p>
            </div>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
