import { auth } from "@/auth";
import { User } from "../lib/definitions";
import Header from "../ui/dashboard/header";
import CheckCard from "../ui/dashboard/check-card";

export default async function Page() {
  const authUser = await auth();
  let user: User | null = null;

  if (authUser?.user) {
    user = authUser.user as User;
  }

  return (
    <>
      {user && <Header user={user} />}
      <CheckCard />
    </>
  );
}
