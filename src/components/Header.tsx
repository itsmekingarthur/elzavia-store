"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Elzavia"
              className={`h-14 md:h-16 w-auto transition-all duration-500 ${
                scrolled ? "drop-shadow-none" : "drop-shadow-lg brightness-0 invert"
              }`}
            />
            <span className={`text-lg md:text-xl font-extrabold tracking-tight transition-all duration-500 ${
              scrolled ? "text-primary-700" : "text-white"
            }`}>
              إلزافيا
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { href: "/", label: "الرئيسية" },
              { href: "/shop", label: "المتجر" },
              { href: "/about", label: "عن إلزافيا" },
              { href: "/contact", label: "اتصل بنا" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  scrolled
                    ? "text-surface-700 hover:text-primary-600 hover:bg-primary-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-surface-700 hover:text-primary-600 hover:bg-primary-50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-surface-600 hover:bg-surface-100"
                  : "text-white/80 hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className={`rounded-2xl p-3 space-y-1 mb-4 ${
            scrolled ? "bg-surface-50/90 backdrop-blur-xl" : "bg-white/10 backdrop-blur-xl"
          }`}>
            {[
              { href: "/", label: "الرئيسية" },
              { href: "/shop", label: "المتجر" },
              { href: "/about", label: "عن إلزافيا" },
              { href: "/contact", label: "اتصل بنا" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                  scrolled
                    ? "text-surface-700 hover:text-primary-600 hover:bg-primary-50"
                    : "text-white hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
