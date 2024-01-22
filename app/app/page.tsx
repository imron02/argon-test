import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-screen bg-gray-900">
      <div className="relative h-auto overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <Image
          className="h-full w-full object-cover hidden md:block"
          src="/hero-desktop.png"
          alt="Hero Desktop Image"
          fill
        />
        <div className="relative h-60">
          <Image
            className="object-cover block md:hidden w-full"
            src="/hero-mobile.jpg"
            alt="Hero Mobile Image"
            fill
          />
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl py-8 md:py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Yeay, Selamat Datang!
          </p>
          <p className="mt-6 text-base leading-7 text-gray-300">
            Bos, siap-siap buat pengalaman absensi yang nggak biasa! Di sini,
            kita punya portal absensi karyawan yang asyik banget. Mulai dari
            absen gampang, kelola cuti santai, sampe optimalkan waktu tanpa
            ribet. Nggak percaya? Coba aja sendiri dan rasain bedanya! Jangan
            ketinggalan, yuk tingkatkan kerja tim kita bareng-bareng!
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
