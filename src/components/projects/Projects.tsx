import { useRef } from 'react';
import { PROJECTS } from '../../data/projects';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.scss';
import anime from 'animejs';

export function Projects(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  useIntersectionAnimation(sectionRef, {
    threshold: 0.1,
    once: true,
    onVisible: () => {
      if (reduced || !gridRef.current) return;
      anime({
        targets: Array.from(gridRef.current.children),
        opacity: [0, 1],
        translateY: [28, 0],
        delay: anime.stagger(120, { from: 'first' }),
        duration: 700,
        easing: 'easeOutExpo',
      });
    },
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={styles.projects}
      aria-labelledby="projects-heading"
    >
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Work</p>
        <h2 id="projects-heading" className={styles.heading}>
          Projects
        </h2>
        <ul className={styles.grid} ref={gridRef}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
