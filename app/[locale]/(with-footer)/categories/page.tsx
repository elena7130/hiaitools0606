import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb';
import SeoScript from '@/components/seo/SeoScript';

const supabase = createClient();

export const revalidate = 21600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata.categories' });

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      canonical: './',
    },
  };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata.categories' });

  // 查询 categories
  const { data: categoriesData, error: categoriesError } = await supabase.from('navigation_category').select('name');

  if (categoriesError || !categoriesData) {
    notFound();
  }

  // 查询 usecases
  const { data: usecasesData, error: usecasesError } = await supabase
    .from('usecase') // 确保表名正确
    .select('name, icon'); // 确保字段名正确

  if (usecasesError || !usecasesData) {
    notFound();
  }

  // 过滤掉 usecase 为空的记录并去重
  // const filteredUsecasesData = Array.from(new Set(usecasesData.map((item: { name: string }) => item.name)));

  const linkList = [
    { href: '/', title: t('Home') },
    { title: t('Categories'), isLast: true },
  ];

  const formattedName = (name: string) =>
    name
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <div className='relative w-full bg-white'>
      <SeoScript />
      <div className='container px-4 py-6'>
        <ExploreBreadcrumb linkList={linkList} />
      </div>
      <div className='container mx-auto px-4 py-6'>
        <header className='mb-8 text-center'>
          <h1 className='text-4xl font-bold'>{t('title')}</h1>
          <p className='py-4 text-lg text-gray-600'>{t('description')}</p>
        </header>
        <div className='mt-10'>
          <h2 className='mb-4 text-2xl font-bold'>AI Use Cases</h2>
          <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
            {usecasesData.map((usecase: { name: string; icon: string }) => (
              <a
                key={usecase.name}
                href={`/usecase/${usecase.name}`}
                className='block transform rounded-lg bg-gray-100 p-4 shadow transition-transform hover:scale-105 hover:bg-gray-200'
              >
                <span className='mr-2 inline-block'>{usecase.icon || '❓'}</span>
                {formattedName(usecase.name)}
              </a>
            ))}
          </div>
          <div>
            <h2 className='mb-4 mt-10 text-2xl font-bold'>AI Categories</h2>
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
              {categoriesData.map((category: { name: string }) => (
                <a
                  key={category.name}
                  href={`/category/${category.name}`}
                  className='block transform rounded-lg bg-gray-100 p-4 shadow transition-transform hover:scale-105 hover:bg-gray-200'
                >
                  {formattedName(category.name)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
