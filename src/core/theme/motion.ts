/**
 * Centralized motion tokens — single source of truth for all animations.
 *
 * Durations follow a 3-tier scale (fast → normal → slow).
 * Easings use Material Design cubic-bezier curves.
 */

export const DURATION = {
  fast: "120ms",
  normal: "200ms",
  slow: "300ms",
} as const;

export const EASING = {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const;

type DurationKey = keyof typeof DURATION;
type EasingKey = keyof typeof EASING;

/**
 * Build a CSS `transition` value from one or more property descriptors.
 *
 * @example
 *   transition(["background-color", "box-shadow"])
 *   // → "background-color 200ms cubic-bezier(…), box-shadow 200ms cubic-bezier(…)"
 *
 *   transition(["transform"], "fast")
 *   // → "transform 120ms cubic-bezier(…)"
 */
export function transition(
  properties: string[],
  duration: DurationKey = "normal",
  easing: EasingKey = "standard",
): string {
  const d = DURATION[duration];
  const e = EASING[easing];
  return properties.map((p) => `${p} ${d} ${e}`).join(", ");
}

export const PRESS_SCALE = "scale(0.97)";
export const HOVER_LIFT = "scale(1.05)";

export const FADE_IN_KEYFRAME = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;
