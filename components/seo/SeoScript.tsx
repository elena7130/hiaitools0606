'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function SeoScript() {
  const currentPath = usePathname();

  const hreflangs = [
    { href: `https://www.hiatools.com/zh-CN${currentPath}`, hrefLang: 'zh-CN' },
    { href: `https://www.hiatools.com/fr${currentPath}`, hrefLang: 'fr' },
    { href: `https://www.hiatools.com/de${currentPath}`, hrefLang: 'de' },
    { href: `https://www.hiatools.com/pt${currentPath}`, hrefLang: 'pt' },
    { href: `https://www.hiatools.com/ru${currentPath}`, hrefLang: 'ru' },
    { href: `https://www.hiatools.com/zh-TW${currentPath}`, hrefLang: 'zh-TW' },
    { href: `https://www.hiatools.com/ja${currentPath}`, hrefLang: 'ja' },
    { href: `https://www.hiatools.com/es${currentPath}`, hrefLang: 'es' },
    { href: `https://www.hiatools.com/en${currentPath}`, hrefLang: 'x-default' },
  ];

  const canonicalHref = `https://www.hiatools.com${currentPath}`;

  useEffect(() => {
    console.log('Canonical URL:', canonicalHref); // 调试日志
  }, [canonicalHref]);

  return (
    <>
      <Head>
        {hreflangs.map(({ href, hrefLang }) => (
          <link key={hrefLang} rel='alternate' href={href} hrefLang={hrefLang} />
        ))}
        <link rel='canonical' href={canonicalHref} />
      </Head>
      <Script async src='https://www.googletagmanager.com/gtag/js?id=G-06CEX6LCV8' />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-06CEX6LCV8');
          `,
        }}
      />
    </>
  );
}
