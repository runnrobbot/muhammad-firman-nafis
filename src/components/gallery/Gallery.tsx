import { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ImageIcon, X, ChevronLeft, ChevronRight, Eye, FileDown } from 'lucide-react';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import styles from './Gallery.module.scss';
import anime from 'animejs';

const CV_URL = '/certificates/cv.pdf';

// ─── Eagerly load all assets via Vite glob import ─────────────────
// Returns a map of { './filename.png': { default: 'url...' } }
const assetModules = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function getAsset(filename: string): string | null {
  const key = `../../assets/${filename}`;
  return assetModules[key] ?? null;
}

const profileSrc = getAsset('firman.png');

const GALLERY_FILENAMES = [
  'gallery1.png', 'gallery2.png', 'gallery3.png',
  'gallery4.png', 'gallery5.png', 'gallery6.png',
];

// Only include gallery items that actually have files
const galleryItems = GALLERY_FILENAMES.map((name, i) => ({
  name,
  index: i,
  src: getAsset(name),
}));

const PROFILE_TAGS = [
  'DevOps', 'AI Engineering', 'Information Systems', 'Python', 'React',
];

// ─── Lightbox ────────────────────────────────────────────────────
interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ images, initialIndex, onClose }: LightboxProps): JSX.Element {
  const [idx, setIdx] = useState(initialIndex);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!reduced) {
      anime.timeline({ easing: 'easeOutExpo' })
        .add({ targets: backdropRef.current, opacity: [0, 1], duration: 220 })
        .add({ targets: imgRef.current, opacity: [0, 1], scale: [0.94, 1], duration: 300 }, '-=120');
    }
  }, [reduced]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length, onClose]);

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
      className={styles.lightbox}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery lightbox"
    >
      <img
        ref={imgRef}
        src={images[idx]}
        alt={`Gallery photo ${idx + 1} of ${images.length}`}
        className={styles.lightboxImg}
      />

      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close lightbox">
        <X aria-hidden="true" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            aria-label="Previous photo"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            aria-label="Next photo"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}

// ─── Main Gallery component ───────────────────────────────────────
export function Gallery(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Only the gallery items that have real images (for the lightbox)
  const realImages = galleryItems.filter((g) => g.src !== null).map((g) => g.src as string);

  useIntersectionAnimation(sectionRef, {
    threshold: 0.1,
    once: true,
    onVisible: () => {
      if (reduced || !innerRef.current) return;
      anime({
        targets: innerRef.current.querySelectorAll('[data-animate]'),
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(80),
        duration: 600,
        easing: 'easeOutExpo',
      });
      // Stagger grid items separately
      const gridBtns = innerRef.current.querySelectorAll<HTMLElement>('[data-grid-item]');
      anime({
        targets: gridBtns,
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: anime.stagger(60, { start: 300 }),
        duration: 500,
        easing: 'easeOutExpo',
      });
    },
  });

  const openLightbox = useCallback((realIdx: number) => {
    setLightboxIdx(realIdx);
  }, []);

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className={styles.gallery}
        aria-labelledby="gallery-heading"
      >
        <div className={styles.inner} ref={innerRef}>
          <p className={styles.sectionLabel} data-animate>About Me</p>
          <h2 id="gallery-heading" className={styles.heading} data-animate>
            Behind the Work
          </h2>

          {/* ── Profile card ── */}
          <div className={styles.profile} data-animate>
            <div className={styles.avatarWrap}>
              {profileSrc ? (
                <img
                  src={profileSrc}
                  alt="Muhammad Firman Nafis Aufa Suyanto"
                  className={styles.avatar}
                  width={200}
                  height={200}
                />
              ) : (
                <div
                  className={styles.avatarPlaceholder}
                  aria-label="Profile photo placeholder — add syafirman.png to src/assets"
                >
                  FN
                </div>
              )}
            </div>

            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>Muhammad Firman Nafis</h3>
              <p className={styles.profileRole}>DevOps &amp; AI Engineer</p>
              <p className={styles.profileBio}>
                Based in Indonesia. Building things at the intersection of infrastructure, data,
                and intelligence. Currently at PT Aneka Delapan Dekorasi Indonesia and studying
                Information Systems at Universitas Pelita Harapan.
              </p>
              <div className={styles.profileTags}>
                {PROFILE_TAGS.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              {/* CV actions */}
              <div className={styles.cvActions}>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.cvBtn} ${styles.cvBtnView}`}
                  aria-label="View CV (opens in new tab)"
                >
                  <Eye aria-hidden="true" />
                  View CV
                </a>
                <a
                  href={CV_URL}
                  download="Firman_Nafis_CV.pdf"
                  className={`${styles.cvBtn} ${styles.cvBtnDownload}`}
                  aria-label="Download CV"
                >
                  <FileDown aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </div>
          </div>

          {/* ── Gallery grid ── */}
          <p className={styles.galleryLabel} data-animate>Photos</p>
          <div className={styles.grid}>
            {galleryItems.map(({ name, src }, i) => {
              // Index into realImages for the lightbox
              const realIdx = realImages.indexOf(src as string);
              return (
                <div
                  key={name}
                  className={i === 0 ? styles.gridItemFeatured : undefined}
                >
                  <button
                    type="button"
                    className={styles.gridItem}
                    data-grid-item
                    onClick={() => src && openLightbox(realIdx >= 0 ? realIdx : 0)}
                    aria-label={src ? `View gallery photo ${i + 1}` : `Gallery photo placeholder — add ${name} to src/assets`}
                    disabled={!src}
                    style={{ opacity: 1 }}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={`Gallery ${i + 1}`}
                        className={styles.gridPhoto}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.gridPlaceholder}>
                        <ImageIcon aria-hidden="true" />
                        <span>{name}</span>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {lightboxIdx !== null && realImages.length > 0 && (
        <Lightbox
          images={realImages}
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}

export default Gallery;
