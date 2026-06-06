import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import fc from 'fast-check';
import { useRef } from 'react';
import { useIntersectionAnimation } from '@/animations/hooks/useIntersectionAnimation';

/**
 * Property 3: Intersection Animation Fires Exactly Once
 * Validates: Requirements 4.5, 5.3, 13.5
 *
 * Simulate repeated intersection callbacks; assert `onVisible` called exactly
 * once per mount when `once: true`.
 */

// Shared state that tracks the active mock observer instance
interface MockObserverState {
  callback: IntersectionObserverCallback | null;
  target: Element | null;
  disconnected: boolean;
}

let observerState: MockObserverState = {
  callback: null,
  target: null,
  disconnected: false,
};

/** Fire the mocked IntersectionObserver callback — no-ops if already disconnected. */
function simulateIntersection(intersecting: boolean) {
  if (observerState.callback && observerState.target && !observerState.disconnected) {
    observerState.callback(
      [{ isIntersecting: intersecting, target: observerState.target } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  }
}

/** Build a fresh constructor mock for each test/iteration. */
function buildMockConstructor() {
  return vi.fn().mockImplementation(function (
    this: Record<string, unknown>,
    callback: IntersectionObserverCallback
  ) {
    observerState.callback = callback;
    observerState.disconnected = false;

    this.observe = vi.fn((el: Element) => {
      observerState.target = el;
    });
    this.disconnect = vi.fn(() => {
      observerState.disconnected = true;
    });
    this.unobserve = vi.fn();
  });
}

let MockIntersectionObserver: ReturnType<typeof buildMockConstructor>;

beforeEach(() => {
  observerState = { callback: null, target: null, disconnected: false };
  MockIntersectionObserver = buildMockConstructor();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Property 3: Intersection Animation Fires Exactly Once', () => {
  it('onVisible is called exactly once even if intersection fires multiple times with once=true', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (numFires: number) => {
          // Reset shared mock state for each property iteration
          observerState = { callback: null, target: null, disconnected: false };
          MockIntersectionObserver.mockClear();

          const onVisible = vi.fn();
          const div = document.createElement('div');
          document.body.appendChild(div);

          const { unmount } = renderHook(() => {
            const ref = useRef<HTMLDivElement>(div);
            useIntersectionAnimation(ref, { onVisible, once: true });
          });

          // Fire the intersection callback numFires times.
          // After the first intersecting event the hook calls disconnect() which
          // sets observerState.disconnected = true; subsequent simulateIntersection
          // calls are ignored, correctly modelling the real browser behaviour.
          act(() => {
            for (let i = 0; i < numFires; i++) {
              simulateIntersection(true);
            }
          });

          const callCount = onVisible.mock.calls.length;

          unmount();
          document.body.removeChild(div);

          // onVisible must be called exactly once regardless of numFires
          return callCount === 1;
        }
      ),
      { numRuns: 50 }
    );
  });

  it('onVisible is called immediately when IntersectionObserver is not available', () => {
    // Remove the key entirely so `'IntersectionObserver' in window` returns false.
    vi.unstubAllGlobals();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).IntersectionObserver;

    const onVisible = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useIntersectionAnimation(ref, { onVisible, once: true });
    });

    // Hook must fall back and call onVisible synchronously on mount
    expect(onVisible).toHaveBeenCalledTimes(1);

    unmount();
    document.body.removeChild(div);
  });
});
