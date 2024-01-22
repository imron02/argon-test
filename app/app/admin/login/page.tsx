import AdminLoginForm from "@/app/ui/auth/admin-login-form";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="h-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <ClockIcon className="h-24 w-24 text-gray-700 mx-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Masuk ke akunmu!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
