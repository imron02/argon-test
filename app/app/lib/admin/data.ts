import { unstable_noStore } from "next/cache";
import { User } from "../definitions";

export async function fetchEmployees(token: string) {
  unstable_noStore();

  try {
    const response = await fetch(`${process.env.API_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data.data as User[];
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to fetch user data");
  }
}