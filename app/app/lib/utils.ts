import { cookies } from "next/headers";
import { User } from "./definitions";

export default function getUserCookies() {
  const userCookies = cookies().get("user")?.value;
  let user: User | null = null;

  if (userCookies) {
    user = JSON.parse(userCookies);
  }

  return user;
}