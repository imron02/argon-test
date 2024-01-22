import { fetchUserProfile } from "@/app/lib/auth/action";
import { AuthSession, User } from "@/app/lib/definitions";
import UpdateProfile from "@/app/ui/profile/update-profile";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Page() {
  const authUser = await auth();
  let session: AuthSession | null = null;
  let data: User | null = null;

  if (authUser?.user) {
    session = authUser.user as AuthSession;
    data = await fetchUserProfile(session.token);
  }

  if (!data) {
    return notFound();
  }

  return <UpdateProfile user={data} token={session?.token} />;
}
