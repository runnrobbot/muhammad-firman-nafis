import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';

// Mock animejs to capture timeline add calls with their offsets
vi.mock('animejs', () => {
  const mockTimeline = () => {
    const calls: Array<{ params: Record<string, unknown>; offset: unknown }> = [];
    const tl = {
      _calls: calls,
      add(params: Record<string, unknown>, offset?: unknown) {
        calls.push({ params, offset });
        return tl;
      },
    };
    return tl;
  };
  const mockAnime = Object.assign(
    (_params: unknown) => ({ pause: vi.fn() }),
    {
      timeline: mockTimeline,
      stagger: (delay: number) => delay,
      setDashoffset: 0,
    }
  ) as unknown as Record<string, unknown>;
  return { default: mockAnime };
});

import { buildCompletedItemsTimeline } from '@/animations/timelines';

/**
 * Property 8: Exploring Completed Items Sequential Stagger
 * Validates: Requirements 11.3
 *
 * For any list of N elements, item i's animation offset equals exactly `100ms * i`.
 * - First item (i=0): offset is 0
 * - Items 1..N-1 (i>0): offset is '+=100' (100ms after previous completes)
 */
describe('Property 8: Exploring Completed Items Sequential Stagger', () => {
  it('each item starts 100ms after the previous one, for any N items', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }),
        (n: number) => {
          const itemEls = Array.from({ length: n }, () => document.createElement('div') as HTMLElement);
          const tl = buildCompletedItemsTimeline(itemEls);
          const calls = (tl as unknown as { _calls: Array<{ params: unknown; offset: unknown }> })._calls;

          expect(calls.length).toBe(n);

          // First item: offset 0
          expect(calls[0].offset).toBe(0);

          // Items 1..n-1: offset '+=100'
          for (let i = 1; i < n; i++) {
            expect(calls[i].offset).toBe('+=100');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
