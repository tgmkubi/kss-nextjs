"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lusitana } from "@/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleConfirmSignUp } from "@/lib/congitoActions";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ConfirmSignUpForm() {
  const [errorMessage, dispatch] = useActionState(handleConfirmSignUp, undefined);
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center bg-black/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side - Image */}
        <motion.div
          className="w-full md:w-1/2 p-6 flex items-center justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/assets/person.jpg"
              alt="Illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Right Side - Confirm Signup Form */}
        <motion.div
          className="w-full md:w-1/2 p-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="space-y-6 p-0">
              {/* Logo and Header */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-start space-x-2">
                  <span className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Confirm Account</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Please enter the verification code sent to your email address.
                </p>
              </motion.div>

              <form action={dispatch} className="space-y-5">
                {/* Email Input */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                >
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      name="email"
                      placeholder="Enter your email address"
                      required
                      className="bg-gray-900/60 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 pl-10" 
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  </div>
                </motion.div>

                {/* Code Input */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                >
                  <Label htmlFor="code" className="text-gray-300">Verification Code</Label>
                  <div className="relative">
                    <Input
                      id="code"
                      type="text"
                      name="code"
                      placeholder="Enter verification code"
                      required
                      minLength={6}
                      className="bg-gray-900/60 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 pl-10"
                    />
                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  </div>
                </motion.div>

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    className="flex items-center space-x-1 p-3 rounded-md bg-red-500/10 border border-red-500/20"
                    role="alert"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </motion.div>
                )}

                {/* Confirm Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ConfirmButton />
                </motion.div>
              </form>

              {/* Resend Code */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
              >
                <p className="text-gray-400">
                  Didn't receive a code?{" "}
                  <Link href="#" className="text-purple-400 hover:text-purple-300 font-medium">
                    Resend code
                  </Link>
                </p>
              </motion.div>
              
              {/* Back to Login */}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
              >
                <p className="text-gray-400">
                  <Link href="/auth/login" className="text-gray-400 hover:text-purple-400">
                    Back to login
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white" 
      aria-disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Confirming...
        </div>
      ) : (
        <>
          Confirm <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </>
      )}
    </Button>
  );
}