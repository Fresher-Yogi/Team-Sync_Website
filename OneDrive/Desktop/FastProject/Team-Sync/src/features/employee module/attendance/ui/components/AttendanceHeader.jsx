
import { CalendarDays } from "lucide-react";

const AttendanceHeader = () => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          My Attendance
        </h1>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Track your attendance, working hours and attendance history.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-secondary)]">
        <CalendarDays size={17} className="text-[var(--primary)]" />
        <span> November 2026 </span>
      </div>
    </div>
  );
};

export default AttendanceHeader;
