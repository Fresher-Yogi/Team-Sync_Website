
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { attendanceRecords } from "../data/attendanceData";

const statusStyles = {
  Present:
    "bg-[color-mix(in_srgb,var(--success)_15%,transparent)] text-[var(--success)]",
  Absent:
    "bg-[color-mix(in_srgb,var(--danger)_15%,transparent)] text-[var(--danger)]",
  Leave:
    "bg-[color-mix(in_srgb,var(--warning)_15%,transparent)] text-[var(--warning)]",
  "Half Day":
    "bg-[color-mix(in_srgb,var(--primary)_15%,transparent)] text-[var(--primary)]",
  Weekend:
    "bg-[var(--bg-hover)] text-[var(--text-muted)]",
  Holiday:
    "bg-[color-mix(in_srgb,var(--secondary)_15%,transparent)] text-[var(--secondary)]",
};

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const attendanceMap = {};

  attendanceRecords.forEach((record) => {
    attendanceMap[record.date] = record.status;
  });

  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };

  const days = Array.from({ length: firstDay + totalDays }, (_, index) => {
    if (index < firstDay) return null;
    return index - firstDay + 1;
  });

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Attendance Calendar
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Your monthly attendance overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => changeMonth(-1)}
            className="rounded-lg border border-[var(--border-color)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <ChevronLeft size={17} />
          </button>

          <span className="min-w-28 text-center text-sm font-medium text-[var(--text-primary)]">
            {monthName}
          </span>

          <button
            onClick={() => changeMonth(1)}
            className="rounded-lg border border-[var(--border-color)] p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-[var(--text-muted)]"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} />;
          }

          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const status = attendanceMap[dateKey];

          return (
            <div
              key={dateKey}
              className={`flex min-h-14 flex-col items-center justify-center rounded-xl border border-[var(--border-color)] sm:min-h-20 ${
                status ? "bg-[var(--bg-hover)]" : "bg-[var(--bg-surface)]"
              }`}
            >
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                {day}
              </span>

              {status && (
                <span
                  className={`mt-1 hidden rounded-md px-1.5 py-0.5 text-[10px] font-medium sm:block ${
                    statusStyles[status]
                  }`}
                >
                  {status}
                </span>
              )}

              {status && (
                <span
                  className={`mt-1 h-1.5 w-1.5 rounded-full sm:hidden ${
                    status === "Present"
                      ? "bg-[var(--success)]"
                      : status === "Absent"
                        ? "bg-[var(--danger)]"
                        : status === "Leave"
                          ? "bg-[var(--warning)]"
                          : status === "Half Day"
                            ? "bg-[var(--primary)]"
                            : "bg-[var(--text-muted)]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-[var(--border-color)] pt-5">
        {Object.entries(statusStyles).map(([status, style]) => (
          <div key={status} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${style.split(" ")[0]}`} />
            <span className="text-xs text-[var(--text-secondary)]">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
