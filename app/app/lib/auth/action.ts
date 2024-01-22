"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { User } from "../definitions";

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
      message: "",
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/employee/login`, {
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
    cookies().set("user", JSON.stringify(data));
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

  redirect("/dashboard");
}

export async function logOut() {
  cookies().delete("user");
  cookies().delete("token");
  redirect("/login");
}

export async function fetchUserProfile(token: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/employee/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data.data as User;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to fetch user data");
  }
}

export type ProfileState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phoneNumber?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  };
  message?: string | null;
};

const UpdateProfile = z
  .object({
    id: z.string(),
    token: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z
      .string()
      .email({ message: "Tolong masukkan alamat email yang valid" }),
    phoneNumber: z.string().min(10, "Nomor telepon minimal 10 karakter"),
    password: z
      .union([
        z.string().length(0, "Password minimal 6 karakter"),
        z.string().min(6, "Password minimal 6 karakter"),
      ])
      .optional(),
    passwordConfirmation: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Konfirmasi password harus sama dengan password",
    path: ["passwordConfirmation"],
  });

export async function updateProfile(
  prevState: ProfileState,
  formData: FormData
) {
  const validatedFields = UpdateProfile.safeParse({
    id: formData.get("id"),
    token: formData.get("token"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    console.log("errors", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  try {
    if (
      !validatedFields.data.password &&
      !validatedFields.data.passwordConfirmation
    ) {
      delete validatedFields.data.password;
      delete validatedFields.data.passwordConfirmation;
    }
    const response = await fetch(
      `${process.env.API_URL}/employee/${validatedFields.data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${validatedFields.data.token}`,
        },
        body: JSON.stringify(validatedFields.data),
      }
    );
    if (response.status !== 200) {
      throw new Error("Gagal update profile");
    }

    const json = await response.json();
    const { password, ...data } = json.data;
    cookies().set("user", JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong. Gagal update profile.",
      error: {},
    };
  }

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
}
