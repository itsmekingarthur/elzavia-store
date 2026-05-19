"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export default function ProductGrid({ limit }: { limit?: number }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.ok ? r.json() : [])
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const displayProducts = limit ? products.slice(0, limit) : products;

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        لا توجد منتجات متاحة حالياً
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
