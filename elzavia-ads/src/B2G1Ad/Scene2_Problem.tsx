import { useCurrentFrame, interpolate, Easing, Sequence, Audio, Video, staticFile } from "remotion";
import {
  COLORS, WIDTH, bounceIn, fadeIn, glowPulse,
} from "./shared";
import { Particles } from "./Effects";

const items = [
  { icon: "😴", text: "النعاس خايب؟", dir: "left" as const },
  { icon: "⚡", text: "الطاقة ديالك ناقصة؟", dir: "right" as const },
  { icon: "😫", text: "الضغط بزاف؟", dir: "left" as const },
];

export const Scene2_Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = 1 + Math.sin(frame * 0.015) * 0.005;

  return (
    <div
      style={{
        width: WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #0b0f1a 0%, #111018 50%, #0b0f1a 100%)",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Background video */}
      <Video
        src={staticFile("videos/bg-tired.mp4")}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.2,
        }}
        muted
      />

      <Sequence from={0} durationInFrames={90}>
        <Audio src={staticFile("audio/vo-2.wav")} />
      </Sequence>

      <Particles />

      {items.map((item, i) => {
        const itemStart = i * 25;
        const itemEnd = itemStart + 40;
        const dist = item.dir === "left" ? -300 : 300;

        const opacity = interpolate(
          frame,
          [itemStart, itemStart + 10, itemEnd - 5, itemEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }
        );

        const scale = interpolate(frame, [itemStart, itemStart + 12, itemStart + 17], [0.3, 1.35, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.12, 1, 0.3, 1),
        });

        const x = interpolate(frame, [itemStart, itemStart + 13], [dist, 0], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.12, 1, 0.3, 1),
        });

        const iconBounce = 1 + Math.max(0, Math.sin((frame - itemStart) * 0.28) * 0.3 * Math.max(0, 1 - (frame - itemStart) / 13));

        return (
          <div key={i}>
            <Sequence from={itemStart + 3} durationInFrames={12}>
              <Audio src={staticFile("sfx/thud.wav")} volume={0.25} />
            </Sequence>
            <Sequence from={itemStart + 1} durationInFrames={6}>
              <Audio src={staticFile("sfx/swoosh.wav")} volume={0.2} />
            </Sequence>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                opacity,
                transform: `translateX(${x}px) scale(${scale})`,
                marginBottom: 55,
              }}
            >
              <span
                style={{
                  fontSize: 110,
                  display: "inline-block",
                  transform: `scale(${iconBounce})`,
                  filter: `drop-shadow(0 0 35px rgba(245,158,11,${Math.max(0, glowPulse(frame, itemStart, 0.06) - 0.15)}))`,
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  fontSize: 74,
                  fontWeight: 800,
                  color: COLORS.white,
                  fontFamily: "system-ui, sans-serif",
                  textShadow: `0 0 40px rgba(255,255,255,${opacity * 0.18})`,
                }}
              >
                {item.text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
