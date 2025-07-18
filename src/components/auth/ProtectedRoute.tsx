// src/components/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Yükleme bitti ve user yoksa login sayfasına yönlendir
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, user, router]);

  // Yükleniyorsa veya henüz user yoksa, spinner ya da placeholder göster
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Yükleniyor…</p>
      </div>
    );
  }

  // Auth varsa, normal içeriği render et
  return <>{children}</>;
}
