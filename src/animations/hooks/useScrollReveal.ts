import { useEffect, useRef, type RefObject } from 'react';

export interface RevealItem {
  el: HTMLElement | null;
  start: number;
  end: number;
  fromY?: number;
}

interface UseScrollRevealOptions {
  outerRef: RefObject<HTMLElement | null>;
  items: RevealItem[];
  scrollMultiplier?: number;
  disabled?: boolean;
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function mapProgress(raw: number, start: number, end: number): number {
  return easeOutCubic(clamp01((raw - start) / (end - start)));
}

export function useScrollReveal({
  outerRef,
  items,
  scrollMultiplier = 1.5,
  disabled = false,
}: UseScrollRevealOptions): void {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || disabled) return;

    // Cache section top + budget — only recalculate on resize, not every frame.
    // getBoundingClientRect() causes layout reflow — calling it every rAF frame
    // is expensive and causes jank, especially on mobile.
    let sectionTop = 0;
    let budget = 0;

    const measure = () => {
      const vh = window.innerHeight;
      budget = vh * scrollMultiplier;
      outer.style.minHeight = `${vh + budget}px`;
      // Recalculate top after height change settles
      requestAnimationFrame(() => {
        sectionTop = outer.getBoundingClientRect().top + window.scrollY;
      });
    };

    measure();

    // Set initial invisible state
    items.forEach(({ el, fromY = 14 }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = `translateY(${fromY}px)`;
      el.style.willChange = 'opacity, transform';
    });

    let lastScroll = -1;

    function update() {
      const scrollY = window.scrollY;
      if (scrollY === lastScroll || budget === 0) return;
      lastScroll = scrollY;

      const rawProgress = clamp01((scrollY - sectionTop) / budget);

      items.forEach(({ el, start, end, fromY = 14 }) => {
        if (!el) return;
        const p = mapProgress(rawProgress, start, end);
        el.style.opacity = String(p);
        el.style.transform = `translateY(${fromY * (1 - p)}px)`;
      });
    }

    function loop() {
      update();
      rafRef.current = requestAnimationFrame(loop);
    }

    update();
    rafRef.current = requestAnimationFrame(loop);

    // On resize: re-measure height and position
    const handleResize = () => {
      measure();
      lastScroll = -1; // force redraw on next frame
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, scrollMultiplier]);
}
