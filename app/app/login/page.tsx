import LoginForm from "@/app/ui/auth/login-form";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  return (
    <main className="h-full bg-gray-900">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <ClockIcon className="h-24 w-24 text-white mx-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Masuk ke akunmu!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
