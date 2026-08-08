const benefits = [
  {
    title: "توصيل سريع",
    desc: "توصيل مجاني وسريع لجميع الطلبات",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 11V7a1 1 0 00-1-1H3a1 1 0 00-1 1v8a1 1 0 001 1h2" />
        <path d="M16 11h3.5a1 1 0 01.9.55l2 4A1 1 0 0121.5 16H16" />
        <circle cx="7" cy="17" r="2.2" />
        <circle cx="17" cy="17" r="2.2" />
      </svg>
    ),
  },
  {
    title: "فعالية مضمونة",
    desc: "تركيبات فعالة لتحقيق أفضل النتائج",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "مختبرة ومعتمدة",
    desc: "مكونات مختارة بعناية لضمان الجودة",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3.5l-6 2.2V11c0 5 3.2 8.7 8 10 4.8-1.3 8-5 8-10V5.7l-6-2.2a1 1 0 00-4 0z" />
        <path d="M12 8v4" />
        <circle cx="12" cy="15.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "مكونات طبيعية",
    desc: "مكونات مختارة بعناية من الطبيعة",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20C4 12 8 6 20 4C20 12 16 18 4 20Z" />
        <path d="M4 20C9 15 13 11 16 7" />
      </svg>
    ),
  },
];

export default function BenefitsBar() {
  return (
    <div className="mt-12 md:mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
        {benefits.map((b) => (
          <div key={b.title} className="bg-[#0b2518] px-5 py-6 md:py-7 flex items-center gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-primary-500/20 bg-primary-500/10 flex items-center justify-center text-primary-300">
              {b.icon}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm md:text-base">{b.title}</p>
              <p className="text-white/45 text-xs md:text-sm mt-0.5 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
