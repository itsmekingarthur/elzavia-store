"use client";

import { useState, useEffect, useCallback } from "react";

interface Message {
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        localStorage.setItem("elzavia-messages", JSON.stringify(data));
        return;
      }
    } catch {}
    const saved = JSON.parse(localStorage.getItem("elzavia-messages") || "[]");
    setMessages(saved);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">📨 الرسائل الواردة</h1>
        <button onClick={refresh} className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          تحديث
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl md:rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <p className="text-gray-400 text-base md:text-lg">لا توجد رسائل بعد</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {[...messages].reverse().map((m, i) => (
              <button
                key={i}
                onClick={() => setSelected(m)}
                className={`w-full text-right p-4 md:p-5 hover:bg-gray-50 transition-colors ${
                  selected === m ? "bg-primary-50 ring-1 ring-primary-200" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900 text-sm md:text-base">{m.name}</span>
                  <span className="text-xs text-gray-400">{new Date(m.date).toLocaleDateString("ar-MA")}</span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 truncate">{m.message || "بدون رسالة"}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-6 md:p-8">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                  <span className="text-xs text-gray-400">{new Date(selected.date).toLocaleString("ar-MA")}</span>
                </div>
                {selected.email && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-0.5">البريد الإلكتروني</p>
                    <p className="text-sm font-medium text-gray-900" dir="ltr">{selected.email}</p>
                  </div>
                )}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">الرسالة</p>
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-gray-400 text-sm">اختر رسالة لعرضها</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
