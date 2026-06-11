import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Laptop,
  Mail,
  Monitor,
  Sparkles,
  Star,
  UserRound,
  Workflow,
} from 'lucide-react';

export type GuideCategory = 'career' | 'automation' | 'learning' | 'tools';

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  categoryLabel: string;
  date: string;
  readTime: string;
  author: string;
  icon: 'user' | 'workflow' | 'code' | 'briefcase' | 'book' | 'star';
  content: string;
};

export type Playbook = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export const categoryMeta: Record<
  GuideCategory,
  {
    title: string;
    description: string;
    icon: 'briefcase' | 'monitor' | 'book' | 'star';
  }
> = {
  career: {
    title: 'Career',
    description: 'AI guides to help you with job search, resume, interviews, LinkedIn, and career growth.',
    icon: 'briefcase',
  },
  automation: {
    title: 'Automation',
    description: 'AI workflows and automations for daily professional work.',
    icon: 'monitor',
  },
  learning: {
    title: 'Learning',
    description: 'Learn new skills faster with AI tools and practical practice plans.',
    icon: 'book',
  },
  tools: {
    title: 'Tools',
    description: 'Curated AI tools and resources for focused professional outcomes.',
    icon: 'star',
  },
};

export const iconMap = {
  book: BookOpen,
  briefcase: BriefcaseBusiness,
  code: Code2,
  laptop: Laptop,
  mail: Mail,
  monitor: Monitor,
  sparkles: Sparkles,
  star: Star,
  user: UserRound,
  workflow: Workflow,
};

const guidesDir = path.join(process.cwd(), 'content', 'guides');
const playbooksDir = path.join(process.cwd(), 'content', 'playbooks');

function readGuideFile(slug: string): Guide | null {
  const filePath = path.join(guidesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  return { slug, ...(data as Omit<Guide, 'slug' | 'content'>), content };
}

function readPlaybookFile(slug: string): Playbook | null {
  const filePath = path.join(playbooksDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  return { slug, ...(data as Omit<Playbook, 'slug' | 'content'>), content };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(guidesDir)) return [];
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readGuideFile(f.replace(/\.md$/, '')))
    .filter((g): g is Guide => g !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGuide(slug: string): Guide | null {
  return readGuideFile(slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return getAllGuides().filter((g) => g.category === category);
}

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  const current = getGuide(slug);
  const all = getAllGuides().filter((g) => g.slug !== slug);
  if (!current) return all.slice(0, limit);
  return all
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}

export function getAllPlaybooks(): Playbook[] {
  if (!fs.existsSync(playbooksDir)) return [];
  return fs
    .readdirSync(playbooksDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readPlaybookFile(f.replace(/\.md$/, '')))
    .filter((p): p is Playbook => p !== null);
}

export function getPlaybook(slug: string): Playbook | null {
  return readPlaybookFile(slug);
}

// Parse markdown content (split by ## headings) into structured sections.
// H2 = section title, paragraphs = body, first blockquote (> ...) = callout.
export function parseMarkdownSections(content: string): { title: string; body: string; callout?: string }[] {
  const sections: { title: string; body: string; callout?: string }[] = [];
  let current: { title: string; body: string; callout?: string } | null = null;

  content.split('\n').forEach((line) => {
    if (line.startsWith('## ')) {
      if (current) sections.push(current);
      current = { title: line.slice(3).trim(), body: '' };
    } else if (current) {
      if (line.startsWith('> ') && !current.callout) {
        current.callout = line.slice(2).trim();
      } else if (line.trim() && !line.startsWith('>')) {
        current.body = current.body ? `${current.body}\n${line.trim()}` : line.trim();
      }
    }
  });

  if (current) sections.push(current);
  return sections;
}

// keep guides as a convenience export for pages that just need the list
export const guides = getAllGuides();
export const playbooks = getAllPlaybooks();
