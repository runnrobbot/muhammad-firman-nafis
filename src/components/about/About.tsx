import { useRef } from 'react';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollReveal } from '../../animations/hooks/useScrollReveal';
import styles from './About.module.scss';

export function About(): JSX.Element {
  const reduced = useReducedMotion();

  const aboutRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const para3Ref = useRef<HTMLParagraphElement>(null);

  /*
   * scrollMultiplier: 1.2 = ~2.2× viewport height total scroll budget.
   * Items start early (label at 0.02) so the first element is already
   * visible as soon as the section pins into view. Each element has a
   * generous window so it feels smooth, not abrupt.
   */
  useScrollReveal({
    outerRef: aboutRef,
    disabled: reduced,
    scrollMultiplier: 1.2,
    items: [
      { get el() { return labelRef.current; },  start: 0.00, end: 0.12, fromY: 10 },
      { get el() { return headingRef.current; }, start: 0.08, end: 0.24, fromY: 16 },
      { get el() { return para1Ref.current; },   start: 0.22, end: 0.50, fromY: 18 },
      { get el() { return para2Ref.current; },   start: 0.48, end: 0.75, fromY: 18 },
      { get el() { return para3Ref.current; },   start: 0.72, end: 0.95, fromY: 18 },
    ],
  });

  return (
    <section
      id="about"
      ref={aboutRef}
      className={styles.about}
      aria-labelledby="about-heading"
    >
      <div className={styles.aboutSticky}>
        <div className={styles.inner}>
          <p ref={labelRef} className={styles.sectionLabel}>About</p>

          <h2 ref={headingRef} id="about-heading" className={styles.heading}>
            Who I Am
          </h2>

          <p ref={para1Ref} className={styles.body}>
            I&apos;m <strong>Muhammad Firman Nafis Aufa Suyanto</strong> — a DevOps &amp; AI
            Engineer at <strong>PT Aneka Delapan Dekorasi Indonesia</strong>, while concurrently
            studying Information Systems at <strong>Universitas Pelita Harapan</strong>. My career
            started in server security and management at AKRI from 2019 to 2022, where I learned
            what it means to keep systems alive under pressure.
          </p>

          <p ref={para2Ref} className={styles.body}>
            From there I moved into field data collection at{' '}
            <strong>Badan Pusat Statistik</strong>, then into education as a text-coding teacher
            at <strong>Kalananti by Ruangguru</strong>, and eventually into a data specialist role
            at <strong>PT Paramadaksa Teknologi Nusantara (nexSOFT)</strong>. Each stop added a
            layer — infrastructure thinking, data discipline, the ability to explain complex
            systems simply, and operational rigor.
          </p>

          <p ref={para3Ref} className={styles.body}>
            Today I work at the intersection of DevOps and AI: building automated pipelines,
            wiring intelligent systems into production, and learning software engineering formally
            while applying it daily. I build because I want things to work better — not because
            it looks impressive on paper.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
