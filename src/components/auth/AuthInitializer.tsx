"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuth.store";

export function AuthInitializer() {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return null;
}
