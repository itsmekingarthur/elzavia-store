"use client";

import Link from "next/link";
import MessageThread from "./MessageThread";

interface Props {
  messages: any[];
}

export default function MessagesTab({ messages }: Props) {
  if (messages.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-bold text-white mb-4">الرسائل التي أرسلتها</h2>
        <div className="text-center py-12">
          <p className="text-white/40 mb-4">لم ترسل أي رسالة بعد</p>
          <Link href="/contact" className="btn-nature text-sm">اتصل بنا</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">الرسائل التي أرسلتها</h2>
      <div className="space-y-3">
        {[...messages].reverse().map((msg, i) => (
          <MessageThread key={i} msg={msg} />
        ))}
      </div>
    </div>
  );
}
