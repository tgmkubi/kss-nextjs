// src/lib/useAuth.ts
import { useAuthStore } from "@/store/useAuth.store";

export const useAuth = () => {
  const { user, loading, signIn, signOut, fetchUser } = useAuthStore();
  return { user, loading, signIn, signOut, fetchUser };
};
