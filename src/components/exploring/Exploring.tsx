import { useRef } from 'react';
import { EXPLORING_GROUPS } from '../../data/exploring';
import { buildCompletedItemsTimeline } from '../../animations/timelines';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { ExploringGroup } from './ExploringGroup';
import styles from './Exploring.module.scss';
import anime from 'animejs';

export function Exploring(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIntersectionAnimation(sectionRef, {
    threshold: 0.15,
    once: true,
    onVisible: () => {
      if (reduced || !groupsRef.current) return;

      // Animate group containers in with stagger
      anime({
        targets: groupsRef.current.querySelectorAll('[data-group-id]').length > 0
          ? Array.from(groupsRef.current.children)
          : [],
        opacity: [0, 1],
        translateY: [12, 0],
        delay: anime.stagger(100),
        duration: 500,
        easing: 'easeOutExpo',
      });

      // Sequential reveal for completed items using the spec-defined timeline
      const completedEls = Array.from(
        groupsRef.current.querySelectorAll<HTMLElement>('[data-group-id="completed"]'),
      );
      if (completedEls.length > 0) {
        // Small delay to sequence after the group container entrance
        setTimeout(() => {
          buildCompletedItemsTimeline(completedEls).play();
        }, 200);
      }

      // Slide-in from right for current items
      anime({
        targets: groupsRef.current.querySelectorAll<HTMLElement>('[data-group-id="current"]'),
        opacity: [0, 1],
        translateX: [16, 0],
        delay: anime.stagger(60),
        duration: 450,
        easing: 'easeOutExpo',
      });

      // Fade in future items last
      anime({
        targets: groupsRef.current.querySelectorAll<HTMLElement>('[data-group-id="future"]'),
        opacity: [0, 1],
        translateX: [-12, 0],
        delay: anime.stagger(50),
        duration: 400,
        easing: 'easeOutExpo',
      });
    },
  });

  return (
    <section
      id="exploring"
      ref={sectionRef}
      className={styles.exploring}
      aria-labelledby="exploring-heading"
    >
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Learning</p>
        <h2 id="exploring-heading" className={styles.heading}>
          Currently Exploring
        </h2>
        <div className={styles.groups} ref={groupsRef}>
          {EXPLORING_GROUPS.map((group) => (
            <ExploringGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Exploring;
