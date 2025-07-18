// src/app/signin/page.tsx
"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

export default function SigninPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Eğer zaten giriş yapılmışsa anasayfaya at
  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Giriş sırasında bir hata oluştu");
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Yükleniyor...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Şifre
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
