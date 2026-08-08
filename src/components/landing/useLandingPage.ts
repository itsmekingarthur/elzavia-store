"use client";

import { useEffect, useState, useCallback } from "react";
import { generateOrderId, getOrdersStorageKey } from "@/lib/utils";
import { fbEvent } from "@/lib/fbpixel";
import { validateName, validatePhone, validateAddress } from "./validation";
import { OFFER_PRICE, ORIGINAL_VALUE, SAVINGS, liveNames, timesAgo } from "./data";
import type { Product } from "@/data/products";

export type CustomerForm = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

export type FormErrors = { name: string; phone: string; address: string };
export type FormTouched = { name: boolean; phone: boolean; address: boolean };

export function useLandingPage(product: Product) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<CustomerForm>({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<FormErrors>({ name: "", phone: "", address: "" });
  const [touched, setTouched] = useState<FormTouched>({ name: false, phone: false, address: false });
  const [orderCount] = useState(() => Math.floor(Math.random() * 73) + 158);
  const [liveNotif, setLiveNotif] = useState<{ name: string; city: string; time: string } | null>(null);

  useEffect(() => {
    const show = () => {
      const person = liveNames[Math.floor(Math.random() * liveNames.length)];
      setLiveNotif({ ...person, time: timesAgo[Math.floor(Math.random() * timesAgo.length)] });
      setTimeout(() => setLiveNotif(null), 5000);
    };
    show();
    const interval = setInterval(show, 12000 + Math.random() * 15000);
    return () => clearInterval(interval);
  }, []);

  const validateField = useCallback((field: keyof FormErrors, value: string) => {
    if (field === "name") return validateName(value);
    if (field === "phone") return validatePhone(value);
    return validateAddress(value);
  }, []);

  const updateField = useCallback(
    (field: keyof CustomerForm, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      const errField = field as keyof FormErrors;
      if (touched[errField]) {
        setErrors((prev) => ({ ...prev, [errField]: validateField(errField, value) }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (field: keyof FormErrors) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));
    },
    [form, validateField]
  );

  const validateForm = useCallback(() => {
    const e = {
      name: validateName(form.name),
      phone: validatePhone(form.phone),
      address: validateAddress(form.address),
    };
    setErrors(e);
    setTouched({ name: true, phone: true, address: true });
    return !e.name && !e.phone && !e.address;
  }, [form]);

  const placeOrder = useCallback(async () => {
    if (!validateForm()) return;
    setSubmitting(true);

    const order = {
      id: generateOrderId(),
      user_id: null,
      items: [{ name: product.name, quantity: 2, price: product.price }],
      subtotal: ORIGINAL_VALUE,
      discount: SAVINGS,
      total: OFFER_PRICE,
      coupon: "خصم حصري 149 درهم",
      offerB2G1: false,
      offerDiscount: SAVINGS,
      customer: form,
      status: "قيد التجهيز",
      createdAt: new Date().toISOString(),
    };

    const key = getOrdersStorageKey(null);
    const orders = JSON.parse(localStorage.getItem(key) || "[]");
    orders.push(order);
    localStorage.setItem(key, JSON.stringify(orders));
    const genericOrders = JSON.parse(localStorage.getItem("elzavia-orders") || "[]");
    genericOrders.push(order);
    localStorage.setItem("elzavia-orders", JSON.stringify(genericOrders));

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch { /* ignore */ }

    fbEvent("AddToCart", {
      content_ids: [product.id],
      content_name: product.name,
      value: OFFER_PRICE,
      currency: "MAD",
      contents: [{ id: product.id, quantity: 2, price: product.price }],
    });

    fbEvent("Purchase", {
      content_ids: [product.id],
      content_name: product.name,
      value: OFFER_PRICE,
      currency: "MAD",
    });

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setSubmitted(true);
    setSubmitting(false);
  }, [form, product, validateForm]);

  return {
    selectedImage,
    setSelectedImage,
    faqOpen,
    setFaqOpen,
    lightboxOpen,
    setLightboxOpen,
    submitting,
    submitted,
    form,
    updateField,
    handleBlur,
    errors,
    touched,
    orderCount,
    liveNotif,
    setLiveNotif,
    placeOrder,
  };
}
