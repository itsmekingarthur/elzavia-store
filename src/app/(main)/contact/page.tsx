"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMessagesStorageKey } from "@/lib/utils";

export default function ContactPage() {
  const { user, profile } = useAuth();
  const [sent, setSent] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = user ? profile?.username || user.email?.split("@")[0] || "user" : formData.get("name") as string;
    const email = user ? user.email || "" : formData.get("email") as string;
    const data = { name, message: formData.get("message") as string, date: new Date().toISOString(), email, user_id: user?.id || null };

    const key = getMessagesStorageKey(user?.id);
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    saved.push(data);
    localStorage.setItem(key, JSON.stringify(saved));

    try {
      await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    } catch {}

    setAnimating(true);
    form.reset();
    setTimeout(() => {
      setAnimating(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-forest" />

      <section className="relative z-10 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center mb-14 md:mb-18">
          <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
            اتصل بنا
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            تواصل <span className="gradient-text">معنا</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            لديك سؤال أو استفسار؟ نحن هنا لمساعدتك
          </p>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <div className="space-y-6">
                <a
                  href="https://wa.me/+21267702771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 transition-transform">📱</div>
                  <div>
                    <p className="text-white/40 text-xs">واتساب</p>
                    <p className="text-emerald-400 text-sm md:text-base font-medium group-hover:text-emerald-300 transition-colors" dir="ltr">0677027771</p>
                  </div>
                </a>
                <a
                  href="https://instagram.com/elzavia_shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-gold-500/30 hover:bg-gold-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 transition-transform">📸</div>
                  <div>
                    <p className="text-white/40 text-xs">إنستغرام</p>
                    <p className="text-gold-400 text-sm md:text-base font-medium group-hover:text-gold-300 transition-colors">@elzavia_shop</p>
                  </div>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61590113944108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-xl group-hover:scale-110 transition-transform">📘</div>
                  <div>
                    <p className="text-white/40 text-xs">فيسبوك</p>
                    <p className="text-blue-400 text-sm md:text-base font-medium group-hover:text-blue-300 transition-colors">Elzavia Shop</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-xl">📍</div>
                  <div>
                    <p className="text-white/40 text-xs">المقر</p>
                    <p className="text-white text-sm md:text-base font-medium">المغرب</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {!sent ? (
                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className={`transition-all duration-500 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                    {!user && (
                      <>
                        <input type="text" name="name" placeholder="الاسم" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                        <div className="mt-4">
                          <input type="email" name="email" placeholder="البريد الإلكتروني" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                        </div>
                      </>
                    )}
                    {user && (
                      <div className="text-white/50 text-xs mb-4 px-3 py-2 bg-white/5 rounded-lg">
                        مرحباً {profile?.username || user.email?.split("@")[0]}، يمكنك إرسال رسالتك مباشرة
                      </div>
                    )}
                    <div className={user ? "" : "mt-4"}>
                      <textarea name="message" placeholder="رسالتك" required rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-emerald-600 text-white py-3 rounded-xl font-bold text-base hover:from-primary-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-primary-500/20 mt-4">
                      إرسال
                    </button>
                  </div>

                  {animating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-emerald-400 animate-paper-plane"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </div>
                  )}
                </form>
              ) : (
                <div className="bg-white/5 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-8 md:p-12 text-center">
                  <div className="text-5xl mb-4 animate-ping-once">✉️</div>
                  <p className="text-white text-lg md:text-xl font-bold">
                    شكرا لتواصلكم معنا
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
