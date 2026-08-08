"use client";

import { getLandingImages } from "./data";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  selectedImage: number;
  open: boolean;
  onClose: () => void;
}

export default function Lightbox({ product, selectedImage, open, onClose }: Props) {
  if (!open) return null;
  const images = getLandingImages(product.name);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img src={images[selectedImage].src} alt={product.name} className="max-w-full max-h-[90vh] object-contain animate-fade-in-up" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
