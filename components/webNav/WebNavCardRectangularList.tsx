import { WebNavigationListRow } from '@/lib/data';

import WebNavCardRectangular from './WebNavCardRectangular';

export default function WebNavCardRectangularList({ dataList }: { dataList: WebNavigationListRow[] }) {
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
        />
      ))}
    </div>
  );
}
