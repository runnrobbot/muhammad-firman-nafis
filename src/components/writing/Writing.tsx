import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { WRITING_POSTS } from '../../data/writing';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import styles from './Writing.module.scss';
import anime from 'animejs';

export function Writing(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  useIntersectionAnimation(sectionRef, {
    threshold: 0.1,
    once: true,
    onVisible: () => {
      if (reduced || !listRef.current) return;
      anime({
        targets: Array.from(listRef.current.children),
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutExpo',
      });
    },
  });

  return (
    <section
      id="writing"
      ref={sectionRef}
      className={styles.writing}
      aria-labelledby="writing-heading"
    >
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Writing</p>
        <h2 id="writing-heading" className={styles.heading}>
          Notes &amp; Thoughts
        </h2>
        <p className={styles.sub}>
          Occasional writing on engineering, AI, and career growth.
        </p>
        <ul className={styles.list} ref={listRef}>
          {WRITING_POSTS.map((post) => (
            <li key={post.id} className={styles.post}>
              <div className={styles.postMeta}>
                <span className={styles.tag}>{post.tag}</span>
                <time className={styles.date} dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span className={styles.readTime}>{post.readTime} read</span>
              </div>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <button
                type="button"
                className={styles.readMore}
                aria-label={`Read: ${post.title}`}
                onClick={() => {/* future: open post */}}
              >
                Read more <ArrowRight aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Writing;
