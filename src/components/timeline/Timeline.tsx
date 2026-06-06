import { useState } from 'react';
import { MILESTONES } from '../../data/timeline';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { TimelineMilestone } from './TimelineMilestone';
import { TimelineSVGLine } from './TimelineSVGLine';
import styles from './Timeline.module.scss';

export function Timeline(): JSX.Element {
  const reduced = useReducedMotion();

  // Track which connectors (between index i and i+1) have been revealed
  const [revealed, setRevealed] = useState<Set<number>>(
    () => new Set(reduced ? MILESTONES.map((_, i) => i) : []),
  );

  const handleMilestoneVisible = (index: number) => {
    setRevealed((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      // Reveal the connector LEADING INTO this milestone (index - 1)
      if (index > 0) next.add(index - 1);
      return next;
    });
  };

  return (
    <section
      id="timeline"
      className={styles.timeline}
      aria-labelledby="timeline-heading"
    >
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Experience</p>
        <h2 id="timeline-heading" className={styles.heading}>
          Career Timeline
        </h2>
        <p className={styles.progression}>
          Server Management → Data Collection → Education → Data Operations → Information Systems
          → Software Development → DevOps → AI
        </p>

        <ol className={styles.track}>
          {MILESTONES.map((milestone, index) => (
            <li key={milestone.id} className={styles.entry}>
              {/* Dot + SVG connector pair */}
              <div className={styles.dotCol}>
                <span
                  className={`${styles.dot}${revealed.has(index - 1) || reduced ? ` ${styles.dotActive}` : ''}`}
                  aria-hidden="true"
                />
                {index < MILESTONES.length - 1 && (
                  <TimelineSVGLine
                    fromIndex={index}
                    toIndex={index + 1}
                    revealed={revealed.has(index) || reduced}
                  />
                )}
              </div>

              {/* Milestone card */}
              <TimelineMilestone
                milestone={milestone}
                index={index}
                isCurrent={milestone.isCurrent}
                onVisible={handleMilestoneVisible}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Timeline;
