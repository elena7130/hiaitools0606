import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Mail } from 'lucide-react';

import { getGuide, getRelatedGuides, parseMarkdownSections } from '@/lib/guides';
import NewsletterForm from '@/components/home/NewsletterForm';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = getGuide(params.slug);

  if (!guide) {
    notFound();
  }

  return {
    title: `${guide.title} | HIAI`,
    description: guide.description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = getRelatedGuides(guide.slug);
  const sections = parseMarkdownSections(guide.content);

  return (
    <article className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-[1040px] px-5 py-10 lg:px-0'>
        <nav className='mb-8 flex items-center gap-3 text-sm text-gray-600'>
          <Link href='/' className='hover:text-[#0F766E]'>
            Home
          </Link>
          <span>/</span>
          <Link href={`/category/${guide.category}`} className='hover:text-[#0F766E]'>
            Guides
          </Link>
          <span>/</span>
          <span>{guide.categoryLabel}</span>
        </nav>

        <header className='max-w-[700px]'>
          <h1 className='text-4xl font-bold leading-tight text-gray-950 lg:text-5xl'>{guide.title}</h1>
          <p className='mt-5 text-base leading-7 text-gray-700'>{guide.description}</p>
          <div className='mt-7 flex items-center gap-4 text-sm text-gray-700'>
            <span className='flex size-8 items-center justify-center rounded-full bg-[#0F766E] text-xs font-bold text-white'>
              {guide.author.slice(0, 1)}
            </span>
            <span>{guide.author}</span>
            <span>.</span>
            <span>{guide.date}</span>
            <span>.</span>
            <span>{guide.readTime}</span>
          </div>
        </header>

        <div className='mt-10 border-t border-gray-200 pt-8'>
          <div className='grid gap-10 lg:grid-cols-[230px_1fr]'>
            <aside className='h-fit rounded-[4px] border border-gray-200 bg-gray-50 p-5 lg:sticky lg:top-28'>
              <h2 className='text-sm font-bold text-gray-950'>Table of Contents</h2>
              <ol className='mt-4 space-y-3 text-sm text-gray-700'>
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a href={`#section-${index}`} className='hover:text-[#0F766E]'>
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className='space-y-9'>
              {sections.map((section, index) => (
                <section key={section.title} id={`section-${index}`} className='scroll-mt-28'>
                  <h2 className='text-2xl font-bold text-gray-950'>
                    {index + 1}. {section.title}
                  </h2>
                  <p className='mt-4 text-base leading-8 text-gray-700'>{section.body}</p>
                  {section.callout && (
                    <div className='mt-5 rounded-[4px] border border-gray-200 bg-gray-50 px-5 py-4 font-mono text-sm leading-7 text-gray-800'>
                      {section.callout}
                    </div>
                  )}
                  {index === 0 && (
                    <div className='mt-6 h-24 rounded-[4px] bg-gradient-to-r from-gray-100 to-gray-200' />
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>

        <section className='mt-16 border-t border-gray-200 pt-8'>
          <div className='mb-5 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-950'>Related Guides</h2>
            <Link
              href={`/category/${guide.category}`}
              className='inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E]'
            >
              View all <ArrowRight className='size-4' />
            </Link>
          </div>
          <div className='grid gap-5 md:grid-cols-3'>
            {relatedGuides.map((related) => (
              <Link
                key={related.slug}
                href={`/guides/${related.slug}`}
                className='rounded-[4px] border border-gray-200 bg-white p-5 transition-colors hover:border-[#0F766E]'
              >
                <h3 className='text-sm font-bold leading-6 text-gray-950'>{related.title}</h3>
                <p className='mt-4 text-xs text-gray-600'>
                  {related.date} <span className='px-2'>.</span> {related.readTime}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id='newsletter' className='mt-10 rounded-[8px] border border-gray-200 bg-gray-50 p-7'>
          <div className='grid items-center gap-6 md:grid-cols-[1fr_1.1fr]'>
            <div className='flex items-center gap-5'>
              <div className='flex size-12 items-center justify-center rounded-[8px] bg-[#0F766E] text-white'>
                <Mail className='size-6' />
              </div>
              <div>
                <h2 className='text-base font-bold text-gray-950'>Like this article?</h2>
                <p className='mt-1 text-sm text-gray-700'>Subscribe to get weekly AI insights.</p>
              </div>
            </div>
            <NewsletterForm compact />
          </div>
        </section>
      </div>
    </article>
  );
}
