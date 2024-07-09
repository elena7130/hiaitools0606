'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

import { WebNavigationListRow } from '@/lib/data'; // 确保路径和类型定义正确
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb'; // 确保路径和扩展名正确
import WebNavCardRectangularList from '@/components/webNav/WebNavCardRectangularList'; // 使用新的长方形卡片列表组件

function KeyworldResultPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string | null>(null);
  const [results, setResults] = useState<WebNavigationListRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractedKeyword = pathname.split('/s/')[1] || '';
    setKeyword(extractedKeyword);
  }, [pathname]);

  useEffect(() => {
    if (keyword) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(`/api/getkeyword?keyword=${keyword}`);
          const transformedData: WebNavigationListRow[] = response.data.websites.map((item: any) => ({
            id: String(item.id),
            name: item.name,
            title: item.title,
            url: item.url,
            imageUrl: item.image_url || null,
            thumbnailUrl: item.thumbnail_url || null,
            content: item.content,
          }));
          setResults(transformedData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [keyword]);

  const linkList = [
    { href: '/', title: 'Home' },
    { href: '/new-path', title: 'New Path' }, // 修改路径名称
    { title: keyword || '', isLast: true },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative w-full bg-white'>
      <Head>
        <title>{`${keyword} Tools | 20 Top AI Tools`}</title>
        <meta
          name='description'
          content={`Explore the best ${keyword}. Compare features and pricing to find the perfect solution for your needs. Discover even more specialized AI tools with our AI-powered search.`}
        />
      </Head>
      <header className='bg-white shadow'>
        <div className='container mx-auto px-4 py-6'>
          <ExploreBreadcrumb linkList={linkList} /> {/* 添加面包屑导航 */}
          <h1 className='mt-4 text-center text-3xl font-bold text-gray-900'>🦄 20 Top AI {keyword} Tools</h1>
          <h2 className='mt-2 text-center text-xl text-gray-700'>
            Explore the best {keyword}. Compare features and pricing to find the perfect solution for your needs.
            Discover even more specialized AI tools with our AI-powered search.
          </h2>
        </div>
      </header>

      <main className='container mx-auto px-4 py-6'>
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Search another keyword'
            className='w-full rounded border border-gray-300 p-2'
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                router.push(`/s/${e.currentTarget.value}`);
              }
            }}
          />
        </div>

        <div className='mt-5 flex flex-col gap-5'>
          <WebNavCardRectangularList dataList={results} />
        </div>
      </main>
    </div>
  );
}

export default KeyworldResultPage;
