import { z } from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .min(2, "İsim en az 2 karakter olmalıdır")
        .max(100, "İsim en fazla 100 karakter olabilir"),
    email: z
        .string()
        .min(1, "Email gereklidir")
        .email("Geçerli bir email adresi giriniz"),
    password: z
        .string()
        .min(1, "Şifre gereklidir")
        .min(6, "Şifre en az 6 karakter olmalıdır"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;