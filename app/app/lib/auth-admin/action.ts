"use server";

import { z } from "zod";
import { AuthState } from "../auth/action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Tolong masukkan alamat email yang valid" }),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function authenticate(prevState: any, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });
    const login = await response.json();

    if (response.status !== 200) {
      return { errors: {}, message: login.error } as AuthState;
    }

    const { password, ...data } = login.data;
    cookies().set("user", JSON.stringify({ ...data, role: login.role }));
    cookies().set("token", login.token, {
      maxAge: 60 * 60 * 24, // One day
      path: "/",
    });
  } catch (error) {
    return {
      message: "Waduh, ada yang salah, nih!",
      errors: {},
    } as AuthState;
  }

  redirect("/admin/dashboard");
}
