/* eslint-disable react/jsx-props-no-spreading */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';

import { InfoPageSize, RevalidateOneHour } from '@/lib/constants';

import Content from './Content';

export const revalidate = RevalidateOneHour * 6;

type Category = {
  title: string;
  description: string;
  name: string;
};

// 定义查询返回的类型
interface SupabaseQueryResult<T> {
  data: T | null;
  error: {
    message: string;
  } | null;
}

// 创建 Supabase 客户端实例
const supabase = createClient();

export async function generateMetadata({
  params,
}: {
  params: { code: string; locale: string };
}): Promise<Metadata> {
  const result: SupabaseQueryResult<Category> = await supabase
    .from('navigation_category')
    .select('title, description, name')
    .eq('name', params.code)
    .single();

  const { data, error } = result;

  if (error) {
    notFound();
  }

  if (!data || !data.title) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const locale = params.locale ?? 'en';
  const pathname = `/category/${params.code}`;
  const title = `Best ${data.title} AI Tools in 2024`;
  const description = data.description || `Explore the best ${data.title} AI tools. Find, compare and discover top-rated AI tools for ${data.title}.`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
      languages: {
        'x-default': `${siteUrl}${pathname}`,
        en: `${siteUrl}/en${pathname}`,
        pt: `${siteUrl}/pt${pathname}`,
        de: `${siteUrl}/de${pathname}`,
        es: `${siteUrl}/es${pathname}`,
        fr: `${siteUrl}/fr${pathname}`,
        ja: `${siteUrl}/ja${pathname}`,
        ru: `${siteUrl}/ru${pathname}`,
        'zh-CN': `${siteUrl}/zh-CN${pathname}`,
        'zh-TW': `${siteUrl}/zh-TW${pathname}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
      siteName: 'Hi AI Tools',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({ params }: { params: { code: string } }) {
  const result: SupabaseQueryResult<Category> = await supabase
    .from('navigation_category')
    .select('title, description, name')
    .eq('name', params.code)
    .single();

  const { data: categoryData, error: categoryError } = result;

  if (categoryError) {
    notFound();
  }

  if (!categoryData || !categoryData.title || !categoryData.description || !categoryData.name) {
    notFound();
  }

  const {
    data: navigationList,
    count,
    error: navigationError,
  } = await supabase
    .from('web_navigation')
    .select('*', { count: 'exact' })
    .eq('category_name', params.code)
    .range(0, InfoPageSize - 1);

  if (navigationError || !navigationList) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='mb-8 text-center'>
        <h1 className='mb-2 text-4xl font-bold'>Best {categoryData.title} AI tools in 2024</h1>
        <p className='text-lg text-gray-600'>{categoryData.description}</p>
      </header>
      <main>
        <Content
          navigationList={navigationList}
          currentPage={1}
          total={count || 0}
          pageSize={InfoPageSize}
          route={`/category/${params.code}`}
        />
      </main>
    </div>
  );
}
