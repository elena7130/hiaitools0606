'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { tools } from '@/lib/tools';
import type { ToolCategory } from '@/lib/tools';
import SubmitToolModal from '@/components/tools/SubmitToolModal';

const categoryColors: Record<ToolCategory, string> = {
  career: 'border-blue-200 text-blue-600',
  learning: 'border-purple-200 text-purple-600',
  automation: 'border-orange-200 text-orange-600',
  productivity: 'border-green-200 text-green-600',
};

function ToolLogo({ icon, name }: { icon: string; name: string }) {
  return (
    <div className='flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-gray-100 bg-white'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt={name} width={40} height={40} className='size-10 object-cover' />
    </div>
  );
}

export default function Page() {
  const t = useTranslations('ToolsPage');
  const [active, setActive] = useState<ToolCategory | 'all'>('all');
  const [showModal, setShowModal] = useState(false);

  const tabs: { label: string; value: ToolCategory | 'all' }[] = [
    { label: t('tabAll'), value: 'all' },
    { label: t('tabCareer'), value: 'career' },
    { label: t('tabLearning'), value: 'learning' },
    { label: t('tabAutomation'), value: 'automation' },
    { label: t('tabProductivity'), value: 'productivity' },
  ];

  const filtered = active === 'all' ? tools : tools.filter((tool) => tool.category === active);

  return (
    <div className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-[700px] px-5 py-14 lg:px-0'>
        <header className='mb-10'>
          <h1 className='text-5xl font-bold text-gray-950'>{t('title')}</h1>
          <p className='mt-4 text-base leading-7 text-gray-600'>{t('description')}</p>
        </header>

        {/* Tabs */}
        <div className='mb-8 flex gap-7 border-b border-gray-200'>
          {tabs.map((tab) => (
            <button
              type='button'
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
                active === tab.value
                  ? 'border-[#0F766E] text-[#0F766E]'
                  : 'border-transparent text-gray-500 hover:text-gray-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tool cards */}
        <div className='space-y-3'>
          {filtered.map((tool) => (
            <div
              key={tool.name}
              className='flex items-center gap-4 rounded-[10px] border border-gray-200 bg-white px-5 py-4'
            >
              <ToolLogo icon={tool.icon} name={tool.name} />

              <div className='min-w-0 flex-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <span className='text-sm font-bold text-gray-950'>{tool.name}</span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[tool.category]}`}
                  >
                    {tool.categoryLabel}
                  </span>
                </div>
                <p className='mt-1 text-xs leading-5 text-gray-500'>{tool.description}</p>
              </div>

              <Link
                href={tool.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-[#0F766E] hover:text-[#0B5F58]'
              >
                Visit Website <ArrowRight className='size-3.5' />
              </Link>
            </div>
          ))}
        </div>

        {/* Submit CTA */}
        <div className='mt-10 flex items-center justify-between rounded-[10px] border border-gray-200 bg-gray-50 px-6 py-5'>
          <div>
            <p className='text-sm font-bold text-gray-950'>{t('submitCta')}</p>
            <p className='mt-0.5 text-sm text-gray-500'>{t('submitCtaDesc')}</p>
          </div>
          <button
            type='button'
            onClick={() => setShowModal(true)}
            className='ml-6 inline-flex h-10 shrink-0 items-center rounded-[8px] bg-[#0F766E] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5F58]'
          >
            {t('submitButton')}
          </button>
        </div>
      </div>

      {showModal && <SubmitToolModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
