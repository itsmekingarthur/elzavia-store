import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "إلزافيا | المكملات الغذائية الطبيعية",
  description:
    "مكملات غذائية طبيعية 100% لدعم صحتك ورفع أدائك. اكتشف قوة الطبيعة مع إلزافيا.",
  icons: {
    icon: "/images/logo.png",
  },
  other: {
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" className="dark">
      <body className="min-h-screen bg-primary-950 flex flex-col">
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
