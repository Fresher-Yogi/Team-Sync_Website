
import {
  Clock3,
  LogIn,
  LogOut,
  Timer,
  BriefcaseBusiness,
} from "lucide-react";

import { todayAttendance } from "../data/attendanceData";

const TodayAttendance = () => {
  const details = [
    {
      label: "Check In",
      value: todayAttendance.checkIn,
      icon: LogIn,
      color: "text-[var(--success)]",
    },
    {
      label: "Check Out",
      value: todayAttendance.checkOut,
      icon: LogOut,
      color: "text-[var(--warning)]",
    },
    {
      label: "Working Hours",
      value: todayAttendance.workingHours,
      icon: Timer,
      color: "text-[var(--primary)]",
    },
  ];

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Today's Attendance
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {todayAttendance.date}
          </p>
        </div>

        <span className="flex w-fit items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--success)_25%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--success)]">
          <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
          {todayAttendance.status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4"
            >
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Icon size={17} className={item.color} />
                <span className="text-xs">{item.label}</span>
              </div>

              <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-[var(--border-color)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={15} />
            Shift: {todayAttendance.shift}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={15} />
            Standard: 9 Hours
          </div>
        </div>

        <div className="flex gap-2">
          <button
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-xl bg-[color-mix(in_srgb,var(--primary)_50%,transparent)] px-4 py-2.5 text-sm font-medium text-[var(--bg-main)]/70"
          >
            <LogIn size={16} />
            Check In
          </button>

          <button
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-medium text-[var(--text-muted)]"
          >
            <LogOut size={16} />
            Check Out
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-[var(--text-muted)]">
        Attendance actions will be available after backend integration.
      </p>
    </div>
  );
};

export default TodayAttendance;
