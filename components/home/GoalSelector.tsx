'use client';

import { useRouter } from 'next/navigation';

const GOALS = [
  {
    label: 'Get a Job',
    icon: '💼',
    href: '/usecase/ai-job-search',
    description: 'Resume · Interviews · Remote Jobs',
  },
  {
    label: 'Make Money',
    icon: '💰',
    href: '/usecase/ai-side-hustle',
    description: 'Freelancing · Consulting · Side Hustles',
  },
  {
    label: 'Learn AI',
    icon: '📚',
    href: '/usecase/ai-productivity',
    description: 'Prompting · LLMs · Practice',
  },
  {
    label: 'Automate Work',
    icon: '⚡',
    href: '/explore',
    description: 'AI Agents · Workflows · Tools',
  },
];

export default function GoalSelector() {
  const router = useRouter();

  return (
    <div className='w-full'>
      <p className='mb-3 text-sm font-medium text-gray-500'>What do you want to achieve?</p>
      <div className='grid grid-cols-2 gap-3'>
        {GOALS.map((goal) => (
          <button
            key={goal.label}
            type='button'
            onClick={() => router.push(goal.href)}
            className='flex flex-col items-start gap-1.5 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0F766E] hover:shadow-md'
          >
            <span className='text-2xl'>{goal.icon}</span>
            <span className='text-sm font-semibold text-gray-900'>{goal.label}</span>
            <span className='text-xs text-gray-400'>{goal.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
