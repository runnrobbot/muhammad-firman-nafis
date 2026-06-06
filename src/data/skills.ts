import type { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    skills: [
      { id: 'python', label: 'Python', categoryId: 'programming' },
      { id: 'javascript', label: 'JavaScript', categoryId: 'programming' },
      { id: 'java', label: 'Java', categoryId: 'programming' },
      { id: 'csharp', label: 'C#', categoryId: 'programming' },
      { id: 'cpp', label: 'C++', categoryId: 'programming' },
      { id: 'lua', label: 'Lua', categoryId: 'programming' },
      { id: 'react', label: 'React', categoryId: 'programming' },
      { id: 'flutter', label: 'Flutter', categoryId: 'programming' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    skills: [
      { id: 'mysql', label: 'MySQL', categoryId: 'database' },
      { id: 'firebase', label: 'Firebase', categoryId: 'database' },
      { id: 'supabase', label: 'Supabase', categoryId: 'database' },
      { id: 'mongodb', label: 'MongoDB', categoryId: 'database' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    skills: [
      { id: 'excel', label: 'Excel', categoryId: 'data' },
      { id: 'tableau', label: 'Tableau', categoryId: 'data' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    skills: [
      { id: 'aws', label: 'AWS', categoryId: 'cloud' },
      { id: 'gcp', label: 'Google Cloud', categoryId: 'cloud' },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    skills: [
      { id: 'github', label: 'GitHub', categoryId: 'other' },
      { id: 'infosec', label: 'Information Security', categoryId: 'other' },
      { id: 'sysanalysis', label: 'System Analysis', categoryId: 'other' },
      { id: 'projmgmt', label: 'Project Management', categoryId: 'other' },
    ],
  },
];
