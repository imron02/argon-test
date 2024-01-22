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
    <div className="pt-0 md:pt-20 px-10">
      {user && <Header user={user} />}
      <CheckCard />
    </div>
  );
}
