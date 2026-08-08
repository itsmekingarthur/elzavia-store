"use client";

import { useCallback, useEffect, useState } from "react";
import { statuses } from "./statusConfig";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  coupon: string;
  customer: { name: string; phone: string; address: string; notes: string };
  status: string;
  createdAt: string;
  offerB2G1?: boolean;
  offerDiscount?: number;
  user_id?: string;
  cancelReason?: string;
}

const readLocal = (): Order[] =>
  JSON.parse(typeof window !== "undefined" ? localStorage.getItem("elzavia-orders") || "[]" : "[]");

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const mergeOrders = useCallback((apiOrders: Order[]) => {
    const localOrders = readLocal();
    const localMap = new Map(localOrders.map((o) => [o.id, o]));
    const seen = new Set<string>();

    const merged = apiOrders.map((apiOrder) => {
      seen.add(apiOrder.id);
      const local = localMap.get(apiOrder.id);
      if (local) {
        const extra: any = {};
        for (const key of Object.keys(local)) {
          if ((apiOrder as any)[key] === undefined) extra[key] = (local as any)[key];
        }
        return { ...apiOrder, ...extra };
      }
      return apiOrder;
    });

    for (const local of localOrders) {
      if (!seen.has(local.id)) merged.push(local);
    }

    merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setOrders(merged);
    localStorage.setItem("elzavia-orders", JSON.stringify(merged));
  }, []);

  const refresh = useCallback(async () => {
    const localOrders = readLocal();
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        mergeOrders(await res.json());
        return;
      }
    } catch {}
    if (localOrders.length > 0) {
      setOrders(localOrders);
      localStorage.setItem("elzavia-orders", JSON.stringify(localOrders));
    }
  }, [mergeOrders]);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  const deleteOrderItem = useCallback(
    async (orderId: string) => {
      if (!confirm("هل أنت متأكد من حذف هذه الطلبية؟")) return;
      const targetOrder = orders.find((o) => o.id === orderId);
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      localStorage.setItem("elzavia-orders", JSON.stringify(updated));
      if (targetOrder && targetOrder.user_id) {
        const userKey = `elzavia-orders-${targetOrder.user_id}`;
        const userOrders = JSON.parse(localStorage.getItem(userKey) || "[]");
        localStorage.setItem(userKey, JSON.stringify(userOrders.filter((o: any) => o.id !== orderId)));
      }
      try {
        await fetch("/api/orders", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: orderId }),
        });
      } catch {}
    },
    [orders]
  );

  const performStatusUpdate = useCallback(
    async (orderId: string, newStatus: string, reason?: string) => {
      const targetOrder = orders.find((o) => o.id === orderId);
      const updated = orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus, ...(reason ? { cancelReason: reason } : {}) } : o
      );
      setOrders(updated);
      localStorage.setItem("elzavia-orders", JSON.stringify(updated));
      if (targetOrder && targetOrder.user_id) {
        const userKey = `elzavia-orders-${targetOrder.user_id}`;
        const userOrders = JSON.parse(localStorage.getItem(userKey) || "[]");
        const userIdx = userOrders.findIndex((o: any) => o.id === orderId);
        if (userIdx >= 0) {
          userOrders[userIdx] = { ...userOrders[userIdx], status: newStatus, ...(reason ? { cancelReason: reason } : {}) };
          localStorage.setItem(userKey, JSON.stringify(userOrders));
        }
      }
      try {
        await fetch("/api/orders", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: orderId,
            status: newStatus,
            items: targetOrder?.items,
            user_id: targetOrder?.user_id || null,
          }),
        });
      } catch {}
    },
    [orders]
  );

  const updateStatus = useCallback(
    (orderId: string, newStatus: string) => {
      if (newStatus === "تم الإلغاء") {
        setCancelTarget(orderId);
        setCancelReason("");
        return;
      }
      performStatusUpdate(orderId, newStatus);
    },
    [performStatusUpdate]
  );

  const counts = statuses.map((s) => ({
    ...s,
    count: orders.filter((o) => o.status === s.key).length,
  }));

  return {
    orders,
    counts,
    refresh,
    deleteOrderItem,
    updateStatus,
    performStatusUpdate,
    cancelTarget,
    setCancelTarget,
    cancelReason,
    setCancelReason,
  };
}
