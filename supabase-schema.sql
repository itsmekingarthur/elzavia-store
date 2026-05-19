-- إنشاء جدول الطلبات
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC NOT NULL DEFAULT 0,
  discount NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  coupon TEXT DEFAULT '',
  customer JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'قيد التجهيز',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- إنشاء جدول الكوبونات
CREATE TABLE coupons (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'fixed',
  value NUMERIC NOT NULL DEFAULT 0,
  "minAmount" NUMERIC NOT NULL DEFAULT 0,
  "maxUses" INTEGER NOT NULL DEFAULT 100,
  "usedCount" INTEGER NOT NULL DEFAULT 0,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);

-- إنشاء جدول المنتجات
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 199,
  images JSONB DEFAULT '[]',
  category TEXT DEFAULT '',
  ingredients JSONB DEFAULT '[]',
  usage TEXT DEFAULT '',
  weight TEXT DEFAULT ''
);

-- إنشاء جدول الرسائل
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- إضافة بيانات افتراضية للمنتجات
INSERT INTO products (id, name, slug, description, price, images, category, ingredients, usage, weight)
VALUES
  ('1', 'الكبسولات الذهبية للطاقة', 'golden-energy-capsules', 'كبسولات طبيعية 100% مصممة لتعزيز الطاقة والتركيز طوال اليوم. تركيبة متطورة من الأعشاب الطبيعية والفيتامينات الأساسية.', 199, '["/images/products/product-1.png"]', 'الطاقة والتركيز', '["مستخلص الجينسنغ", "فيتامين B12", "مستخلص الشاي الأخضر", "الزنك", "مغنيسيوم"]', 'كبسولة واحدة يومياً مع وجبة الإفطار', '60 كبسولة'),
  ('2', 'كبسولات التعافي العضلي', 'muscle-recovery-capsules', 'دعم متكامل لتعافي العضلات بعد التمرين. تحتوي على الأحماض الأمينية الأساسية والبروتينات النباتية لتسريع التعافي.', 199, '["/images/products/product-2.png"]', 'التعافي والعضلات', '["BCAA", "جلوتامين", "مستخلص الكركم", "فيتامين D3", "بروتين البازلاء"]', 'كبسولتين بعد التمرين مباشرة', '90 كبسولة')
ON CONFLICT (id) DO NOTHING;

-- إضافة كوبونات افتراضية
INSERT INTO coupons (id, code, type, value, "minAmount", "maxUses", "usedCount", "expiresAt", active)
VALUES
  ('c1', 'ELZAVIA10', 'percentage', 10, 0, 100, 0, '2027-12-31T23:59:59Z', true),
  ('c2', 'WELCOME50', 'fixed', 50, 200, 50, 0, '2027-12-31T23:59:59Z', true),
  ('c3', 'SAVE20', 'percentage', 20, 300, 30, 0, '2027-12-31T23:59:59Z', true)
ON CONFLICT (id) DO NOTHING;
