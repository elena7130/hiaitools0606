import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Download, FileText, Search, Send, Sparkles } from 'lucide-react';

import { getPlaybook, parseMarkdownSections } from '@/lib/guides';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const playbook = getPlaybook(params.slug);

  if (!playbook) {
    notFound();
  }

  return {
    title: `${playbook.title} | HIAI`,
    description: playbook.description,
  };
}

const stepIcons = [Search, FileText, Send, Sparkles, Check];

export default function Page({ params }: { params: { slug: string } }) {
  const playbook = getPlaybook(params.slug);

  if (!playbook) {
    notFound();
  }

  const steps = parseMarkdownSections(playbook.content);

  return (
    <div className='w-full bg-white text-gray-950'>
      <div className='mx-auto max-w-pc px-5 py-10 lg:px-0'>
        <nav className='mb-6 flex items-center gap-3 text-sm text-gray-600'>
          <Link href='/' className='hover:text-[#0F766E]'>
            Home
          </Link>
          <span>/</span>
          <span>Playbooks</span>
          <span>/</span>
          <span>{playbook.title}</span>
        </nav>

        <header className='mb-12 max-w-3xl'>
          <h1 className='text-4xl font-bold leading-tight text-gray-950 lg:text-5xl'>{playbook.title}</h1>
          <p className='mt-4 text-base leading-7 text-gray-700'>{playbook.description}</p>
        </header>

        <div className='grid gap-10 lg:grid-cols-[230px_1fr_280px]'>
          <aside className='h-fit rounded-[4px] border border-gray-200 bg-gray-50 p-5 lg:sticky lg:top-28'>
            <h2 className='text-sm font-bold text-gray-950'>On this page</h2>
            <ol className='mt-4 space-y-3 text-sm text-gray-700'>
              <li>Overview</li>
              {steps.map((step, index) => (
                <li key={step.title}>
                  {index + 1}. Step {index + 1}: {step.title}
                </li>
              ))}
              <li>Resources</li>
              <li>Checklist</li>
            </ol>
          </aside>

          <main className='space-y-8'>
            {steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Sparkles;

              return (
                <section key={step.title} className='grid gap-5 sm:grid-cols-[48px_1fr]'>
                  <div className='flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-950'>
                    <Icon className='size-5' />
                  </div>
                  <div>
                    <h2 className='text-xl font-bold text-gray-950'>
                      Step {index + 1}: {step.title}
                    </h2>
                    <p className='mt-2 text-base leading-7 text-gray-700'>{step.body}</p>
                  </div>
                </section>
              );
            })}
          </main>

          <aside className='h-fit rounded-[4px] border border-gray-200 bg-white p-6 lg:sticky lg:top-28'>
            <h2 className='text-base font-bold text-gray-950'>Get the Full Playbook</h2>
            <p className='mt-3 text-sm leading-6 text-gray-700'>
              Download the complete playbook PDF with prompts, templates, checklists, and bonus tips.
            </p>
            <Link
              href='/#newsletter'
              className='mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#0F766E] text-sm font-semibold text-white hover:bg-[#0B5F58]'
            >
              <Download className='size-4' /> Download PDF
            </Link>
            <div className='mt-6 border-t border-gray-200 pt-5'>
              <p className='text-sm font-semibold text-gray-950'>Includes:</p>
              <ul className='mt-3 space-y-2 text-sm text-gray-700'>
                {['Prompt examples', 'Templates', 'Checklists', 'Bonus tips'].map((item) => (
                  <li key={item} className='flex items-center gap-2'>
                    <Check className='size-4 text-[#0F766E]' /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
