export const ANIME_DEFAULTS = {
  easing: 'easeOutExpo' as const,
  duration: {
    fast: 400,
    medium: 600,
    slow: 900,
  },
  stagger: {
    wordRevealMin: 30,
    wordRevealMax: 80,
    sectionItem: 100,
    rolesPillar: 150,
  },
} as const;

export function getBaseConfig() {
  return {
    easing: ANIME_DEFAULTS.easing,
  };
}
