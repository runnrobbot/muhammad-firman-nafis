import type { Certification, CertificationCategory } from '@/types';

export const CERTIFICATION_CATEGORIES: CertificationCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    description: 'Foundational and applied programming skills',
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    description: 'Artificial intelligence and ML engineering',
  },
  {
    id: 'professional-development',
    label: 'Professional Development',
    description: 'Soft skills and career growth frameworks',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'python',
    title: 'Memulai Pemrograman dengan Python',
    platform: 'Dicoding',
    category: 'programming',
    outcomes:
      'Foundation of Python programming covering variables, data structures, control flow, and functions for practical application development.',
    aiRelevanceLabel:
      'Foundational to current AI engineering work — Python is the primary language for AI/ML workflows.',
    fileUrl: '/certificates/sertifikat_python.pdf',
  },
  {
    id: 'dasar-ai',
    title: 'Belajar Dasar AI',
    platform: 'Dicoding',
    category: 'ai-ml',
    outcomes:
      'Introduction to AI concepts, types of machine learning, and foundational AI application principles for real-world use.',
    aiRelevanceLabel:
      'Directly relevant to current AI engineering role — covers core concepts applied daily in AI development work.',
    fileUrl: '/certificates/sertifikat_dasar_ai.pdf',
  },
  {
    id: 'ml-pemula',
    title: 'Belajar Machine Learning untuk Pemula',
    platform: 'Dicoding',
    category: 'ai-ml',
    outcomes:
      'Supervised and unsupervised learning algorithms, data preprocessing, and model evaluation fundamentals for building ML solutions.',
    fileUrl: '/certificates/sertifikat_machine_learning.pdf',
  },
  {
    id: 'pengembangan-diri',
    title: 'Belajar Strategi Pengembangan Diri',
    platform: 'Dicoding',
    category: 'professional-development',
    outcomes:
      'Self-development frameworks, learning strategies, and professional growth mindset for sustained career advancement.',
    fileUrl: '/certificates/sertifikat_pengembangan_diri.pdf',
  },
];
