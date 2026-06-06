import { useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CERTIFICATIONS, CERTIFICATION_CATEGORIES } from '../../data/certifications';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { CertificationItem } from './CertificationItem';
import { CertModal } from './CertModal';
import styles from './Certifications.module.scss';
import type { Certification } from '../../types';
import anime from 'animejs';

export function Certifications(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // null = show all, otherwise filter by category id
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);

  const handlePreview = useCallback((cert: Certification) => {
    setPreviewCert(cert);
  }, []);

  const handleCloseModal = useCallback(() => {
    setPreviewCert(null);
  }, []);

  useIntersectionAnimation(sectionRef, {
    threshold: 0.1,
    once: true,
    onVisible: () => {
      if (reduced || !innerRef.current) return;
      // Animate header elements (label, heading, filter row)
      anime({
        targets: innerRef.current.querySelectorAll('[data-animate]'),
        opacity: [0, 1],
        translateY: [16, 0],
        delay: anime.stagger(80),
        duration: 600,
        easing: 'easeOutExpo',
      });
      // Animate all cert cards — select li.card via the CSS class
      const cards = innerRef.current.querySelectorAll<HTMLElement>('li');
      if (cards.length > 0) {
        anime({
          targets: Array.from(cards),
          opacity: [0, 1],
          translateX: [-16, 0],
          delay: anime.stagger(70, { start: 250 }),
          duration: 550,
          easing: 'easeOutExpo',
        });
      }
    },
  });

  // Determine which categories have certs to show
  const visibleCategories = activeCategory
    ? CERTIFICATION_CATEGORIES.filter((c) => c.id === activeCategory)
    : CERTIFICATION_CATEGORIES;

  const filteredCerts = (catId: string) =>
    CERTIFICATIONS.filter((c) => c.category === catId);

  return (
    <>
      <section
        id="certifications"
        ref={sectionRef}
        className={styles.certifications}
        aria-labelledby="certifications-heading"
      >
        <div className={styles.inner} ref={innerRef}>
          <p className={styles.sectionLabel} data-animate>Learning</p>
          <h2 id="certifications-heading" className={styles.heading} data-animate>
            Certifications
          </h2>

          {/* Category filter tabs */}
          <div className={styles.filterRow} data-animate role="group" aria-label="Filter certifications by category">
            <button
              type="button"
              className={`${styles.filterBtn}${activeCategory === null ? ` ${styles.filterBtnActive}` : ''}`}
              onClick={() => setActiveCategory(null)}
              aria-pressed={activeCategory === null}
            >
              All
            </button>
            {CERTIFICATION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.filterBtn}${activeCategory === cat.id ? ` ${styles.filterBtnActive}` : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grouped by category */}
          {visibleCategories.map((cat) => {
            const certs = filteredCerts(cat.id);
            if (certs.length === 0) return null;
            return (
              <div key={cat.id} className={styles.categorySection}>
                <h3 className={styles.categoryHeading} data-animate>
                  {cat.label}
                </h3>
                <ul className={styles.list}>
                  {certs.map((cert) => (
                    <CertificationItem
                      key={cert.id}
                      certification={cert}
                      onPreview={handlePreview}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Certificate preview modal — rendered in a portal */}
      {previewCert?.fileUrl &&
        createPortal(
          <CertModal
            title={previewCert.title}
            fileUrl={previewCert.fileUrl}
            onClose={handleCloseModal}
          />,
          document.body,
        )}
    </>
  );
}

export default Certifications;
