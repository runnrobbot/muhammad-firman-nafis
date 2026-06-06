import { useEffect } from 'react';

/**
 * On first mount, fades the page in from opacity 0.
 * Uses a CSS class on <body> that is added immediately (in main.tsx preload)
 * and removed after the component mounts.
 */
export function usePageFadeIn(): void {
  useEffect(() => {
    // Small delay so the first paint has already happened
    const t = setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 500ms ease';
    }, 50);
    return () => clearTimeout(t);
  }, []);
}
