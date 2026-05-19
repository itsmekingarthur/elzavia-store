"use client";

import { useEffect, useRef } from "react";

function OliveLeaf({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 300" fill="none" className="w-full h-full">
      <path d="M100 280 Q5 200 20 100 Q30 20 100 10 Q170 20 180 100 Q195 200 100 280Z" fill={color} />
      <path d="M100 280 L100 20" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    </svg>
  );
}

function OakLeaf({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 300" fill="none" className="w-full h-full">
      <path d="M100 280 Q95 260 80 240 Q50 220 40 190 Q30 160 45 140 Q55 125 50 100 Q45 70 60 50 Q75 30 85 20 Q95 10 100 5 Q105 10 115 20 Q125 30 140 50 Q155 70 150 100 Q145 125 155 140 Q170 160 160 190 Q150 220 120 240 Q105 260 100 280Z" fill={color} />
      <path d="M100 280 L100 15" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
    </svg>
  );
}

function MapleLeaf({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 300" fill="none" className="w-full h-full">
      <path d="M100 280 L100 200 L70 230 L60 190 L40 210 L35 160 L15 170 L25 120 L5 110 L30 80 L15 55 L55 55 L65 25 L100 5 L135 25 L145 55 L185 55 L170 80 L195 110 L175 120 L185 170 L165 160 L160 210 L140 190 L130 230 L100 200 L100 280Z" fill={color} />
      <path d="M100 280 L100 20" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
    </svg>
  );
}

function FernFrond({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 300" fill="none" className="w-full h-full">
      <path d="M100 290 Q95 200 90 120 Q85 60 100 5 Q115 60 110 120 Q105 200 100 290Z" fill={color} />
      <path d="M100 290 L100 15" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
    </svg>
  );
}

const leafTypes = [
  { LeafComponent: OliveLeaf, color: "rgba(52,211,153,0.15)" },
  { LeafComponent: OakLeaf, color: "rgba(251,191,36,0.12)" },
  { LeafComponent: MapleLeaf, color: "rgba(248,113,113,0.1)" },
  { LeafComponent: FernFrond, color: "rgba(74,222,128,0.12)" },
  { LeafComponent: OliveLeaf, color: "rgba(16,185,129,0.1)" },
  { LeafComponent: OakLeaf, color: "rgba(245,158,11,0.1)" },
];

// Falling leaves that drop from top with random paths
function FallingLeaf({ index }: { index: number }) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const startX = Math.random() * 100;
    const startDelay = Math.random() * 15;
    const duration = 12 + Math.random() * 10;
    const drift = -30 + Math.random() * 60;
    const size = 20 + Math.random() * 30;
    const rotation = Math.random() * 360;

    el.style.setProperty("--start-x", `${startX}%`);
    el.style.setProperty("--delay", `${startDelay}s`);
    el.style.setProperty("--duration", `${duration}s`);
    el.style.setProperty("--drift", `${drift}px`);
    el.style.setProperty("--size", `${size}px`);
    el.style.setProperty("--rotation", `${rotation}deg`);
    el.style.left = `${startX}%`;
    el.style.width = `${size}px`;

    const loop = () => {
      el.style.animation = "none";
      void el.offsetHeight;
      el.style.animation = `leaf-fall ${duration}s ease-in ${startDelay}s infinite`;
    };
    loop();
  }, []);

  const { LeafComponent, color } = leafTypes[index % leafTypes.length];

  return (
    <div
      ref={elRef}
      className="absolute -top-10 pointer-events-none"
      style={{ opacity: 0.5 + Math.random() * 0.3 }}
    >
      <LeafComponent color={color} />
    </div>
  );
}

// Swaying branch SVG
function BranchLeft() {
  return (
    <div className="absolute -left-10 md:-left-20 top-1/4 w-32 md:w-48 h-96 pointer-events-none animate-branch-sway origin-bottom-right" style={{ animationDuration: "5s" }}>
      <svg viewBox="0 0 200 500" fill="none" className="w-full h-full">
        <path d="M 180 490 Q 140 400 120 320 Q 100 240 110 160 Q 120 80 160 30" stroke="rgba(120,80,40,0.25)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 120 320 Q 80 300 50 310" stroke="rgba(120,80,40,0.2)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 110 160 Q 70 130 40 140" stroke="rgba(120,80,40,0.18)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="165" cy="35" r="8" fill="rgba(52,211,153,0.2)" />
        <circle cx="55" cy="308" r="6" fill="rgba(16,185,129,0.15)" />
        <circle cx="45" cy="138" r="5" fill="rgba(251,191,36,0.12)" />
      </svg>
    </div>
  );
}

function BranchRight() {
  return (
    <div className="absolute -right-10 md:-right-20 top-1/3 w-32 md:w-48 h-96 pointer-events-none animate-branch-sway origin-bottom-left" style={{ animationDuration: "6s", animationDelay: "0.5s" }}>
      <svg viewBox="0 0 200 500" fill="none" className="w-full h-full -scale-x-100">
        <path d="M 180 490 Q 140 400 120 320 Q 100 240 110 160 Q 120 80 160 30" stroke="rgba(120,80,40,0.25)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M 120 320 Q 80 300 50 310" stroke="rgba(120,80,40,0.2)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 110 160 Q 70 130 40 140" stroke="rgba(120,80,40,0.18)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="165" cy="35" r="8" fill="rgba(52,211,153,0.2)" />
        <circle cx="55" cy="308" r="6" fill="rgba(16,185,129,0.15)" />
        <circle cx="45" cy="138" r="5" fill="rgba(251,191,36,0.12)" />
      </svg>
    </div>
  );
}

const FALLING_LEAF_COUNT = 25;

export default function Leaves() {
  return (
    <>
      {/* Floating decorative leaves */}
      <div className="pointer-events-none select-none fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: FALLING_LEAF_COUNT }).map((_, i) => (
          <FallingLeaf key={i} index={i} />
        ))}
      </div>

      {/* Side branches - shown on larger screens */}
      <div className="hidden md:block pointer-events-none select-none fixed inset-0 z-0">
        <BranchLeft />
        <BranchRight />
      </div>
    </>
  );
}

export function SectionBranchLeft() {
  return <BranchLeft />;
}

export function SectionBranchRight() {
  return <BranchRight />;
}
