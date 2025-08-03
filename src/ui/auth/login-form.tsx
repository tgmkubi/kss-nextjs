"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { handleSignIn } from "@/lib/congitoActions";
import { loginSchema, type LoginFormData } from "./login-form-schema";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: LoginFormData) {
    setErrorMessage(null);
    try {
      const nextStep = await handleSignIn(values.email, values.password);

      // Eğer kullanıcı e-posta onayı gerekiyorsa
      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        router.push("/auth/confirm-sign-up");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  }

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
              src="/assets/vessel.jpg"
              alt="Illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
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
                  <span className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Login</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Create an account or log in to discover Purgions and find ways to make money.
                </p>
              </motion.div>

              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Email Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                  >
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="email" className="text-gray-300">Email</Label>
                          <FormControl>
                            <Input 
                              id="email" 
                              type="email" 
                              className="bg-gray-900/60 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-300">Password</Label>
                      <Link href="/auth/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">
                        Forgot password?
                      </Link>
                    </div>
                    <FormField
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              className="bg-gray-900/60 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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

                  {/* Continue Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </div>
                      ) : "Continue"}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              {/* Divider */}
              <motion.div
                className="relative my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-black/40 text-gray-400 px-2">OR</span>
                </div>
              </motion.div>

              {/* Google Sign In */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-gray-700 bg-gray-900/40 text-gray-300 hover:bg-gray-800 hover:text-white"
                  type="button"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </Button>
              </motion.div>

              {/* Terms */}
              <motion.p
                className="text-gray-500 mt-6 text-center text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
              >
                By signing in you agree to our{' '}
                <Link
                  href="#"
                  className="text-gray-400 hover:text-purple-400 underline"
                >
                  terms of service
                </Link>{' '}
                and{' '}
                <Link
                  href="#"
                  className="text-gray-400 hover:text-purple-400 underline"
                >
                  privacy policy
                </Link>
                .
              </motion.p>
              
              {/* Sign Up Link */}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
              >
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign up
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