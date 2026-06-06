import { type RefObject, useEffect } from 'react';
import anime from 'animejs';
import { computeMagneticOffset } from '../magnetic';
import { useReducedMotion } from './useReducedMotion';

/**
 * Attaches magnetic hover behavior to a button element.
 * On mousemove: pulls the button toward the cursor using computeMagneticOffset.
 * On mouseleave: resets transform smoothly.
 * No-op when reduced motion is active.
 * Requirements: 3.8, 3.9, 13.6
 */
export function useMagneticButton(
  ref: RefObject<HTMLElement | null>,
  maxDisplacement: number = 10,
): void {
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const { x, y } = computeMagneticOffset(e.clientX, e.clientY, rect, maxDisplacement);
      anime({
        targets: el,
        translateX: x,
        translateY: y,
        duration: 100,
        easing: 'easeOutExpo',
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 300,
        easing: 'easeOutElastic(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      // Reset transform on unmount
      anime({ targets: el, translateX: 0, translateY: 0, duration: 0 });
    };
  }, [ref, reduced, maxDisplacement]);
}
