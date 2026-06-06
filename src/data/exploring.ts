import type { ExploringGroup } from '@/types';

export const EXPLORING_GROUPS: ExploringGroup[] = [
  {
    id: 'completed',
    label: 'Completed',
    items: [
      { id: 'python-done', label: 'Python' },
      { id: 'ai-done', label: 'Artificial Intelligence' },
      { id: 'ml-done', label: 'Machine Learning' },
    ],
  },
  {
    id: 'current',
    label: 'Current Focus',
    items: [
      { id: 'software-eng', label: 'Software Engineering' },
      { id: 'react-ecosystem', label: 'React Ecosystem' },
      { id: 'info-systems', label: 'Information Systems' },
      { id: 'devops-practices', label: 'DevOps Practices' },
      { id: 'ai-applications', label: 'AI Applications' },
    ],
  },
  {
    id: 'future',
    label: 'Future Interests',
    items: [
      { id: 'data-engineering', label: 'Data Engineering' },
      { id: 'cloud-arch', label: 'Cloud Architecture' },
      { id: 'advanced-ai', label: 'Advanced AI Systems' },
    ],
  },
];
