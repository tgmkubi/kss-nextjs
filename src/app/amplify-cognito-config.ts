"use client";

import { Amplify } from "aws-amplify";
import { authConfig } from "@/utils/auth-config";
import { useEffect, useState } from "react";

export default function ConfigureAmplifyClientSide() {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Only configure on client side to avoid hydration issues
    if (typeof window !== 'undefined' && !isConfigured) {
      try {
        Amplify.configure(
          { Auth: authConfig },
          { ssr: true }
        );
        setIsConfigured(true);
      } catch (error) {
        console.error('Amplify configuration error:', error);
      }
    }
  }, [isConfigured]);

  // Return null to avoid any rendering issues
  return null;
}
