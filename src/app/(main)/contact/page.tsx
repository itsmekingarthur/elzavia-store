"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    const msg = { ...form, date: new Date().toISOString() };
    const messages = JSON.parse(localStorage.getItem("elzavia-messages") || "[]");
    messages.push(msg);
    localStorage.setItem("elzavia-messages", JSON.stringify(messages));

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
    } catch {}

    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4">اتصل بنا</h1>
          <p className="text-primary-100 text-base md:text-lg max-w-xl mx-auto">
            نحن هنا لمساعدتك، تواصل معنا ونحن سعداء بخدمتك
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">أرسل لنا رسالة</h2>
              {sent ? (
                <div className="bg-green-50 text-green-700 p-4 md:p-6 rounded-xl">
                  <p className="font-bold text-base md:text-lg mb-1">تم إرسال رسالتك بنجاح!</p>
                  <p className="text-sm md:text-base">سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="الاسم"
                    className="input-field text-sm md:text-base"
                    required
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="البريد الإلكتروني"
                    className="input-field text-sm md:text-base"
                    required
                  />
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="رسالتك"
                    rows={5}
                    className="input-field text-sm md:text-base"
                    required
                  />
                  <button type="submit" className="btn-primary w-full text-sm md:text-base">
                    إرسال
                  </button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">معلومات التواصل</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">البريد الإلكتروني</h3>
                    <p className="text-gray-500 text-xs md:text-sm">info@elzavia.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">الهاتف</h3>
                    <p className="text-gray-500 text-xs md:text-sm" dir="ltr">+212 600-000000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">العنوان</h3>
                    <p className="text-gray-500 text-xs md:text-sm">المغرب</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.75 1.5h12.5A4.25 4.25 0 0122.5 5.75v12.5a4.25 4.25 0 01-4.25 4.25H5.75A4.25 4.25 0 011.5 18.25V5.75A4.25 4.25 0 015.75 1.5z" />
                      <circle cx="12" cy="12" r="3.75" strokeWidth={2} />
                      <circle cx="18" cy="6" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">إنستغرام</h3>
                    <a href="https://instagram.com/elzavia_shop" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 text-xs md:text-sm font-medium transition-colors">
                      @elzavia_shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
