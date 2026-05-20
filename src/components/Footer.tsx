import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Decorative background leaves */}
      <svg className="absolute -left-20 -top-10 w-60 h-60 opacity-[0.03]" viewBox="0 0 200 300" fill="none">
        <path d="M100 280 Q5 200 20 100 Q30 20 100 10 Q170 20 180 100 Q195 200 100 280Z" fill="#34d399" />
        <path d="M100 280 L100 20" stroke="#34d399" strokeWidth="1.5" />
      </svg>
      <svg className="absolute -right-20 -bottom-10 w-60 h-60 opacity-[0.03] rotate-45" viewBox="0 0 200 300" fill="none">
        <path d="M100 280 Q5 200 20 100 Q30 20 100 10 Q170 20 180 100 Q195 200 100 280Z" fill="#fbbf24" />
        <path d="M100 280 L100 20" stroke="#fbbf24" strokeWidth="1.5" />
      </svg>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="hidden lg:flex items-center justify-center gap-2 mb-12">
          <span className="block w-12 h-px bg-gradient-to-l from-gold-500/40 to-transparent" />
          <span className="block w-16 h-px bg-gold-500/20" />
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
            <span className="w-2 h-2 rounded-full bg-gold-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
          </span>
          <span className="block w-16 h-px bg-gold-500/20" />
          <span className="block w-12 h-px bg-gradient-to-r from-gold-500/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          <div className="lg:col-span-1 relative">
            <div className="absolute -right-4 top-0 w-px h-full hidden md:block bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
            <img
              src="/images/logo.png"
              alt="Elzavia"
              className="h-10 w-auto brightness-0 invert mb-5"
            />
            <p className="text-surface-400 leading-relaxed text-sm md:text-base max-w-xs">
              إلزافيا علامتك الموثوقة للمكملات الغذائية الطبيعية. نقدم أفضل المنتجات لدعم صحتك ولياقتك.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-4 top-0 w-px h-full hidden md:block bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-5">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "المتجر" },
                { href: "/about", label: "عن إلزافيا" },
                { href: "/faq", label: "الأسئلة الشائعة" },
                { href: "/contact", label: "اتصل بنا" },
                { href: "/cart", label: "سلة الشراء" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-surface-300 hover:text-gold-400 transition-colors duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-surface-600 rounded-full group-hover:bg-gold-500 transition-colors duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -right-4 top-0 w-px h-full hidden md:block bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-5">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-surface-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="https://wa.me/+21267702771" target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-gold-400 transition-colors">0677027771</a>
              </li>
              <li className="flex items-center gap-3 text-surface-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={2} />
                  <circle cx="12" cy="12" r="4" strokeWidth={2} />
                  <circle cx="18" cy="6" r="1.2" fill="currentColor" />
                </svg>
                <a href="https://instagram.com/elzavia_shop" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  @elzavia_shop
                </a>
              </li>
              <li className="flex items-center gap-3 text-surface-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                </svg>
                <a href="https://www.facebook.com/profile.php?id=61590113944108" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  Elzavia Shop
                </a>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -right-4 top-0 w-px h-full hidden md:block bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-5">عروض حصرية</h3>
            <p className="text-surface-400 text-sm mb-4 leading-relaxed">
              اشترك لتحصل على آخر العروض والتخفيضات الحصرية
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-surface-500 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              <button className="px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-surface-900 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap">
                اشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Decorative divider before copyright */}
        <div className="flex items-center justify-center gap-2 mt-12 mb-6">
          <span className="block h-px flex-1 bg-gradient-to-l from-surface-700/50 to-transparent" />
          <svg className="w-4 h-4 text-gold-500/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="block h-px flex-1 bg-gradient-to-r from-surface-700/50 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-surface-500 text-xs md:text-sm">
            © {new Date().getFullYear()} إلزافيا. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-surface-500 text-xs">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">سياسة الخصوصية</Link>
            <span className="w-1 h-1 bg-surface-700 rounded-full" />
            <Link href="/terms" className="hover:text-gold-400 transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
