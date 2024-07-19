import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';

import { WebNavigationListRow } from '@/lib/data';

import BaseImage from '../image/BaseImage';

// 渲染单个卡片组件
export default function WebNavCardRectangular({ name, thumbnailUrl, title, url, content }: WebNavigationListRow) {
  return (
    <div
      className='flex flex-row gap-3 rounded-[12px] bg-white p-4 shadow-md lg:p-6'
      style={{ maxWidth: '1000px', height: '220px' }}
    >
      <Link href={`/ai/${name}`} title={title} className='w-1/3'>
        <BaseImage
          width={300}
          height={20}
          src={thumbnailUrl || '/path/to/default/image.jpg'}
          alt={title}
          title={title}
          className='aspect-[278/156] rounded-[8px] bg-gray-200 hover:opacity-70'
        />
      </Link>
      <div className='flex w-2/3 flex-col '>
        <div className='flex items-center'>
          <a href={url} title={title} target='_blank' rel='noreferrer nofollow' className='hover:opacity-70 '>
            <h3 className='mr-2 line-clamp-1 text-sm font-bold text-gray-900 lg:text-base'>{title}</h3>
          </a>
          <a href={url} title={title} target='_blank' rel='noreferrer nofollow' className='hover:opacity-70'>
            <SquareArrowOutUpRight className='size-5 text-gray-700 ' />
            <span className='sr-only'>{title}</span>
          </a>
        </div>
        <p className='mt-2 text-xs text-gray-900 lg:text-sm'>{content}</p>
      </div>
    </div>
  );
}
