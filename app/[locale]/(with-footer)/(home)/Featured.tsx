'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/db/supabase/client';

import { WebNavigationListRow } from '@/lib/data';
import WebNavCardList from '@/components/webNav/WebNavCardList';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

function Featured() {
  // 将箭头函数改为函数声明形式
  const [featuredItems, setFeaturedItems] = useState<WebNavigationListRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchFeatured = useCallback(async () => {
    const { data, error } = await supabase
      .from('web_navigation')
      .select('*')
      .eq('featured', true)
      .order('collection_time', { ascending: false })
      .limit(12);

    if (!error && data) {
      const mappedData = data.map((item: any) => ({
        id: String(item.id),
        title: item.title,
        url: item.url,
        imageUrl: item.image_url || null,
        thumbnailUrl: item.thumbnail_url || null,
        content: item.content,
        name: item.name,
      }));
      setFeaturedItems(mappedData);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return (
    <div id='featured'>
      <div className='relative mb-5 flex items-center justify-start' /> {/* 将双引号改为单引号，空组件改为自闭合组件 */}
      {loading ? <p>Loading...</p> : <WebNavCardList dataList={featuredItems} />}
      <ScrollToTop />
    </div>
  );
}

export default Featured;
