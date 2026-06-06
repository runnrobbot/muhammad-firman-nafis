import type { LucideIcon } from 'lucide-react';

export interface Milestone {
  id: string;
  organization: string;
  role: string;
  period: string;
  startDate: Date;
  isCurrent: boolean;
}

export interface Skill {
  id: string;
  label: string;
  categoryId: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  repoUrl: string;
  problem: string;
  approach: string;
  tradeoffs: string;
  technologies: string[];
}

export interface Certification {
  id: string;
  title: string;
  platform: string;
  category: 'programming' | 'ai-ml' | 'professional-development';
  outcomes: string;
  aiRelevanceLabel?: string;
  fileUrl?: string;
}

export interface CertificationCategory {
  id: 'programming' | 'ai-ml' | 'professional-development';
  label: string;
  description: string;
}

export interface ExploringGroup {
  id: 'completed' | 'current' | 'future';
  label: string;
  items: ExploringItem[];
}

export interface ExploringItem {
  id: string;
  label: string;
}

export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  /** Lucide icon component OR path to SVG asset */
  icon: LucideIcon | string;
}

