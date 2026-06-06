import type { RefObject } from 'react';
import { CheckCircle } from 'lucide-react';
import styles from './CurrentRole.module.scss';

interface RolePillarProps {
  title: string;
  org: string;
  period: string;
  items: string[];
  pillarRef: RefObject<HTMLDivElement | null>;
}

export function RolePillar({ title, org, period, items, pillarRef }: RolePillarProps): JSX.Element {
  return (
    <div ref={pillarRef} className={styles.pillar}>
      <h3 className={styles.pillarTitle}>{title}</h3>
      <p className={styles.pillarMeta}>
        {org} <span className={styles.pillarPeriod}>· {period}</span>
      </p>
      <ul className={styles.pillarItems}>
        {items.map((item) => (
          <li key={item} className={styles.pillarItem}>
            <CheckCircle className={styles.itemIcon} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
