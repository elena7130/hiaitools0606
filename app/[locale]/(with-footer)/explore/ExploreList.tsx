import { createClient } from '@/db/supabase/client';

import { WebNavigationListRow } from '@/lib/data'; // 确保导入正确路径
import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';
import WebNavCardList from '@/components/webNav/WebNavCardList';

const WEB_PAGE_SIZE = 20;
const maxItemsToShow = 10;

export default async function ExploreList({ pageNum }: { pageNum?: string }) {
  const supabase = createClient();
  const currentPage = pageNum ? Number(pageNum) : 1;

  // start and end
  const start = (currentPage - 1) * WEB_PAGE_SIZE;
  const end = start + WEB_PAGE_SIZE - 1;

  const [{ data: categoryList }, { data: navigationList, count }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase
      .from('web_navigation')
      .select('*', { count: 'exact' })
      .order('collection_time', { ascending: false })
      .range(start, end),
  ]);

  const aiUseCases = [
    { name: 'ai-baby-generator', icon: '👶' },
    { name: 'ai-book-writing', icon: '📕' },
    { name: 'ai-tools-directory', icon: '⭐' },
    { name: 'ai-characters', icon: '💋' },
    { name: 'ai-tattoo-generator', icon: '⚙️' },
    { name: 'ai-meme-generator', icon: '🐶' },
    // 可以在这里添加更多用例
  ];

  // 将 navigationList 映射为 WebNavigationListRow 类型
  const mappedNavigationList: WebNavigationListRow[] | null = navigationList
    ? navigationList.map((item: any) => ({
        id: String(item.id),
        title: item.title,
        url: item.url,
        imageUrl: item.image_url || null,
        thumbnailUrl: item.thumbnail_url || null,
        content: item.content,
        name: item.name,
      }))
    : null;

  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <SearchForm />
      </div>

      {/* 将两个部分的父容器设置为 flex 和 flex-col 以便垂直对齐 */}
      <div className='mb-10 mt-5 flex flex-col gap-4'>
        {/* AI Categories 部分 */}
        <div className='flex items-center'>
          <h3 className='text-xl font-bold text-black'>AI Categories:</h3>
          <div className='ml-4 flex flex-wrap gap-2'>
            {categoryList &&
              categoryList
                .map((item: any) => ({
                  id: String(item.id),
                  name: item.name,
                  href: `/category/${item.name}`,
                }))
                .slice(0, maxItemsToShow)
                .map((category) => (
                  <a key={category.id} href={category.href} className='tag rounded-lg bg-[#dddee0] p-2 shadow-lg'>
                    {category.name}
                  </a>
                ))}
            {categoryList && categoryList.length > maxItemsToShow && (
              <a href='/categories' className='tag rounded-lg bg-[#dddee0] p-2 shadow-lg'>
                》
              </a>
            )}
          </div>
        </div>

        {/* AI Use Cases 部分 */}
        <div className='mt-3 flex items-center'>
          <h3 className='text-xl font-bold text-black'>AI Use Cases:</h3>
          <div className='ml-4 flex flex-wrap gap-2'>
            {aiUseCases.slice(0, maxItemsToShow).map((useCase) => (
              <a
                key={useCase.name}
                href={`/usecase/${useCase.name}`}
                className='tag rounded-lg bg-[#dddee0] p-2 shadow-lg'
              >
                {useCase.icon} {useCase.name}
              </a>
            ))}
            {maxItemsToShow && (
              <a href='/categories' className='tag rounded-lg bg-[#dddee0] p-2 shadow-lg'>
                》
              </a>
            )}
          </div>
        </div>
      </div>

      <WebNavCardList dataList={mappedNavigationList!} />
      <BasePagination
        currentPage={currentPage}
        pageSize={WEB_PAGE_SIZE}
        total={count!}
        route='/explore'
        subRoute='/page'
        className='my-5 lg:my-10'
      />
    </>
  );
}
