import { Metadata } from 'next';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import SearchForm from '@/components/home/SearchForm';

import Featured from './Featured';
import JustLanded from './JustLanded';
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
  const [{ data: categoryList }] = await Promise.all([supabase.from('navigation_category').select()]);

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
          <TagList
            data={categoryList!.map((item: any) => ({
              id: String(item.id),
              name: item.name,
              href: `/category/${item.name}`,
            }))}
          />
        </div>
        {/* JustLanded 和 Featured 链接并排放置，中间有间隙，下面加灰色线 */}
        <div className='relative flex justify-start gap-4'>
          <a href='#featured' className='z-20 inline-block bg-blue-100 px-4 py-2 text-center text-black'>
            {t('featured')}
          </a>
          <a href='#justlanded' className='z-10 inline-block bg-pink-100 px-4 py-2 text-center text-black'>
            {t('just-landed')}
          </a>

          <div className='absolute bottom-0 left-0 w-full border-t border-gray-300' />
        </div>
        {/* JustLanded 和 Featured 组件区域 */}
        <div id='featured' className='mt-5 flex flex-col gap-5'>
          <Featured />
        </div>
        <div id='justlanded' className='mt-5 flex flex-col gap-5'>
          <JustLanded />
        </div>
      </div>
    </div>
  );
}
