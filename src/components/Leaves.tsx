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
      <path d="M100 280 L100 20" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <path d="M100 240 Q60 200 40 160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M100 240 Q140 200 160 160" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M100 200 Q70 170 55 140" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 200 Q130 170 145 140" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 160 Q80 140 70 110" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
      <path d="M100 160 Q120 140 130 110" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
    </>
  );
}

function OakLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 Q95 260 80 240 Q50 220 40 190 Q30 160 45 140 Q55 125 50 100 Q45 70 60 50 Q75 30 85 20 Q95 10 100 5 Q105 10 115 20 Q125 30 140 50 Q155 70 150 100 Q145 125 155 140 Q170 160 160 190 Q150 220 120 240 Q105 260 100 280Z" fill={color} />
      <path d="M100 280 L100 15" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <path d="M100 250 Q75 230 60 210" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M100 250 Q125 230 140 210" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M100 210 Q70 190 50 170" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 210 Q130 190 150 170" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 170 Q80 155 70 130" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
      <path d="M100 170 Q120 155 130 130" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
      <path d="M100 130 Q85 115 80 95" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      <path d="M100 130 Q115 115 120 95" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
    </>
  );
}

function MapleLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 L100 200 L70 230 L60 190 L40 210 L35 160 L15 170 L25 120 L5 110 L30 80 L15 55 L55 55 L65 25 L100 5 L135 25 L145 55 L185 55 L170 80 L195 110 L175 120 L185 170 L165 160 L160 210 L140 190 L130 230 L100 200 L100 280Z" fill={color} />
      <path d="M100 280 L100 20" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
      <path d="M100 180 L75 200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 180 L125 200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 140 L65 155" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
      <path d="M100 140 L135 155" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
      <path d="M100 100 L70 110" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      <path d="M100 100 L130 110" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
    </>
  );
}

function HeartLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 Q95 260 80 240 Q40 210 25 170 Q10 130 25 95 Q40 60 70 40 Q85 30 95 20 Q100 10 100 5 Q100 10 105 20 Q115 30 130 40 Q160 60 175 95 Q190 130 175 170 Q160 210 120 240 Q105 260 100 280Z" fill={color} />
      <path d="M100 280 L100 15" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <path d="M100 250 Q75 230 55 200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M100 250 Q125 230 145 200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M100 210 Q80 195 65 170" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 210 Q120 195 135 170" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <path d="M100 170 Q85 158 75 140" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
      <path d="M100 170 Q115 158 125 140" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
    </>
  );
}

function FernFrond({ color }: { color: string }) {
  return (
    <>
      <path d="M100 290 Q95 200 90 120 Q85 60 100 5 Q115 60 110 120 Q105 200 100 290Z" fill={color} />
      <path d="M100 290 L100 15" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
      <path d="M100 260 Q70 250 50 235" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <path d="M100 260 Q130 250 150 235" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <path d="M100 230 Q65 215 45 200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
      <path d="M100 230 Q135 215 155 200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
      <path d="M100 200 Q60 185 40 170" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      <path d="M100 200 Q140 185 160 170" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      <path d="M100 170 Q55 155 35 140" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      <path d="M100 170 Q145 155 165 140" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      <path d="M100 140 Q50 125 30 110" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <path d="M100 140 Q150 125 170 110" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
    </>
  );
}

function GrassBlade({ color }: { color: string }) {
  return (
    <>
      <path d="M100 285 Q80 190 70 100 Q65 50 95 5 Q98 2 100 0 Q102 2 105 5 Q135 50 130 100 Q120 190 100 285Z" fill={color} />
      <path d="M100 285 L100 10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M100 240 Q85 220 78 195" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      <path d="M100 240 Q115 220 122 195" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
      <path d="M100 190 Q88 175 82 155" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      <path d="M100 190 Q112 175 118 155" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
    </>
  );
}

function BranchLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 600" fill="none">
      <path d="M 280 580 Q 220 500 180 420 Q 140 340 130 280 Q 120 220 140 160 Q 160 100 200 60" stroke="rgba(120,80,40,0.3)" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M 200 60 Q 210 40 220 30" stroke="rgba(120,80,40,0.2)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M 180 420 Q 150 400 120 410" stroke="rgba(120,80,40,0.2)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M 140 280 Q 110 250 90 260" stroke="rgba(120,80,40,0.2)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="220" cy="35" r="6" fill="rgba(16,185,129,0.15)" />
      <circle cx="120" cy="408" r="5" fill="rgba(34,197,94,0.12)" />
      <circle cx="90" cy="258" r="4" fill="rgba(52,211,153,0.1)" />
    </svg>
  );
}

function BranchRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 600" fill="none">
      <path d="M 20 20 Q 80 80 120 160 Q 160 240 170 320 Q 180 400 160 460 Q 140 520 100 580" stroke="rgba(120,80,40,0.3)" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M 100 580 Q 90 600 85 610" stroke="rgba(120,80,40,0.2)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M 120 160 Q 150 140 170 150" stroke="rgba(120,80,40,0.2)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M 170 400 Q 200 420 220 410" stroke="rgba(120,80,40,0.2)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="85" cy="605" r="6" fill="rgba(16,185,129,0.15)" />
      <circle cx="170" cy="148" r="5" fill="rgba(34,197,94,0.12)" />
      <circle cx="220" cy="412" r="4" fill="rgba(52,211,153,0.1)" />
    </svg>
  );
}

