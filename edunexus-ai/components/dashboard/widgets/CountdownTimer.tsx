"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  deadline: Date | string;
  className?: string;
  compact?: boolean;
}

function getTimeLeft(deadline: Date | string) {
  const target = new Date(deadline).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, expired: false };
}

function urgencyColor(days: number, expired: boolean) {
  if (expired) return "text-red-400 border-red-500/20 bg-red-500/10";
  if (days < 1) return "text-red-400 border-red-500/20 bg-red-500/10";
  if (days < 3) return "text-amber-400 border-amber-500/20 bg-amber-500/10";
  return "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer({ deadline, className, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(deadline));

  useEffect(() => {
    setTimeLeft(getTimeLeft(deadline));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const color = urgencyColor(timeLeft.days, timeLeft.expired);

  if (compact) {
    return (
      <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tabular-nums", color, className)}>
        <Clock className="h-3 w-3" />
        {timeLeft.expired
          ? "Overdue"
          : timeLeft.days > 0
          ? `${timeLeft.days}d ${pad(timeLeft.hours)}h`
          : `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`}
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Clock className={cn("h-4 w-4 flex-shrink-0", color.split(" ")[0])} />
      <div className="flex gap-2 tabular-nums">
        {timeLeft.expired ? (
          <span className="text-sm font-semibold text-red-400">Overdue</span>
        ) : (
          [
            { label: "d", value: timeLeft.days },
            { label: "h", value: timeLeft.hours },
            { label: "m", value: timeLeft.minutes },
            { label: "s", value: timeLeft.seconds },
          ].map(({ label, value }) => (
            <div key={label} className={cn("flex flex-col items-center rounded-md border px-2 py-1 text-xs", color)}>
              <span className="text-sm font-bold">{pad(value)}</span>
              <span className="text-[10px] opacity-70">{label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
