import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import type { WebNavigation } from '@/db/supabase/types';
import { ArrowRight } from 'lucide-react';

import { WebNavigationListRow } from '@/lib/data';
import BasePagination from '@/components/page/BasePagination';
import WebNavCardList from '@/components/webNav/WebNavCardList';

const WEB_PAGE_SIZE = 20;
const tabs = ['All', 'Career', 'Learning', 'Automation', 'Productivity'];

export default async function ExploreList({ pageNum }: { pageNum?: string }) {
  const supabase = createClient();
  const currentPage = pageNum ? Number(pageNum) : 1;
  const start = (currentPage - 1) * WEB_PAGE_SIZE;
  const end = start + WEB_PAGE_SIZE - 1;

  const { data: navigationList, count } = await supabase
    .from('web_navigation')
    .select('*', { count: 'exact' })
    .order('collection_time', { ascending: false })
    .range(start, end);

  const mappedNavigationList: WebNavigationListRow[] = navigationList
    ? navigationList.map((item: WebNavigation) => ({
        categoryName: item.category_name,
        id: String(item.id),
        title: item.title,
        url: item.url,
        imageUrl: item.image_url || null,
        thumbnailUrl: item.thumbnail_url || null,
        content: item.content,
        name: item.name,
      }))
    : [];

  return (
    <div className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-[980px] px-5 py-14 lg:px-0'>
        <header className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-950 lg:text-5xl'>AI Tools</h1>
          <p className='mt-4 max-w-xl text-base leading-7 text-gray-700'>
            Curated tools to help you work smarter, learn faster, and achieve more.
          </p>
        </header>

        <div className='mb-6 flex flex-wrap gap-8 border-b border-gray-200'>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type='button'
              className={`border-b-2 pb-4 text-sm font-semibold ${
                index === 0
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent text-gray-700 hover:text-[#0F766E]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <WebNavCardList dataList={mappedNavigationList} />

        <BasePagination
          currentPage={currentPage}
          pageSize={WEB_PAGE_SIZE}
          total={count || 0}
          route='/explore'
          subRoute='/page'
          className='my-8 justify-center'
        />

        <div className='mt-8 flex items-center justify-between rounded-[8px] border border-gray-200 bg-gray-50 px-6 py-5'>
          <div>
            <h2 className='text-sm font-bold text-gray-950'>Know a great tool?</h2>
            <p className='mt-1 text-sm text-gray-700'>Suggest a tool that helps professionals use AI better.</p>
          </div>
          <Link
            href='/submit'
            className='inline-flex h-10 items-center gap-2 rounded-[8px] bg-[#0F766E] px-4 text-sm font-semibold text-white hover:bg-[#0B5F58]'
          >
            Submit a Tool <ArrowRight className='size-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
