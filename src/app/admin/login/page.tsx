"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-primary-900 to-surface-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <img src="/images/logo.png" alt="Elzavia" className="h-14 w-auto mx-auto mb-4 brightness-0 invert" />
            <h1 className="text-2xl font-extrabold text-white">لوحة التحكم</h1>
            <p className="text-white/50 text-sm mt-1">تسجيل الدخول للإدارة</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-username" className="block text-white/70 text-sm font-medium mb-1.5">اسم المستخدم</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                placeholder="أدخل اسم المستخدم"
                autoComplete="username"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-white/70 text-sm font-medium mb-1.5">كلمة المرور</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 transition-colors"
                placeholder="أدخل كلمة المرور"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-xl font-bold text-base hover:from-primary-700 hover:to-primary-600 transition-all duration-300 shadow-lg shadow-primary-500/20"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              العودة للموقع
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
