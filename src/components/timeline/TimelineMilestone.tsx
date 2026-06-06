import { useRef } from 'react';
import type { Milestone } from '../../types';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import styles from './Timeline.module.scss';
import anime from 'animejs';

interface TimelineMilestoneProps {
  milestone: Milestone;
  index: number;
  isCurrent: boolean;
  onVisible: (index: number) => void;
}

export function TimelineMilestone({
  milestone,
  index,
  isCurrent,
  onVisible,
}: TimelineMilestoneProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useIntersectionAnimation(ref, {
    threshold: 0.2,
    once: true,
    onVisible: () => {
      onVisible(index);

      if (reduced) return;

      // Slide the milestone card in from left with a small bounce
      if (ref.current) {
        anime({
          targets: ref.current,
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 550,
          delay: index * 60,
          easing: 'easeOutExpo',
        });
      }

      // Dot entrance: scale up from 0
      if (dotRef.current) {
        anime({
          targets: dotRef.current,
          scale: [0, 1.25, 1],
          opacity: [0, 1],
          duration: 600,
          delay: index * 60 + 200,
          easing: 'easeOutElastic(1, 0.5)',
        });

        // For current milestone: add a persistent pulse ring
        if (isCurrent) {
          anime({
            targets: dotRef.current,
            boxShadow: [
              '0 0 0 0px rgba(15,155,142,0.6)',
              '0 0 0 10px rgba(15,155,142,0)',
            ],
            duration: 1800,
            loop: true,
            easing: 'easeOutExpo',
            delay: index * 60 + 800,
          });
        }
      }
    },
  });

  return (
    <div
      ref={ref}
      className={`${styles.milestone}${isCurrent ? ` ${styles.milestoneCurrent}` : ''}`}
      aria-current={isCurrent ? 'true' : undefined}
      style={{ opacity: reduced ? 1 : 0 }}
    >
      <div className={styles.milestoneOrg}>
        {milestone.organization}
        {isCurrent && <span className={styles.currentBadge}>Current</span>}
      </div>
      <div className={styles.milestoneRole}>{milestone.role}</div>
      <time
        className={styles.milestonePeriod}
        dateTime={milestone.startDate.toISOString().slice(0, 7)}
      >
        {milestone.period}
      </time>
    </div>
  );
}
