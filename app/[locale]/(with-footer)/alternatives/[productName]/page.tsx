'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useTranslations } from 'next-intl';

import { WebNavigationListRow } from '@/lib/data'; // 确保路径和类型定义正确
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb'; // 确保路径和扩展名正确
import WebNavCardRectangularList from '@/components/webNav/WebNavCardRectangularList'; // 使用新的长方形卡片列表组件

function AlternativesPage() {
  const pathname = usePathname();
  const t = useTranslations(); // 修正 useTranslations 的使用
  const [name, setName] = useState<string | null>(null);
  const [alternatives, setAlternatives] = useState<WebNavigationListRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractedName = pathname.split('/alternatives/')[1] || '';
    setName(extractedName);
  }, [pathname]);

  useEffect(() => {
    if (name) {
      const fetchAlternatives = async () => {
        try {
          const response = await axios.get(`/api/alternatives/${name}`);
          const transformedData: WebNavigationListRow[] = response.data.alternatives.map((item: any) => ({
            id: String(item.id),
            name: item.name,
            title: item.title,
            url: item.url,
            imageUrl: item.image_url || null,
            thumbnailUrl: item.thumbnail_url || null,
            content: item.content,
          }));
          setAlternatives(transformedData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchAlternatives();
    } else {
      setLoading(false);
    }
  }, [name]);

  const linkList = [
    { href: '/', title: t('Home') },
    { href: `/ai/${name}`, title: name || '' }, // 添加返回产品详情的链接
    { title: `${t('Alternatives')}`, isLast: true },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative w-full bg-white'>
      <Head>
        <title>{`${t('Top 10 Alternatives for')} ${name} | ${t('Find the Best Options')}`}</title>
        <meta
          name='description'
          content={`${t('Discover the top 10 alternatives for')} ${name}. ${t('Compare features and pricing to find the perfect solution for your needs.')}`}
        />
      </Head>
      <header className='bg-white shadow'>
        <div className='container mx-auto px-4 py-6'>
          <ExploreBreadcrumb linkList={linkList} /> {/* 添加面包屑导航 */}
          <h1 className='mt-4 text-center text-3xl font-bold text-gray-900'>
            🦄 {`${t('Top 10 Alternatives for')} ${name}`}
          </h1>
          <h2 className='mt-2 text-center text-xl text-gray-700'>
            {`${t('Explore the best alternatives for')} ${name}. ${t('Compare features and pricing to find the perfect solution for your needs.')}`}
          </h2>
        </div>
      </header>
      <main className='container mx-auto px-4 py-6'>
        <div className='mt-5 flex flex-col gap-5'>
          <WebNavCardRectangularList dataList={alternatives} />
        </div>
      </main>
    </div>
  );
}

export default AlternativesPage;
