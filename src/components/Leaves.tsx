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
      <path d="M100 280 L100 20" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
    </>
  );
}

function OakLeaf({ color }: { color: string }) {
  return (
    <>
      <path d="M100 280 Q95 260 80 240 Q50 220 40 190 Q30 160 45 140 Q55 125 50 100 Q45 70 60 50 Q75 30 85 20 Q95 10 100 5 Q105 10 115 20 Q125 30 140 50 Q155 70 150 100 Q145 125 155 140 Q170 160 160 190 Q150 220 120 240 Q105 260 100 280Z" fill={color} />
      <path d="M100 280 L100 15" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
    </>
  );
}

function FernFrond({ color }: { color: string }) {
  return (
    <>
      <path d="M100 290 Q95 200 90 120 Q85 60 100 5 Q115 60 110 120 Q105 200 100 290Z" fill={color} />
      <path d="M100 290 L100 15" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
    </>
  );
}

const leafComponents = [
  { LeafComponent: OliveLeaf, colors: ["rgba(251,191,36,0.08)", "rgba(245,158,11,0.06)", "rgba(217,119,6,0.05)"] },
  { LeafComponent: OakLeaf, colors: ["rgba(251,191,36,0.06)", "rgba(245,158,11,0.05)", "rgba(180,83,9,0.04)"] },
  { LeafComponent: FernFrond, colors: ["rgba(245,158,11,0.07)", "rgba(217,119,6,0.05)", "rgba(180,83,9,0.04)"] },
  { LeafComponent: OliveLeaf, colors: ["rgba(251,191,36,0.05)", "rgba(245,158,11,0.04)", "rgba(217,119,6,0.03)"] },
  { LeafComponent: OakLeaf, colors: ["rgba(245,158,11,0.06)", "rgba(217,119,6,0.04)", "rgba(120,80,40,0.04)"] },
  { LeafComponent: FernFrond, colors: ["rgba(251,191,36,0.05)", "rgba(245,158,11,0.04)", "rgba(217,119,6,0.03)"] },
];

const floatingLeaves = [
  { top: "8%", left: "3%", w: "w-20 md:w-28", rotation: -15, speed: 0.02, delay: 0, depth: 1 },
  { top: "18%", right: "4%", w: "w-16 md:w-24", rotation: 25, speed: -0.015, delay: 0.5, depth: 2 },
  { top: "38%", left: "4%", w: "w-24 md:w-36", rotation: -35, speed: -0.025, delay: 1, depth: 1.5 },
  { top: "48%", right: "5%", w: "w-14 md:w-20", rotation: 40, speed: 0.03, delay: 0.3, depth: 2.5 },
  { top: "62%", left: "2%", w: "w-28 md:w-40", rotation: -10, speed: 0.015, delay: 0.8, depth: 0.8 },
  { top: "72%", right: "3%", w: "w-20 md:w-28", rotation: 20, speed: -0.02, delay: 1.2, depth: 1.8 },
  { top: "82%", left: "5%", w: "w-16 md:w-24", rotation: -50, speed: 0.025, delay: 0.2, depth: 1.2 },
  { top: "92%", right: "6%", w: "w-12 md:w-18", rotation: 30, speed: -0.01, delay: 0.6, depth: 2 },
  { top: "28%", left: "16%", w: "w-10 md:w-14", rotation: 60, speed: 0.018, delay: 1.5, depth: 3 },
  { top: "58%", right: "15%", w: "w-10 md:w-14", rotation: -45, speed: -0.022, delay: 0.9, depth: 2.2 },
  { top: "78%", left: "18%", w: "w-8 md:w-12", rotation: 70, speed: 0.01, delay: 1.8, depth: 1.5 },
  { top: "12%", left: "30%", w: "w-8 md:w-12", rotation: -25, speed: -0.018, delay: 0.4, depth: 2.8 },
  { top: "52%", left: "24%", w: "w-6 md:w-10", rotation: 55, speed: 0.022, delay: 1.1, depth: 1.3 },
  { top: "88%", right: "22%", w: "w-6 md:w-10", rotation: -65, speed: -0.015, delay: 0.7, depth: 2.5 },
  { top: "32%", right: "24%", w: "w-8 md:w-12", rotation: 15, speed: 0.028, delay: 1.4, depth: 1.6 },
  { top: "5%", right: "20%", w: "w-6 md:w-10", rotation: -80, speed: -0.012, delay: 2, depth: 3.2 },
  { top: "68%", left: "26%", w: "w-5 md:w-8", rotation: 35, speed: 0.016, delay: 0.1, depth: 2 },
  { top: "42%", right: "30%", w: "w-5 md:w-8", rotation: -55, speed: -0.024, delay: 1.6, depth: 1.4 },
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
        const opacity = Math.min(0.6, 0.08 + scrollY / 3000);

        return (
          <div
            key={i}
            className={`absolute ${pos.w} transition-transform duration-300`}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: `translateY(${offset(pos.speed)}px) rotate(${pos.rotation + scrollY * 0.005}deg)`,
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
