"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./Skeleton";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export default function ProductGrid({ limit, offerMode }: { limit?: number; offerMode?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.ok ? r.json() : [])
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const displayProducts = limit ? products.slice(0, limit) : products;

  if (loading) {
    return <ProductGridSkeleton count={limit || 4} />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-white/40">
        لا توجد منتجات متاحة حالياً
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} offerMode={offerMode} />
      ))}
    </div>
  );
}
