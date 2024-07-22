import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { WebNavigationListRow } from '@/lib/data'; // 确保路径和类型定义正确
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb'; // 确保路径和扩展名正确

import SeoScript from '@/components/seo/SeoScript'; // 确保路径正确
import WebNavCardRectangularList from '@/components/webNav/WebNavCardRectangularList';

export async function generateMetadata({
  params: { locale, productName },
}: {
  params: { locale: string; productName: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const t = await getTranslations({ locale, namespace: 'Metadata.alternatives' });
  const { data, error } = await supabase.from('web_navigation').select().eq('name', productName).single();
  if (error || !data) {
    notFound();
  }
  const title = t('title', { productName: data.name });
  const description = t('description', { productName: data.name });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      canonical: './',
    },
    title,
    description,
  };
}

export default async function Page({
  params: { locale, productName },
}: {
  params: { locale: string; productName: string };
}) {
  const supabase = createClient();
  const t = await getTranslations({ locale, namespace: 'Metadata.alternatives' });
  const { data: productData, error: productError } = await supabase
    .from('web_navigation')
    .select()
    .eq('name', productName)
    .single();
  if (productError || !productData) {
    notFound();
  }
  const alternativesIds = productData.alternatives_array; // 更新字段名并确保类型为 number[]
  if (!Array.isArray(alternativesIds) || alternativesIds.length === 0) {
    notFound();
  }
  const { data: alternativesData, error: alternativesError } = await supabase
    .from('web_navigation')
    .select()
    .in('id', alternativesIds);
  if (alternativesError || !alternativesData || alternativesData.length === 0) {
    notFound();
  }
  const formattedAlternativesData: WebNavigationListRow[] = alternativesData.map((item) => ({
    ...item,
    id: item.id.toString(), // 转换 id 为字符串
    imageUrl: item.image_url,
    thumbnailUrl: item.thumbnail_url,
    alternatives_array: item.alternatives_array, // 确保字段名一致，类型为 number[]
  }));

  const linkList = [
    { href: '/', title: t('Home') },
    { href: `/ai/${productName}`, title: productName || '' }, // 添加返回产品详情的链接
    { title: t('Alternatives'), isLast: true },
  ];
  return (
    <div className='relative w-full bg-white'>
      <SeoScript />
      <div className='container mx-auto px-4 py-6'>
        <ExploreBreadcrumb linkList={linkList} />
      </div>
      <div className='flex flex-col px-6 py-5 lg:h-[200px] lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='mt-2 text-center text-3xl font-bold text-gray-900'>
            <h1 className='text-center text-2xl lg:text-5xl'>{t('title', { productName: productData.name })}</h1>
            <h2 className='mt-5 px-8 text-center text-xl text-gray-700'>
              {t('description', { productName: productData.name })}
            </h2>
          </div>
        </div>
      </div>
      <div className='my-10'>
        <WebNavCardRectangularList dataList={formattedAlternativesData} />
      </div>
    </div>
  );
}
