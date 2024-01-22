"use client";

import { authenticate } from "@/app/lib/auth-admin/action";
import { AuthState } from "@/app/lib/auth/action";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";

export default function AdminLoginForm() {
  const initialState = { message: null, errors: {} } as AuthState;
  const [state, dispatch] = useFormState(authenticate, initialState);
  const { pending } = useFormStatus();

  return (
    <form className="space-y-6" action={dispatch}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-700"
        >
          Alamat email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 bg-gray-700/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-700/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-describedby="email-error"
          />
        </div>
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.email &&
            state?.errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 bg-gray-700/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-700/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-describedby="password-error"
          />
        </div>
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.password &&
            state?.errors.password.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <button
          type="submit"
          aria-disabled={pending}
          className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          Sign in
        </button>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
