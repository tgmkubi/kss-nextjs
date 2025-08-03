'use client';

import { Amplify } from 'aws-amplify';
import { authConfig } from "@/utils/auth-config";

// Enable SSR mode so tokens live in HttpOnly cookies
Amplify.configure({ Auth: authConfig }, { ssr: true });

export default function ConfigureAmplifyClientSide() {
  return null;
}
