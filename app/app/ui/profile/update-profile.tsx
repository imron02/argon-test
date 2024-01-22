"use client";

import { ProfileState, updateProfile } from "@/app/lib/auth/action";
import { User } from "@/app/lib/definitions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function UpdateProfile({
  user,
  token,
}: {
  user: User;
  token?: string;
}) {
  const initialState = { message: null, errors: {} } as ProfileState;
  const [state, dispatch] = useFormState(updateProfile, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <input type="hidden" name="id" defaultValue={user.id} />
      <input type="hidden" name="token" defaultValue={token} />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Informasi Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Infonya tentang dirimu nih, yang kayak alamat, tanggal lahir, sama
            data spesial lainnya. Biar tetap cool, kita mesti jaga-jaga dan
            pastikan dipake dengan bijak sesuai aturan, ya!
          </p>

          <div className="col-span-full flex items-center gap-x-8 mt-8">
            <span className="inline-block h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <div>
              <button
                type="button"
                className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                Change avatar
              </button>
              <p className="mt-2 text-xs leading-5 text-gray-500">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama depan
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={user.firstName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  aria-describedby="firstName-error"
                />
              </div>
              <div id="firstName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.firstName &&
                  state.errors.firstName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama belakang
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={user.lastName}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  aria-describedby="lastName-error"
                />
              </div>
              <div id="lastName-error" aria-live="polite" aria-atomic="true">
                {state.errors?.lastName &&
                  state.errors.lastName.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Alamat email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  aria-describedby="email-error"
                />
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nomor telepon
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  defaultValue={user.phoneNumber}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  aria-describedby="phoneNumber-error"
                />
              </div>
              <div id="phoneNumber-error" aria-live="polite" aria-atomic="true">
                {state.errors?.phoneNumber &&
                  state.errors.phoneNumber.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  aria-describedby="password-error"
                />
              </div>
              <div id="password-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Konfirmasi password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                  aria-describedby="passwordConfirmation-error"
                />
              </div>
              <div
                id="passwordConfirmation-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.passwordConfirmation &&
                  state.errors.passwordConfirmation.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href="/dashboard/profile">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          aria-disabled={pending}
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
