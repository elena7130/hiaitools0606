'use client';

import Script from 'next/script';

export default function SeoScript() {
  return (
    <>
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
