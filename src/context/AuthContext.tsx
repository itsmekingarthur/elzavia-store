"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string;
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const local = localStorage.getItem(`elzavia-profile-${userId}`);
    if (local) {
      try { setProfile(JSON.parse(local)); } catch {}
    }
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) {
      setProfile(data);
      localStorage.setItem(`elzavia-profile-${userId}`, JSON.stringify(data));
    } else if (!local) {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user?.email) {
        const fallback: Profile = {
          id: userId,
          username: userData.user.email?.split("@")[0] || "user",
          email: userData.user.email,
        };
        setProfile(fallback);
        localStorage.setItem(`elzavia-profile-${userId}`, JSON.stringify(fallback));
      }
    }
  }

  async function signUp(email: string, password: string, username: string): Promise<string | null> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) return error.message;
    if (!data.user) return "فشل إنشاء الحساب";

    try {
      await supabase.from("profiles").insert({
        id: data.user.id,
        username,
        email,
      });
    } catch {}

    const localProfile: Profile = { id: data.user.id, username, email };
    localStorage.setItem(`elzavia-profile-${data.user.id}`, JSON.stringify(localProfile));
    setProfile(localProfile);

    return null;
  }

  async function signIn(email: string, password: string): Promise<string | null> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
