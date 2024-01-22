import { fetchUserProfile } from "@/app/lib/auth/action";
import { AuthSession, User } from "@/app/lib/definitions";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProfileInfo() {
  const authUser = await auth();
  let data: User | null = null;

  if (authUser?.user) {
    const user = authUser.user as AuthSession;
    data = await fetchUserProfile(user.token);
  }

  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="col-span-full flex items-center gap-x-8 mt-8">
        {data.photoPath ? (
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            width={96}
            height={96}
            className="rounded-lg bg-gray-800 object-cover"
          />
        ) : (
          <span className="inline-block h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
      </div>

      <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Nama depan
          </dt>
          <dd className="mt-1 flex gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">{data.firstName}</div>
          </dd>
        </div>

        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Nama belakang
          </dt>
          <dd className="mt-1 flex gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">{data.lastName}</div>
          </dd>
        </div>

        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Email address
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">{data.email}</div>
          </dd>
        </div>

        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Posisi
          </dt>
          <dd className="mt-1 flex gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">{data.position}</div>
          </dd>
        </div>

        <div className="pt-6 sm:flex">
          <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
            Nomor Telepon
          </dt>
          <dd className="mt-1 flex gap-x-6 sm:mt-0 sm:flex-auto">
            <div className="text-gray-900">{data.phoneNumber}</div>
          </dd>
        </div>
      </dl>

      <Link href="/dashboard/profile/update">
        <button
          type="button"
          className="rounded bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 w-full md:max-w-80 mt-8"
        >
          Update
        </button>
      </Link>
    </>
  );
}
