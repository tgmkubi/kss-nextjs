"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSymbolIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleSignUp } from "@/lib/congitoActions";
import { signUpSchema, type SignUpFormData } from "./signup-form-schema";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function SignUpForm() {
  const router = useRouter();
  
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignUpFormData) {
    try {
      // Call the updated handleSignUp function
      const result = await handleSignUp(values);
      
      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success("Account created successfully! Please check your email for verification.");
        // Redirect to confirm signup page
        router.push("/auth/confirm-signup");
      }
    } catch (err: any) {
      const errorMsg = err.message || "Kayıt sırasında bir hata oluştu";
      toast.error(errorMsg);
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
              src="/assets/person.jpg"
              alt="Illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Right Side - Signup Form */}
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
                  <span className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Sign Up</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Create an account to discover Purgions and find ways to make money.
                </p>
              </motion.div>

              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name Input */} 
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                  >
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your name"
                                className="bg-gray-900/60 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 pl-10" 
                                {...field} 
                              />
                              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Email Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                  >
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your email address"
                                className="bg-gray-900/60 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 pl-10" 
                                {...field} 
                              />
                              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
                  >
                    <FormField
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="password"
                                placeholder="Enter password"
                                className="bg-gray-900/60 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 pl-10"
                                {...field}
                              />
                              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Error Message */}
                  {/* {errorMessage && (
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
                  )} */}

                  {/* Sign Up Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
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
                          Creating account...
                        </div>
                      ) : (
                        <>
                          Create account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              {/* Already have account */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
              >
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
                    Log in
                  </Link>
                </p>
              </motion.div>
              
              {/* Terms */}
              <motion.p
                className="text-gray-500 mt-4 text-center text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
              >
                By signing up you agree to our{' '}
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}