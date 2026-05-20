import { supabase } from "./supabase";

// ---------- Orders ----------
export async function getOrders(): Promise<any[]> {
  const { data } = await supabase.from("orders").select("*").order("createdAt", { ascending: false });
  return data || [];
}

export async function addOrder(order: any) {
  await supabase.from("orders").insert(order);
}

export async function updateOrder(id: string, updates: Partial<any>) {
  await supabase.from("orders").update(updates).eq("id", id);
}

export async function deleteOrder(id: string) {
  await supabase.from("orders").delete().eq("id", id);
}

// ---------- Coupons ----------
export async function getCoupons(): Promise<any[]> {
  const { data } = await supabase.from("coupons").select("*");
  return data || [];
}

export async function addCoupon(coupon: any) {
  await supabase.from("coupons").insert(coupon);
}

export async function deleteCoupon(id: string) {
  await supabase.from("coupons").delete().eq("id", id);
}

// ---------- Messages ----------
export async function getMessages(): Promise<any[]> {
  const { data } = await supabase.from("messages").select("*").order("date", { ascending: false });
  return data || [];
}

export async function addMessage(msg: any) {
  await supabase.from("messages").insert(msg);
}

// ---------- Products ----------
export async function getProducts(): Promise<any[]> {
  try {
    const { data } = await supabase.from("products").select("*");
    if (data && data.length > 0) return data;
  } catch (e) {
    console.error("Supabase error, using fallback products:", e);
  }

  const defaults = [
    {
      id: "1",
      name: "الكبسولات الذهبية للطاقة",
      slug: "golden-energy-capsules",
      description: "مكمل غذائي طبيعي متطور صُمم خصيصًا لدعم الاسترخاء وتهدئة الأعصاب والمساعدة على مواجهة ضغوط الحياة اليومية بفعالية. تحتوي تركيبته المتوازنة على المغنيسيوم، مستخلص البابونج، اللافندر، حشيشة الهر، الميلاتونين، وفيتامين B6، وهي مكونات معروفة بدورها في دعم الجهاز العصبي وتعزيز الشعور بالراحة والهدوء النفسي.",
      benefits: [
        "يساعد على تهدئة الأعصاب وتقليل التوتر",
        "يدعم النوم العميق والمريح",
        "يعزز الاسترخاء ويحسن الحالة المزاجية",
        "يدعم صحة الجهاز العصبي بتركيبة طبيعية فعالة",
        "مناسب للاستخدام اليومي دون التسبب في الإدمان",
      ],
      price: 199,
      images: ["/images/products/product-1.jpeg"],
      category: "الاسترخاء والأعصاب",
      ingredients: ["المغنيسيوم", "مستخلص البابونج", "مستخلص اللافندر", "مستخلص حشيشة الهر", "الميلاتونين", "فيتامين B6"],
      usage: "تناول كبسولة إلى كبسولتين يوميًا مع كوب من الماء، ويفضل قبل النوم أو عند الشعور بالتوتر.",
      warnings: "يُنصح باستشارة الطبيب قبل الاستخدام في حالات الحمل أو الرضاعة أو عند تناول أدوية أخرى. يُحفظ بعيدًا عن متناول الأطفال وفي مكان جاف وبارد.",
      weight: "60 كبسولة",
    },
    {
      id: "2",
      name: "كبسولات التعافي العضلي",
      slug: "muscle-recovery-capsules",
      description: "مكمل غذائي طبيعي متطور غني بمستخلص أوراق المورينغا، صُمم لدعم الصحة العامة وتعزيز النشاط والحيوية اليومية بفضل تركيبته الغنية بالفيتامينات، المعادن، الأحماض الأمينية، ومضادات الأكسدة الطبيعية. تساعد المورينغا على تزويد الجسم بالعناصر الغذائية الأساسية التي يحتاجها للحفاظ على التوازن الغذائي، دعم المناعة، وتحسين مستويات الطاقة بشكل طبيعي.",
      benefits: [
        "يدعم الصحة العامة ويعزز النشاط والحيوية",
        "يساعد على رفع مستويات الطاقة وتقليل الإرهاق",
        "غني بمضادات الأكسدة التي تدعم جهاز المناعة",
        "يساهم في دعم صحة البشرة والشعر",
        "يساعد في تعويض نقص الفيتامينات والمعادن",
        "تركيبة طبيعية مناسبة للاستخدام اليومي",
      ],
      price: 199,
      images: ["/images/products/product-2.jpeg"],
      category: "الصحة العامة والطاقة",
      ingredients: ["مسحوق أوراق المورينغا الطبيعي", "مستخلص الكركم", "مستخلص الفلفل الأسود"],
      usage: "تناول كبسولة إلى كبسولتين يوميًا مع الماء أو حسب الحاجة. يمكن إضافته أيضًا إلى العصائر أو المشروبات الصحية.",
      warnings: "لا يُنصح باستخدامه أثناء الحمل أو في حالات انخفاض ضغط الدم. يُفضل استشارة الطبيب قبل الاستخدام في حال تناول أدوية أو وجود حالة صحية خاصة. يُحفظ بعيدًا عن متناول الأطفال وفي مكان جاف وبارد.",
      weight: "90 كبسولة",
    },
  ];
  return defaults;
}

export async function addProduct(product: any) {
  await supabase.from("products").insert(product);
}

export async function updateProduct(id: string, updates: Partial<any>) {
  await supabase.from("products").update(updates).eq("id", id);
}

export async function deleteProduct(id: string) {
  await supabase.from("products").delete().eq("id", id);
}
