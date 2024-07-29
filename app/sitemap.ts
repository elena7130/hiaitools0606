import { MetadataRoute } from 'next';
import { createClient } from '@/db/supabase/client';
import { locales } from '@/i18n';

import { BASE_URL } from '@/lib/env';

type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'daily' | 'always' | 'hourly' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

type WebNavigation = {
  keyword: string | null;
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
      case "'":
        return '&apos;';
      default:
        return c;
    }
  });
}

async function getDynamicPaths(): Promise<SitemapEntry[]> {
  const paths: SitemapEntry[] = [];
  const supabase = createClient();

  const { data: productData, error: productError } = await supabase.from('web_navigation').select('name');
  if (!productError && productData) {
    paths.push(
      ...productData.map((product: { name: string }) => ({
        url: `ai/${escapeXml(product.name)}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as 'daily',
        priority: 0.7,
      })),
    );
  }

  const { data: alternativeData, error: alternativeError } = await supabase.from('web_navigation').select('name');
  if (!alternativeError && alternativeData) {
    paths.push(
      ...alternativeData.map((alternative: { name: string }) => ({
        url: `alternatives/${escapeXml(alternative.name)}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as 'daily',
        priority: 0.7,
      })),
    );
  }

  const { data: categoryData, error: categoryError } = await supabase.from('navigation_category').select('name');
  if (!categoryError && categoryData) {
    paths.push(
      ...categoryData.map((category: { name: string }) => ({
        url: `category/${escapeXml(category.name)}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as 'daily',
        priority: 0.7,
      })),
    );
  }

  // 新增关键词路径
  const { data: keywordData, error: keywordError } = await supabase.from('web_navigation').select('keyword');

  if (!keywordError && keywordData) {
    const keywords = keywordData as unknown as WebNavigation[];
    paths.push(
      ...keywords
        .filter((item) => item.keyword && item.keyword.trim() !== '') // 过滤掉空关键词
        .map((item) => ({
          url: `s/${escapeXml(item.keyword!)}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as 'daily',
          priority: 0.7,
        })),
    );
  }

  return paths;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: SitemapEntry[] = [
    {
      url: '', // home
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'explore',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'submit',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'startup',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  const dynamicPaths = await getDynamicPaths();
  const allRoutes = [...staticRoutes, ...dynamicPaths];

  const sitemapData = allRoutes.flatMap((route) =>
    locales.map((locale) => {
      const lang = locale === 'en' ? '' : `/${locale}`;
      const routeUrl = route.url === '' ? '' : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}`,
      };
    }),
  );

  return sitemapData.map((route) => ({
    ...route,
    url: escapeXml(route.url),
  }));
}
