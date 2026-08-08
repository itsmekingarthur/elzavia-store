"use client";

import { useCallback, useEffect, useState } from "react";
import { statuses } from "@/components/admin/orders/statusConfig";

export interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  coupon: string;
  customer: { name: string; phone: string; address: string; notes: string };
  status: string;
  createdAt: string;
}

export interface Message {
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface DashboardStats {
  orders: Order[];
  messages: Message[];
  totalRevenue: number;
  pendingOrders: number;
  delivered: Order[];
  confirmed: Order[];
  shipping: Order[];
  cancelled: Order[];
  monthlyCommission: number;
  thisMonthDelivered: Order[];
  totalCommission: number;
  topProducts: [string, { qty: number; revenue: number }][];
  statusCounts: { key: string; icon: string; color: string; bg: string; bar: string; count: number }[];
  maxStatusCount: number;
  monthlyRevenue: { month: string; revenue: number; count: number }[];
  maxMonthlyRevenue: number;
}

export function useDashboardData() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const mergeOrders = useCallback((apiOrders: Order[]) => {
    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
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

    setOrders(merged);
    localStorage.setItem("elzavia-orders", JSON.stringify(merged));
  }, []);

  const refresh = useCallback(async () => {
    const localOrders: Order[] = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    const localMessages: Message[] = JSON.parse(localStorage.getItem("elzavia-messages") || "[]");
    try {
      const [oRes, mRes] = await Promise.all([fetch("/api/orders"), fetch("/api/messages")]);
      if (oRes.ok) {
        const apiOrders = await oRes.json();
        if (apiOrders.length > 0 || localOrders.length === 0) {
          mergeOrders(apiOrders);
        } else {
          setOrders(localOrders);
        }
      } else {
        setOrders(localOrders);
      }
      if (mRes.ok) {
        const apiMessages = await mRes.json();
        setMessages(apiMessages.length > 0 ? apiMessages : localMessages);
      } else {
        setMessages(localMessages);
      }
    } catch {
      setOrders(localOrders);
      setMessages(localMessages);
    }
  }, [mergeOrders]);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "قيد التجهيز").length;
  const delivered = orders.filter((o) => o.status === "تم التوصيل");
  const confirmed = orders.filter((o) => o.status === "تم تأكيد الطلبية");
  const shipping = orders.filter((o) => o.status === "جاري التوصيل");
  const cancelled = orders.filter(
    (o) => o.status === "تم الإلغاء" || o.status === "لم يستلم الطلبية" || o.status === "لا رد" || o.status === "تم الارجاع"
  );
  const now = new Date();
  const thisMonthDelivered = delivered.filter((o) => {
    const d = new Date(o.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const monthlyCommission = thisMonthDelivered.reduce((s, o) => s + o.total, 0);
  const totalCommission = delivered.reduce((s, o) => s + o.total, 0);

  const productCounts: Record<string, { qty: number; revenue: number }> = {};
  for (const order of orders) {
    for (const item of order.items) {
      if (!productCounts[item.name]) productCounts[item.name] = { qty: 0, revenue: 0 };
      productCounts[item.name].qty += item.quantity;
    }
  }
  for (const order of delivered) {
    const itemTotal = order.total;
    const itemsSum = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    for (const item of order.items) {
      const share = itemsSum > 0 ? (item.price * item.quantity) / itemsSum : 1 / order.items.length;
      if (productCounts[item.name]) {
        productCounts[item.name].revenue += Math.round(itemTotal * share);
      }
    }
  }
  const topProducts = Object.entries(productCounts).sort((a, b) => b[1].qty - a[1].qty).slice(0, 5);

  const statusCounts = statuses.map((s) => ({
    ...s,
    count: orders.filter((o) => o.status === s.key).length,
  }));
  const maxStatusCount = Math.max(...statusCounts.map((s) => s.count), 1);

  const monthlyRevenue: { month: string; revenue: number; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = d.toLocaleDateString("ar-MA", { month: "long", year: "numeric" });
    const monthOrders = delivered.filter((o) => {
      const od = new Date(o.createdAt);
      return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
    });
    monthlyRevenue.push({
      month: monthLabel,
      revenue: monthOrders.reduce((s, o) => s + o.total, 0),
      count: monthOrders.length,
    });
  }
  const maxMonthlyRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue), 1);

  return {
    orders,
    messages,
    refresh,
    stats: {
      orders,
      messages,
      totalRevenue,
      pendingOrders,
      delivered,
      confirmed,
      shipping,
      cancelled,
      monthlyCommission,
      thisMonthDelivered,
      totalCommission,
      topProducts,
      statusCounts,
      maxStatusCount,
      monthlyRevenue,
      maxMonthlyRevenue,
    } as DashboardStats,
  };
}
