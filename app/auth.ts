import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          try {
            const response = await fetch(
              `${process.env.API_URL}/employee/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
              }
            );
            if (response.status !== 200) return null;

            const login = await response.json();
            console.log("data", login.data);
            return {
              ...login.data,
              name: `${login.data.firstName} ${login.data.lastName}`,
            };
          } catch (error) {
            console.log(error);
          }
        }

        return null;
      },
    }),
  ],
});
