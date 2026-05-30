import { interpolate, Easing } from "remotion";

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

export const COLORS = {
  bg: "#0b0f1a",
  bgLight: "#111827",
  gold: "#F59E0B",
  goldLight: "#FCD34D",
  goldDark: "#D97706",
  emerald: "#10B981",
  emeraldLight: "#34D399",
  emeraldDark: "#059669",
  white: "#FFFFFF",
  white70: "rgba(255,255,255,0.7)",
  white50: "rgba(255,255,255,0.5)",
  white30: "rgba(255,255,255,0.3)",
  white15: "rgba(255,255,255,0.15)",
  goldGlow: "rgba(245,158,11,0.3)",
  goldGlowStrong: "rgba(245,158,11,0.5)",
  emeraldGlow: "rgba(16,185,129,0.3)",
  emeraldGlowStrong: "rgba(16,185,129,0.5)",
};

export const SCENE_DURATIONS = {
  hook: 90,
  problem: 90,
  solution: 120,
  offer: 100,
  cta: 80,
};
export const TOTAL_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
// Cumulatives
export const SCENE_STARTS = {
  hook: 0,
  problem: SCENE_DURATIONS.hook,
  solution: SCENE_DURATIONS.hook + SCENE_DURATIONS.problem,
  offer: SCENE_DURATIONS.hook + SCENE_DURATIONS.problem + SCENE_DURATIONS.solution,
  cta: SCENE_DURATIONS.hook + SCENE_DURATIONS.problem + SCENE_DURATIONS.solution + SCENE_DURATIONS.offer,
} as const;

export function fadeIn(frame: number, duration = 15, delay = 0) {
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
}

export function bounceIn(frame: number, delay = 0, duration = 25) {
  return interpolate(frame, [delay, delay + duration * 0.4, delay + duration * 0.7, delay + duration], [0, 1.2, 0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
}

export function elasticIn(frame: number, delay = 0, duration = 30) {
  return interpolate(frame, [delay, delay + duration * 0.25, delay + duration * 0.5, delay + duration * 0.7, delay + duration * 0.85, delay + duration], [0, 1.4, 0.8, 1.1, 0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
}

export function superElasticIn(frame: number, delay = 0, duration = 30) {
  return interpolate(frame, [delay, delay + duration * 0.18, delay + duration * 0.4, delay + duration * 0.6, delay + duration * 0.78, delay + duration * 0.92, delay + duration], [0, 1.8, 0.6, 1.3, 0.8, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
}

export function wobbleIn(frame: number, delay = 0, duration = 25) {
  const progress = interpolate(frame, [delay, delay + duration * 0.3, delay + duration * 0.5, delay + duration * 0.65, delay + duration * 0.78, delay + duration * 0.88, delay + duration], [0, 1.3, 0.9, 1.15, 0.95, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.12, 1, 0.3, 1),
  });
  const rotate = interpolate(frame, [delay, delay + duration * 0.25, delay + duration * 0.5, delay + duration * 1], [0, -8, 5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return { scale: progress, rotation: rotate };
}

export function zoomIn(frame: number, delay = 0, duration = 20) {
  return interpolate(frame, [delay, delay + duration], [1.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
}

export function slideFrom(
  frame: number,
  delay = 0,
  duration = 20,
  dir: "left" | "right" | "top" | "bottom" = "bottom"
) {
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const dist = 150;
  const x = dir === "left" ? -dist : dir === "right" ? dist : 0;
  const y = dir === "top" ? -dist : dir === "bottom" ? dist : 0;
  return { opacity: progress, transform: `translate(${x * (1 - progress)}px, ${y * (1 - progress)}px)` };
}

export function scalePulse(frame: number, delay = 0, speed = 0.03) {
  const t = Math.max(0, frame - delay);
  return 1 + Math.sin(t * speed * Math.PI * 2) * 0.04;
}

export function glowPulse(frame: number, delay = 0, speed = 0.03) {
  const t = Math.max(0, frame - delay);
  return 0.6 + Math.sin(t * speed * Math.PI * 2) * 0.3;
}

export {
  interpolate,
  Easing,
};
