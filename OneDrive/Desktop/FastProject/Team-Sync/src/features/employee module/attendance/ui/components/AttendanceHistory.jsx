
import { useState } from "react";
import { Search, Filter, CalendarDays } from "lucide-react";

import { attendanceRecords } from "../data/attendanceData";

const statusStyles = {
  Present:
    "bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_25%,transparent)]",
  Absent:
    "bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] text-[var(--danger)] border-[color-mix(in_srgb,var(--danger)_25%,transparent)]",
  Leave:
    "bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_25%,transparent)]",
  "Half Day":
    "bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)] border-[color-mix(in_srgb,var(--primary)_25%,transparent)]",
  Weekend:
    "bg-[var(--bg-hover)] text-[var(--text-muted)] border-[var(--border-color)]",
  Holiday:
    "bg-[color-mix(in_srgb,var(--secondary)_10%,transparent)] text-[var(--secondary)] border-[color-mix(in_srgb,var(--secondary)_25%,transparent)]",
};

const AttendanceHistory = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.date.includes(search.trim());

    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Attendance History
          </h2>

          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Review your daily attendance records
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <input
              type="text"
              placeholder="Search date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] sm:w-44"
            />
          </div>

          <div className="relative">
            <Filter
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2.5 pl-9 pr-8 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] sm:w-40"
            >
              <option value="All">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
              <option value="Half Day">Half Day</option>
              <option value="Weekend">Weekend</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b border-[var(--border-color)] text-xs text-[var(--text-muted)]">
              <th className="px-4 py-4 font-medium">Date</th>
              <th className="px-4 py-4 font-medium">Check In</th>
              <th className="px-4 py-4 font-medium">Check Out</th>
              <th className="px-4 py-4 font-medium">Working Hours</th>
              <th className="px-4 py-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[var(--border-color)]/50 transition hover:bg-[var(--bg-hover)]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CalendarDays size={15} className="text-[var(--text-muted)]" />

                      {new Date(`${record.date}T00:00:00`).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">
                    {record.checkIn}
                  </td>

                  <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">
                    {record.checkOut}
                  </td>

                  <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">
                    {record.workingHours}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                        statusStyles[record.status]
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-sm text-[var(--text-muted)]"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-[var(--text-muted)]">
        Showing {filteredRecords.length} of {attendanceRecords.length} records
      </div>
    </div>
  );
};

export default AttendanceHistory;
