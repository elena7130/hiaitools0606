import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { WebNavigationListRow } from '@/lib/data';
import BaseImage from '@/components/image/BaseImage';

export default function WebNavCard({ categoryName, name, thumbnailUrl, title, url, content }: WebNavigationListRow) {
  return (
    <div className='grid items-center gap-5 border-b border-gray-200 py-5 sm:grid-cols-[52px_1fr_auto_auto]'>
      <Link
        href={`/ai/${name}`}
        title={title}
        className='relative flex size-12 overflow-hidden rounded-[6px] border border-gray-200 bg-gray-100'
      >
        <BaseImage
          width={48}
          height={48}
          src={thumbnailUrl || '/app/favicon.png'}
          alt={title}
          title={title}
          className='size-12 object-cover'
        />
      </Link>

      <div>
        <Link href={`/ai/${name}`} title={title} className='text-base font-bold text-gray-950 hover:text-[#0F766E]'>
          {title}
        </Link>
        <p className='mt-1 line-clamp-2 max-w-2xl text-sm leading-6 text-gray-700'>{content}</p>
      </div>

      {categoryName ? (
        <span className='w-fit rounded-[4px] bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700'>
          {categoryName}
        </span>
      ) : null}

      <a
        href={url}
        title={title}
        target='_blank'
        rel='noreferrer nofollow'
        className='inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] hover:text-[#0B5F58]'
      >
        Visit Website <ArrowRight className='size-4' />
      </a>
    </div>
  );
}
