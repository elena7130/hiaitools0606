'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { WebNavigationListRow } from '@/lib/data'; // 确保路径和类型定义正确
import WebNavCardList from '@/components/webNav/WebNavCardList'; // 使用 WebNavCardList 组件

function SimilarProducts({ name }: { name: string }) {
  const [alternatives, setAlternatives] = useState<WebNavigationListRow[]>([]);

  useEffect(() => {
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
        setAlternatives(transformedData.slice(0, 4));
      } catch (error) {
        // console.error('Error fetching alternatives:', error);
      }
    };
    fetchAlternatives();
  }, [name]);

  return (
    <div className='similar-products'>
      <h3 className='text-2xl font-bold'>👀 Similar to {name}</h3>
      <p className='mb-6 mt-4'>
        Explore other comparable options for <strong>{name}</strong> that might suit your needs.
        <Link href={`/alternatives/${name}`} legacyBehavior>
          <a href={`/alternatives/${name}`} className='text-blue-500 underline hover:text-blue-700'>
            👓 View all {name} alternatives
          </a>
        </Link>
      </p>
      <WebNavCardList dataList={alternatives} />
    </div>
  );
}

export default SimilarProducts;
