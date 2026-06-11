export type ToolCategory = 'career' | 'learning' | 'automation' | 'productivity';

export type Tool = {
  name: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  url: string;
  domain: string;
  icon: string;
};

export const toolCategoryMeta: Record<ToolCategory, { label: string }> = {
  career: { label: 'Career' },
  learning: { label: 'Learning' },
  automation: { label: 'Automation' },
  productivity: { label: 'Productivity' },
};

export const tools: Tool[] = [
  {
    name: 'Teal',
    description: 'AI-powered job search assistant to organize applications and track progress.',
    category: 'career',
    categoryLabel: 'Career',
    url: 'https://www.tealhq.com/',
    domain: 'tealhq.com',
    icon: '/images/tools/teal.svg',
  },
  {
    name: 'Jobscan',
    description: 'Optimize your resume to match job descriptions and pass ATS filters.',
    category: 'career',
    categoryLabel: 'Career',
    url: 'https://www.jobscan.co/',
    domain: 'jobscan.co',
    icon: '/images/tools/jobscan.svg',
  },
  {
    name: 'Resume.io',
    description: 'Professional resume builder with AI suggestions and polished templates.',
    category: 'career',
    categoryLabel: 'Career',
    url: 'https://resume.io/',
    domain: 'resume.io',
    icon: '/images/tools/resume-io.svg',
  },
  {
    name: 'LinkedIn Premium',
    description: 'Advanced tools to grow your career, find jobs, and expand your network.',
    category: 'career',
    categoryLabel: 'Career',
    url: 'https://premium.linkedin.com/',
    domain: 'linkedin.com',
    icon: '/images/tools/linkedin.svg',
  },
  {
    name: 'Interview Warmup',
    description: 'Google tool to practice interview answers and improve your responses with AI feedback.',
    category: 'career',
    categoryLabel: 'Career',
    url: 'https://grow.google/certificates/interview-warmup/',
    domain: 'grow.google',
    icon: '/images/tools/interview-warmup.svg',
  },
  {
    name: 'ChatGPT',
    description: 'Versatile AI assistant for writing, research, brainstorming, and learning anything faster.',
    category: 'learning',
    categoryLabel: 'Learning',
    url: 'https://chat.openai.com/',
    domain: 'openai.com',
    icon: '/images/tools/chatgpt.svg',
  },
  {
    name: 'Perplexity',
    description: 'AI-powered search engine that gives direct answers with cited sources.',
    category: 'learning',
    categoryLabel: 'Learning',
    url: 'https://www.perplexity.ai/',
    domain: 'perplexity.ai',
    icon: '/images/tools/perplexity.svg',
  },
  {
    name: 'NotebookLM',
    description: 'Google tool that turns your documents into interactive AI-powered study notes.',
    category: 'learning',
    categoryLabel: 'Learning',
    url: 'https://notebooklm.google.com/',
    domain: 'notebooklm.google.com',
    icon: '/images/tools/notebooklm.svg',
  },
  {
    name: 'Khanmigo',
    description: 'AI tutor from Khan Academy that explains concepts and guides you step by step.',
    category: 'learning',
    categoryLabel: 'Learning',
    url: 'https://www.khanacademy.org/khan-labs',
    domain: 'khanacademy.org',
    icon: '/images/tools/khanmigo.svg',
  },
  {
    name: 'Zapier',
    description: 'Automate repetitive tasks by connecting your apps with no-code AI workflows.',
    category: 'automation',
    categoryLabel: 'Automation',
    url: 'https://zapier.com/',
    domain: 'zapier.com',
    icon: '/images/tools/zapier.svg',
  },
  {
    name: 'Make',
    description: 'Visual automation platform to build complex multi-step AI workflows.',
    category: 'automation',
    categoryLabel: 'Automation',
    url: 'https://www.make.com/',
    domain: 'make.com',
    icon: '/images/tools/make.svg',
  },
  {
    name: 'n8n',
    description: 'Open-source workflow automation tool with powerful AI integrations.',
    category: 'automation',
    categoryLabel: 'Automation',
    url: 'https://n8n.io/',
    domain: 'n8n.io',
    icon: '/images/tools/n8n.svg',
  },
  {
    name: 'Notion AI',
    description: 'AI writing and summarization built into your notes, docs, and project management.',
    category: 'productivity',
    categoryLabel: 'Productivity',
    url: 'https://www.notion.so/product/ai',
    domain: 'notion.so',
    icon: '/images/tools/notion.svg',
  },
  {
    name: 'Otter.ai',
    description: 'AI meeting assistant that transcribes, summarizes, and captures action items.',
    category: 'productivity',
    categoryLabel: 'Productivity',
    url: 'https://otter.ai/',
    domain: 'otter.ai',
    icon: '/images/tools/otter.svg',
  },
  {
    name: 'Grammarly',
    description: 'AI writing assistant for clear, professional, and error-free communication.',
    category: 'productivity',
    categoryLabel: 'Productivity',
    url: 'https://www.grammarly.com/',
    domain: 'grammarly.com',
    icon: '/images/tools/grammarly.svg',
  },
  {
    name: 'Reclaim.ai',
    description: 'Smart calendar assistant that automatically schedules tasks and protects focus time.',
    category: 'productivity',
    categoryLabel: 'Productivity',
    url: 'https://reclaim.ai/',
    domain: 'reclaim.ai',
    icon: '/images/tools/reclaim.svg',
  },
];
