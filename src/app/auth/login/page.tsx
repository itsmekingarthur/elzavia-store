"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const benefits = [
  { icon: "📦", title: "تتبع الطلبات", desc: "تابع حالة طلبك خطوة بخطوة حتى التوصيل" },
  { icon: "📋", title: "سجل الطلبات الكامل", desc: "راجع جميع طلباتك السابقة ومشترياتك" },
  { icon: "⭐", title: "نظام النقاط", desc: "احصل على 50 نقطة لكل طلب يتم توصيله واستبدلها بخصومات" },
  { icon: "💬", title: "حفظ المحادثات", desc: "جميع رسائلك وردود الدعم محفوظة لك" },
  { icon: "⚡", title: "شراء أسرع", desc: "إتمام الطلبات دون إعادة إدخال المعلومات" },
  { icon: "🎁", title: "عروض حصرية", desc: "خصومات وعروض خاصة للأعضاء المسجلين" },
];

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await signIn(email, password);
    if (err) setError(err);
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-5 gap-6 items-start">
      <div className="md:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-extrabold text-white text-center mb-2">تسجيل الدخول</h1>
        <p className="text-white/50 text-center text-sm mb-8">مرحباً بعودتك! أدخل بيانات حسابك</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-white/70 text-sm font-medium mb-1.5">البريد الإلكتروني</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/40 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-white/70 text-sm font-medium mb-1.5">كلمة المرور</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/40 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-600 to-emerald-600 text-white py-3 rounded-xl font-bold text-base hover:from-primary-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-white/50 text-sm mt-6">
          ليس لديك حساب؟{" "}
          <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">إنشاء حساب</Link>
        </p>
      </div>

      <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-white mb-5 text-center">مزايا حساب ELZAVIA</h2>
        <div className="space-y-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
              <div>
                <p className="text-white font-bold text-sm">{b.title}</p>
                <p className="text-white/50 text-xs mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs mb-3">ليس لديك حساب؟</p>
          <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 font-bold text-sm transition-colors">
            إنشاء حساب جديد الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
