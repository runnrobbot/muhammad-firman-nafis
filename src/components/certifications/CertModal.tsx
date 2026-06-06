import { useEffect, useRef, useState } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import anime from 'animejs';
import styles from './CertModal.module.scss';

interface CertModalProps {
  title: string;
  fileUrl: string;
  onClose: () => void;
}

/** Detect iOS/iPadOS — they block PDF in iframe */
function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // iPad on iOS 13+ reports itself as Mac
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export function CertModal({ title, fileUrl, onClose }: CertModalProps): JSX.Element {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [iframeError, setIframeError] = useState(isIOS());

  // Entrance animation
  useEffect(() => {
    anime
      .timeline({ easing: 'easeOutExpo' })
      .add({ targets: backdropRef.current, opacity: [0, 1], duration: 220 })
      .add({ targets: modalRef.current, opacity: [0, 1], translateY: [20, 0], duration: 320 }, '-=130');
  }, []);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const absoluteUrl = `${window.location.origin}${fileUrl}`;

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div ref={modalRef} className={styles.modal}>

        {/* ── Header bar ── */}
        <div className={styles.header}>
          <h3 id="cert-modal-title" className={styles.title}>{title}</h3>
          <div className={styles.actions}>
            <a
              href={absoluteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
              aria-label={`Open ${title} in new tab`}
            >
              <ExternalLink aria-hidden="true" />
              <span>Open</span>
            </a>
            <a
              href={fileUrl}
              download
              className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
              aria-label={`Download ${title}`}
            >
              <Download aria-hidden="true" />
              <span>Download</span>
            </a>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close preview"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── PDF viewer / fallback ── */}
        {iframeError ? (
          /* Mobile / iOS fallback — iframe won't work */
          <div className={styles.fallback}>
            <FileText className={styles.fallbackIcon} aria-hidden="true" />
            <p className={styles.fallbackTitle}>{title}</p>
            <p className={styles.fallbackNote}>
              PDF preview is not supported on this device.
            </p>
            <div className={styles.fallbackBtns}>
              <a
                href={absoluteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackBtn}
              >
                <ExternalLink aria-hidden="true" />
                Open PDF
              </a>
              <a
                href={fileUrl}
                download
                className={`${styles.fallbackBtn} ${styles.fallbackBtnPrimary}`}
              >
                <Download aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className={styles.viewer}
            title={`Certificate: ${title}`}
            onError={() => setIframeError(true)}
          />
        )}
      </div>
    </div>
  );
}