const leafComponents = [
  { LeafComponent: OliveLeaf, colors: ["rgba(52,211,153,0.12)", "rgba(16,185,129,0.09)", "rgba(5,150,105,0.07)"] },
  { LeafComponent: OakLeaf, colors: ["rgba(251,191,36,0.12)", "rgba(245,158,11,0.09)", "rgba(217,119,6,0.07)"] },
  { LeafComponent: MapleLeaf, colors: ["rgba(248,113,113,0.1)", "rgba(239,68,68,0.08)", "rgba(220,38,38,0.06)"] },
  { LeafComponent: HeartLeaf, colors: ["rgba(52,211,153,0.12)", "rgba(16,185,129,0.09)", "rgba(5,150,105,0.07)"] },
  { LeafComponent: FernFrond, colors: ["rgba(74,222,128,0.1)", "rgba(34,197,94,0.08)", "rgba(22,163,74,0.06)"] },
  { LeafComponent: GrassBlade, colors: ["rgba(52,211,153,0.09)", "rgba(16,185,129,0.07)", "rgba(5,150,105,0.05)"] },
];

const floatingLeaves = [
  { top: "10%", left: "5%", w: "w-20 md:w-28", rotation: -15, speed: 0.02, delay: 0, depth: 1 },
  { top: "20%", right: "4%", w: "w-16 md:w-24", rotation: 25, speed: -0.015, delay: 0.5, depth: 2 },
  { top: "40%", left: "3%", w: "w-24 md:w-36", rotation: -35, speed: -0.025, delay: 1, depth: 1.5 },
  { top: "50%", right: "5%", w: "w-14 md:w-20", rotation: 40, speed: 0.03, delay: 0.3, depth: 2.5 },
  { top: "65%", left: "2%", w: "w-28 md:w-40", rotation: -10, speed: 0.015, delay: 0.8, depth: 0.8 },
  { top: "75%", right: "3%", w: "w-20 md:w-28", rotation: 20, speed: -0.02, delay: 1.2, depth: 1.8 },
  { top: "85%", left: "6%", w: "w-16 md:w-24", rotation: -50, speed: 0.025, delay: 0.2, depth: 1.2 },
  { top: "95%", right: "6%", w: "w-12 md:w-18", rotation: 30, speed: -0.01, delay: 0.6, depth: 2 },
  { top: "30%", left: "15%", w: "w-10 md:w-14", rotation: 60, speed: 0.018, delay: 1.5, depth: 3 },
  { top: "60%", right: "14%", w: "w-10 md:w-14", rotation: -45, speed: -0.022, delay: 0.9, depth: 2.2 },
  { top: "80%", left: "18%", w: "w-8 md:w-12", rotation: 70, speed: 0.01, delay: 1.8, depth: 1.5 },
  { top: "15%", left: "28%", w: "w-8 md:w-12", rotation: -25, speed: -0.018, delay: 0.4, depth: 2.8 },
  { top: "55%", left: "22%", w: "w-6 md:w-10", rotation: 55, speed: 0.022, delay: 1.1, depth: 1.3 },
  { top: "90%", right: "20%", w: "w-6 md:w-10", rotation: -65, speed: -0.015, delay: 0.7, depth: 2.5 },
  { top: "35%", right: "22%", w: "w-8 md:w-12", rotation: 15, speed: 0.028, delay: 1.4, depth: 1.6 },
  { top: "8%", right: "18%", w: "w-6 md:w-10", rotation: -80, speed: -0.012, delay: 2, depth: 3.2 },
  { top: "70%", left: "25%", w: "w-5 md:w-8", rotation: 35, speed: 0.016, delay: 0.1, depth: 2 },
  { top: "45%", right: "28%", w: "w-5 md:w-8", rotation: -55, speed: -0.024, delay: 1.6, depth: 1.4 },
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
      {floatingLeaves.map((pos, i) => {
        const { LeafComponent, colors } = leafComponents[i % leafComponents.length];
        const color = colors[i % colors.length];
        const offset = (factor: number) => scrollY * factor;
        const parallaxFactor = 1 / pos.depth;
        const opacity = Math.min(0.9, 0.15 + scrollY / 2000);

        return (
          <div
            key={i}
            className={`absolute ${pos.w} transition-transform duration-300`}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: `translateY(${offset(pos.speed)}px) translateZ(${-pos.depth * 20}px) rotate(${pos.rotation + scrollY * 0.005 * parallaxFactor}deg)`,
              opacity,
              willChange: "transform",
            }}
          >
            <LeafComponent color={color} />
          </div>
        );
      })}
    </div>
  );
}

export function SectionBranchLeft() {
  return (
    <div className="absolute -bottom-20 -left-10 md:-left-20 w-48 md:w-72 h-96 opacity-40 pointer-events-none z-0">
      <BranchLeft className="w-full h-full" />
    </div>
  );
}

export function SectionBranchRight() {
  return (
    <div className="absolute -top-20 -right-10 md:-right-20 w-48 md:w-72 h-96 opacity-40 pointer-events-none z-0 rotate-180">
      <BranchRight className="w-full h-full" />
    </div>
  );
}

export function CornerLeaves({ position = "top-left" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positions = {
    "top-left": { top: "-2%", left: "-2%" },
    "top-right": { top: "-2%", right: "-2%", transform: "scaleX(-1)" },
    "bottom-left": { bottom: "-2%", left: "-2%", transform: "scaleY(-1)" },
    "bottom-right": { bottom: "-2%", right: "-2%", transform: "scale(-1, -1)" },
  };

  const pos = positions[position];
  const { LeafComponent } = leafComponents[Math.floor(Math.random() * leafComponents.length)];

  return (
    <div className="absolute w-24 md:w-32 opacity-30 pointer-events-none z-0" style={pos}>
      <LeafComponent color="rgba(52,211,153,0.15)" />
    </div>
  );
}
