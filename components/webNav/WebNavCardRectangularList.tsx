import { WebNavigationListRow } from '@/lib/data';

import WebNavCardRectangular from './WebNavCardRectangular';

// 渲染卡片列表组件
export default function WebNavCardRectangularList({ dataList }: { dataList: WebNavigationListRow[] }) {
  if (!Array.isArray(dataList)) {
    // console.error('dataList is not an array:', dataList);
    return null;
  }
  return (
    <div className='flex flex-col gap-6'>
      {dataList.map((item) => (
        <WebNavCardRectangular
          key={item.id}
          id={item.id}
          name={item.name}
          title={item.title}
          url={item.url}
          imageUrl={item.imageUrl}
          thumbnailUrl={item.thumbnailUrl}
          content={item.content}
          alternatives_array={item.alternatives_array}
        />
      ))}
    </div>
  );
}
