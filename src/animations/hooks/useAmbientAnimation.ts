import { useEffect, type RefObject } from 'react';
import anime from 'animejs';
import { useReducedMotion } from './useReducedMotion';

export interface UseAmbientAnimationOptions {
  targets: string | HTMLElement[];  // CSS selector or element array
  cycleDurationMs: number;           // Must be in [3000, 6000]
  maxDisplacementPx: number;         // Must be ≤ 8
  maxOpacityDelta: number;           // Must be ≤ 0.2
}

/**
 * Animates elements within a container with a continuous looping ambient motion
 * (subtle translateX/Y drift and opacity variation). Automatically clamps all
 * option values to their valid ranges and is a no-op when reduced motion is active.
 *
 * Requirements: 7.3
 */
export function useAmbientAnimation(
  containerRef: RefObject<Element | null>,
  options: UseAmbientAnimationOptions,
): void {
  const reduced = useReducedMotion();

  const { targets, cycleDurationMs, maxDisplacementPx, maxOpacityDelta } = options;

  useEffect(() => {
    if (reduced) return;
    if (!containerRef.current) return;

    // Validate / clamp options to valid ranges
    const safeDuration = Math.max(3000, Math.min(6000, cycleDurationMs));
    const safeDisplacement = Math.min(8, Math.abs(maxDisplacementPx));
    const safeOpacityDelta = Math.min(0.2, Math.abs(maxOpacityDelta));

    // Resolve targets within the container
    const container = containerRef.current;
    const targetEls: HTMLElement[] =
      typeof targets === 'string'
        ? Array.from(container.querySelectorAll<HTMLElement>(targets))
        : targets;

    if (targetEls.length === 0) return;

    // Helper: integer random in [min, max]
    const randInt = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // Helper: float random in [min, max]
    const randFloat = (min: number, max: number): number =>
      Math.random() * (max - min) + min;

    const instance = anime({
      targets: targetEls,
      translateX: () => randInt(-safeDisplacement, safeDisplacement),
      translateY: () => randInt(-safeDisplacement, safeDisplacement),
      opacity: () => {
        const delta = randFloat(0, safeOpacityDelta);
        // Animate from (1 - delta) back up to 1
        return [1 - delta, 1];
      },
      duration: () => randInt(Math.round(safeDuration * 0.8), Math.round(safeDuration * 1.2)),
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate',
      delay: (_el: Element, i: number) => i * 300,
    });

    return () => {
      instance.pause();
    };
  }, [reduced, containerRef, targets, cycleDurationMs, maxDisplacementPx, maxOpacityDelta]);
}
