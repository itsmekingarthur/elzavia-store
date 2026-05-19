"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
  dealLabel?: string;
  dealDiscount?: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addToCart: (productId: string) => void;
  addWithDeal: (productId: string, quantity: number, dealLabel: string, dealDiscount: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("elzavia-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  const saveItems = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("elzavia-cart", JSON.stringify(newItems));
  }, []);

  const addWithDeal = useCallback((productId: string, quantity: number, dealLabel: string, dealDiscount: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      let newItems: CartItem[];
      if (existing) {
        newItems = prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity, dealLabel, dealDiscount: (i.dealDiscount || 0) + dealDiscount }
            : i
        );
      } else {
        newItems = [...prev, { productId, quantity, dealLabel, dealDiscount }];
      }
      localStorage.setItem("elzavia-cart", JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const addToCart = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      let newItems: CartItem[];
      if (existing) {
        newItems = prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...prev, { productId, quantity: 1 }];
      }
      localStorage.setItem("elzavia-cart", JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const newItems = prev.filter((i) => i.productId !== productId);
      localStorage.setItem("elzavia-cart", JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const newItems = prev.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      );
      localStorage.setItem("elzavia-cart", JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.setItem("elzavia-cart", JSON.stringify([]));
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, itemCount, addToCart, addWithDeal, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
