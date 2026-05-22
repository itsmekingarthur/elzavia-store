import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import FacebookPixel from "@/components/FacebookPixel";

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
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" className="dark">
      <body className="min-h-screen bg-primary-950 flex flex-col">
        <FacebookPixel />
        <ToastProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
