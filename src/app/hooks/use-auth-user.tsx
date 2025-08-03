import {
    fetchAuthSession,
    fetchUserAttributes,
    getCurrentUser,
} from "aws-amplify/auth";
import { useState, useEffect } from "react";

export default function useAuthUser() {
    const [user, setUser] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const session = await fetchAuthSession();
                if(!session.tokens) {
                    setLoading(false);
                    return;
                }
                const user = {
                    ...(await getCurrentUser()),
                    ...(await fetchUserAttributes()),
                    isAdmin: false,
                }
                const groups = session.tokens.accessToken.payload["cognito:groups"];
                user.isAdmin = Array.isArray(groups) && groups.includes("Admins");
                setUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}