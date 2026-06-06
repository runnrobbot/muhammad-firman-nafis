import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sun, Moon } from 'lucide-react';
import anime from 'animejs';
import { useTheme } from '../../hooks/useTheme';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { label: 'Work',       target: 'projects'  },
  { label: 'Experience', target: 'timeline'  },
  { label: 'Skills',     target: 'skills'    },
  { label: 'Contact',    target: 'contact'   },
] as const;

const SECTION_IDS = ['projects', 'timeline', 'skills', 'contact'] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/** Returns the id of the section currently in view */
function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Set<string>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visibleSections.add(id);
          else visibleSections.delete(id);
          const first = ids.find((i) => visibleSections.has(i));
          if (first) setActive(first);
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

export function Header(): JSX.Element {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  // Header slide-down entrance
  useEffect(() => {
    if (!headerRef.current) return;
    anime({
      targets: headerRef.current,
      translateY: [-60, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutExpo',
      delay: 400,
    });
    const btns = headerRef.current.querySelectorAll<HTMLElement>(`.${styles.navBtn}`);
    if (btns.length > 0) {
      anime({
        targets: Array.from(btns),
        opacity: [0, 1],
        translateX: [10, 0],
        delay: anime.stagger(55, { start: 700 }),
        duration: 450,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  // Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [menuOpen]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (target: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(target), 200);
  };

  // ──────────────────────────────────────────────────────────────
  // Mobile overlay is rendered via a portal directly into <body>
  // so it is NOT a child of the fixed <header> element.
  // This ensures position:fixed on the overlay is relative to the
  // viewport, not to the header's stacking context.
  // ──────────────────────────────────────────────────────────────
  const mobileNav = (
    <div
      className={`${styles.mobileOverlay}${menuOpen ? ` ${styles.mobileOverlayOpen}` : ''}`}
      aria-hidden={!menuOpen}
      id="main-nav"
    >
      <nav aria-label="Main navigation">
        <ul className={styles.mobileNavList}>
          {NAV_LINKS.map(({ label, target }) => (
            <li key={target}>
              <button
                type="button"
                onClick={() => handleNavClick(target)}
                className={`${styles.mobileNavBtn}${target === activeSection ? ` ${styles.mobileNavBtnActive}` : ''}`}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* ── Fixed header bar ── */}
      <header ref={headerRef} className={styles.header} style={{ opacity: 0 }}>
        {/* Logo */}
        <button
          type="button"
          onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={styles.logo}
          aria-label="Back to top"
        >
          <span className={styles.logoFirst}>Firman</span>
          <span className={styles.logoDot}>.</span>
        </button>

        {/* Right cluster */}
        <div className={styles.headerRight}>
          {/* Desktop nav — inline, not the overlay */}
          <nav aria-label="Main navigation" className={styles.desktopNav}>
            <ul className={styles.navList}>
              {NAV_LINKS.map(({ label, target }) => (
                <li key={target}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(target)}
                    className={`${styles.navBtn}${target === activeSection ? ` ${styles.navBtnActive}` : ''}`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Dark mode toggle */}
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
          >
            <span className={styles.bar} data-open={menuOpen ? 'true' : undefined} data-bar="1" />
            <span className={styles.bar} data-open={menuOpen ? 'true' : undefined} data-bar="2" />
            <span className={styles.bar} data-open={menuOpen ? 'true' : undefined} data-bar="3" />
          </button>
        </div>
      </header>

      {/* ── Mobile nav overlay — portaled to <body> ── */}
      {createPortal(mobileNav, document.body)}
    </>
  );
}

export default Header;
