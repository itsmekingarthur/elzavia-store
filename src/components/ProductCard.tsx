import Link from "next/link";
import { formatPrice } from "@/lib/utils";

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
  { bg: "rgba(52,211,153,0.15)", text: "#6ee7b7", light: "rgba(52,211,153,0.06)", border: "border-emerald-500/20" },
  { bg: "rgba(251,191,36,0.15)", text: "#fcd34d", light: "rgba(251,191,36,0.06)", border: "border-gold-500/20" },
  { bg: "rgba(196,181,253,0.15)", text: "#c4b5fd", light: "rgba(196,181,253,0.06)", border: "border-violet-500/20" },
  { bg: "rgba(252,231,243,0.15)", text: "#f9a8d4", light: "rgba(252,231,243,0.06)", border: "border-pink-500/20" },
  { bg: "rgba(52,211,153,0.12)", text: "#34d399", light: "rgba(52,211,153,0.05)", border: "border-emerald-500/20" },
  { bg: "rgba(251,191,36,0.12)", text: "#fbbf24", light: "rgba(251,191,36,0.05)", border: "border-gold-500/20" },
  { bg: "rgba(196,181,253,0.12)", text: "#a78bfa", light: "rgba(196,181,253,0.05)", border: "border-violet-500/20" },
  { bg: "rgba(252,231,243,0.12)", text: "#f472b6", light: "rgba(252,231,243,0.05)", border: "border-pink-500/20" },
];

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h) + id.charCodeAt(i);
  return Math.abs(h);
}

export default function ProductCard({ product }: { product: Product }) {
  const palette = palettes[hashId(product.id) % palettes.length];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        <div className="aspect-square overflow-hidden p-8 md:p-10 flex items-center justify-center relative" style={{ backgroundColor: palette.light }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 50%, ${palette.bg}, transparent 70%)` }} />
          <img
            src={product.images?.[0] || "/images/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10 drop-shadow-lg"
          />
        </div>

        <div className="p-5 md:p-6 relative z-10">
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

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-xl md:text-2xl font-extrabold text-primary-400">
              {formatPrice(product.price)}
            </span>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-300 group-hover:shadow-lg"
              style={{ backgroundColor: palette.bg, color: palette.text }}
            >
              أضف للسلة
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
