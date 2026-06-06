import styles from './SectionSkeleton.module.scss';

interface SectionSkeletonProps {
  minHeight?: string;
  className?: string;
}

export function SectionSkeleton({ minHeight = '400px', className }: SectionSkeletonProps) {
  return (
    <div
      className={`${styles.skeleton}${className ? ` ${className}` : ''}`}
      style={{ minHeight }}
      aria-hidden="true"
    />
  );
}

export default SectionSkeleton;
