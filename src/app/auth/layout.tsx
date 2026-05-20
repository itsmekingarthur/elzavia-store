"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push("/account");
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-primary-950 flex flex-col">
      <div className="absolute inset-0 bg-forest" />
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <img src="/images/logo.png" alt="Elzavia" className="h-12 w-auto opacity-80" />
              <span className="text-xl font-black tracking-[0.15em] text-white/80">ELZAVIA</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
