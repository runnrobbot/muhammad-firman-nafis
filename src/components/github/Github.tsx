import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import styles from './Github.module.scss';
import anime from 'animejs';

interface WorkRepo {
  name: string;
  href: string;
  desc: string;
}

const WORK_REPOS: WorkRepo[] = [
  { name: 'commision-employed',       href: 'https://github.com/runnrobbot/commision-employed',       desc: 'Commission tracking for employees' },
  { name: 'UR8AN-evoucher',           href: 'https://github.com/runnrobbot/UR8AN-evoucher',           desc: 'Digital voucher platform' },
  { name: 'task-management',          href: 'https://github.com/runnrobbot/task-management',          desc: 'Task management system' },
  { name: 'rhtairpro',                href: 'https://github.com/runnrobbot/rhtairpro',                desc: 'Air pro management system' },
  { name: 'techrent',                 href: 'https://github.com/runnrobbot/techrent',                 desc: 'Tech equipment rental platform' },
  { name: 'mansgroup',                href: 'https://github.com/runnrobbot/mansgroup',                desc: 'Group management system' },
  { name: 'glory8-monitoring',        href: 'https://github.com/runnrobbot/glory8-monitoring',        desc: 'Real-time monitoring dashboard' },
  { name: 'punishment-employee',      href: 'https://github.com/runnrobbot/punishment-employee',      desc: 'HR disciplinary tracking' },
  { name: 'glory8-launcher',          href: 'https://github.com/runnrobbot/glory8-launcher',          desc: 'Application launcher' },
  { name: 'glory8-print',             href: 'https://github.com/runnrobbot/glory8-print',             desc: 'Print management system' },
  { name: 'jasamarga-monitoring-react', href: 'https://github.com/runnrobbot/jasamarga-monitoring-react', desc: 'Infrastructure monitoring — Jasa Marga' },
  { name: 'glory8-products',          href: 'https://github.com/runnrobbot/glory8-products',          desc: 'Product catalog management' },
  { name: 'glory8-mailbox',           href: 'https://github.com/runnrobbot/glory8-mailbox',           desc: 'Internal mailbox system' },
  { name: 'datapoduction',            href: 'https://github.com/runnrobbot/datapoduction',            desc: 'Data production pipeline' },
  { name: 'aoraluxe',                 href: 'https://github.com/runnrobbot/aoraluxe',                 desc: 'Luxury brand platform' },
  { name: 'notaris-monitoring',       href: 'https://github.com/runnrobbot/notaris-monitoring',       desc: 'Notary office monitoring' },
  { name: 'Rent-Car',                 href: 'https://github.com/runnrobbot/Rent-Car',                 desc: 'Car rental management' },
  { name: 'Todo-App',                 href: 'https://github.com/runnrobbot/Todo-App',                 desc: 'Task tracking application' },
  { name: 'Kasir',                    href: 'https://github.com/runnrobbot/Kasir',                    desc: 'Point-of-sale cashier system' },
];

// Stats to count up to
const STATS = [
  { target: 21,  label: 'public repositories' },
  { target: 125, label: 'contributions in the last year' },
];

export function Github(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const repoGridRef = useRef<HTMLDivElement>(null);
  // Refs for each stat value element
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();

  useIntersectionAnimation(sectionRef, {
    threshold: 0.1,
    once: true,
    onVisible: () => {
      if (reduced || !innerRef.current) return;

      // Header elements stagger
      const items = innerRef.current.querySelectorAll<HTMLElement>('[data-animate]');
      anime({
        targets: items,
        opacity: [0, 1],
        translateY: [16, 0],
        delay: anime.stagger(80),
        duration: 600,
        easing: 'easeOutExpo',
      });

      // ── Counter animation for stats ──────────────────────────
      STATS.forEach(({ target }, i) => {
        const el = statValueRefs.current[i];
        if (!el) return;

        // Animate a counter object whose value drives the text content
        const counter = { value: 0 };
        anime({
          targets: counter,
          value: target,
          round: 1,           // snap to integers
          duration: 1800,
          delay: 300 + i * 200,
          easing: 'easeOutExpo',
          update: () => {
            el.textContent = String(counter.value);
          },
        });
      });

      // Repo cards staggered reveal
      if (repoGridRef.current) {
        const cards = repoGridRef.current.querySelectorAll<HTMLElement>('[data-repo-card]');
        anime({
          targets: cards,
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.96, 1],
          delay: anime.stagger(35, { start: 500 }),
          duration: 450,
          easing: 'easeOutExpo',
        });
      }
    },
  });

  return (
    <section
      id="github"
      ref={sectionRef}
      className={styles.github}
      aria-labelledby="github-heading"
    >
      <div className={styles.inner} ref={innerRef}>
        <p className={styles.sectionLabel} data-animate>Open Source</p>
        <h2 id="github-heading" className={styles.heading} data-animate>
          Building in Public
        </h2>
        <p className={styles.subheading} data-animate>
          I learn through shipping — exploring new technologies, contributing consistently, and
          building things to see how they work under real conditions.
        </p>

        {/* Stats with counter animation */}
        <div className={styles.stats} data-animate>
          {STATS.map(({ target, label }, i) => (
            <div key={label} className={styles.stat}>
              <span
                className={styles.statValue}
                ref={(el) => { statValueRefs.current[i] = el; }}
                aria-label={`${target} ${label}`}
              >
                {/* Start at 0; JS will count up */}
                {reduced ? target : 0}
              </span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>

        <p className={styles.recentLabel} data-animate>Repositories</p>

        <div className={styles.repoGrid} ref={repoGridRef}>
          {WORK_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.href}
              className={styles.repoCard}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} — ${repo.desc} (opens in new tab)`}
              data-repo-card
            >
              <div className={styles.repoInfo}>
                <div className={styles.repoName}>{repo.name}</div>
                <div className={styles.repoDesc}>{repo.desc}</div>
              </div>
              <ExternalLink className={styles.repoIcon} aria-hidden="true" />
            </a>
          ))}
        </div>

        <a
          href="https://github.com/runnrobbot"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          data-animate
          aria-label="View GitHub profile — opens in new tab"
        >
          <ExternalLink aria-hidden="true" />
          github.com/runnrobbot
        </a>
      </div>
    </section>
  );
}

export default Github;
