"use client";

import { useState, useEffect, useCallback } from "react";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  ingredients: string[];
  usage: string;
  weight: string;
}

const emptyForm: Product = {
  id: "",
  name: "",
  slug: "",
  description: "",
  price: 199,
  images: [""],
  category: "",
  ingredients: [],
  usage: "",
  weight: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product>(emptyForm);
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/products");
    if (res.ok) setProducts(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing({ ...emptyForm, id: Date.now().toString() });
    setIngredientsInput("");
    setImageInput("");
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setIngredientsInput(p.ingredients?.join("، ") || "");
    setImageInput(p.images?.[0] || "");
    setShowForm(true);
  };

  const save = async () => {
    const product = {
      ...editing,
      ingredients: ingredientsInput.split("،").map((s) => s.trim()).filter(Boolean),
      images: imageInput ? [imageInput] : ["/images/placeholder.png"],
    };

    const isNew = !products.find((p) => p.id === editing.id);
    const url = "/api/products";
    const body = isNew ? JSON.stringify(product) : JSON.stringify(product);
    const method = isNew ? "POST" : "PUT";

    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body });
    await load();
    setShowForm(false);
  };

  const remove = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">إدارة المنتجات</h1>
        <button onClick={openAdd} className="btn-primary !py-2.5 !px-5 text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          إضافة منتج
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-2xl mt-8 mb-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editing.id && products.find((p) => p.id === editing.id) ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الاسم</label>
                  <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الرابط (slug)</label>
                  <input type="text" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="input-field text-sm dir-ltr" dir="ltr" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">الوصف</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="input-field text-sm" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">السعر (درهم)</label>
                  <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الوزن</label>
                  <input type="text" value={editing.weight} onChange={(e) => setEditing({ ...editing, weight: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الفئة</label>
                  <input type="text" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input-field text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">رابط الصورة /images/products/...</label>
                <div className="flex gap-3 items-center">
                  <input type="text" value={imageInput} onChange={(e) => setImageInput(e.target.value)} className="input-field text-sm flex-1 dir-ltr" dir="ltr" placeholder="/images/products/product-1.jpeg" />
                  {imageInput && (
                    <img src={imageInput} alt="" className="w-14 h-14 object-contain bg-gray-50 rounded-lg border" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} onLoad={(e) => { (e.target as HTMLImageElement).style.display = ""; }} />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">المكونات (مفصولة بفاصلة ،)</label>
                <input type="text" value={ingredientsInput} onChange={(e) => setIngredientsInput(e.target.value)} className="input-field text-sm" placeholder="مكون1، مكون2، مكون3" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">طريقة الاستخدام</label>
                <input type="text" value={editing.usage} onChange={(e) => setEditing({ ...editing, usage: e.target.value })} className="input-field text-sm" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={save} className="btn-primary flex-1 !py-3 text-sm">حفظ</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 !py-3 text-sm">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-right p-4 text-gray-500 text-sm">المنتج</th>
              <th className="text-right p-4 text-gray-500 text-sm hidden md:table-cell">الفئة</th>
              <th className="text-right p-4 text-gray-500 text-sm">السعر</th>
              <th className="text-right p-4 text-gray-500 text-sm hidden md:table-cell">الوزن</th>
              <th className="text-center p-4 text-gray-500 text-sm">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={product.images?.[0] || "/images/placeholder.png"} alt={product.name} className="w-12 h-12 object-contain bg-gray-50 rounded-lg" />
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm hidden md:table-cell">{product.category}</td>
                <td className="p-4 font-bold text-gray-900 text-sm">{formatPrice(product.price)}</td>
                <td className="p-4 text-gray-500 text-sm hidden md:table-cell">{product.weight}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openEdit(product)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="تعديل">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => remove(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">لا توجد منتجات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
