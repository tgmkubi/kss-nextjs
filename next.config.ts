import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_COGNITO_USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT,
  }
};

export default nextConfig;
