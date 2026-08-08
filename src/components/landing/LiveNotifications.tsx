"use client";

interface LiveNotif {
  name: string;
  city: string;
  time: string;
}

interface Props {
  notif: LiveNotif | null;
  onClose: () => void;
}

export default function LiveNotifications({ notif, onClose }: Props) {
  if (!notif) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-2 md:right-4 z-50 max-w-[280px] animate-fade-in-up">
      <div className="bg-white/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-3 shadow-2xl shadow-black/40">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-bold truncate">{notif.name} من {notif.city}</p>
            <p className="text-emerald-400/70 text-[10px]">طلب {notif.time}</p>
          </div>
          <button onClick={onClose} className="text-white/20 hover:text-white/50 transition-colors p-0.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
