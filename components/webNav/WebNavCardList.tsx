import { WebNavigationListRow } from '@/lib/data';

import WebNavCard from './WebNavCard';

export default function WebNavCardList({ dataList }: { dataList: WebNavigationListRow[] }) {
  return (
    <div className='rounded-[8px] border border-gray-200 bg-white px-5'>
      {dataList.map((item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <WebNavCard key={item.id} {...item} />
      ))}
    </div>
  );
}
