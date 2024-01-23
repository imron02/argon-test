import { cookies } from "next/headers";
import { fetchAttendance } from "../lib/employee/data";
import getUserCookies from "../lib/utils";
import CheckCard from "../ui/dashboard/check-card";
import Header from "../ui/dashboard/header";
import { Attendance } from "../lib/definitions";

export default async function Page() {
  const user = getUserCookies();
  const token = cookies().get("token")?.value;
  let attendance: Attendance | null = null;

  if (token) {
    attendance = await fetchAttendance(token);
  }

  return (
    <>
      {user && <Header user={user} />}
      <CheckCard attendance={attendance} token={token} />
    </>
  );
}
