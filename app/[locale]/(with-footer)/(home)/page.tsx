import { Metadata } from 'next';
import { createClient } from '@/db/supabase/client';
import { WebNavigation } from '@/db/supabase/types';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import SearchForm from '@/components/home/SearchForm';
import WebNavCardList from '@/components/webNav/WebNavCardList';

import { TagList } from './Tag';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: './',
    },
  };
}

export const revalidate = RevalidateOneHour;

export default async function Page() {
  const supabase = createClient();
  const t = await getTranslations('Home');

  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase.from('web_navigation').select('*').order('collection_time', { ascending: false }),
  ]);

  if (!navigationList || !categoryList) {
    return (
      <div className='relative w-full'>
        <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
          <div className='my-5 flex flex-col text-center lg:mx-auto lg:my-10 lg:gap-1'>
            <h1 className='text-2xl font-bold text-black lg:text-5xl'>{t('title')}</h1>
            <h2 className='text-balance text-xs font-bold text-black lg:text-sm'>{t('subTitle')}</h2>
          </div>
          <div className='flex w-full items-center justify-center'>
            <SearchForm />
          </div>
          <div className='mb-10 mt-5'>
            {categoryList && (
              <TagList
                data={categoryList.map((item: any) => ({
                  id: String(item.id),
                  name: item.name,
                  href: `/category/${item.name}`,
                }))}
              />
            )}
          </div>
          <div className='text-center'>
            <p>Failed to load navigation data.</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredList = (navigationList as WebNavigation[])
    .filter((item) => item.featured)
    .map((item) => ({
      id: String(item.id),
      title: item.title,
      url: item.url,
      imageUrl: item.image_url || null,
      thumbnailUrl: item.thumbnail_url || null,
      content: item.content,
      name: item.name,
    }));

  const justLandedList = (navigationList as WebNavigation[]).slice(0, 12).map((item) => ({
    id: String(item.id),
    title: item.title,
    url: item.url,
    imageUrl: item.image_url || null,
    thumbnailUrl: item.thumbnail_url || null,
    content: item.content,
    name: item.name,
  }));

  return (
    <div className='relative w-full'>
      <div className='relative mx-auto w-full max-w-pc flex-1 px-3 lg:px-0'>
        <div className='my-5 flex flex-col text-center lg:mx-auto lg:my-10 lg:gap-1'>
          <h1 className='text-2xl font-bold text-black lg:text-5xl'>{t('title')}</h1>
          <h2 className='text-balance text-xs font-bold text-black lg:text-sm'>{t('subTitle')}</h2>
        </div>
        <div className='flex w-full items-center justify-center'>
          <SearchForm />
        </div>
        <div className='mb-10 mt-5'>
          {categoryList && (
            <TagList
              data={categoryList.map((item: any) => ({
                id: String(item.id),
                name: item.name,
                href: `/category/${item.name}`,
              }))}
            />
          )}
        </div>
        <div className='relative flex justify-start gap-4'>
          <a href='#featured' className='z-20 inline-block bg-blue-100 px-4 py-2 text-center text-black'>
            {t('featured')}
          </a>
          <a href='#justlanded' className='z-10 inline-block bg-pink-100 px-4 py-2 text-center text-black'>
            {t('just-landed')}
          </a>
          <div className='absolute bottom-0 left-0 w-full border-t border-gray-300' />
        </div>
        <div id='featured' className='mt-5 flex flex-col gap-5'>
          <h2 className='mb-4 mt-2 text-2xl font-bold text-black'>⭐️ Featured</h2>
          <WebNavCardList dataList={featuredList} />
        </div>
        <div id='justlanded' className='mt-5 flex flex-col gap-5'>
          <h2 className='mb-4 mt-2 text-2xl font-bold text-black'>⏳ Just Landed</h2>
          <WebNavCardList dataList={justLandedList} />
          <a
            href='/explore'
            className='mx-auto mb-5 flex w-fit items-center justify-center gap-5 rounded-[9px] border border-white p-[10px] text-sm leading-4 hover:opacity-70'
          >
            Explore More AI Tools {'>>'}
          </a>
        </div>
      </div>
    </div>
  );
}
