/**
 * Property 11: Animation Properties Never Affect Layout
 * Validates: Requirements 13.7, 17.4
 *
 * Verify that all timeline builder outputs never include `width`, `height`,
 * `top`, `left`, or any margin/padding key in the animation parameters passed
 * to `tl.add(...)` or directly to `anime(...)`.
 */
import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';

// Capture direct anime() calls (used by buildLineDrawTimeline).
const directAnimeCalls: Record<string, unknown>[] = [];

// Mock animejs before importing timelines.
// Each call to `anime.timeline()` creates its own local `_adds` array so that
// multiple builder calls within the same test file don't share state.
vi.mock('animejs', () => {
  const mockTimeline = () => {
    const adds: Record<string, unknown>[] = [];
    const tl = {
      _adds: adds,
      add(params: Record<string, unknown>, _offset?: unknown) {
        adds.push(params);
        return tl;
      },
    };
    return tl;
  };

  const mockAnime = Object.assign(
    (params: Record<string, unknown>) => {
      directAnimeCalls.push(params);
      return { pause: vi.fn() };
    },
    {
      timeline: mockTimeline,
      stagger: (delay: number) => delay,
      setDashoffset: 0,
    },
  );

  return { default: mockAnime };
});

import {
  buildHeroTimeline,
  buildLineDrawTimeline,
  buildCompletedItemsTimeline,
  buildRolePillarsTimeline,
} from '@/animations/timelines';

// All CSS properties that affect document layout — none of these should appear
// in any anime.js parameter object emitted by a timeline builder.
const LAYOUT_PROPERTIES = [
  'width',
  'height',
  'top',
  'left',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
] as const;

function assertNoLayoutProps(adds: Record<string, unknown>[]): void {
  for (const add of adds) {
    for (const key of LAYOUT_PROPERTIES) {
      expect(
        add,
        `animation call must not contain layout property "${key}"`,
      ).not.toHaveProperty(key);
    }
  }
}

describe('Property 11: Animation Properties Never Affect Layout', () => {
  it('buildHeroTimeline uses no layout properties', () => {
    const mkEl = () => document.createElement('span') as HTMLElement;

    const wordEls = [mkEl(), mkEl(), mkEl()];
    const supportingEl = mkEl();
    const ctaEls = [mkEl(), mkEl()];

    const tl = buildHeroTimeline({ wordEls, supportingEl, ctaEls });
    const adds = (tl as unknown as { _adds: Record<string, unknown>[] })._adds ?? [];

    // Sanity: the builder must have registered at least one animation call
    expect(adds.length).toBeGreaterThan(0);

    assertNoLayoutProps(adds);
  });

  it('buildLineDrawTimeline uses no layout properties', () => {
    const before = directAnimeCalls.length;

    const pathEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
    ) as SVGPathElement;

    buildLineDrawTimeline(pathEl);

    const newCalls = directAnimeCalls.slice(before);
    // The builder must have called anime() at least once
    expect(newCalls.length).toBeGreaterThan(0);

    assertNoLayoutProps(newCalls);
  });

  it('buildCompletedItemsTimeline uses no layout properties — property test', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constant(null), { minLength: 1, maxLength: 10 }),
        (slots) => {
          const itemEls = slots.map(() => document.createElement('span') as HTMLElement);
          const tl = buildCompletedItemsTimeline(itemEls);
          const adds =
            (tl as unknown as { _adds: Record<string, unknown>[] })._adds ?? [];

          expect(adds.length).toBeGreaterThan(0);
          assertNoLayoutProps(adds);
        },
      ),
      { numRuns: 20 },
    );
  });

  it('buildRolePillarsTimeline uses no layout properties', () => {
    const mkEl = () => document.createElement('div') as HTMLElement;

    const tl = buildRolePillarsTimeline({ devopsEl: mkEl(), aiEl: mkEl() });
    const adds = (tl as unknown as { _adds: Record<string, unknown>[] })._adds ?? [];

    expect(adds.length).toBeGreaterThan(0);
    assertNoLayoutProps(adds);
  });
});
