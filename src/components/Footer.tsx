import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          <div className="lg:col-span-1">
            <img
              src="/images/logo.png"
              alt="Elzavia"
              className="h-10 w-auto brightness-0 invert mb-5"
            />
            <p className="text-surface-400 leading-relaxed text-sm md:text-base max-w-xs">
              إلزافيا علامتك الموثوقة للمكملات الغذائية الطبيعية. نقدم أفضل المنتجات لدعم صحتك ولياقتك.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-5">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { href: "/shop", label: "المتجر" },
                { href: "/about", label: "عن إلزافيا" },
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

          <div>
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-5">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-surface-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@elzavia.com</span>
              </li>
              <li className="flex items-center gap-3 text-surface-300 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span dir="ltr">+212 600-000000</span>
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
            </ul>
          </div>

          <div>
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

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-surface-500 text-xs md:text-sm">
            © {new Date().getFullYear()} إلزافيا. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-surface-500 text-xs">
            <Link href="/about" className="hover:text-gold-400 transition-colors">سياسة الخصوصية</Link>
            <span className="w-1 h-1 bg-surface-700 rounded-full" />
            <Link href="/contact" className="hover:text-gold-400 transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
