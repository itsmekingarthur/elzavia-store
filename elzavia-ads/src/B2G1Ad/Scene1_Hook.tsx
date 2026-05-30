import { useCurrentFrame, Sequence, Audio, Video, staticFile, interpolate, Easing } from "remotion";
import {
  COLORS, WIDTH, fadeIn, bounceIn, zoomIn, elasticIn, superElasticIn, wobbleIn, glowPulse, scalePulse,
} from "./shared";
import { Particles, GlowRing } from "./Effects";

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = 1 + Math.sin(frame * 0.015) * 0.008;
  const cameraY = Math.sin(frame * 0.02) * 4;

  // Icon wobble
  const { scale: iconScale, rotation: iconRot } = wobbleIn(frame, 0, 28);

  return (
    <div
      style={{
        width: WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0b0f1a 0%, #1a0f0b 50%, #0b0f1a 100%)",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.08) 0%, transparent 60%)",
      }} />

      {/* Background video */}
      <Video
        src={staticFile("videos/bg-tired.mp4")}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.25,
        }}
        muted
      />

      <Sequence from={0} durationInFrames={90}>
        <Audio src={staticFile("audio/vo-1.wav")} />
      </Sequence>

      <GlowRing size={700} color="rgba(245,158,11,0.12)" delay={0} />
      <Particles />

      <Sequence from={2} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={35} durationInFrames={40}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.25} />
      </Sequence>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {/* Icon */}
        <div
          style={{
            fontSize: 140,
            opacity: fadeIn(frame, 10, 0),
            transform: `scale(${iconScale}) rotate(${iconRot}deg)`,
            marginBottom: 20,
            filter: `drop-shadow(0 0 50px rgba(245,158,11,${glowPulse(frame, 0, 0.03)}))`,
          }}
        >
          🎯
        </div>

        {/* Main text */}
        <div
          style={{
            opacity: fadeIn(frame, 15, 18),
            transform: `scale(${superElasticIn(frame, 18, 26)})`,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{
            fontSize: 90,
            fontWeight: 900,
            color: COLORS.gold,
            textAlign: "center",
            lineHeight: 1.3,
            padding: "0 20px",
            maxWidth: "90%",
            textShadow: `0 0 60px rgba(245,158,11,${glowPulse(frame, 20, 0.035)})`,
            fontFamily: "system-ui, sans-serif",
          }}>
            واش كاتعاني من الإرهاق
          </div>
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 15, 42),
            transform: `translateY(${(1 - fadeIn(frame, 15, 42)) * 40}px) scale(${superElasticIn(frame, 42, 24)})`,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{
            fontSize: 90,
            fontWeight: 900,
            color: COLORS.white,
            textAlign: "center",
            lineHeight: 1.3,
            padding: "0 20px",
            maxWidth: "90%",
            marginTop: 6,
            fontFamily: "system-ui, sans-serif",
            textShadow: `0 0 40px rgba(255,255,255,${glowPulse(frame, 42, 0.025) * 0.2})`,
          }}>
            والتعب كل نهار؟
          </div>
        </div>
      </div>
    </div>
  );
};
