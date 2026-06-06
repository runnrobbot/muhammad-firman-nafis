import anime from 'animejs';
import { ANIME_DEFAULTS } from './config';

/**
 * Builds the Hero section entrance timeline.
 * Returns an anime timeline ready to be played.
 */
export function buildHeroTimeline(params: {
  wordEls: HTMLElement[];
  supportingEl: HTMLElement;
  ctaEls: HTMLElement[];
}): anime.AnimeTimelineInstance {
  const tl = anime.timeline({
    easing: ANIME_DEFAULTS.easing,
    autoplay: false,
  });

  // Word-by-word reveal
  tl.add({
    targets: params.wordEls,
    opacity: [0, 1],
    translateY: [12, 0],
    delay: anime.stagger(50, { from: 'first' }), // 50ms is within the 30–80ms range
    duration: ANIME_DEFAULTS.duration.medium,
  });

  // Supporting text (begins after the last word finishes)
  tl.add({
    targets: params.supportingEl,
    opacity: [0, 1],
    translateY: [8, 0],
    duration: ANIME_DEFAULTS.duration.medium,
  });

  // CTA buttons (begins after supporting text finishes)
  tl.add({
    targets: params.ctaEls,
    opacity: [0, 1],
    translateY: [8, 0],
    delay: anime.stagger(80),
    duration: ANIME_DEFAULTS.duration.fast,
  });

  return tl;
}

/**
 * Builds the SVG path drawing animation for a single timeline connector.
 */
export function buildLineDrawTimeline(pathEl: SVGPathElement): anime.AnimeInstance {
  return anime({
    targets: pathEl,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: ANIME_DEFAULTS.easing,
    duration: ANIME_DEFAULTS.duration.slow,
    autoplay: false,
  });
}

/**
 * Builds the staggered reveal for Currently Exploring completed items.
 * Each item's animation starts 100ms after the previous completes.
 */
export function buildCompletedItemsTimeline(itemEls: HTMLElement[]): anime.AnimeTimelineInstance {
  const tl = anime.timeline({ easing: ANIME_DEFAULTS.easing, autoplay: false });
  itemEls.forEach((el, i) => {
    tl.add(
      {
        targets: el,
        opacity: [0, 1],
        translateY: [8, 0],
        duration: ANIME_DEFAULTS.duration.fast,
      },
      i === 0 ? 0 : `+=${ANIME_DEFAULTS.stagger.sectionItem}`, // 100ms after previous completes
    );
  });
  return tl;
}

/**
 * Builds the two-pillar entrance animation for the Current Role section.
 * AI pillar begins ≥ 150ms after DevOps pillar.
 */
export function buildRolePillarsTimeline(params: {
  devopsEl: HTMLElement;
  aiEl: HTMLElement;
}): anime.AnimeTimelineInstance {
  const tl = anime.timeline({ easing: ANIME_DEFAULTS.easing, autoplay: false });

  tl.add({
    targets: params.devopsEl,
    opacity: [0, 1],
    translateY: [16, 0],
    duration: ANIME_DEFAULTS.duration.medium,
  });

  tl.add(
    {
      targets: params.aiEl,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: ANIME_DEFAULTS.duration.medium,
    },
    `+=${ANIME_DEFAULTS.stagger.rolesPillar}`, // 150ms after DevOps starts (overlaps)
  );

  return tl;
}
