// Animation config
export { ANIME_DEFAULTS, getBaseConfig } from './config';

// Timeline builders
export {
  buildHeroTimeline,
  buildLineDrawTimeline,
  buildCompletedItemsTimeline,
  buildRolePillarsTimeline,
} from './timelines';

// Magnetic utility
export { computeMagneticOffset } from './magnetic';

// Hooks
export { useReducedMotion } from './hooks/useReducedMotion';
export { useIntersectionAnimation } from './hooks/useIntersectionAnimation';
export { useAmbientAnimation } from './hooks/useAmbientAnimation';
export type { UseAmbientAnimationOptions } from './hooks/useAmbientAnimation';
// Note: useMagneticButton will be added in a subsequent task
export { useMagneticButton } from './hooks/useMagneticButton';
export { useScrollReveal } from './hooks/useScrollReveal';
export type { RevealItem } from './hooks/useScrollReveal';
