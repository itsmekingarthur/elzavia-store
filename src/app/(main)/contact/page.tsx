"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = { name: formData.get("name") as string, message: formData.get("message") as string, date: new Date().toISOString() };
    try {
      await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSent(true);
      form.reset();
    } catch {}
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
                  href="https://wa.me/21267702771"
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
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                <input type="text" name="name" placeholder="الاسم" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                <input type="email" name="email" placeholder="البريد الإلكتروني" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                <textarea name="message" placeholder="رسالتك" required rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-emerald-600 text-white py-3 rounded-xl font-bold text-base hover:from-primary-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-primary-500/20">
                  {sent ? "تم الإرسال ✓" : "إرسال"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
