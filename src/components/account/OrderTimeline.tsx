"use client";

const timelineSteps = [
  { key: "قيد التجهيز", label: "قيد التجهيز", icon: "⏳", desc: "تم استلام طلبك وبدأ تجهيزه" },
  { key: "نحاول الاتصال بالرقم", label: "نحاول الاتصال", icon: "📞", desc: "نحن نحاول الاتصال بك لتأكيد الطلب" },
  { key: "تم تأكيد الطلبية", label: "تم التأكيد", icon: "✅", desc: "تم تأكيد طلبك بنجاح" },
  { key: "جاري التوصيل", label: "جاري التوصيل", icon: "📦", desc: "طلبك في الطريق إليك" },
  { key: "تم التوصيل", label: "تم التوصيل", icon: "✅", desc: "تم توصيل طلبك بنجاح" },
];

export default function OrderTimeline({ status, shippedAt, deliveredAt, createdAt }: any) {
  const statusIndex = timelineSteps.findIndex((s) => s.key === status);
  return (
    <div className="mt-3 pt-3 border-t border-white/10">
      <div className="flex items-center justify-center" dir="ltr">
        {timelineSteps.map((step, i) => {
          const done = i <= statusIndex;
          const current = i === statusIndex;
          const date = i === 0 ? createdAt : i === 1 ? shippedAt : deliveredAt;
          return (
            <div key={step.key} className="flex items-center">
              {i > 0 && (
                <div className={`w-8 md:w-12 h-0.5 mx-1 ${done ? "bg-primary-500/40" : "bg-white/10"}`} />
              )}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                  done ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-white/30"
                } ${current ? "ring-2 ring-primary-500/40 scale-110" : ""}`}>
                  {step.icon}
                </div>
                <p className={`text-[10px] font-bold mt-1 whitespace-nowrap ${done ? "text-primary-300" : "text-white/30"}`}>{step.label}</p>
                {date && <p className="text-[9px] text-white/30">{new Date(date).toLocaleDateString("ar-MA")}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
