import { ClipboardList } from "lucide-react";

const EmployeeTaskHeader = () => {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          My Tasks
        </h1>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Manage and track the tasks assigned to you.
        </p>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--primary)]">
        <ClipboardList size={21} />
      </div>
    </div>
  );
};

export default EmployeeTaskHeader;