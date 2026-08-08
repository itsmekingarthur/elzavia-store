export const OFFER_PRICE = 249;
export const ORIGINAL_VALUE = 398;
export const SAVINGS = ORIGINAL_VALUE - OFFER_PRICE;

export const testimonials = [
  { name: "أحمد م.", text: "منتجات طبيعية رائعة، حسّنت نومي بشكل ملحوظ", stars: 5 },
  { name: "سارة ل.", text: "جودة ممتازة والتوصيل كان سريع جداً", stars: 5 },
  { name: "يوسف ك.", text: "صراحة فرق معايا من أول أسبوع، أنصح بالشراء", stars: 5 },
  { name: "مريم ف.", text: "الدفع عند الاستلام مريح جداً والمنتج أصلي", stars: 5 },
];

export const liveNames = [
  { name: "محمد", city: "الدار البيضاء" },
  { name: "فاطمة", city: "الرباط" },
  { name: "يوسف", city: "مراكش" },
  { name: "خديجة", city: "فاس" },
  { name: "أحمد", city: "طنجة" },
  { name: "نورة", city: "أكادير" },
  { name: "عمر", city: "وجدة" },
  { name: "سلمى", city: "مكناس" },
  { name: "إدريس", city: "تطوان" },
  { name: "مريم", city: "القنيطرة" },
];

export const timesAgo = ["قبل دقيقة", "قبل 3 دقائق", "قبل 5 دقائق", "قبل دقيقتين", "قبل 7 دقائق", "قبل 4 دقائق"];

export function getLandingImages(productName: string) {
  return [
    { src: "/images/landing page/main.png", alt: productName },
    { src: "/images/landing page/pic1.jpeg", alt: `${productName} - مكونات طبيعية` },
    { src: "/images/landing page/pic2.jpeg", alt: `${productName} - نمط حياة صحي` },
    { src: "/images/landing page/pic3.jpeg", alt: `${productName} - عرض خاص` },
  ];
}

export const landingFaqs = [
  { q: "كيف أستفيد من العرض؟", a: "املأ النموذج أعلاه واطلب الآن! ستحصل على منتجين بسعر 249 درهم فقط مع توصيل مجاني." },
  { q: "هل التوصيل مجاني؟", a: "نعم، التوصيل مجاني لجميع المدن المغربية دون أي رسوم إضافية." },
  { q: "كم يستغرق التوصيل؟", a: "يتم التوصيل خلال 24-48 ساعة حسب مدينتك." },
  { q: "هل المنتج طبيعي وآمن؟", a: "نعم، جميع منتجاتنا طبيعية 100% وآمنة للاستخدام اليومي." },
];

export const trustFeatures = [
  { icon: "🚚", title: "توصيل مجاني", desc: "24-48 ساعة" },
  { icon: "💳", title: "الدفع عند الاستلام", desc: "آمن ومريح" },
  { icon: "🌿", title: "طبيعي 100%", desc: "مكونات طبيعية" },
  { icon: "⭐", title: "جودة مضمونة", desc: "منتج أصلي" },
  { icon: "🛡️", title: "ضمان استرداد", desc: "غير راض؟ أموالك" },
];

export const whyElzavia = [
  { icon: "🌿", title: "منتجات طبيعية 100%", desc: "مكونات طبيعية وآمنة للاستخدام اليومي" },
  { icon: "✅", title: "جودة مضمونة", desc: "أعلى معايير الجودة والسلامة" },
  { icon: "🚚", title: "توصيل مجاني", desc: "لجميع المدن المغربية" },
  { icon: "💳", title: "الدفع عند الاستلام", desc: "تدفع بعد ما تستلم الطلب" },
];
