'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { CircleChevronRight } from 'lucide-react';

import { WebNavigationListRow } from '@/lib/data';
import WebNavCardList from '@/components/webNav/WebNavCardList';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

function JustLanded() {
  // 将箭头函数改为函数声明形式
  const [latestItems, setLatestItems] = useState<WebNavigationListRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchLatest = useCallback(async () => {
    const { data, error } = await supabase
      .from('web_navigation')
      .select('*')
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
      setLatestItems(mappedData);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  return (
    <div id='just-landed'>
      <div className='relative mb-5 flex items-center justify-start'>
        <h2 className='mb-4 mt-2 text-2xl font-bold text-black'>⏳Just Landed</h2>
      </div>
      {loading ? <p>Loading...</p> : <WebNavCardList dataList={latestItems} />}
      <Link
        href='/explore'
        className='mx-auto mb-5 flex w-fit items-center justify-center gap-5 rounded-[9px] border border-white p-[10px] text-sm leading-4 hover:opacity-70'
      >
        Explore More AI Tools
        <CircleChevronRight className='mt-[0.5] h-[20px] w-[20px]' />
      </Link>
      <ScrollToTop />
    </div>
  );
}

export default JustLanded;
