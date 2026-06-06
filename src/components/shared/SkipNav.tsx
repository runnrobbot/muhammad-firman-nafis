import styles from './SkipNav.module.scss';

export function SkipNav() {
  return (
    <a href="#main-content" className={styles.skipNav}>
      Skip to main content
    </a>
  );
}

export default SkipNav;
