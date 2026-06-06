export interface WritingPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tag: string;
}

export const WRITING_POSTS: WritingPost[] = [
  {
    id: 'devops-ai-intersection',
    title: 'Where DevOps meets AI: lessons from the field',
    date: '2026-05-10',
    readTime: '4 min',
    excerpt:
      'Integrating AI pipelines into production infrastructure looks different from the tutorials. Here is what actually broke and how I fixed it.',
    tag: 'DevOps',
  },
  {
    id: 'automation-patterns',
    title: 'Three automation patterns I keep coming back to',
    date: '2026-04-22',
    readTime: '3 min',
    excerpt:
      'After building automation bots and pipelines across different stacks, certain patterns show up again and again — and they work for a reason.',
    tag: 'Engineering',
  },
  {
    id: 'learning-while-working',
    title: 'How I study while working full-time',
    date: '2026-04-05',
    readTime: '3 min',
    excerpt:
      'Balancing a full-time engineering job with a university degree forced me to find a system. This is that system.',
    tag: 'Growth',
  },
];
