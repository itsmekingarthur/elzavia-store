"use client";

import { useState } from "react";
import { getMessagesStorageKey } from "@/lib/utils";

export default function MessageThread({ msg }: { msg: any }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sentReply, setSentReply] = useState(msg.user_reply || "");

  const handleReply = async () => {
    if (!replyText.trim()) return;
    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: msg.date, user_reply: replyText.trim() }),
      });
    } catch {}
    // Save reply locally since Supabase may not have user_reply column
    const key = getMessagesStorageKey(msg.user_id);
    const localMsgs = JSON.parse(localStorage.getItem(key) || "[]");
    const idx = localMsgs.findIndex((m: any) => m.date === msg.date);
    if (idx >= 0) localMsgs[idx] = { ...localMsgs[idx], user_reply: replyText.trim() };
    else localMsgs.push({ ...msg, user_reply: replyText.trim() });
    localStorage.setItem(key, JSON.stringify(localMsgs));
    setSentReply(replyText.trim());
    setReplyText("");
    setReplyOpen(false);
  };

  return (
    <div className="bg-white/5 border border-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{msg.name}</span>
        <span className="text-white/40 text-xs">{new Date(msg.date).toLocaleDateString("ar-MA")}</span>
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-3">{msg.message}</p>

      {msg.admin_reply && (
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-bold text-emerald-400">ELZAVIA</span>
            <span className="text-[10px] text-emerald-500/40">— رد الإدارة</span>
          </div>
          <p className="text-sm text-emerald-300/80 leading-relaxed">{msg.admin_reply}</p>
        </div>
      )}

      {sentReply && (
        <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-bold text-primary-400">ردك</span>
          </div>
          <p className="text-sm text-primary-300/80 leading-relaxed">{sentReply}</p>
        </div>
      )}

      {msg.admin_reply && !sentReply && !replyOpen && (
        <button
          onClick={() => setReplyOpen(true)}
          className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          ✏️ رد على ELZAVIA
        </button>
      )}

      {replyOpen && (
        <div className="mt-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="اكتب ردك هنا..."
            rows={2}
            className="w-full text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/40 transition-colors"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleReply}
              disabled={!replyText.trim()}
              className="bg-primary-600 hover:bg-primary-500 text-white text-xs px-4 py-1.5 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إرسال
            </button>
            <button
              onClick={() => setReplyOpen(false)}
              className="text-white/40 hover:text-white/60 text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
