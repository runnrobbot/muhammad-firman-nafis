import type { Milestone } from '@/types';

export const MILESTONES: Milestone[] = [
  {
    id: 'akri',
    organization: 'AKRI',
    role: 'Server Security & Server Management',
    period: 'Aug 2019 – Jan 2022',
    startDate: new Date('2019-08-01'),
    isCurrent: false,
  },
  {
    id: 'bps',
    organization: 'Badan Pusat Statistik',
    role: 'Field Data Enumerator',
    period: 'Sep 2022 – Nov 2022',
    startDate: new Date('2022-09-01'),
    isCurrent: false,
  },
  {
    id: 'kalananti',
    organization: 'Kalananti by Ruangguru',
    role: 'Text-Coding Teacher',
    period: 'Nov 2022 – Oct 2023',
    startDate: new Date('2022-11-01'),
    isCurrent: false,
  },
  {
    id: 'nexsoft',
    organization: 'PT Paramadaksa Teknologi Nusantara (nexSOFT)',
    role: 'Data Specialist',
    period: 'Jun 2024 – May 2025',
    startDate: new Date('2024-06-01'),
    isCurrent: false,
  },
  {
    id: 'uph',
    organization: 'Universitas Pelita Harapan',
    role: 'Information Systems Student',
    period: 'Aug 2024 – Present',
    startDate: new Date('2024-08-01'),
    isCurrent: false,
  },
  {
    id: 'add8',
    organization: 'PT Aneka Delapan Dekorasi Indonesia',
    role: 'DevOps & AI Engineer',
    period: 'Apr 2026 – Present',
    startDate: new Date('2026-04-01'),
    isCurrent: true,
  },
];
