import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import { WebNavigationListRow } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import Empty from '@/components/Empty';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from '../../Tag';
import Loading from './loading';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({
  params: { locale, search },
}: {
  params: { locale: string; search?: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const pathname = `/s/${encodeURI(search || '')}`;

  const alternates = {
    canonical: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
    languages: {
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

  return {
    title: search ? `Tools For: ${decodeURI(search)}` : t('title'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(baseUrl),
    alternates,
  };
}

export const revalidate = RevalidateOneHour / 2;

export default async function Page({ params }: { params: { search?: string } }) {
  const supabase = createClient();
  const t = await getTranslations('Home');
  const { data: categoryList } = await supabase.from('navigation_category').select();
  const { data: dataList } = await supabase
    .from('web_navigation')
    .select()
    .ilike('detail', `%${decodeURI(params?.search || '')}%`);

  const mappedDataList: WebNavigationListRow[] | null = dataList
    ? dataList.map((item: any) => ({
        id: String(item.id),
        title: item.title,
        url: item.url,
        imageUrl: item.image_url || null,
        thumbnailUrl: item.thumbnail_url || null,
        content: item.content,
        name: item.name,
      }))
    : null;

  return (
    <Suspense fallback={<Loading />}>
      <div className='mb-10 mt-5'>
        {params?.search && (
          <TagList
            data={categoryList!.map((item: any) => ({
              id: String(item.id),
              name: item.name,
              href: `/category/${item.name}`,
            }))}
          />
        )}
      </div>
      <section className='flex flex-col gap-5'>
        {mappedDataList && !!mappedDataList.length && params?.search ? (
          <>
            <h2 className='mb-1 text-left text-[18px] lg:text-2xl'>
              <span className='text-gray-500'>Tools For:</span> {decodeURI(params.search)}
            </h2>
            <WebNavCardList dataList={mappedDataList!} />
          </>
        ) : (
          <Empty title={t('empty')} />
        )}
      </section>
      <Separator className='mx-auto my-10 h-px w-4/5 bg-[#2C2D36] lg:my-16' />
      <ScrollToTop />
    </Suspense>
  );
}
