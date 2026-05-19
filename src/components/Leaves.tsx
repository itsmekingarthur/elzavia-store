"use client";

import { useEffect, useState } from "react";

interface LeafProps {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function Leaf({ className, style, children }: LeafProps) {
  return (
    <svg className={className} viewBox="0 0 200 300" fill="none" style={style}>
      {children}
    </svg>
  );
}

function OliveLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 Q5 200 20 100 Q30 20 100 10 Q170 20 180 100 Q195 200 100 280Z" fill={color} />
      <path d="M100 280 L100 20" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d="M100 240 Q60 200 40 160" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M100 240 Q140 200 160 160" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M100 200 Q70 170 55 140" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 200 Q130 170 145 140" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 160 Q80 140 70 110" stroke="rgba(0,0,0,0.06)" strokeWidth="0.7" />
      <path d="M100 160 Q120 140 130 110" stroke="rgba(0,0,0,0.06)" strokeWidth="0.7" />
      <path d="M100 280 L98 295 Q100 298 102 295 L100 280" fill="rgba(0,0,0,0.2)" />
    </>
  );
}

function OakLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 Q95 260 80 240 Q50 220 40 190 Q30 160 45 140 Q55 125 50 100 Q45 70 60 50 Q75 30 85 20 Q95 10 100 5 Q105 10 115 20 Q125 30 140 50 Q155 70 150 100 Q145 125 155 140 Q170 160 160 190 Q150 220 120 240 Q105 260 100 280Z" fill={color} />
      <path d="M100 280 L100 15" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d="M100 250 Q75 230 60 210" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M100 250 Q125 230 140 210" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M100 210 Q70 190 50 170" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 210 Q130 190 150 170" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 170 Q80 155 70 130" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      <path d="M100 170 Q120 155 130 130" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      <path d="M100 130 Q85 115 80 95" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
      <path d="M100 130 Q115 115 120 95" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
      <path d="M100 280 L97 295 Q100 298 103 295 L100 280" fill="rgba(0,0,0,0.2)" />
    </>
  );
}

function MapleLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 L100 200 L70 230 L60 190 L40 210 L35 160 L15 170 L25 120 L5 110 L30 80 L15 55 L55 55 L65 25 L100 5 L135 25 L145 55 L185 55 L170 80 L195 110 L175 120 L185 170 L165 160 L160 210 L140 190 L130 230 L100 200 L100 280Z" fill={color} />
      <path d="M100 280 L100 20" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
      <path d="M100 180 L75 200" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 180 L125 200" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 140 L65 155" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      <path d="M100 140 L135 155" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      <path d="M100 100 L70 110" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
      <path d="M100 100 L130 110" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
      <path d="M100 280 L97 295 Q100 298 103 295 L100 280" fill="rgba(0,0,0,0.2)" />
    </>
  );
}

function HeartLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 Q95 260 80 240 Q40 210 25 170 Q10 130 25 95 Q40 60 70 40 Q85 30 95 20 Q100 10 100 5 Q100 10 105 20 Q115 30 130 40 Q160 60 175 95 Q190 130 175 170 Q160 210 120 240 Q105 260 100 280Z" fill={color} />
      <path d="M100 280 L100 15" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d="M100 250 Q75 230 55 200" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M100 250 Q125 230 145 200" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M100 210 Q80 195 65 170" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 210 Q120 195 135 170" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
      <path d="M100 170 Q85 158 75 140" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      <path d="M100 170 Q115 158 125 140" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
      <path d="M100 280 L97 295 Q100 298 103 295 L100 280" fill="rgba(0,0,0,0.2)" />
    </>
  );
}

function FernFrond({ color }: { color: string }) {
  return (
    <>
      <path d="M100 290 Q95 200 90 120 Q85 60 100 5 Q115 60 110 120 Q105 200 100 290Z" fill={color} />
      <path d="M100 290 L100 15" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" />
      <path d="M100 260 Q70 250 50 235" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <path d="M100 260 Q130 250 150 235" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      <path d="M100 230 Q65 215 45 200" stroke="rgba(0,0,0,0.08)" strokeWidth="0.7" />
      <path d="M100 230 Q135 215 155 200" stroke="rgba(0,0,0,0.08)" strokeWidth="0.7" />
      <path d="M100 200 Q60 185 40 170" stroke="rgba(0,0,0,0.07)" strokeWidth="0.6" />
      <path d="M100 200 Q140 185 160 170" stroke="rgba(0,0,0,0.07)" strokeWidth="0.6" />
      <path d="M100 170 Q55 155 35 140" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
      <path d="M100 170 Q145 155 165 140" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
      <path d="M100 140 Q50 125 30 110" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d="M100 140 Q150 125 170 110" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d="M100 290 L97 300 Q100 302 103 300 L100 290" fill="rgba(0,0,0,0.2)" />
    </>
  );
}

