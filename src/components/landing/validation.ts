export function validateName(v: string) {
  if (!v.trim()) return "الاسم مطلوب";
  if (v.trim().length < 2) return "الاسم قصير جداً";
  return "";
}

export function validatePhone(v: string) {
  const c = v.replace(/\s|-/g, "");
  if (!c) return "رقم الهاتف مطلوب";
  if (!/^(0[567]\d{8}|(\+212)[567]\d{8}|00212[567]\d{8})$/.test(c)) return "رقم هاتف غير صحيح (مثال: 06XXXXXXXX)";
  return "";
}

export function validateAddress(v: string) {
  if (!v.trim()) return "العنوان مطلوب";
  if (v.trim().length < 5) return "يرجى إدخال عنوان كامل";
  return "";
}
