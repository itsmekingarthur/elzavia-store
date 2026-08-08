"use client";

interface Props {
  value: string;
  error: string;
  onChange: (v: string) => void;
  onApply: () => void;
}

export default function CouponInput({ value, error, onChange, onApply }: Props) {
  return (
    <div className="mb-5 md:mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="كود الخصم"
          className="flex-1 text-sm bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
        />
        <button onClick={onApply} className="btn-nature !py-2 !px-4 text-sm whitespace-nowrap">
          تطبيق
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-xs md:text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
