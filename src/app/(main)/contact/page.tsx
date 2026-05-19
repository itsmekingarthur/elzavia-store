"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = { name: formData.get("name") as string, email: formData.get("email") as string, message: formData.get("message") as string, date: new Date().toISOString() };
    try {
      await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSent(true);
      form.reset();
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-nature opacity-30" />
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
                {[
                  { icon: "📧", label: "البريد الإلكتروني", value: "contact@elzavia.ma" },
                  { icon: "📱", label: "واتساب", value: "+212 6XX-XXXXXX" },
                  { icon: "📍", label: "المقر", value: "المغرب" },
                  { icon: "📸", label: "إنستغرام", value: "@elzavia_shop", href: "https://instagram.com/elzavia_shop" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-primary-500/20 transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 text-xl">{item.icon}</div>
                    <div>
                      <p className="text-white/40 text-xs">{item.label}</p>
                      {"href" in item && item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 text-sm md:text-base font-medium transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-white text-sm md:text-base font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                <input type="text" name="name" placeholder="الاسم" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                <input type="email" name="email" placeholder="البريد الإلكتروني" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
                <textarea name="message" placeholder="رسالتك" required rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/30 transition-colors text-sm md:text-base" />
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
