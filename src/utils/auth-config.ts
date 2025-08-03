import { type ResourcesConfig } from "aws-amplify";

const userPoolId = String(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID);
const userPoolClientId = String(process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID);

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId,
    userPoolClientId,
  },
};
