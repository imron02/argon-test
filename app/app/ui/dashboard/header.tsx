import { User } from "@/app/lib/definitions";
import Image from "next/image";

export default function Header({ user }: { user: User }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="col-span-3 md:col-span-2 divide-y divide-gray-200 rounded-lg bg-gray-900 shadow-lg">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1">
              <h3 className="text-gray-400">Selamat datang kembali</h3>
              <div className="flex items-center space-x-3 mt-4">
                <h3 className="truncate font-medium text-white text-lg">
                  {`${user.firstName} ${user.lastName}`}
                </h3>
                <span className="capitalize inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {user.position}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem ea, eligendi itaque doloribus laboriosam delectus ex
                dolores dolore soluta numquam earum esse commodi! Consectetur
                quas qui alias sunt nam autem.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-900 shadow-lg hidden md:block">
          <div className="flex w-full items-center justify-between space-x-6 p-6 relative h-full">
            <Image
              src="/card-1.png"
              alt="Card 1"
              className="rounded-lg"
              objectFit="cover"
              priority
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
}
