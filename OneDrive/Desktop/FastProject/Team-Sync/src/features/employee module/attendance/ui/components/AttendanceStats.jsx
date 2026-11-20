
import {
  CalendarCheck,
  CalendarX,
  CalendarMinus,
  ChartNoAxesCombined,
  TrendingUp,
} from "lucide-react";

import { attendanceStats } from "../data/attendanceData";

const iconMap = {
  "calendar-check": CalendarCheck,
  "calendar-x": CalendarX,
  "calendar-minus": CalendarMinus,
  "chart-no-axes-combined": ChartNoAxesCombined,
};

const AttendanceStats = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {attendanceStats.map((stat) => {
        const Icon = iconMap[stat.icon];

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--primary)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                {stat.label}
              </p>

              <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                <Icon size={19} className={stat.color} />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </h2>

            <div className="mt-2 flex items-center gap-1.5">
              <TrendingUp size={13} className="text-[var(--success)]" />
              <p className="text-xs text-[var(--text-muted)]">{stat.change}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;
