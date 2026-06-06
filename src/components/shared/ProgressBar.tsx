import { useEffect, useRef } from 'react';
import styles from './ProgressBar.module.scss';

export function ProgressBar(): JSX.Element {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let rafId = 0;
    let lastProgress = -1;

    function update() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, scrollY / docHeight) : 0;
      if (Math.abs(progress - lastProgress) > 0.001) {
        bar!.style.transform = `scaleX(${progress})`;
        lastProgress = progress;
      }
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={styles.track} aria-hidden="true" role="presentation">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
