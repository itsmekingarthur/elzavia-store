export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  ingredients?: string[];
  usage?: string;
  weight?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "الكبسولات الذهبية للطاقة",
    slug: "golden-energy-capsules",
    description:
      "كبسولات طبيعية 100% مصممة لتعزيز الطاقة والتركيز طوال اليوم. تركيبة متطورة من الأعشاب الطبيعية والفيتامينات الأساسية.",
    price: 199,
    images: ["/images/products/product-1.jpeg"],
    category: "الطاقة والتركيز",
    ingredients: ["مستخلص الجينسنغ", "فيتامين B12", "مستخلص الشاي الأخضر", "الزنك", "مغنيسيوم"],
    usage: "كبسولة واحدة يومياً مع وجبة الإفطار",
    weight: "60 كبسولة",
  },
  {
    id: "2",
    name: "كبسولات التعافي العضلي",
    slug: "muscle-recovery-capsules",
    description:
      "دعم متكامل لتعافي العضلات بعد التمرين. تحتوي على الأحماض الأمينية الأساسية والبروتينات النباتية لتسريع التعافي.",
    price: 199,
    images: ["/images/products/product-2.jpeg"],
    category: "التعافي والعضلات",
    ingredients: ["BCAA", "جلوتامين", "مستخلص الكركم", "فيتامين D3", "بروتين البازلاء"],
    usage: "كبسولتين بعد التمرين مباشرة",
    weight: "90 كبسولة",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
