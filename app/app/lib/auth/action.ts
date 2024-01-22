"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Tolong masukkan alamat email yang valid" }),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type AuthState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function authenticate(prevState: any, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Terdapat kesalahan. Gagal login.",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Gak bisa login, nih! Email atau passwordnya salah",
            errors: { email: [], password: [] },
          };
        default:
          return {
            message: "Waduh, ada yang salah, nih!",
            errors: { email: [], password: [] },
          };
      }
    }
    throw error;
  }

  return { message: null, errors: { email: [], password: [] } };
}

export async function logOut() {
  await signOut();
}
