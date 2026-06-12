import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Eye, FileDown, X } from 'lucide-react';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import styles from './CV.module.scss';
import anime from 'animejs';

const CV_URL = '/certificates/Muhammad_Firman_Nafis_CV.pdf';

// ─── Inline PDF viewer modal ──────────────────────────────────────
function CVModal({ onClose }: { onClose: () => void }): JSX.Element {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({ targets: backdropRef.current, opacity: [0, 1], duration: 220 })
      .add({ targets: modalRef.current, opacity: [0, 1], translateY: [20, 0], duration: 300 }, '-=120');
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  return createPortal(
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="CV Preview"
    >
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Curriculum Vitae — Firman Nafis</span>
          <div className={styles.modalActions}>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalBtn}
              aria-label="Open CV in new tab"
            >
              <Eye aria-hidden="true" />
              Open
            </a>
            <a
              href={CV_URL}
              download="Firman_Nafis_CV.pdf"
              className={styles.modalBtn}
              aria-label="Download CV"
            >
              <FileDown aria-hidden="true" />
              Download
            </a>
            <button
              type="button"
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Close CV preview"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </div>
        <iframe
          src={`${CV_URL}#toolbar=0&navpanes=0`}
          className={styles.viewer}
          title="Curriculum Vitae — Muhammad Firman Nafis"
        />
      </div>
    </div>,
    document.body,
  );
}

// ─── Main CV section ──────────────────────────────────────────────
export function CV(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);

  useIntersectionAnimation(sectionRef, {
    threshold: 0.15,
    once: true,
    onVisible: () => {
      if (reduced || !innerRef.current) return;
      anime({
        targets: innerRef.current.querySelectorAll('[data-animate]'),
        opacity: [0, 1],
        translateY: [16, 0],
        delay: anime.stagger(80),
        duration: 550,
        easing: 'easeOutExpo',
      });
    },
  });

  return (
    <>
      <section
        id="cv"
        ref={sectionRef}
        className={styles.cv}
        aria-labelledby="cv-heading"
      >
        <div className={styles.inner} ref={innerRef}>
          <p className={styles.sectionLabel} data-animate>Resume</p>
          <h2 id="cv-heading" className={styles.heading} data-animate>
            Curriculum Vitae
          </h2>
          <p className={styles.sub} data-animate>
            Full work history, skills, and education in one document.
          </p>

          <div className={styles.actions} data-animate>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => setModalOpen(true)}
              aria-label="Preview CV"
            >
              <Eye aria-hidden="true" />
              Preview CV
            </button>
            <a
              href={CV_URL}
              download="Firman_Nafis_CV.pdf"
              className={`${styles.btn} ${styles.btnSecondary}`}
              aria-label="Download CV as PDF"
            >
              <FileDown aria-hidden="true" />
              Download PDF
            </a>
          </div>

          {/* Preview card — thumbnail hint */}
          <button
            type="button"
            className={styles.previewCard}
            onClick={() => setModalOpen(true)}
            aria-label="Click to preview CV"
            data-animate
          >
            <div className={styles.previewInner}>
              <div className={styles.previewLines}>
                {[60, 40, 80, 50, 70, 45, 65].map((w, i) => (
                  <span key={i} className={styles.previewLine} style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className={styles.previewOverlay}>
                <Eye className={styles.previewIcon} aria-hidden="true" />
                <span>Click to preview</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {modalOpen && <CVModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

export default CV;
