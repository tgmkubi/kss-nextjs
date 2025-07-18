"use client";

import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const { signOut } = useAuth();
  const router = useRouter();

  return async function signOutAndRedirect() {
    try {
      await signOut();
      router.push("/signin");
    } catch (err: any) {
      console.error("Sign out failed:", err);
      // Burada bir toast veya modal ile de hata gösterebilirsin
    }
  };
}
