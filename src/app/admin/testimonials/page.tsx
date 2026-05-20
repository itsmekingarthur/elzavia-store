"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  from: string;
}

const defaultTestimonials: Testimonial[] = [
  { id: "1", name: "محمد", text: "المنتجات زوينة بزاف حسيت بالفرق من اول سيمانة وليت كنحس بالطاقة والتركيز ديالي تزاد فالخدمة", from: "الدار البيضاء" },
  { id: "2", name: "سارة", text: "الجودة ممتازة بزاف وحتا التوصيل كان طيارة، الله يعطيكم الصحة", from: "الرباط" },
  { id: "3", name: "أحمد", text: "من بعد ماخديت كبسولة التعافي العضلي، صراحة الفرق ولا كبير بزاف فالتمارين ديالي", from: "مراكش" },
];

const STORAGE_KEY = "elzavia-testimonials";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial>({ id: "", name: "", text: "", from: "" });

  const load = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setTestimonials(JSON.parse(saved)); } catch { setTestimonials(defaultTestimonials); }
    } else {
      setTestimonials(defaultTestimonials);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTestimonials));
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveAll = (items: Testimonial[]) => {
    setTestimonials(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const openAdd = () => {
    setEditing({ id: Date.now().toString(), name: "", text: "", from: "" });
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing({ ...t });
    setShowForm(true);
  };

  const save = () => {
    if (!editing.name.trim() || !editing.text.trim()) return;
    const exists = testimonials.find((t) => t.id === editing.id);
    const items = exists
      ? testimonials.map((t) => (t.id === editing.id ? editing : t))
      : [...testimonials, editing];
    saveAll(items);
    setShowForm(false);
  };

  const remove = (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الرأي؟")) return;
    saveAll(testimonials.filter((t) => t.id !== id));
  };

  const resetDefaults = () => {
    if (!confirm("سيتم استعادة الآراء الافتراضية. هل أنت متأكد؟")) return;
    saveAll(defaultTestimonials);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">إدارة آراء العملاء</h1>
        <div className="flex gap-2">
          <button onClick={resetDefaults} className="btn-secondary !py-2.5 !px-4 text-sm">
            استعادة الافتراضي
          </button>
          <button onClick={openAdd} className="btn-primary !py-2.5 !px-5 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            إضافة رأي
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg mt-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {testimonials.find((t) => t.id === editing.id) ? "تعديل الرأي" : "إضافة رأي جديد"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">الاسم</label>
                <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input-field text-sm" placeholder="اسم العميل" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">المدينة</label>
                <input type="text" value={editing.from} onChange={(e) => setEditing({ ...editing, from: e.target.value })} className="input-field text-sm" placeholder="مثال: الدار البيضاء" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">نص الرأي</label>
                <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={4} className="input-field text-sm" placeholder="ماذا قال العميل..." />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={save} className="btn-primary flex-1 !py-3 text-sm">حفظ</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1 !py-3 text-sm">إلغاء</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.from}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(t)} className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="تعديل">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => remove(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">لا توجد آراء. أضف رأياً جديداً.</div>
        )}
      </div>
    </div>
  );
}
