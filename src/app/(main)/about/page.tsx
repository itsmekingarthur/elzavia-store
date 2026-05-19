export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4">عن إلزافيا</h1>
          <p className="text-primary-100 text-base md:text-lg max-w-xl mx-auto">
            قصتنا، رؤيتنا، وشغفنا بتقديم الأفضل لك
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 md:mb-6">قصتنا</h2>
              <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                انطلقت إلزافيا من شغف حقيقي بتقديم مكملات غذائية طبيعية عالية الجودة
                تلبي احتياجات الجسم وتساعد في تحقيق التوازن الصحي المثالي.
              </p>
              <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                نؤمن بأن الطبيعة تزخر بأفضل المكونات التي يحتاجها جسمك، لذلك نختار
                بعناية كل مكون نستخدمه في منتجاتنا.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                فريق إلزافيا ملتزم بتقديم الأفضل لك، من خلال البحث المستمر عن أحدث
                التركيبات العلمية الفعالة والآمنة.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl md:rounded-3xl p-6 md:p-12">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white font-extrabold text-sm md:text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">جودة عالية</h3>
                    <p className="text-gray-500 text-xs md:text-sm">منتجات تخضع لأعلى معايير الجودة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white font-extrabold text-sm md:text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">مكونات طبيعية</h3>
                    <p className="text-gray-500 text-xs md:text-sm">100% مكونات طبيعية وآمنة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white font-extrabold text-sm md:text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">فعالية مثبتة</h3>
                    <p className="text-gray-500 text-xs md:text-sm">تركيبات علمية مدروسة وفعّالة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
