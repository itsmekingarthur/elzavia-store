"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "الإحصائيات", href: "/admin", icon: "📊" },
  { label: "الطلبات", href: "/admin/orders", icon: "📦" },
  { label: "المنتجات", href: "/admin/products", icon: "🏷️" },
  { label: "كوبونات الخصم", href: "/admin/coupons", icon: "🎫" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("elzavia-admin-auth");
    if (auth === "true") {
      setAuthed(true);
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    setChecking(false);
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-surface-400">جاري التحميل...</div>
      </div>
    );
  }

  if (!authed) return null;

  const handleLogout = () => {
    localStorage.removeItem("elzavia-admin-auth");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="hidden md:flex md:w-64 bg-gray-900 text-white min-h-screen p-6 flex-col">
          <Link href="/admin" className="text-xl font-extrabold mb-8 flex items-center gap-2">
            <img src="/images/logo.png" alt="Elzavia" className="h-8 w-auto brightness-0 invert" />
            <span>إلزافيا</span>
          </Link>
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-primary-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-6 border-t border-gray-800 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm px-4 py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              تسجيل الخروج
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm px-4 py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              العودة للموقع
            </Link>
          </div>
        </aside>

        <main className="flex-1 pb-20 md:pb-8 p-4 md:p-8">{children}</main>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
                  active ? "text-primary-400" : "text-gray-400"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-[10px]">خروج</span>
          </button>
          <Link
            href="/"
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-[10px]">الموقع</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
