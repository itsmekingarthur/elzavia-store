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
  { bg: "#d1fae5", text: "#059669", dark: "#047857", light: "#ecfdf5", border: "border-emerald-200/50" },
  { bg: "#dbeafe", text: "#2563eb", dark: "#1d4ed8", light: "#eff6ff", border: "border-blue-200/50" },
  { bg: "#ede9fe", text: "#7c3aed", dark: "#6d28d9", light: "#f5f3ff", border: "border-violet-200/50" },
  { bg: "#fce7f3", text: "#db2777", dark: "#be185d", light: "#fdf2f8", border: "border-pink-200/50" },
  { bg: "#fef3c7", text: "#d97706", dark: "#b45309", light: "#fffbeb", border: "border-amber-200/50" },
  { bg: "#cffafe", text: "#0891b2", dark: "#0e7490", light: "#ecfeff", border: "border-cyan-200/50" },
  { bg: "#ffedd5", text: "#ea580c", dark: "#c2410c", light: "#fff7ed", border: "border-orange-200/50" },
  { bg: "#fce7f3", text: "#ec4899", dark: "#db2777", light: "#fdf2f8", border: "border-pink-200/50" },
];

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = ((h << 5) - h) + id.charCodeAt(i);
  return Math.abs(h);
}

export default function ProductCard({ product }: { product: Product }) {
  const palette = palettes[hashId(product.id) % palettes.length];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
    >
      <div className="relative bg-white/60 backdrop-blur-md rounded-3xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="aspect-square overflow-hidden p-8 md:p-10 flex items-center justify-center relative" style={{ backgroundColor: palette.light }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 50%, ${palette.bg}, transparent 70%)` }} />
          <img
            src={product.images?.[0] || "/images/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 relative z-10"
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
              <span className="text-[10px] md:text-xs text-surface-400 font-medium">{product.weight}</span>
            )}
          </div>

          <h3 className="text-base md:text-lg font-extrabold mb-2 transition-colors duration-300" style={{ color: palette.dark }}>
            {product.name}
          </h3>

          <p className="text-xs md:text-sm line-clamp-2 mb-4 leading-relaxed text-gray-900">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-surface-100">
            <span className="text-xl md:text-2xl font-extrabold" style={{ color: palette.dark }}>
              {formatPrice(product.price)}
            </span>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-300 group-hover:shadow-lg"
              style={{
                backgroundColor: palette.bg,
                color: palette.text,
              }}
            >
              أضف للسلة
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
