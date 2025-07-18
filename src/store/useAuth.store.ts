// src/app/providers/AuthProvider.tsx
"use client";

import { create } from "zustand";
import { signIn, signOut, getCurrentUser } from "aws-amplify/auth";
import "@/lib/awsAmplifyConfig"; // Amplify.configure burada yüklensin

// 1️⃣ Zustand store tipi
type AuthState = {
  user: any;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

// 2️⃣ Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  // login
  signIn: async (username, password) => {
    const u = await signIn({
        username,
        password,
    });
    set({ user: u });
  },
  // logout
  signOut: async () => {
    await signOut();
    set({ user: null });
  },
  // sayfa yüklendiğinde mevcut user'ı çek
  fetchUser: async () => {
    try {
      const u = await getCurrentUser();
      set({ user: u });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
}));
