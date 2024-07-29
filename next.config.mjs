import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_BASE_API: process.env.NEXT_BASE_API,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.artiversehub.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      {
        source: '/category/ai-book-writer',
        destination: '/usecase/ai-book-writer',
        permanent: true,
      },
      {
        source: '/category/book-summarizer',
        destination: '/usecase/book-summarizer',
        permanent: true,
      },
      {
        source: '/category/ai-tattoo-generator',
        destination: '/usecase/ai-tattoo-generator',
        permanent: true,
      },
      {
        source: '/category/ai-baby-generator',
        destination: '/usecase/ai-baby-generator',
        permanent: true,
      },
      {
        source: '/category/ai-tools-directory',
        destination: '/usecase/ai-tools-directory',
        permanent: true,
      },
      {
        source: '/category/ai-song',
        destination: '/usecase/ai-song',
        permanent: true,
      },
      {
        source: '/category/ai-characters',
        destination: '/usecase/ai-characters',
        permanent: true,
      },
      {
        source: '/category/homeworkify',
        destination: '/usecase/homeworkify',
        permanent: true,
      },
      {
        source: '/category/paraphraser',
        destination: '/usecase/paraphraser',
        permanent: true,
      },
      // 你可以继续添加更多的重定向规则
    ];
  },
};

export default withNextIntl(nextConfig);
