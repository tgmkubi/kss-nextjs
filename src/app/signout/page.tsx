// src/app/signout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function SignoutPage() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function doSignOut() {
      try {
        await signOut();
        router.replace("/signin"); // çıkış sonrası signin sayfasına yönlendir
      } catch (err: any) {
        console.error("Sign out error:", err);
        setError(err.message || "Çıkış yaparken bir hata oluştu");
      }
    }
    doSignOut();
  }, [signOut, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-sm w-full text-center bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {error ? (
          <>
            <h1 className="text-xl font-semibold mb-4">Hata</h1>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.replace("/")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ana Sayfaya Dön
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold mb-2">Çıkış Yapılıyor…</h1>
            <p className="text-sm text-gray-500">Lütfen bekleyin...</p>
          </>
        )}
      </div>
    </div>
  );
}
