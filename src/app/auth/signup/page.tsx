"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const benefits = [
  { icon: "📦", title: "تتبع الطلبات", desc: "تابع حالة طلبك خطوة بخطوة حتى التوصيل" },
  { icon: "📋", title: "سجل الطلبات الكامل", desc: "راجع جميع طلباتك السابقة ومشترياتك" },
  { icon: "⭐", title: "نظام النقاط", desc: "احصل على 50 نقطة لكل طلب يتم توصيله واستبدلها بخصومات" },
  { icon: "💬", title: "حفظ المحادثات", desc: "جميع رسائلك وردود الدعم محفوظة لك" },
  { icon: "⚡", title: "شراء أسرع", desc: "إتمام الطلبات دون إعادة إدخال المعلومات" },
  { icon: "🎁", title: "عروض حصرية", desc: "خصومات وعروض خاصة للأعضاء المسجلين" },
  { icon: "🔒", title: "بيانات آمنة", desc: "معلوماتك محفوظة بشكل آمن ومحمي" },
];

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-950 flex items-center justify-center"><div className="text-primary-400 text-lg">جاري التحميل...</div></div>}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const searchParams = useSearchParams();
  const isOffer = searchParams.get("offer") === "b2g1";
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await signUp(email, password, username);
    if (err) {
      setError(err);
      setLoading(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-gold-500/20 rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-white mb-2">تم إنشاء حسابك!</h2>
        <p className="text-white/70 text-sm mb-2 leading-relaxed">
          لقد أرسلنا رابط تأكيد إلى بريدك الإلكتروني
        </p>
        <p className="text-white/50 text-xs mb-6 leading-relaxed">
          يرجى التحقق من صندوق الوارد (والبريد المزعج) واضغط على رابط التأكيد لتتمكن من تسجيل الدخول
        </p>
        <div className="flex items-center justify-center gap-2 mb-6 text-gold-400/60 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>إذا لم تصلك الرسالة خلال 5 دقائق، حاول التسجيل مرة أخرى</span>
        </div>
        <Link href="/auth/login" className="inline-block bg-gradient-to-r from-primary-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:from-primary-500 hover:to-emerald-500 transition-all shadow-lg shadow-primary-500/20">
          الذهاب إلى تسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-6 items-start">
      <div className="md:col-span-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-extrabold text-white text-center mb-2">إنشاء حساب جديد</h1>
        <p className="text-white/50 text-center text-sm mb-8">أنشئ حسابك واستمتع بجميع المزايا</p>

        {isOffer && (
          <div className="bg-gradient-to-r from-gold-500/15 to-amber-500/10 border-2 border-gold-500/30 rounded-xl p-5 mb-6 text-center">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="text-gold-300 font-extrabold text-lg mb-1">قم بالتسجيل للاستفادة من العرض</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              سجل حساب الآن واستفد من <span className="text-gold-300 font-bold">عرض 2+1</span>: اشتري منتجين واحصل على الثالث مجاناً! بالإضافة إلى <span className="text-gold-300 font-bold">50 نقطة</span> مع كل منتج وخصومات حصرية للأعضاء.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-white/50">
              <span>🎁 2+1 مجاناً</span>
              <span className="w-px h-4 bg-white/10" />
              <span>⭐ 50 نقطة لكل منتج</span>
              <span className="w-px h-4 bg-white/10" />
              <span>🚚 توصيل مجاني</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signup-username" className="block text-white/70 text-sm font-medium mb-1.5">اسم المستخدم</label>
            <input
              id="signup-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="اسمك أو اسم المستخدم"
              required
              autoComplete="username"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/40 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-white/70 text-sm font-medium mb-1.5">البريد الإلكتروني</label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password" className="block text-white/70 text-sm font-medium mb-1.5">كلمة المرور</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (6 أحرف على الأقل)"
              required
              minLength={6}
              autoComplete="new-password"
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
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        <p className="text-center text-white/50 text-sm mt-6">
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">تسجيل الدخول</Link>
        </p>
      </div>

      <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-white mb-5 text-center">لماذا تنشئ حساباً في ELZAVIA؟</h2>
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
      </div>
    </div>
  );
}
