import { useRef, useEffect } from 'react';
import { buildLineDrawTimeline } from '../../animations/timelines';
import styles from './Timeline.module.scss';

interface TimelineSVGLineProps {
  fromIndex: number;
  toIndex: number;
  revealed: boolean;
}

export function TimelineSVGLine({ revealed }: TimelineSVGLineProps): JSX.Element {
  const pathRef = useRef<SVGPathElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (revealed && !animatedRef.current && pathRef.current) {
      animatedRef.current = true;
      buildLineDrawTimeline(pathRef.current).play();
    }
  }, [revealed]);

  return (
    <svg
      className={styles.connector}
      viewBox="0 0 2 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M 1 0 L 1 40"
        stroke="var(--color-border)"
        strokeWidth="2"
        fill="none"
        className={`${styles.connectorPath}${revealed ? ` ${styles.connectorRevealed}` : ''}`}
      />
    </svg>
  );
}