function GrassBlade({ color }: { color: string }) {
  return (
    <>
      <path d="M100 285 Q80 190 70 100 Q65 50 95 5 Q98 2 100 0 Q102 2 105 5 Q135 50 130 100 Q120 190 100 285Z" fill={color} />
      <path d="M100 285 L100 10" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
      <path d="M100 240 Q85 220 78 195" stroke="rgba(0,0,0,0.07)" strokeWidth="0.6" />
      <path d="M100 240 Q115 220 122 195" stroke="rgba(0,0,0,0.07)" strokeWidth="0.6" />
      <path d="M100 190 Q88 175 82 155" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
      <path d="M100 190 Q112 175 118 155" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
    </>
  );
}

const leaves = [
  { LeafComponent: OliveLeaf, colors: ["rgba(5,150,105,0.08)", "rgba(16,185,129,0.06)", "rgba(4,120,87,0.07)"] },
  { LeafComponent: OakLeaf, colors: ["rgba(245,158,11,0.08)", "rgba(217,119,6,0.06)", "rgba(180,83,9,0.07)"] },
  { LeafComponent: MapleLeaf, colors: ["rgba(239,68,68,0.07)", "rgba(220,38,38,0.05)", "rgba(185,28,28,0.06)"] },
  { LeafComponent: HeartLeaf, colors: ["rgba(16,185,129,0.08)", "rgba(5,150,105,0.06)", "rgba(52,211,153,0.07)"] },
  { LeafComponent: FernFrond, colors: ["rgba(22,163,74,0.08)", "rgba(34,197,94,0.06)", "rgba(21,128,61,0.07)"] },
  { LeafComponent: GrassBlade, colors: ["rgba(5,150,105,0.06)", "rgba(16,185,129,0.05)", "rgba(4,120,87,0.05)"] },
];

const positions = [
  { top: "5%", left: "2%", w: "w-32 md:w-48", rotation: -15, speed: 0.02, delay: 0 },
  { top: "12%", right: "3%", w: "w-28 md:w-40", rotation: 25, speed: -0.015, delay: 0.5 },
  { top: "35%", left: "5%", w: "w-24 md:w-36", rotation: -35, speed: -0.025, delay: 1 },
  { top: "45%", right: "5%", w: "w-20 md:w-32", rotation: 40, speed: 0.03, delay: 0.3 },
  { top: "60%", left: "3%", w: "w-36 md:w-52", rotation: -10, speed: 0.015, delay: 0.8 },
  { top: "70%", right: "2%", w: "w-28 md:w-44", rotation: 20, speed: -0.02, delay: 1.2 },
  { top: "82%", left: "6%", w: "w-20 md:w-30", rotation: -50, speed: 0.025, delay: 0.2 },
  { top: "90%", right: "6%", w: "w-24 md:w-38", rotation: 30, speed: -0.01, delay: 0.6 },
  { top: "25%", left: "12%", w: "w-16 md:w-24", rotation: 60, speed: 0.018, delay: 1.5 },
  { top: "55%", right: "12%", w: "w-14 md:w-22", rotation: -45, speed: -0.022, delay: 0.9 },
  { top: "75%", left: "15%", w: "w-12 md:w-20", rotation: 70, speed: 0.01, delay: 1.8 },
  { top: "15%", left: "25%", w: "w-10 md:w-16", rotation: -25, speed: -0.018, delay: 0.4 },
  { top: "50%", left: "20%", w: "w-8 md:w-14", rotation: 55, speed: 0.022, delay: 1.1 },
  { top: "85%", right: "18%", w: "w-10 md:w-18", rotation: -65, speed: -0.015, delay: 0.7 },
  { top: "30%", right: "20%", w: "w-9 md:w-15", rotation: 15, speed: 0.028, delay: 1.4 },
  { top: "8%", right: "15%", w: "w-8 md:w-14", rotation: -80, speed: -0.012, delay: 2 },
  { top: "65%", left: "22%", w: "w-7 md:w-12", rotation: 35, speed: 0.016, delay: 0.1 },
  { top: "40%", right: "25%", w: "w-6 md:w-10", rotation: -55, speed: -0.024, delay: 1.6 },
];

export default function Leaves({ className = "" }: { className?: string }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`pointer-events-none select-none fixed inset-0 z-0 overflow-hidden ${className}`}>
      {positions.map((pos, i) => {
        const { LeafComponent, colors } = leaves[i % leaves.length];
        const color = colors[i % colors.length];
        const offset = (factor: number) => scrollY * factor;
        const opacity = Math.min(0.9, 0.15 + scrollY / 1500);

        return (
          <div
            key={i}
            className={`absolute ${pos.w}`}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: `translateY(${offset(pos.speed)}px) rotate(${pos.rotation}deg)`,
              opacity,
            }}
          >
            <LeafComponent color={color} />
          </div>
        );
      })}
    </div>
  );
}
