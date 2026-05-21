"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  weight?: string;
}

const palettes = [
  { bg: "rgba(52,211,153,0.15)", text: "#6ee7b7", light: "rgba(52,211,153,0.06)", border: "border-emerald-500/20", glow: "rgba(52,211,153,0.3)" },
  { bg: "rgba(251,191,36,0.15)", text: "#fcd34d", light: "rgba(251,191,36,0.06)", border: "border-gold-500/20", glow: "rgba(251,191,36,0.3)" },
  { bg: "rgba(196,181,253,0.15)", text: "#c4b5fd", light: "rgba(196,181,253,0.06)", border: "border-violet-500/20", glow: "rgba(196,181,253,0.3)" },
  { bg: "rgba(52,211,153,0.12)", text: "#34d399", light: "rgba(52,211,153,0.05)", border: "border-emerald-500/20", glow: "rgba(52,211,153,0.25)" },
  { bg: "rgba(251,191,36,0.12)", text: "#fbbf24", light: "rgba(251,191,36,0.05)", border: "border-gold-500/20", glow: "rgba(251,191,36,0.25)" },
  { bg: "rgba(196,181,253,0.12)", text: "#a78bfa", light: "rgba(196,181,253,0.05)", border: "border-violet-500/20", glow: "rgba(196,181,253,0.25)" },
];

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h) + id.charCodeAt(i);
  return Math.abs(h);
}

function BranchOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-100 z-20">
      <svg className="absolute -left-3 -top-3 w-20 h-20" viewBox="0 0 80 80" fill="none">
        <path d="M80 75 Q60 70 45 55 Q30 40 25 20 Q22 10 20 5" stroke="rgba(52,211,153,0.3)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M45 55 Q35 50 30 55" stroke="rgba(52,211,153,0.2)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M32 35 Q25 32 20 36" stroke="rgba(52,211,153,0.2)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="22" cy="10" r="4" fill="rgba(52,211,153,0.2)" />
      </svg>
      <svg className="absolute -right-3 -bottom-3 w-24 h-24 rotate-12" viewBox="0 0 80 80" fill="none">
        <path d="M5 5 Q25 10 40 25 Q55 40 60 60 Q63 70 65 75" stroke="rgba(251,191,36,0.25)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M40 25 Q50 20 55 25" stroke="rgba(251,191,36,0.18)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M52 45 Q58 42 62 47" stroke="rgba(251,191,36,0.18)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="62" cy="68" r="5" fill="rgba(251,191,36,0.15)" />
        <circle cx="66" cy="73" r="3" fill="rgba(16,185,129,0.15)" />
      </svg>
      <svg className="absolute -right-2 top-2 w-12 h-12 -rotate-45" viewBox="0 0 40 40" fill="none">
        <path d="M35 5 Q25 15 15 20 Q5 25 5 35 Q15 30 25 25 Q35 20 35 5Z" fill="rgba(74,222,128,0.15)" />
        <path d="M35 5 L10 30" stroke="rgba(74,222,128,0.12)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function ProductCard({ product, offerMode }: { product: Product; offerMode?: boolean }) {
  const palette = palettes[hashId(product.id) % palettes.length];
  const router = useRouter();
  const { addToCart } = useCart();

  const handleOfferClick = () => {
    addToCart(product.id);
    router.push(`/offer/${product.slug}`);
  };

  if (offerMode) {
    return (
      <div onClick={handleOfferClick} className="group block cursor-pointer">
        <CardContent product={product} palette={palette} offerMode />
      </div>
    );
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <CardContent product={product} palette={palette} offerMode={false} />
    </Link>
  );
}

function CardContent({ product, palette, offerMode }: { product: Product; palette: typeof palettes[0]; offerMode: boolean }) {
  return (
      <div
        className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
        style={{
          boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 0 0 transparent`,
          transition: "box-shadow 0.5s ease, transform 0.5s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 20px 60px ${palette.glow}, 0 0 40px ${palette.glow.replace('0.3', '0.1')}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.2)`;
        }}
      >
        <div className="aspect-square overflow-hidden flex items-center justify-center relative flex-shrink-0 p-6 md:p-8">
          <div className="absolute inset-0" style={{ backgroundColor: palette.light }} />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle at 50% 50%, ${palette.bg}, transparent 70%)` }} />
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="absolute w-4/5 h-4/5 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at 30% 30%, ${palette.text}, transparent 70%)` }}
            />
            <BranchOverlay />
            <img
              src={product.images?.[0] || "/images/placeholder.png"}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10 drop-shadow-lg p-2"
            />
          </div>
        </div>

        <div className="p-5 md:p-6 relative z-10 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] md:text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: palette.bg, color: palette.text }}
            >
              {product.category || "عام"}
            </span>
            {product.weight && (
              <span className="text-[10px] md:text-xs text-white/40 font-medium">{product.weight}</span>
            )}
          </div>

          <h3 className="text-base md:text-lg font-extrabold mb-2 text-white group-hover:text-primary-300 transition-colors duration-300">
            {product.name}
          </h3>

          <p className="text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed text-white/60">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
            <span className="text-xl md:text-2xl font-extrabold text-primary-400">
              {formatPrice(product.price)}
            </span>
            {offerMode ? (
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-300 bg-gold-500/20 text-gold-400 group-hover:bg-gold-500/30 group-hover:shadow-lg group-hover:shadow-gold-500/20"
              >
                🎁 استفد من العرض
              </span>
            ) : (
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                style={{ backgroundColor: palette.bg, color: palette.text }}
              >
                أضف للسلة
              </span>
            )}
          </div>
        </div>
      </div>
  );
}
