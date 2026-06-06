/**
 * Property-Based Tests: Data Integrity
 *
 * Property 6: Project Card Word Count Constraint
 *   For all projects, `problem`, `approach`, `tradeoffs` ≤ 30 words.
 *   Validates: Requirements 8.2
 *
 * Property 7: Certification Description Word Count Constraint
 *   For all certs, `outcomes` ≤ 30 words.
 *   Validates: Requirements 10.2
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { PROJECTS } from '@/data/projects';
import { CERTIFICATIONS } from '@/data/certifications';

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Property 6: Project Card Word Count Constraint ───────────────────────────
// Validates: Requirements 8.2

describe('Property 6: Project Card Word Count Constraint', () => {
  it('all project text fields are within 30 words', () => {
    // Exhaustive check over the actual data
    for (const project of PROJECTS) {
      expect(
        wordCount(project.problem),
        `project "${project.id}" problem exceeds 30 words`,
      ).toBeLessThanOrEqual(30);
      expect(
        wordCount(project.approach),
        `project "${project.id}" approach exceeds 30 words`,
      ).toBeLessThanOrEqual(30);
      expect(
        wordCount(project.tradeoffs),
        `project "${project.id}" tradeoffs exceeds 30 words`,
      ).toBeLessThanOrEqual(30);
    }
  });

  it('property: any project sampled from PROJECTS has all fields within 30 words', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...PROJECTS),
        (project) => {
          expect(wordCount(project.problem)).toBeLessThanOrEqual(30);
          expect(wordCount(project.approach)).toBeLessThanOrEqual(30);
          expect(wordCount(project.tradeoffs)).toBeLessThanOrEqual(30);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ─── Property 7: Certification Description Word Count Constraint ──────────────
// Validates: Requirements 10.2

describe('Property 7: Certification Description Word Count Constraint', () => {
  it('all certification outcomes are within 30 words', () => {
    for (const cert of CERTIFICATIONS) {
      expect(
        wordCount(cert.outcomes),
        `cert "${cert.id}" outcomes exceeds 30 words`,
      ).toBeLessThanOrEqual(30);
    }
  });

  it('property: any cert sampled from CERTIFICATIONS has outcomes within 30 words', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...CERTIFICATIONS),
        (cert) => {
          expect(wordCount(cert.outcomes)).toBeLessThanOrEqual(30);
        },
      ),
      { numRuns: 100 },
    );
  });
});
