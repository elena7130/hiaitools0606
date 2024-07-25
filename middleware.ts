import { NextRequest, NextResponse } from 'next/server';

import intlMiddleware from './middlewares/intlMiddleware';

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathSegments = url.pathname.split('/').filter(Boolean);

  const oldLocales = ['jp', 'cn', 'tw'];
  const newLocalesMap: { [key: string]: string } = {
    jp: 'ja',
    cn: 'zh-CN',
    tw: 'zh-TW',
  };

  // 检查 URL 中是否包含旧的语言代码
  const detectedOldLocales = pathSegments.filter((segment) => oldLocales.includes(segment));

  if (detectedOldLocales.length > 0) {
    // 将旧的语言代码重定向到新的语言代码
    const newLocale = newLocalesMap[detectedOldLocales[0]];
    url.pathname = `/${newLocale}/${pathSegments.slice(1).join('/')}`;
    return NextResponse.redirect(url);
  }

  // 检查是否存在多余的多语言代码
  const validLocales = ['en-US', 'ja-JP', 'de-DE', 'es-ES', 'fr-FR', 'pt-BR', 'ru-RU', 'zh-CN', 'zh-TW'];
  const detectedLocales = pathSegments.filter((segment) => validLocales.includes(segment));

  if (detectedLocales.length > 1) {
    // 如果存在多余的多语言代码，修正 URL
    url.pathname = `/${detectedLocales[0]}/${pathSegments.filter((segment) => !validLocales.includes(segment)).join('/')}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
