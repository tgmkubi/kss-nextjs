"use client";
import { useCount } from "@/store/useCount.store";
import { Button } from "@/components/ui/button"

export default function About() {
  const { count, increase, decrease, reset } = useCount();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          This is the about page of our Next.js application. Here you can find more information about our project and team.
        </p>
        <Button onClick={decrease} variant="default">-</Button>
        <span className="text-2xl font-bold">{count}</span>
        <Button onClick={increase} variant="default">+</Button>
        <br></br>
        {/* <button onClick={reset}>Reset</button> */}
        <Button onClick={reset} variant="destructive">Reset</Button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about Next.js
        </a>
      </footer>
    </div>
  );
}
