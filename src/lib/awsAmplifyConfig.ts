import { Amplify } from "aws-amplify";

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID;

if(!userPoolId || !userPoolClientId) {
  throw new Error("Cognito User Pool ID and Client ID must be set in environment variables.");
}

Amplify.configure({
  Auth: {
    Cognito: {
        userPoolId,
        userPoolClientId,
    }
  },
});
