import { useRef, useEffect } from 'react';
import { SkipNav } from '../shared/SkipNav';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollReveal } from '../../animations/hooks/useScrollReveal';
import styles from './Hero.module.scss';
import anime from 'animejs';

const HEADLINE =
  'Building practical solutions through infrastructure, data, software, and artificial intelligence.';
const SUPPORTING_TEXT =
  'Combining industry experience, academic learning, and curiosity-driven projects to build useful technology that solves real-world problems.';

// Orb definitions — position (cx,cy as % of viewBox), radius, initial opacity, animation params
const ORBS = [
  { cx: 82, cy: 15, r: 120, strokeWidth: 1.5, dur: 9000,  delay: 0,    amp: 18 },
  { cx: 88, cy: 55, r: 200, strokeWidth: 1,   dur: 13000, delay: 1500, amp: 12 },
  { cx: 72, cy: 80, r: 80,  strokeWidth: 1,   dur: 7500,  delay: 3000, amp: 25 },
  { cx: 95, cy: 30, r: 50,  strokeWidth: 0.8, dur: 6000,  delay: 800,  amp: 30 },
  { cx: 60, cy: 5,  r: 160, strokeWidth: 0.6, dur: 11000, delay: 2200, amp: 8  },
];

const STATS = [
  { value: 5,  suffix: '+', label: 'Years experience' },
  { value: 19, suffix: '',  label: 'Projects shipped' },
  { value: 4,  suffix: '',  label: 'Certifications' },
] as const;

export function splitIntoWords(text: string): string[] {
  return text.split(' ');
}

export function Hero(): JSX.Element {
  const reduced = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const wordElsRef = useRef<HTMLSpanElement[]>([]);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const orbRefs = useRef<SVGCircleElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<HTMLSpanElement[]>([]);

  const words = splitIntoWords(HEADLINE);
  const N = words.length;

  // ─── Scroll reveal ───────────────────────────────────────────
  const WORD_END = 0.72;
  const band = WORD_END / N;
  const wordItems = words.map((_, i) => ({
    get el() { return wordElsRef.current[i] ?? null; },
    start: i * band,
    end: Math.min(i * band + band * 1.45, WORD_END + 0.05),
    fromY: 16,
  }));

  useScrollReveal({
    outerRef: heroRef,
    disabled: reduced,
    scrollMultiplier: 1.5,
    items: [
      ...wordItems,
      { get el() { return statsRef.current; },     start: 0.60, end: 0.76, fromY: 8  },
      { get el() { return supportingRef.current; }, start: 0.68, end: 0.86, fromY: 10 },
      { get el() { return ctaGroupRef.current; },   start: 0.83, end: 1.0,  fromY: 0  },
    ],
  });

  // ─── Ambient orb animations ───────────────────────────────────
  useEffect(() => {
    if (reduced) return;

    const orbs = orbRefs.current.filter(Boolean);
    if (!orbs.length) return;

    // Fade in all orbs
    anime({
      targets: orbs,
      opacity: (_el: Element, i: number) => [0, ORBS[i]?.r > 100 ? 0.04 : 0.07],
      duration: 2000,
      delay: anime.stagger(400, { from: 'first' }),
      easing: 'easeInOutSine',
    });

    // Each orb drifts independently in a slow loop
    orbs.forEach((orb, i) => {
      const def = ORBS[i];
      if (!def) return;
      anime({
        targets: orb,
        translateX: [
          { value: def.amp,  duration: def.dur * 0.5 },
          { value: -def.amp * 0.6, duration: def.dur * 0.5 },
        ],
        translateY: [
          { value: -def.amp * 0.7, duration: def.dur * 0.4 },
          { value: def.amp * 0.5,  duration: def.dur * 0.6 },
        ],
        loop: true,
        direction: 'alternate',
        delay: def.delay,
        easing: 'easeInOutSine',
      });

      // Slow opacity pulse — breathe
      anime({
        targets: orb,
        opacity: [
          { value: def.r > 100 ? 0.06 : 0.10, duration: def.dur * 0.6 },
          { value: def.r > 100 ? 0.02 : 0.04, duration: def.dur * 0.4 },
        ],
        loop: true,
        direction: 'alternate',
        delay: def.delay + 500,
        easing: 'easeInOutSine',
      });
    });

    return () => {
      anime.remove(orbs);
    };
  }, [reduced]);

  // ─── Cursor blink ─────────────────────────────────────────────
  useEffect(() => {
    if (reduced || !cursorRef.current) return;
    const anim = anime({
      targets: cursorRef.current,
      opacity: [1, 0],
      duration: 550,
      loop: true,
      direction: 'alternate',
      easing: 'steps(1)',
    });
    return () => { anim.pause(); };
  }, [reduced]);

  // ─── Stats counter animation ──────────────────────────────────
  useEffect(() => {
    if (reduced) return;
    const statsEl = statsRef.current;
    if (!statsEl) return;

    // Watch for when stats element becomes visible (opacity > 0.5)
    const checkVisible = setInterval(() => {
      if (parseFloat(statsEl.style.opacity ?? '0') > 0.5) {
        clearInterval(checkVisible);
        STATS.forEach(({ value }, i) => {
          const el = statValueRefs.current[i];
          if (!el) return;
          const counter = { n: 0 };
          anime({
            targets: counter,
            n: value,
            round: 1,
            duration: 1200,
            easing: 'easeOutExpo',
            update: () => { el.textContent = String(counter.n); },
          });
        });
      }
    }, 100);

    return () => clearInterval(checkVisible);
  }, [reduced]);

  const handleExploreWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Introduction">
      <div className={styles.heroSticky}>
        <SkipNav />

        {/* ── Ambient SVG orbs in the background ── */}
        {!reduced && (
          <svg
            className={styles.orbCanvas}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {ORBS.map((orb, i) => (
              <circle
                key={i}
                ref={(el) => { if (el) orbRefs.current[i] = el; }}
                className={styles.orb}
                cx={orb.cx}
                cy={orb.cy}
                r={orb.r}
                strokeWidth={orb.strokeWidth}
              />
            ))}
          </svg>
        )}

        <div className={styles.heroInner}>
          {/* Intro with blinking cursor */}
          <p className={styles.intro}>
            Hello, I&apos;m Firman.
            {!reduced && <span ref={cursorRef} className={styles.cursor} aria-hidden="true" />}
          </p>

          <h1 className={styles.headline}>
            {words.map((word, i) => (
              <span
                key={i}
                className={styles.word}
                ref={(el) => { if (el) wordElsRef.current[i] = el; }}
              >
                {word}
                {i < words.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h1>

          <p className={styles.supporting} ref={supportingRef}>
            {SUPPORTING_TEXT}
          </p>

          {/* Stats strip */}
          <div className={styles.statsStrip} ref={statsRef}>
            {STATS.map(({ value, suffix, label }, i) => (
              <div key={label} className={styles.statItem}>
                <span className={styles.statNum}>
                  <span ref={(el) => { if (el) statValueRefs.current[i] = el; }}>
                    {reduced ? value : 0}
                  </span>
                  {suffix}
                </span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.ctaGroup} ref={ctaGroupRef}>
            <button
              className={`${styles.cta} ${styles.ctaPrimary}`}
              onClick={handleExploreWork}
              type="button"
            >
              Explore My Work
            </button>
            <button
              className={`${styles.cta} ${styles.ctaSecondary}`}
              onClick={handleContact}
              type="button"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
