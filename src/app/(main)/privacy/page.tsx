import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-primary-950 overflow-hidden">
      <div className="absolute inset-0 bg-forest" />

      <section className="relative z-10 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center mb-14 md:mb-18">
          <span className="inline-block text-sm font-bold text-primary-300 bg-primary-500/10 backdrop-blur-md border border-primary-500/20 px-4 py-1.5 rounded-full mb-4">
            سياسة الخصوصية
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            خصوصيتك <span className="gradient-text">أولوية</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            نلتزم بحماية بياناتك الشخصية وخصوصيتك
          </p>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12 mb-10">
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                مرحباً بكم في متجر ELZAVIA. نحن نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية.
              </p>

              <Section title="المعلومات التي نقوم بجمعها">
                <p className="text-white/60 mb-3">عند استخدام متجرنا، قد نقوم بجمع بعض المعلومات مثل:</p>
                <ul className="list-disc list-inside text-white/60 space-y-1">
                  <li>الاسم الكامل</li>
                  <li>رقم الهاتف</li>
                  <li>عنوان التوصيل</li>
                  <li>البريد الإلكتروني (إن وجد)</li>
                  <li>معلومات الطلبات والمعاملات</li>
                </ul>
              </Section>

              <Section title="كيفية استخدام المعلومات">
                <p className="text-white/60">نستخدم المعلومات فقط من أجل:</p>
                <ul className="list-disc list-inside text-white/60 space-y-1 mt-3">
                  <li>معالجة الطلبات وتأكيدها</li>
                  <li>توصيل المنتجات</li>
                  <li>تحسين تجربة المستخدم</li>
                  <li>التواصل مع العملاء بخصوص الطلبات أو العروض</li>
                </ul>
              </Section>

              <Section title="حماية المعلومات">
                <p className="text-white/60">نلتزم بحماية بيانات العملاء وعدم مشاركتها مع أي طرف خارجي إلا عند الحاجة لإتمام عملية التوصيل أو الامتثال للقوانين.</p>
              </Section>

              <Section title="ملفات تعريف الارتباط (Cookies)">
                <p className="text-white/60">قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل أداء الموقع.</p>
              </Section>

              <Section title="حقوق العميل">
                <p className="text-white/60">يمكن للعميل طلب تعديل أو حذف بياناته الشخصية عبر التواصل معنا.</p>
              </Section>

              <Section title="التواصل معنا">
                <p className="text-white/60 mb-4">إذا كانت لديكم أي استفسارات بخصوص سياسة الخصوصية يمكنكم التواصل معنا عبر:</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/+21267702771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors px-4 py-2.5 rounded-xl text-sm font-bold"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    واتساب
                  </a>
                  <a
                    href="https://instagram.com/elzavia_shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 text-gold-400 hover:bg-gold-500/20 transition-colors px-4 py-2.5 rounded-xl text-sm font-bold"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={2} />
                      <circle cx="12" cy="12" r="4" strokeWidth={2} />
                      <circle cx="18" cy="6" r="1.2" fill="currentColor" />
                    </svg>
                    إنستغرام
                  </a>
                </div>
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
