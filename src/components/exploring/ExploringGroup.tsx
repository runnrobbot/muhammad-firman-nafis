import { CheckCircle } from 'lucide-react';
import type { ExploringGroup as ExploringGroupType } from '../../types';
import styles from './Exploring.module.scss';

interface ExploringGroupProps {
  group: ExploringGroupType;
}

export function ExploringGroup({ group }: ExploringGroupProps): JSX.Element {
  return (
    <div className={styles.group}>
      <p className={styles.groupLabel}>{group.label}</p>
      <ul className={styles.items}>
        {group.items.map((item) => (
          <li
            key={item.id}
            className={`${styles.item} ${
              group.id === 'completed'
                ? styles.itemCompleted
                : group.id === 'current'
                  ? styles.itemCurrent
                  : styles.itemFuture
            }`}
            data-group-id={group.id}
          >
            {/* Completed items only get a check — no badge/progress for future items */}
            {group.id === 'completed' && (
              <CheckCircle className={styles.checkIcon} aria-hidden="true" />
            )}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
