import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { CircleArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Separator } from '@/components/ui/separator';
import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';
import SimilarProducts from '@/components/SimilarProduct';

export async function generateMetadata({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ai',
  });
  const { data } = await supabase.from('web_navigation').select().eq('name', websiteName);

  if (!data || !data[0]) {
    notFound();
  }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const pathname = `/ai/${websiteName}`;

  const alternates = {
    canonical: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
    languages: {
      'x-default': `${baseUrl}${pathname}`,
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
  };

  const title = `${data[0].title} | ${t('titleSubfix')}`;
  const description = data[0].content || t('defaultDescription');
  const ogImage = data[0].thumbnail_url || data[0].image_url;

  return {
    metadataBase: new URL(baseUrl),
    alternates,
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
      siteName: 'Hi AI Tools',
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: data[0].title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function Page({ params: { websiteName } }: { params: { websiteName: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Startup.detail');
  const { data: dataList } = await supabase.from('web_navigation').select().eq('name', websiteName);
  if (!dataList) {
    notFound();
  }
  const data = dataList[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.title,
    description: data.content,
    url: data.url,
    applicationCategory: 'AIApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    ...(data.thumbnail_url && { image: data.thumbnail_url }),
  };

  return (
    <div className='w-full'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className='flex flex-col px-6 py-5 lg:h-[323px] lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
              <div className='space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-2xl lg:text-5xl'>{data.title}</h1>
            <h2 className='text-xs lg:text-sm'>{data.content}</h2>
          </div>
          <a
            href={data.url}
            target='_blank'
            rel='noreferrer'
            className='flex-center mt-5 min-h-5 w-full gap-1 rounded-[8px] bg-white p-[10px] text-sm capitalize text-black hover:opacity-80 lg:mt-auto lg:w-[288px]'
          >
            {t('visitWebsite')} <CircleArrowRight className='size-[14px]' />
          </a>
        </div>
        <a
          href={data.url}
          target='_blank'
          rel='noreferrer'
          className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'
        >
          <BaseImage
            title={data.title}
            alt={data.title}
            // width={466}
            // height={243}
            fill
            src={data.thumbnail_url || ''}
            className='absolute mt-3 aspect-[466/234] w-full rounded-[16px] border border-[#424242] bg-[#424242] bg-cover lg:mt-0'
          />
          <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-[16px] bg-black bg-opacity-50 text-2xl text-white transition-all duration-200 group-hover:flex'>
            {t('visitWebsite')} <CircleArrowRight className='size-5' />
          </div>
        </a>
      </div>
      <Separator className='bg-[#010101]' />
      <div className='mb-5 px-3 lg:px-0'>
        <h2 className='my-5 text-2xl text-white/40 lg:my-10'>{t('introduction')}</h2>
        <MarkdownProse markdown={data?.detail || ''} />
      </div>
      <div className='my-10'>
        <SimilarProducts name={websiteName} />
      </div>
    </div>
  );
}
