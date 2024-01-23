"use client";

import { Attendance } from "@/app/lib/definitions";
import { checkIn, checkOut } from "@/app/lib/employee/action";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { format } from "date-fns/format";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckCard({
  attendance,
  token,
}: {
  attendance: Attendance | null;
  token?: string;
}) {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const date = new Date();
  const formattedDate = format(date, "eeee, dd MMMM yyyy");
  const formatterHour = format(time, "HH:mm");
  const formatCheckIn = format(attendance?.checkInDatetime || date, "HH:mm");
  const formatCheckOut = format(attendance?.checkOutDatetime || date, "HH:mm");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    const intervalId = setInterval(updateTime, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  const onPressButton = async () => {
    if (!attendance?.checkInDatetime) {
      const checkInAction = checkIn.bind(null, token || "");
      await checkInAction();
    }

    if (attendance?.checkInDatetime) {
      const checkoutAction = checkOut.bind(null, {
        id: attendance?.id,
        token: token || "",
      });
      await checkoutAction();
    }
    router.refresh();
  };

  return (
    <div className="mt-8 shadow-lg rounded-lg p-4 w-full">
      <div className="flex justify-between text-gray-500 font-medium">
        <h4>{formattedDate}</h4>
        <h6>{formatterHour}</h6>
      </div>

      <div className="mt-4 flex justify-between max-w-80 mx-auto">
        <div className="flex">
          <div
            className={clsx("rounded", {
              "bg-green-400": attendance?.checkInDatetime,
              "bg-gray-300": !attendance?.checkInDatetime,
            })}
          >
            <CheckCircleIcon className="h-12 w-12 text-white" />
          </div>
          <div className="ml-4">
            <div className="font-bold">Hadir</div>
            <div>{attendance?.checkInDatetime ? formatCheckIn : "--:--"}</div>
          </div>
        </div>

        <div className="flex">
          <div
            className={clsx("rounded", {
              "bg-green-400": attendance?.checkOutDatetime,
              "bg-gray-300": !attendance?.checkOutDatetime,
            })}
          >
            <XCircleIcon className="h-12 w-12 text-white" />
          </div>
          <div className="ml-4">
            <div className="font-bold">Pulang</div>
            <div>{attendance?.checkOutDatetime ? formatCheckOut : "--:--"}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-80 mx-auto">
        <button
          type="button"
          className="rounded bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 w-full md:max-w-80"
          onClick={onPressButton}
        >
          Rekam {attendance?.checkInDatetime ? "Pulang" : "Hadir"}
        </button>
      </div>
    </div>
  );
}
