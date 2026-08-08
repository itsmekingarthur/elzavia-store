"use client";

interface Props {
  orderId: string | null;
  reason: string;
  onReasonChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelModal({ orderId, reason, onReasonChange, onConfirm, onClose }: Props) {
  if (!orderId) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mt-16 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-gray-900 mb-2">إلغاء الطلبية</h3>
        <p className="text-sm text-gray-500 mb-4">يرجى ذكر سبب الإلغاء ليتم إظهاره للعميل</p>
        <textarea
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="سبب الإلغاء..."
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-400 transition-colors resize-none"
          autoFocus
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            تأكيد الإلغاء
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm transition-colors">
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}
