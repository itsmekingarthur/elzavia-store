import { useCurrentFrame, interpolate, Easing, Img, staticFile, Sequence, Audio, Video } from "remotion";
import { COLORS, WIDTH, fadeIn, bounceIn, superElasticIn, glowPulse } from "./shared";
import { Particles, GlowRing } from "./Effects";

export const Scene5_CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera slowly pulls out
  const cameraScale = interpolate(frame, [0, 80], [1.1, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.42, 0, 0.58, 1),
  });

  const bgOpacity = fadeIn(frame, 20, 0);

  // Logo scale in
  const logoScale = superElasticIn(frame, 30, 28);
  const logoOpacity = fadeIn(frame, 20, 30);

  // CTA button
  const ctaOpacity = fadeIn(frame, 18, 10);
  const ctaScale = interpolate(frame, [10, 22, 30, 38, 44, 52, 58], [0.2, 1.2, 0.9, 1.08, 0.95, 1.03, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.12, 1, 0.3, 1),
  });

  // URL
  const urlOpacity = fadeIn(frame, 20, 52);

  // Expanding ring around button
  const ringScale = interpolate(frame, [10, 30], [0.8, 1.3], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.42, 0, 0.58, 1),
  });
  const ringOpacity = interpolate(frame, [10, 25, 30], [0.3, 0.1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Button glow pulsing continuously
  const btnGlow = glowPulse(frame, 10, 0.045);

  return (
    <div
      style={{
        width: WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #0b0f1a 0%, #0d1a12 60%, #0b0f1a 100%)",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Background video */}
      <Video
        src={staticFile("videos/bg-happy.mp4")}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.2,
        }}
        muted
      />

      <Sequence from={0} durationInFrames={80}>
        <Audio src={staticFile("audio/vo-5.wav")} />
      </Sequence>

      <Particles />
      <GlowRing size={600} color="rgba(245,158,11,0.08)" delay={0} />

      {/* Floating stars */}
      <Img
        src={staticFile("images/icon-star.png")}
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          left: "6%",
          top: "28%",
          opacity: 0.25,
          transform: `translateY(${Math.sin(frame * 0.022) * 18}px) rotate(${frame * 1.4}deg)`,
          filter: `drop-shadow(0 0 15px ${COLORS.goldGlow})`,
        }}
      />
      <Img
        src={staticFile("images/icon-star.png")}
        style={{
          position: "absolute",
          width: 55,
          height: 55,
          right: "8%",
          bottom: "28%",
          opacity: 0.2,
          transform: `translateY(${Math.sin(frame * 0.028 + 1) * 20}px) rotate(${-frame * 2}deg)`,
          filter: `drop-shadow(0 0 12px ${COLORS.goldGlow})`,
        }}
      />

      <Sequence from={2} durationInFrames={22}>
        <Audio src={staticFile("sfx/swoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence from={10} durationInFrames={16}>
        <Audio src={staticFile("sfx/click.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={48} durationInFrames={28}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={28} durationInFrames={14}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.2} />
      </Sequence>

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: bgOpacity, position: "relative", zIndex: 2,
      }}>
        {/* Logo */}
        <div style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Img
            src={staticFile("images/logo.png")}
            style={{
              height: 170,
              marginBottom: 18,
              filter: "brightness(0) invert(1)",
              opacity: 0.85,
            }}
          />
          <span style={{ fontSize: 28, color: COLORS.white30, fontFamily: "system-ui, sans-serif", letterSpacing: 3 }}>
            elzavia.shop
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            position: "relative",
          }}
        >
          {/* Expanding ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 360, height: 360,
            marginLeft: -180, marginTop: -180,
            borderRadius: "50%",
            border: `2px solid ${COLORS.goldGlow}`,
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
            pointerEvents: "none",
          }} />

          <div
            style={{
              padding: "32px 120px",
              borderRadius: 60,
              background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`,
              boxShadow: `0 0 ${80 + btnGlow * 70}px rgba(245,158,11,${0.25 + btnGlow * 0.4})`,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shine sweep */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)`,
              transform: `translateX(${-100 + ((frame * 4) % 200)}%)`,
              pointerEvents: "none",
            }} />
            <span style={{
              fontSize: 66, fontWeight: 900, color: "#0b0f1a",
              fontFamily: "system-ui, sans-serif",
            }}>
              طلب دابا
            </span>
          </div>
        </div>

        {/* URL */}
        <div style={{ opacity: urlOpacity, marginTop: 35 }}>
          <span style={{
            fontSize: 28, fontWeight: 500, color: COLORS.white50,
            fontFamily: "system-ui, sans-serif",
          }}>
            elzavia.shop
          </span>
        </div>
      </div>
    </div>
  );
};
