import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import GoalSelector from '@/components/home/GoalSelector';
import NewsletterForm from '@/components/home/NewsletterForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata.home' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const pathname = '/';
  const alternates = {
    canonical: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${pathname}`,
    languages: {
      'x-default': `${baseUrl}/`,
      en: `${baseUrl}/en${pathname}`,
      pt: `${baseUrl}/pt${pathname}`,
      de: `${baseUrl}/de${pathname}`,
      es: `${baseUrl}/es${pathname}`,
      fr: `${baseUrl}/fr${pathname}`,
      ja: `${baseUrl}/ja${pathname}`,
      ru: `${baseUrl}/ru${pathname}`,
      'zh-CN': `${baseUrl}/zh-CN${pathname}`,
      'zh-TW': `${baseUrl}/zh-TW${pathname}`,
    },
  };

  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: t('keywords'),
    alternates,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/`,
      siteName: 'HIAI',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export const revalidate = RevalidateOneHour;

// ─── Static data ────────────────────────────────────────────────────────────

const PATHS = [
  {
    icon: '🚀',
    title: 'Get a Job',
    href: '/usecase/ai-job-search',
    items: ['Resume', 'Interview Prep', 'Remote Jobs'],
  },
  {
    icon: '💰',
    title: 'Make Money',
    href: '/usecase/ai-side-hustle',
    items: ['Freelancing', 'Consulting', 'Side Hustles'],
  },
  {
    icon: '⚡',
    title: 'Automate Work',
    href: '/explore',
    items: ['AI Agents', 'Workflows', 'Tools'],
  },
  {
    icon: '📚',
    title: 'Learn AI',
    href: '/usecase/ai-productivity',
    items: ['Prompting', 'LLMs', 'Practice'],
  },
];

const PLAYBOOKS = [
  {
    title: 'How to Get a Remote Job with AI',
    readTime: '15 min read',
    tag: 'Career → AI + Job Search',
    href: '/usecase/ai-job-search',
  },
  {
    title: 'How Freelancers Use ChatGPT to Earn $2,000/month',
    readTime: '18 min read',
    tag: 'Side Hustle → Income',
    href: '/usecase/ai-side-hustle',
  },
  {
    title: 'How to Automate Your Daily Work with AI',
    readTime: '12 min read',
    tag: 'Operations → AI Workflow',
    href: '/explore',
  },
  {
    title: 'How to Build an AI Writing Side Hustle',
    readTime: '20 min read',
    tag: 'Content → Side Hustle',
    href: '/usecase/ai-writing-tools',
  },
];

const TOOLKITS = [
  {
    name: 'Resume Toolkit',
    tools: ['ChatGPT', 'Claude', 'Resume Worded', 'Grammarly'],
    href: '/usecase/ai-resume-builder',
  },
  {
    name: 'Content Toolkit',
    tools: ['Claude', 'Perplexity', 'Midjourney', 'Canva'],
    href: '/usecase/ai-writing-tools',
  },
  {
    name: 'Developer Toolkit',
    tools: ['Cursor', 'GitHub Copilot', 'Claude Code', 'Codeium'],
    href: '/usecase/ai-freelance-tools',
  },
];

const RESOURCES = [
  { title: 'AI Resume Template', icon: '📄', href: '/usecase/ai-resume-builder' },
  { title: '100 AI Job Prompts', icon: '💡', href: '/usecase/ai-job-search' },
  { title: 'Freelance Proposal Kit', icon: '📝', href: '/usecase/ai-freelance-tools' },
  { title: 'AI Side Hustle Guide', icon: '🚀', href: '/usecase/ai-side-hustle' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HIAI',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/query/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className='min-h-screen bg-[#FAFAFA]'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className='mx-auto max-w-pc px-5 pb-16 pt-16 lg:px-0 lg:pt-24'>
        <div className='flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16'>
          {/* Left */}
          <div className='flex flex-1 flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-5xl'>
                Use AI To Grow Your
                <br />
                <span className='text-[#0F766E]'>Career and Income</span>
              </h1>
              <p className='max-w-md text-base text-gray-500'>
                Practical AI workflows, career guides, side hustles, and curated tools — updated daily.
              </p>
            </div>
            <GoalSelector />
          </div>

          {/* Right — abstract node graph */}
          <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-center'>
            <div className='relative h-64 w-full max-w-sm'>
              <svg className='h-full w-full' viewBox='0 0 320 240' fill='none'>
                <line x1='160' y1='120' x2='60' y2='50' stroke='#D1FAE5' strokeWidth='1.5' />
                <line x1='160' y1='120' x2='260' y2='50' stroke='#D1FAE5' strokeWidth='1.5' />
                <line x1='160' y1='120' x2='60' y2='190' stroke='#D1FAE5' strokeWidth='1.5' />
                <line x1='160' y1='120' x2='260' y2='190' stroke='#D1FAE5' strokeWidth='1.5' />
                <circle cx='160' cy='120' r='20' fill='#0F766E' />
                <text x='160' y='125' textAnchor='middle' fill='white' fontSize='11' fontWeight='600'>AI</text>
                {[
                  { cx: 60, cy: 50, label: 'Job' },
                  { cx: 260, cy: 50, label: 'Income' },
                  { cx: 60, cy: 190, label: 'Skills' },
                  { cx: 260, cy: 190, label: 'Growth' },
                ].map((n) => (
                  <g key={n.label}>
                    <circle cx={n.cx} cy={n.cy} r='28' fill='white' stroke='#E5E7EB' strokeWidth='1' />
                    <text x={n.cx} y={n.cy + 4} textAnchor='middle' fill='#374151' fontSize='10' fontWeight='500'>
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHOOSE YOUR PATH ─────────────────────────────────────────── */}
      <section className='mx-auto max-w-pc px-5 py-16 lg:px-0'>
        <h2 className='mb-8 text-2xl font-bold text-gray-900'>Choose Your Path</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {PATHS.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className='group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-[#0F766E] hover:shadow-md'
            >
              <span className='text-3xl'>{path.icon}</span>
              <div>
                <h3 className='font-semibold text-gray-900 group-hover:text-[#0F766E]'>{path.title}</h3>
                <ul className='mt-2 flex flex-col gap-1'>
                  {path.items.map((item) => (
                    <li key={item} className='text-sm text-gray-400'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR PLAYBOOKS ────────────────────────────────────────── */}
      <section className='bg-white py-16'>
        <div className='mx-auto max-w-pc px-5 lg:px-0'>
          <h2 className='mb-8 text-2xl font-bold text-gray-900'>Popular AI Playbooks</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {PLAYBOOKS.map((pb) => (
              <Link
                key={pb.title}
                href={pb.href}
                className='group flex flex-col gap-3 rounded-xl border border-gray-100 bg-[#FAFAFA] p-5 transition-all duration-200 hover:border-[#0F766E] hover:bg-white'
              >
                <span className='text-xs font-medium text-[#0F766E]'>{pb.tag}</span>
                <h3 className='text-sm font-semibold leading-snug text-gray-900 group-hover:text-[#0F766E]'>
                  {pb.title}
                </h3>
                <span className='mt-auto text-xs text-gray-400'>{pb.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI TOOLKITS ──────────────────────────────────────────────── */}
      <section className='mx-auto max-w-pc px-5 py-16 lg:px-0'>
        <h2 className='mb-8 text-2xl font-bold text-gray-900'>AI Toolkits</h2>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {TOOLKITS.map((kit) => (
            <Link
              key={kit.name}
              href={kit.href}
              className='group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-[#0F766E] hover:shadow-md'
            >
              <h3 className='font-semibold text-gray-900 group-hover:text-[#0F766E]'>{kit.name}</h3>
              <div className='flex flex-wrap gap-2'>
                {kit.tools.map((tool) => (
                  <span
                    key={tool}
                    className='rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200'
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FREE RESOURCES ───────────────────────────────────────────── */}
      <section className='bg-white py-16'>
        <div className='mx-auto max-w-pc px-5 lg:px-0'>
          <h2 className='mb-2 text-2xl font-bold text-gray-900'>Free Resources</h2>
          <p className='mb-8 text-sm text-gray-400'>Subscribe to unlock all resources</p>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {RESOURCES.map((res) => (
              <Link
                key={res.title}
                href='#newsletter'
                className='group flex items-center justify-between rounded-xl border border-gray-200 bg-[#FAFAFA] px-5 py-4 transition-all hover:border-[#0F766E] hover:bg-white'
              >
                <div className='flex items-center gap-3'>
                  <span className='text-xl'>{res.icon}</span>
                  <span className='text-sm font-medium text-gray-700'>{res.title}</span>
                </div>
                <span className='rounded-lg bg-[#0F766E]/10 px-3 py-1 text-xs font-semibold text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white'>
                  Get
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────── */}
      <section id='newsletter' className='mx-auto max-w-pc px-5 py-20 lg:px-0'>
        <div className='rounded-2xl bg-[#0F766E] px-8 py-12 text-center lg:px-16'>
          <h2 className='text-2xl font-bold text-white lg:text-3xl'>Weekly AI Career Insights</h2>
          <p className='mt-2 text-sm text-white/70'>
            Join readers getting the best AI tools, workflows, and income ideas every week.
          </p>
          <div className='mt-8 flex justify-center'>
            <div className='w-full max-w-md'>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
