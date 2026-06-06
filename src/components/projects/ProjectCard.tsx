import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../../types';
import styles from './Projects.module.scss';
import anime from 'animejs';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  const cardRef = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      translateY: -6,
      duration: 200,
      easing: 'easeOutExpo',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      translateY: 0,
      duration: 350,
      easing: 'easeOutElastic(1, 0.6)',
    });
  };

  return (
    <li
      ref={cardRef}
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <a
          href={project.repoUrl}
          className={styles.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} repository on GitHub (opens in new tab)`}
        >
          <ExternalLink aria-hidden="true" />
          Repo
        </a>
      </div>
      <dl className={styles.facets}>
        <div className={styles.facet}>
          <dt className={styles.facetKey}>Problem</dt>
          <dd className={styles.facetValue}>{project.problem}</dd>
        </div>
        <div className={styles.facet}>
          <dt className={styles.facetKey}>Approach</dt>
          <dd className={styles.facetValue}>{project.approach}</dd>
        </div>
        <div className={styles.facet}>
          <dt className={styles.facetKey}>Tradeoffs</dt>
          <dd className={styles.facetValue}>{project.tradeoffs}</dd>
        </div>
      </dl>
      <div className={styles.techRow} aria-label={`Technologies used in ${project.title}`}>
        {project.technologies.map((tech) => (
          <span key={tech} className={styles.tech}>
            {tech}
          </span>
        ))}
      </div>
    </li>
  );
}
