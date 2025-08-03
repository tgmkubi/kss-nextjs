import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server';
import { authConfig } from "@/utils/auth-config";
import { cookies } from 'next/headers';

// Expose runWithAmplifyServerContext for server-side API calls
export const { runWithAmplifyServerContext } = createServerRunner({
    config: {
        Auth: authConfig,
    },
});

// Server Components için authenticated user
export async function authenticatedUser() {
    try {
        return await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: async (contextSpec) => {
                try {
                    const session = await fetchAuthSession(contextSpec);

                    if (!session.tokens?.idToken || !session.tokens?.accessToken) {
                        return null;
                    }

                    const currentUser = await getCurrentUser(contextSpec);

                    const user = {
                        ...currentUser,
                        isAdmin: false,
                    };

                    const groups = session.tokens.accessToken.payload["cognito:groups"];
                    user.isAdmin = Array.isArray(groups) && groups.includes("Admins");

                    return user;
                } catch (error) {
                    console.log("Authentication error:", error);
                    return null;
                }
            },
        });
    } catch (error) {
        console.log("Server context error:", error);
        return null;
    }
}

// API Routes için authenticated user (App Router)
export async function authenticatedUserFromApiRoute() {
    try {
        return await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: async (contextSpec) => {
                try {
                    const session = await fetchAuthSession(contextSpec);

                    if (!session.tokens?.idToken || !session.tokens?.accessToken) {
                        return null;
                    }

                    const currentUser = await getCurrentUser(contextSpec);

                    const user = {
                        ...currentUser,
                        isAdmin: false,
                    };

                    const groups = session.tokens.accessToken.payload["cognito:groups"];
                    user.isAdmin = Array.isArray(groups) && groups.includes("Admins");

                    return user;
                } catch (error) {
                    console.log("Authentication error:", error);
                    return null;
                }
            },
        });
    } catch (error) {
        console.log("Server context error:", error);
        return null;
    }
}

// Legacy API Routes için authenticated user (Pages Router)
export async function authenticatedUserFromLegacyApiRoute(req: any, res: any) {
    try {
        return await runWithAmplifyServerContext({
            nextServerContext: { request: req, response: res },
            operation: async (contextSpec) => {
                try {
                    const session = await fetchAuthSession(contextSpec);

                    if (!session.tokens?.idToken || !session.tokens?.accessToken) {
                        return null;
                    }

                    const currentUser = await getCurrentUser(contextSpec);

                    const user = {
                        ...currentUser,
                        isAdmin: false,
                    };

                    const groups = session.tokens.accessToken.payload["cognito:groups"];
                    user.isAdmin = Array.isArray(groups) && groups.includes("Admins");

                    return user;
                } catch (error) {
                    console.log("Authentication error:", error);
                    return null;
                }
            },
        });
    } catch (error) {
        console.log("Server context error:", error);
        return null;
    }
}
