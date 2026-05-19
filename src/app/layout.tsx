import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "إلزافيا | المكملات الغذائية الطبيعية",
  description:
    "مكملات غذائية طبيعية 100% لدعم صحتك ورفع أدائك. اكتشف قوة الطبيعة مع إلزافيا.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body className="min-h-screen bg-surface-50 flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
