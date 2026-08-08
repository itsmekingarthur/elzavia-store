"use client";

interface Props {
  messagesCount: number;
}

const actions = [
  { href: "/admin/orders", icon: "📦", label: "عرض الطلبات" },
  { href: "/admin/products", icon: "🏷️", label: "إدارة المنتجات" },
  { href: "/admin/messages", icon: "📨", label: "الرسائل" },
  { href: "/admin/orders?status=%D8%A7%D9%84%D9%83%D9%84", icon: "📋", label: "جميع الطلبات" },
];

export default function QuickActions({ messagesCount }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">إجراءات سريعة</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <a key={a.href} href={a.href} className="bg-gray-50 hover:bg-primary-50 rounded-xl p-4 text-center transition-colors border border-gray-100 hover:border-primary-200">
            <span className="text-2xl">{a.icon}</span>
            <p className="text-xs font-bold text-gray-700 mt-1">
              {a.label}
              {a.href === "/admin/messages" ? ` (${messagesCount})` : ""}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
