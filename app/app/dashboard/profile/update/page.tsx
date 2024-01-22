import { fetchUserProfile } from "@/app/lib/auth/action";
import { AuthSession, User } from "@/app/lib/definitions";
import UpdateProfile from "@/app/ui/profile/update-profile";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page() {
  const token = cookies().get("token")?.value;
  let data: User | null = null;

  if (token) {
    data = await fetchUserProfile(token);
  }

  if (!data) {
    return notFound();
  }

  return <UpdateProfile user={data} token={token} />;
}
