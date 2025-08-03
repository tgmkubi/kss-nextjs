import { redirect } from "next/navigation";
import z from "zod";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  resetPassword,
  autoSignIn,
} from "aws-amplify/auth";
import { getErrorMessage } from "@/utils/get-error-message";
import { signUpSchema, type SignUpFormData } from "@/ui/auth/signup-form-schema";

/* export const handleSignUp = async (prevState: string | undefined, formData: FormData) => {
  console.log("signing up");
  try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
          username: String(formData.get("email")),
          password: String(formData.get("password")),
          options: {
              userAttributes: {
                  email: String(formData.get("email")),
                  name: String(formData.get("name"))
              },
              // optional
              autoSignIn: true
          }
      })
  } catch (error) {
      return getErrorMessage(error);
  }
  redirect("/auth/confirm-signup");
}; */

export const handleSignUp = async (formData: SignUpFormData) => {
  console.log("signing up");
  const result = signUpSchema.safeParse(formData);

  if (!result.success) {
    return {
      status: "error",
      message: result.error.message
    }
  }

  const { name, email, password } = result.data;

  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email, // username should be email, not name
      password: password,
      options: {
        userAttributes: {
          email: email,
          name: name
        },
        // optional
        autoSignIn: true
      }
    })

    return {
      status: "success",
      message: "Account created successfully"
    }
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      status: "error",
      message: getErrorMessage(error)
    }
  }
}

export const sendEmailVerificationCode = async (prevState: { message: string, errorMessage: string }, formData: FormData) => {
  console.log("resending sign up code");
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email"))
    });
    currentState = {
      ...prevState,
      message: "Code resent successfully. Please check your email."
    }
  } catch (error) {
    console.error("Error resending sign up code:", error);
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error)
    };
  }
  return currentState;
}

export const handleConfirmSignUp = async (prevState: string | undefined, formData: FormData) => {
  console.log("confirming sign up");
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code"))
    });
    autoSignIn();
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("/auth/login");
};

/* export const handleSignIn = async (prevState: string | undefined, formData: FormData) => {
  console.log("signing in");
  let redirectUrl = "/dashboard";
  try {
      const { isSignedIn, nextStep } = await signIn({
          username: String(formData.get("email")),
          password: String(formData.get("password"))
      });
      if(nextStep?.signInStep === "CONFIRM_SIGN_UP") {
          redirectUrl =  "/auth/confirm-sign-up";
      }
  } catch (error) {
      return getErrorMessage(error);
  }
  redirect(redirectUrl);
}; */

export async function handleSignIn(
  email: string,
  password: string
): Promise<{ signInStep?: string }> {
  try {
    // Amplify’den gelen nextStep bilgisini döndürüyoruz
    const { nextStep } = await signIn({
      username: email,
      password,
    });
    return nextStep || {};
  } catch (error: any) {
    // Hatanın okunabilir mesajını fırlatıyoruz
    throw new Error(getErrorMessage(error));
  }
}


export const handleSignOut = async () => {
  console.log("signing out");
  try {
    await signOut();
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("/auth/login");
};

// test it later
export const handleResetPassword = async (prevState: string | undefined, formData: FormData) => {
  console.log("handling reset password");
  try {
    const { nextStep } = await resetPassword({
      username: String(formData.get("email")),
      options: {
        confirmationCode: String(formData.get("code")),
        newPassword: String(formData.get("newPassword"))
      }
    });
  } catch (error) {
    return getErrorMessage(error);
  }
}
