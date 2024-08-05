/* eslint-disable react/jsx-props-no-spreading */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { WebNavigationListRow } from '@/lib/data'; // 确保路径和类型定义正确
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb'; // 确保路径和扩展名正确

import SeoScript from '@/components/seo/SeoScript'; // 确保路径正确
import WebNavCardList from '@/components/webNav/WebNavCardList';

export const revalidate = 21600;

type Usecase = {
  title: string;
  name: string;
};

// 定义查询返回的类型
interface SupabaseQueryResult<T> {
  data: T[] | null;
  error: {
    message: string;
  } | null;
}

// 创建 Supabase 客户端实例
const supabase = createClient();
export async function generateMetadata({
  params: { locale, code },
}: {
  params: { locale: string; code: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata.usecase' });

  const formattedUsecaseName = code
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const title = t('title', { usecase: formattedUsecaseName });
  const description = t('description', { usecase: formattedUsecaseName });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const pathname = `/usecase/${code}`;
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
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates,
  };
}

export default async function Page({ params: { locale, code } }: { params: { locale: string; code: string } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata.usecase' });

  const result: SupabaseQueryResult<Usecase> = await supabase
    .from('web_navigation')
    .select('title, name')
    .eq('usecase', code);

  const { data: usecaseData, error: usecaseError } = result;

  if (usecaseError) {
    notFound();
  }

  if (!usecaseData || usecaseData.length === 0) {
    notFound();
  }

  const {
    data: navigationList,

    error: navigationError,
  } = await supabase.from('web_navigation').select('*', { count: 'exact' }).eq('usecase', code).range(0, 20);

  if (navigationError || !navigationList) {
    notFound();
  }

  const formattedUsecaseName = code
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const formattedAlternativesData: WebNavigationListRow[] = navigationList.map((item) => ({
    ...item,
    id: item.id.toString(), // 转换 id 为字符串
    imageUrl: item.image_url,
    thumbnailUrl: item.thumbnail_url,
  }));

  const linkList = [
    { href: '/', title: t('Home') },
    { title: formattedUsecaseName, isLast: true },
  ];

  return (
    <div className='relative w-full bg-white'>
      <SeoScript />
      <div className='container px-4 py-6'>
        <ExploreBreadcrumb linkList={linkList} />
      </div>
      <div className='flex flex-col px-6 py-5 lg:h-[200px] lg:flex-row lg:justify-center'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='text-center text-3xl font-bold text-gray-900'>
            <h1 className='text-center lg:text-4xl'>{t('title', { usecase: formattedUsecaseName })}</h1>
            <h2 className='mt-5 px-8 text-center text-xl text-gray-700'>
              {t('description', { usecase: formattedUsecaseName })}
            </h2>
          </div>
        </div>
      </div>
      <div className='mt- my-5'>
        <WebNavCardList dataList={formattedAlternativesData} />
      </div>
    </div>
  );
}
