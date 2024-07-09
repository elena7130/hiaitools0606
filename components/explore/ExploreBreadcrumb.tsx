import React from 'react';
import { Home } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function ExploreBreadcrumb({
  linkList,
}: {
  linkList: { href?: string; title: string; isLast?: boolean }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {linkList.map((item) => (
          <React.Fragment key={item.href ? item.href + item.title : item.title}>
            <BreadcrumbItem>
              {!item.isLast && (
                <BreadcrumbLink href={item.href} className='flex items-center gap-1 text-gray-600 hover:text-gray-800'>
                  {item.href === '/' && <Home className='h-4 w-4' />}
                  {item.title}
                </BreadcrumbLink>
              )}
              {item.isLast && <BreadcrumbPage className='text-gray-800'>{item.title}</BreadcrumbPage>}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator className='mx-2 text-gray-600'>/</BreadcrumbSeparator>}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
