import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-forest" />

      <section className="relative z-10 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center mb-14 md:mb-18">
          <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
            الشروط والأحكام
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            شروط <span className="gradient-text">الاستخدام</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            باستخدامك لهذا الموقع فإنك توافق على الشروط التالية
          </p>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12 mb-10">
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                مرحباً بكم في متجر ELZAVIA. باستخدامكم لهذا الموقع فإنكم توافقون على الشروط والأحكام التالية:
              </p>

              <Section title="الطلبات">
                <ul className="list-disc list-inside text-white/60 space-y-1">
                  <li>جميع الطلبات تخضع للتأكيد عبر الهاتف أو الرسائل.</li>
                  <li>يحق للمتجر إلغاء أي طلب في حال تعذر التواصل مع العميل أو توفر المنتج.</li>
                </ul>
              </Section>

              <Section title="الأسعار">
                <ul className="list-disc list-inside text-white/60 space-y-1">
                  <li>جميع الأسعار معروضة بالدرهم المغربي وتشمل الضرائب إن وجدت.</li>
                  <li>يحق للمتجر تعديل الأسعار أو العروض في أي وقت.</li>
                </ul>
              </Section>

              <Section title="التوصيل">
                <ul className="list-disc list-inside text-white/60 space-y-1">
                  <li>تختلف مدة التوصيل حسب المدينة وشركة الشحن.</li>
                  <li>المتجر غير مسؤول عن أي تأخير خارج عن إرادته.</li>
                </ul>
              </Section>

              <Section title="الاسترجاع والاستبدال">
                <ul className="list-disc list-inside text-white/60 space-y-1">
                  <li>يمكن طلب الاسترجاع أو الاستبدال خلال مدة محددة إذا كان المنتج متضرراً أو به خطأ.</li>
                  <li>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم.</li>
                </ul>
              </Section>

              <Section title="الاستخدام">
                <ul className="list-disc list-inside text-white/60 space-y-1">
                  <li>يمنع استخدام الموقع لأي نشاط غير قانوني أو يسبب ضرراً للمتجر أو المستخدمين.</li>
                </ul>
              </Section>

              <Section title="الملكية الفكرية">
                <p className="text-white/60">
                  جميع الصور، التصاميم، الشعارات، والمحتوى الموجود بالموقع مملوك لمتجر ELZAVIA ولا يجوز نسخه أو استخدامه بدون إذن.
                </p>
              </Section>

              <Section title="تعديل الشروط">
                <p className="text-white/60">يحق للمتجر تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق.</p>
              </Section>
            </div>

            <div className="text-center">
              <Link href="/" className="btn-nature inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base shadow-lg shadow-primary-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-extrabold text-white mb-3">{title}</h2>
      {children}
    </div>
  );
}
