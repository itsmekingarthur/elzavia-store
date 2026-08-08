"use client";

interface Props {
  user: any;
  profile: any;
  points: number;
}

export default function ProfileTab({ user, profile, points }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">الملف الشخصي</h2>
      <div className="space-y-4 max-w-sm">
        <div>
          <label className="block text-white/50 text-xs font-medium mb-1">اسم المستخدم</label>
          <p className="text-white font-medium">{profile?.username || "—"}</p>
        </div>
        <div>
          <label className="block text-white/50 text-xs font-medium mb-1">البريد الإلكتروني</label>
          <p className="text-white font-medium">{user.email}</p>
        </div>
        <div>
          <label className="block text-white/50 text-xs font-medium mb-1">النقاط</label>
          <p className="text-gold-400 font-bold">{points} نقطة</p>
          <p className="text-white/40 text-xs mt-0.5">احصل على 50 نقطة عن كل طلب يتم توصيله</p>
        </div>
        <div>
          <label className="block text-white/50 text-xs font-medium mb-1">تاريخ الإنشاء</label>
          <p className="text-white/70 text-sm">{user.created_at ? new Date(user.created_at).toLocaleDateString("ar-MA") : "—"}</p>
        </div>
      </div>
    </div>
  );
}
