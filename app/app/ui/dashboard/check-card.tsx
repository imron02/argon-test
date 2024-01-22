"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns/format";
import { useEffect, useState } from "react";

export default function CheckCard() {
  const [time, setTime] = useState(new Date());
  const date = new Date();
  const formattedDate = format(date, "eeee, dd MMMM yyyy");
  const formatterHour = format(time, "HH:mm");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    const intervalId = setInterval(updateTime, 1000 * 60);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-8 shadow-lg rounded-lg p-4 w-full">
      <div className="flex justify-between text-gray-500 font-medium">
        <h4>{formattedDate}</h4>
        <h6>{formatterHour}</h6>
      </div>

      <div className="mt-4 flex justify-between max-w-80 mx-auto">
        <div className="flex">
          <div className="bg-green-400 rounded">
            <CheckCircleIcon className="h-12 w-12 text-white" />
          </div>
          <div className="ml-4">
            <div className="font-bold">Hadir</div>
            <div>--:--</div>
          </div>
        </div>

        <div className="flex">
          <div className="bg-gray-300 rounded">
            <XCircleIcon className="h-12 w-12 text-white" />
          </div>
          <div className="ml-4">
            <div className="font-bold">Pulang</div>
            <div>--:--</div>
          </div>
        </div>
      </div>

      <div className="mt-4 max-w-80 mx-auto">
        <button
          type="button"
          className="rounded bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 w-full md:max-w-80"
        >
          Rekam Hadir
        </button>
      </div>
    </div>
  );
}
