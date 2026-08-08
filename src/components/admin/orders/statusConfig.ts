export interface StatusMeta {
  key: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  cardBg: string;
  bar: string;
}

export const statuses: StatusMeta[] = [
  { key: "قيد التجهيز", label: "قيد التجهيز", icon: "⏳", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-300", cardBg: "bg-yellow-50", bar: "#EAB308" },
  { key: "نحاول الاتصال بالرقم", label: "نحاول الاتصال", icon: "📞", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-300", cardBg: "bg-amber-50", bar: "#F59E0B" },
  { key: "تم تأكيد الطلبية", label: "تم التأكيد", icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-300", cardBg: "bg-emerald-50", bar: "#10B981" },
  { key: "جاري التوصيل", label: "جاري التوصيل", icon: "📦", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-300", cardBg: "bg-blue-50", bar: "#3B82F6" },
  { key: "تم التوصيل", label: "تم التوصيل", icon: "✅", color: "text-green-600", bg: "bg-green-50", border: "border-green-300", cardBg: "bg-green-50", bar: "#22C55E" },
  { key: "لا رد", label: "لا رد", icon: "📵", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-300", cardBg: "bg-orange-50", bar: "#F97316" },
  { key: "لم يستلم الطلبية", label: "لم يستلم", icon: "❌", color: "text-red-600", bg: "bg-red-50", border: "border-red-300", cardBg: "bg-red-50", bar: "#EF4444" },
  { key: "تم الارجاع", label: "تم الإرجاع", icon: "↩️", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-300", cardBg: "bg-purple-50", bar: "#A855F7" },
  { key: "تم الإلغاء", label: "تم الإلغاء", icon: "🚫", color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-300", cardBg: "bg-gray-50", bar: "#6B7280" },
];

export const STATUS_ALL_META: StatusMeta = {
  key: "الكل",
  label: "جميع الطلبات",
  icon: "📋",
  color: "text-gray-600",
  bg: "bg-gray-100",
  border: "border-gray-300",
  cardBg: "bg-gray-50",
  bar: "#6B7280",
};
