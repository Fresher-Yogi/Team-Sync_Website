
export const attendanceStats = [
  {
    label: "Present Days",
    value: "16",
    change: "+2 from last month",
    icon: "calendar-check",
    color: "text-[var(--success)]",
    bg: "bg-[color-mix(in_srgb,var(--success)_10%,transparent)]",
  },
  {
    label: "Absent Days",
    value: "01",
    change: "Within allowed limit",
    icon: "calendar-x",
    color: "text-[var(--danger)]",
    bg: "bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]",
  },
  {
    label: "Leave Days",
    value: "02",
    change: "1 casual, 1 sick leave",
    icon: "calendar-minus",
    color: "text-[var(--warning)]",
    bg: "bg-[color-mix(in_srgb,var(--warning)_10%,transparent)]",
  },
  {
    label: "Attendance Rate",
    value: "94.1%",
    change: "+3.2% from last month",
    icon: "chart-no-axes-combined",
    color: "text-[var(--primary)]",
    bg: "bg-[color-mix(in_srgb,var(--primary)_10%,transparent)]",
  },
];

// Keep your existing todayAttendance and attendanceRecords
// exactly as they are below this section.
