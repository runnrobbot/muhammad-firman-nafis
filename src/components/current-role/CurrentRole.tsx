import { useRef } from 'react';
import { buildRolePillarsTimeline } from '../../animations/timelines';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { RolePillar } from './RolePillar';
import styles from './CurrentRole.module.scss';

const DEVOPS_ITEMS = [
  'Design and maintain CI/CD pipelines for automated deployments',
  'Manage containerized infrastructure with Docker',
  'Monitor system health and set up alerting workflows',
  'Automate repetitive operational tasks via scripting',
  'Ensure environment parity between dev, staging, and production',
  'Document infrastructure changes and runbooks',
];

const AI_ITEMS = [
  'Design and integrate AI-powered automation into business workflows',
  'Build and fine-tune language model pipelines for production use',
  'Develop intelligent document processing solutions',
  'Evaluate model outputs for accuracy, safety, and reliability',
  'Connect AI capabilities to internal tooling and APIs',
  'Research emerging AI techniques applicable to current projects',
  'Create data pipelines to support AI model inputs and outputs',
];

export function CurrentRole(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const devopsRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIntersectionAnimation(sectionRef, {
    threshold: 0.2,
    once: true,
    onVisible: () => {
      if (reduced) return;
      if (!devopsRef.current || !aiRef.current) return;
      buildRolePillarsTimeline({
        devopsEl: devopsRef.current,
        aiEl: aiRef.current,
      }).play();
    },
  });

  return (
    <section
      id="current-role"
      ref={sectionRef}
      className={styles.currentRole}
      aria-labelledby="current-role-heading"
    >
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Now</p>
        <span className={styles.badge}>Current Position</span>
        <h2 id="current-role-heading" className={styles.heading}>
          DevOps &amp; AI Engineer
        </h2>
        <div className={styles.pillars}>
          <RolePillar
            title="DevOps Engineering"
            org="PT Aneka Delapan Dekorasi Indonesia"
            period="Apr 2026 – Present"
            items={DEVOPS_ITEMS}
            pillarRef={devopsRef}
          />
          <RolePillar
            title="AI Engineering"
            org="PT Aneka Delapan Dekorasi Indonesia"
            period="Apr 2026 – Present"
            items={AI_ITEMS}
            pillarRef={aiRef}
          />
        </div>
      </div>
    </section>
  );
}

export default CurrentRole;
