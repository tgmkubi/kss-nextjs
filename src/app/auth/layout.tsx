"use client";

import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rose-gradient bg-background relative min-h-screen overflow-hidden">
      {/* Gradient backgrounds */}
      <div className="from-background absolute -top-10 left-0 h-1/2 w-full rounded-b-full bg-gradient-to-b to-transparent blur"></div>
      <div className="from-primary/80 absolute -top-64 left-0 h-1/2 w-full rounded-full bg-gradient-to-b to-transparent blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}