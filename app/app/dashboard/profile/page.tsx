import ProfileInfo from "@/app/ui/profile/info";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function Page() {
  const authUser = await auth();

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Informasi Personal
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Infonya tentang dirimu nih, yang kayak alamat, tanggal lahir, sama
          data spesial lainnya. Biar tetap cool, kita mesti jaga-jaga dan
          pastikan dipake dengan bijak sesuai aturan, ya!
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileInfo />
        </Suspense>
      </div>
    </section>
  );
}
