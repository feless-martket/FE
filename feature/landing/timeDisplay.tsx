"use client";

import React, { useState, useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/solid";

function formatTimeComponent(value: number) {
  return value.toString().padStart(2, "0");
}

function TimeDisplay() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { hours, minutes, seconds } = time;
  const hoursStr = formatTimeComponent(hours);
  const minutesStr = formatTimeComponent(minutes);
  const secondsStr = formatTimeComponent(seconds);

  return (
    <div className="flex items-center space-x-2">
      {/* 초록색 원 안에 시계 아이콘 */}
      <div className="flex size-8 items-center justify-center rounded-full bg-green-500">
        <ClockIcon className="size-4 text-white" />
      </div>

      {/* 시간 표시 */}
      <div className="text-lg font-medium text-gray-800">
        {hoursStr} : {minutesStr} : {secondsStr}
      </div>
    </div>
  );
}

export default TimeDisplay;
