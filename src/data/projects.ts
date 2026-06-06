import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'social-dashboard',
    title: 'Social Dashboard',
    repoUrl: 'https://github.com/runnrobbot/social-dashboard',
    problem:
      'Managing analytics across TikTok, YouTube, and Instagram required switching between multiple platforms, making it difficult to get a unified view.',
    approach:
      'Built a Next.js + TypeScript dashboard integrating TikTok, YouTube, and Instagram APIs into a single unified analytics interface.',
    tradeoffs:
      'API rate limits required caching strategies; multi-platform OAuth flows added complexity but improved user experience.',
    technologies: ['Next.js', 'TypeScript', 'TikTok API', 'YouTube API', 'Instagram API'],
  },
  {
    id: 'instagram-scraping',
    title: 'Instagram Scraping',
    repoUrl: 'https://github.com/runnrobbot/instagram-scraping',
    problem:
      'Manual Instagram data collection was slow, inconsistent, and lacked structured output for downstream processing.',
    approach:
      'Used Python and Selenium to automate data collection with checkpoint logic, structured JSON output, and configurable account handling.',
    tradeoffs:
      'Selenium adds setup overhead and fragility against UI changes; checkpointing mitigates data loss on interruption.',
    technologies: ['Python', 'Selenium', 'JSON'],
  },
  {
    id: 'automation',
    title: 'Automation Bot',
    repoUrl: 'https://github.com/runnrobbot/automation',
    problem:
      'Repetitive browser-based tasks consumed significant manual time without a scalable automated solution.',
    approach:
      'Implemented a JavaScript bot automation system to handle repetitive browser tasks reliably and efficiently.',
    tradeoffs:
      'Automation bots require maintenance when target interfaces change; clear task definitions reduce brittleness.',
    technologies: ['JavaScript', 'Node.js'],
  },
  {
    id: 'evoucher',
    title: 'E-Voucher Platform (glory8 / UR8AN)',
    repoUrl: 'https://github.com/runnrobbot/glory8-evoucher',
    problem:
      'Businesses needed a digital voucher system for distributing and redeeming promotions without a physical paper process.',
    approach:
      'Built a React + Vite + Firebase e-voucher platform supporting voucher creation, distribution, and real-time redemption tracking.',
    tradeoffs:
      'Firebase real-time sync simplifies infrastructure but adds vendor dependency; suitable for the current scale.',
    technologies: ['React', 'Vite', 'TypeScript', 'Firebase'],
  },
];
