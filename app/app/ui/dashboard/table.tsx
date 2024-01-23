import { Attendance } from "@/app/lib/definitions";
import { fetchAttendances } from "@/app/lib/employee/data";
import { format } from "date-fns/format";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function AttendanceTable() {
  const token = cookies().get("token")?.value;
  let data: Attendance[] = [];

  if (token) {
    data = await fetchAttendances(token);
  }

  if (data.length == 0) {
    return notFound();
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Check In
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Check Out
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((attendance) => {
                const formatCheckIn = format(attendance.checkInDatetime, "dd MMMM yyyy HH:mm");
                const formatCheckOut = format(attendance.checkOutDatetime, "dd MMMM yyyy HH:mm");
                return (
                  <tr
                    key={attendance.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCheckIn}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCheckOut}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
