import { CalendarDays, ArrowUpRight } from "lucide-react";

const EmployeeTaskCard = ({ task, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(task._id)}
      className="group w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-left transition hover:border-[color-mix(in_srgb,var(--primary)_30%,transparent)] hover:bg-[var(--bg-hover)]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">

        <span
          className={`rounded-md px-2.5 py-1 text-[11px] font-semibold capitalize ${task.priorityClassName}`}
        >
          {task.priorityLabel}
        </span>

        <ArrowUpRight
          size={17}
          className="shrink-0 text-[var(--text-muted)] transition group-hover:text-[var(--primary)]"
        />

      </div>

      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {task.title}
      </h3>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">

        <span className="text-xs text-[var(--text-muted)]">
          {task.assigneeName}
        </span>

        {task.formattedDueDate && (
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <CalendarDays size={13} />
            {task.formattedDueDate}
          </span>
        )}

      </div>
    </button>
  );
};

export default EmployeeTaskCard;