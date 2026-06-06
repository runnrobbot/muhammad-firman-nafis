import { useRef } from 'react';
import { CONTACT_METHODS } from '../../data/contact';
import { useIntersectionAnimation } from '../../animations/hooks/useIntersectionAnimation';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { ContactRow } from './ContactRow';
import styles from './Contact.module.scss';
import anime from 'animejs';

export function Contact(): JSX.Element {
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
        translateY: [12, 0],
        delay: anime.stagger(70, { from: 'first' }),
        duration: 500,
        easing: 'easeOutExpo',
      });
    },
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.contact}
      aria-labelledby="contact-heading"
    >
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Contact</p>
        <h2 id="contact-heading" className={styles.heading}>
          Get In Touch
        </h2>
        <p className={styles.subheading}>
          Open to collaborations, opportunities, and interesting conversations. Pick a channel.
        </p>
        <ul className={styles.list} ref={listRef}>
          {CONTACT_METHODS.map((method) => (
            <ContactRow key={method.id} method={method} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
