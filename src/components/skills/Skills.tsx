import { useRef, useCallback } from 'react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { SkillNode } from './SkillNode';
import styles from './Skills.module.scss';
import anime from 'animejs';

/** Max tilt angle in degrees */
const MAX_TILT = 12;
/** Max Z lift in px */
const MAX_LIFT = 10;

function applyTilt(
  card: HTMLElement,
  e: React.MouseEvent<HTMLElement>,
  reduced: boolean,
) {
  if (reduced) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;   // mouse X inside card
  const y = e.clientY - rect.top;    // mouse Y inside card
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  // Normalise to [-1, 1]
  const nx = (x - cx) / cx;
  const ny = (y - cy) / cy;
  anime({
    targets: card,
    rotateX: -ny * MAX_TILT,   // tilt up/down
    rotateY: nx * MAX_TILT,    // tilt left/right
    translateZ: MAX_LIFT,
    duration: 80,
    easing: 'linear',
  });
}

function resetTilt(card: HTMLElement, reduced: boolean) {
  if (reduced) return;
  anime({
    targets: card,
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    duration: 500,
    easing: 'easeOutElastic(1, 0.5)',
  });
}

export function Skills(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Section entrance: stagger cards
  useIntersectionAnimation(sectionRef, {
    threshold: 0.12,
    once: true,
    onVisible: () => {
      if (reduced || !containerRef.current) return;
      anime({
        targets: Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(`.${styles.category}`),
        ),
        opacity: [0, 1],
        translateY: [24, 0],
        delay: anime.stagger(80, { from: 'first' }),
        duration: 650,
        easing: 'easeOutExpo',
      });
    },
  });

  // Category highlight on skill activation
  const handleActivate = useCallback(
    (activeCategoryId: string) => {
      if (reduced || !containerRef.current) return;

      anime({
        targets: containerRef.current.querySelectorAll<HTMLElement>(
          `[data-category="${activeCategoryId}"]`,
        ),
        scale: [1, 1.08],
        duration: 220,
        easing: 'easeOutExpo',
      });

      SKILL_CATEGORIES.forEach((cat) => {
        if (cat.id === activeCategoryId) return;
        anime({
          targets: containerRef.current!.querySelectorAll<HTMLElement>(
            `[data-category="${cat.id}"]`,
          ),
          scale: [1, 0.94],
          opacity: [1, 0.35],
          duration: 220,
          easing: 'easeOutExpo',
        });
      });

      setTimeout(() => {
        anime({
          targets: containerRef.current!.querySelectorAll<HTMLElement>('[data-category]'),
          scale: 1,
          opacity: 1,
          duration: 380,
          easing: 'easeOutExpo',
        });
      }, 1000);
    },
    [reduced],
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={styles.skills}
      aria-labelledby="skills-heading"
    >
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Skills</p>
        <h2 id="skills-heading" className={styles.heading}>
          Technical Toolkit
        </h2>

        <div className={styles.categories} ref={containerRef}>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id} className={styles.categoryCard}>
              <div
                className={styles.category}
                // 3-D tilt listeners — only bind on non-touch
                onMouseMove={(e) => applyTilt(e.currentTarget, e, reduced)}
                onMouseLeave={(e) => resetTilt(e.currentTarget, reduced)}
              >
                <p className={styles.categoryLabel}>{cat.label}</p>
                <div className={styles.nodes}>
                  {cat.skills.map((skill) => (
                    <SkillNode
                      key={skill.id}
                      skill={skill}
                      categoryId={cat.id}
                      ambientRef={{ current: null }}
                      onActivate={handleActivate}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
