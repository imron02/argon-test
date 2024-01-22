import getUserCookies from "../lib/utils";
import CheckCard from "../ui/dashboard/check-card";
import Header from "../ui/dashboard/header";

export default async function Page() {
  const user = getUserCookies();

  return (
    <>
      {user && <Header user={user} />}
      <CheckCard />
    </>
  );

  return <p>Dashboard</p>;
}
