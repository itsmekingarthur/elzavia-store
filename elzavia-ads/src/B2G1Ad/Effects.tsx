import { useCurrentFrame } from "remotion";
import { COLORS, WIDTH, HEIGHT } from "./shared";

const PARTICLE_COUNT = 30;

export function Particles() {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const x = ((i * 137.5 + frame * 0.2) % WIDTH);
        const y = ((i * 89.3 + frame * 0.15 + Math.sin(frame * 0.02 + i) * 30) % HEIGHT);
        const size = 2 + (i % 3) * 2;
        const opacity = 0.15 + (i % 5) * 0.05;
        const color = i % 3 === 0 ? COLORS.gold : i % 3 === 1 ? COLORS.emerald : "#ffffff";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              transform: `scale(${0.5 + Math.sin(frame * 0.03 + i * 0.5) * 0.5})`,
              transition: "none",
            }}
          />
        );
      })}
    </div>
  );
}

// Glow ring that pulses
export function GlowRing({ size = 600, color = COLORS.goldGlow, delay = 0 }: { size?: number; color?: string; delay?: number }) {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delay);
  const scale = 1 + Math.sin(localFrame * 0.04) * 0.15;
  const opacity = 0.3 + Math.sin(localFrame * 0.04) * 0.15;

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        top: "50%",
        left: "50%",
        pointerEvents: "none",
      }}
    />
  );
}

// Horizontal shine sweep across an element
export function ShineSweep({ frame, delay = 0, duration = 20 }: { frame: number; delay?: number; duration?: number }) {
  const progress = Math.max(0, Math.min(1, (frame - delay) / duration));
  const x = -100 + progress * 200;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(90deg, transparent 0%, transparent ${Math.max(0, x - 10)}%, rgba(255,255,255,0.15) ${x}%, transparent ${Math.min(100, x + 10)}%, transparent 100%)`,
        pointerEvents: "none",
      }}
    />
  );
}
