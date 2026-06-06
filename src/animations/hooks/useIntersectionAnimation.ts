import { useEffect, useRef, type RefObject } from 'react';

interface UseIntersectionAnimationOptions {
  threshold?: number;    // default: 0.20
  once?: boolean;        // default: true
  onVisible: () => void;
}

export function useIntersectionAnimation(
  ref: RefObject<Element | null>,
  options: UseIntersectionAnimationOptions,
): void {
  const { threshold = 0.2, once = true, onVisible } = options;
  // Use a ref for onVisible to avoid stale closures
  const onVisibleRef = useRef(onVisible);
  onVisibleRef.current = onVisible;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is not supported, call immediately
    if (!('IntersectionObserver' in window)) {
      onVisibleRef.current();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onVisibleRef.current();
            if (once) {
              observer.disconnect();
            }
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);
}
