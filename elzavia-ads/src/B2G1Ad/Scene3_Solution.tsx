import { useCurrentFrame, interpolate, Easing, Img, staticFile, Sequence, Audio, Video } from "remotion";
import { COLORS, WIDTH, fadeIn, bounceIn, superElasticIn, glowPulse, wobbleIn } from "./shared";
import { Particles, GlowRing } from "./Effects";

const products = [
  { src: staticFile("images/product-1.jpeg"), name: "الكبسولات الذهبية للطاقة", price: "199" },
  { src: staticFile("images/product-2.jpeg"), name: "كبسولات التعافي العضلي", price: "199" },
];

export const Scene3_Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = 1 + Math.sin(frame * 0.01) * 0.004;

  // Title
  const titleOpacity = fadeIn(frame, 15, 0);
  const titleScale = superElasticIn(frame, 0, 26);

  // Badge
  const badgeOpacity = fadeIn(frame, 18, 55);
  const badgeBounce = bounceIn(frame, 55, 22);

  return (
    <div
      style={{
        width: WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(170deg, #0b0f1a 0%, #061a11 50%, #0a0f1a 100%)",
        position: "relative",
        overflow: "hidden",
        transform: `scale(${cameraScale})`,
      }}
    >
      {/* Background video */}
      <Video
        src={staticFile("videos/bg-products.mp4")}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.2,
        }}
        muted
      />

      <Sequence from={0} durationInFrames={120}>
        <Audio src={staticFile("audio/vo-3.wav")} />
      </Sequence>

      <Particles />
      <GlowRing size={900} color="rgba(16,185,129,0.08)" delay={0} />

      <Sequence from={2} durationInFrames={25}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.25} />
      </Sequence>

      {/* Title */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: COLORS.emerald,
          textAlign: "center",
          marginBottom: 50,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: `0 0 60px ${COLORS.emeraldGlow}`,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        الحل الطبيعي مع Elzavia
      </div>

      {/* Products */}
      <div style={{ display: "flex", gap: 40, justifyContent: "center", alignItems: "center", position: "relative" }}>
        {products.map((product, i) => {
          const delay = 18 + i * 15;
          const p = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const floatY = Math.sin((frame - delay) * 0.05 + i * 1.5) * 8;

          return (
            <div key={i}>
              <Sequence from={delay + 3} durationInFrames={14}>
                <Audio src={staticFile("sfx/ding.wav")} volume={0.25} />
              </Sequence>
              <Sequence from={delay} durationInFrames={6}>
                <Audio src={staticFile("sfx/pop.wav")} volume={0.2} />
              </Sequence>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: p,
                  transform: `translateY(${(1 - p) * 80 + floatY}px)`,
                  width: 380,
                }}
              >
                <div style={{ position: "relative" }}>
                  <Img
                    src={product.src}
                    style={{
                      width: 420,
                      height: 420,
                      objectFit: "contain",
                      marginBottom: 10,
                      filter: `drop-shadow(0 25px 60px rgba(16,185,129,${0.25 + glowPulse(frame, delay, 0.03) * 0.15}))`,
                    }}
                  />
                </div>
                <span style={{
                  fontSize: 32, fontWeight: 700, color: COLORS.white, textAlign: "center",
                  lineHeight: 1.3, fontFamily: "system-ui, sans-serif",
                }}>
                  {product.name}
                </span>
                <span style={{
                  fontSize: 42, fontWeight: 900, color: COLORS.gold, marginTop: 6,
                  fontFamily: "system-ui, sans-serif",
                  textShadow: `0 0 30px ${COLORS.goldGlow}`,
                }}>
                  {product.price} درهم
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge with leaf icon */}
      <div
        style={{
          marginTop: 45,
          padding: "18px 55px",
          borderRadius: 50,
          border: `1px solid ${COLORS.emeraldGlow}`,
          background: "rgba(16,185,129,0.1)",
          opacity: badgeOpacity,
          transform: `scale(${badgeBounce})`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Img
          src={staticFile("images/icon-leaf.png")}
          style={{
            width: 40,
            height: 40,
            opacity: 0.9,
            filter: `drop-shadow(0 0 12px ${COLORS.emeraldGlow})`,
          }}
        />
        <span style={{
          fontSize: 34, fontWeight: 700, color: COLORS.emeraldLight,
          fontFamily: "system-ui, sans-serif",
        }}>
          منتجات طبيعية 100%
        </span>
      </div>
    </div>
  );
};
