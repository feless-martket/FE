"use client";

import React, { useState, useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/solid";

function formatTimeComponent(value: number): string {
  return value.toString().padStart(2, "0");
}

function TimeDisplay() {
  const [time, setTime] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: formatTimeComponent(now.getHours()),
        minutes: formatTimeComponent(now.getMinutes()),
        seconds: formatTimeComponent(now.getSeconds()),
      });
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      {/* 시계 아이콘 */}
      <div className="flex size-8 items-center justify-center rounded-full bg-green-500">
        <ClockIcon className="size-4 text-white" />
      </div>

      {/* 시간 표시 */}
      <div className="text-lg font-medium text-gray-800">
        {time.hours} : {time.minutes} : {time.seconds}
      </div>
    </div>
  );
}

export default TimeDisplay;
