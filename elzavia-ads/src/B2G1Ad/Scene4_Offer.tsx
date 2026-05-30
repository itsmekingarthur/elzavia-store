import { useCurrentFrame, interpolate, Easing, Sequence, Audio, Video, Img, staticFile } from "remotion";
import { COLORS, WIDTH, fadeIn, bounceIn, elasticIn, superElasticIn, glowPulse } from "./shared";
import { Particles, GlowRing } from "./Effects";

export const Scene4_Offer: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = 1 + Math.sin(frame * 0.014) * 0.006;
  const cameraRotate = Math.sin(frame * 0.012) * 0.3;

  // Main offer text
  const mainOpacity = fadeIn(frame, 18, 0);
  const mainScale = superElasticIn(frame, 0, 28);

  // Sub text 
  const subOpacity = fadeIn(frame, 15, 25);
  const subSlide = interpolate(frame, [25, 38], [70, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.12, 1, 0.3, 1),
  });

  // Old price (strikethrough)
  const oldPriceOpacity = fadeIn(frame, 15, 40);
  const oldPriceX = interpolate(frame, [40, 55], [-100, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // New price (explosive reveal)
  const newPriceOpacity = fadeIn(frame, 18, 55);
  const newPriceScale = interpolate(frame, [55, 63, 72, 80, 88], [0, 2.2, 0.7, 1.15, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.12, 1, 0.3, 1),
  });
  const newPriceRotate = interpolate(frame, [55, 63, 72, 80], [0, 10, -5, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Discount badge
  const badgeOpacity = fadeIn(frame, 15, 0);
  const badgeScale = bounceIn(frame, 0, 20);

  // Floating stars - wider orbit
  const star1Y = Math.sin(frame * 0.03) * 28;
  const star1X = Math.cos(frame * 0.025) * 20;
  const star2Y = Math.sin(frame * 0.035 + 2) * 32;
  const star2X = Math.cos(frame * 0.03 + 2) * 22;
  // Third star
  const star3Y = Math.sin(frame * 0.04 + 4) * 35;
  const star3X = Math.cos(frame * 0.035 + 4) * 28;

  return (
    <div
      style={{
        width: WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0b0f1a 0%, #1a120b 40%, #0b0f1a 100%)",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${cameraScale}) rotate(${cameraRotate}deg)`,
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

      <Sequence from={0} durationInFrames={100}>
        <Audio src={staticFile("audio/vo-4.wav")} />
      </Sequence>

      <Particles />
      <GlowRing size={800} color="rgba(245,158,11,0.1)" delay={0} />

      {/* Floating star left */}
      <Img
        src={staticFile("images/icon-star.png")}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          left: "8%",
          top: "22%",
          opacity: 0.35,
          transform: `translate(${star1X}px, ${star1Y}px) rotate(${frame * 1.8}deg)`,
          filter: `drop-shadow(0 0 20px ${COLORS.goldGlow})`,
        }}
      />
      {/* Floating star right */}
      <Img
        src={staticFile("images/icon-star.png")}
        style={{
          position: "absolute",
          width: 65,
          height: 65,
          right: "10%",
          top: "18%",
          opacity: 0.25,
          transform: `translate(${star2X}px, ${star2Y}px) rotate(${-frame * 2.2}deg)`,
          filter: `drop-shadow(0 0 15px ${COLORS.goldGlow})`,
        }}
      />
      {/* Floating star bottom */}
      <Img
        src={staticFile("images/icon-star.png")}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          left: "15%",
          bottom: "25%",
          opacity: 0.2,
          transform: `translate(${star3X}px, ${star3Y}px) rotate(${frame * 1.5 + 45}deg)`,
          filter: `drop-shadow(0 0 12px ${COLORS.goldGlow})`,
        }}
      />

      <Sequence from={2} durationInFrames={22}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      <Sequence from={55} durationInFrames={30}>
        <Audio src={staticFile("sfx/brighding.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={62} durationInFrames={22}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.25} />
      </Sequence>

      {/* Discount badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          marginBottom: 25,
          padding: "14px 45px",
          borderRadius: 40,
          background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))",
          border: `1px solid ${COLORS.goldGlow}`,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 800, color: COLORS.goldLight, fontFamily: "system-ui, sans-serif" }}>
          🎁 عرض خاص جداً
        </span>
      </div>

      {/* Main offer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 25,
          opacity: mainOpacity,
          transform: `scale(${mainScale})`,
        }}
      >
        <span style={{ fontSize: 72 }}>🎁</span>
        <span
          style={{
            fontSize: 74,
            fontWeight: 900,
            color: COLORS.gold,
            textAlign: "center",
            lineHeight: 1.2,
            fontFamily: "system-ui, sans-serif",
            textShadow: `0 0 70px ${COLORS.goldGlow}`,
          }}
        >
          شري 2 وخود
          <br />
          الثالث فابور
        </span>
      </div>

      {/* Free delivery */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 35,
          opacity: subOpacity,
          transform: `translateY(${subSlide}px)`,
        }}
      >
        <span style={{ fontSize: 42 }}>🚚</span>
        <span
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.emeraldLight,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          والتوصيل راه مجاني
        </span>
      </div>

      {/* Price divider */}
      <div style={{
        width: "60%", height: 1,
        background: `linear-gradient(90deg, transparent, ${COLORS.goldGlow}, transparent)`,
        marginBottom: 25, opacity: oldPriceOpacity,
      }} />

      {/* Old price */}
      <div style={{ opacity: oldPriceOpacity, transform: `translateX(${oldPriceX}px)`, marginBottom: 8 }}>
        <span style={{
          fontSize: 52, fontWeight: 700, color: COLORS.white30,
          textDecoration: "line-through", fontFamily: "system-ui, sans-serif",
        }}>
          398 درهم
        </span>
      </div>

      {/* New price */}
      <div
        style={{
          opacity: newPriceOpacity,
          transform: `scale(${newPriceScale}) rotate(${newPriceRotate}deg)`,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{
          fontSize: 96, fontWeight: 900, color: COLORS.gold,
          fontFamily: "system-ui, sans-serif",
          textShadow: `0 0 100px ${COLORS.goldGlowStrong}`,
        }}>
          323 درهم
        </span>
        <Img
          src={staticFile("images/icon-sparkle.png")}
          style={{
            width: 64,
            height: 64,
            display: "inline-block",
            transform: `rotate(${frame * 4}deg)`,
            opacity: glowPulse(frame, 60, 0.055),
            filter: `drop-shadow(0 0 20px ${COLORS.goldGlow})`,
          }}
        />
      </div>
    </div>
  );
};
