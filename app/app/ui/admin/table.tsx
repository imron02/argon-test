import { fetchEmployees } from "@/app/lib/admin/data";
import { User } from "@/app/lib/definitions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EmployeeTable() {
  const token = cookies().get("token")?.value;
  let data: User[] = [];

  if (token) {
    data = await fetchEmployees(token);
  }

  if (data.length == 0) {
    return notFound();
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-green-500 text-white capitalize">
                    {user.position}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{user.phoneNumber}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateEmployee id={user.id} />
                    <DeleteEmployee id={user.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nama depan
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nama belakang
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nomor telepon
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((user) => (
                <tr
                  key={user.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.firstName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.lastName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{user.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {user.phoneNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdateEmployee id={user.id} />
                      <DeleteEmployee id={user.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const UpdateEmployee = ({ id }: { id: string }) => (
  <Link
    href={`/admin/dashboard/employee/${id}/edit`}
    className="rounded-md border p-2 hover:bg-gray-100"
  >
    <PencilIcon className="w-5" />
  </Link>
);

const DeleteEmployee = ({ id }: { id: string }) => (
  <Link
    href={`/admin/dashboard/employee/${id}/delete`}
    className="rounded-md border p-2 hover:bg-gray-100"
  >
    <TrashIcon className="w-5" />
  </Link>
);
