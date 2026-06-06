import { CheckCircle, Eye } from 'lucide-react';
import type { Certification } from '../../types';
import styles from './Certifications.module.scss';

interface CertificationItemProps {
  certification: Certification;
  onPreview: (cert: Certification) => void;
}

export function CertificationItem({ certification, onPreview }: CertificationItemProps): JSX.Element {
  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <h4 className={styles.cardTitle}>{certification.title}</h4>
        <div className={styles.cardMeta}>
          <span className={styles.platform}>{certification.platform}</span>
          {certification.fileUrl && (
            <button
              type="button"
              className={styles.previewBtn}
              onClick={() => onPreview(certification)}
              aria-label={`Preview certificate: ${certification.title}`}
            >
              <Eye aria-hidden="true" />
              View
            </button>
          )}
        </div>
      </div>
      <p className={styles.outcomes}>{certification.outcomes}</p>
      {certification.aiRelevanceLabel && (
        <p className={styles.relevance}>
          <CheckCircle aria-hidden="true" />
          {certification.aiRelevanceLabel}
        </p>
      )}
    </li>
  );
}
