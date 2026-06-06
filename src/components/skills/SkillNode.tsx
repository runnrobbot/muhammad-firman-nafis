import type { RefObject, KeyboardEvent } from 'react';
import type { Skill } from '../../types';
import type anime from 'animejs';
import styles from './Skills.module.scss';

interface SkillNodeProps {
  skill: Skill;
  categoryId: string;
  ambientRef: RefObject<anime.AnimeInstance | null>;
  onActivate: (categoryId: string) => void;
}

export function SkillNode({ skill, categoryId, onActivate }: SkillNodeProps): JSX.Element {
  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate(categoryId);
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      className={styles.skillNode}
      data-category={categoryId}
      onMouseEnter={() => onActivate(categoryId)}
      onKeyDown={handleKeyDown}
      aria-label={skill.label}
    >
      {skill.label}
    </span>
  );
}
