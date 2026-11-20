import { Search } from "lucide-react";

const TaskToolbar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}) => {
  const inputStyle =
    "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2.5 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)] placeholder:text-[var(--text-muted)]";

  const selectStyle =
    "rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-2.5 text-sm text-[var(--text-secondary)] outline-none transition focus:border-[var(--primary)]";

  return (
    <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          All Tasks
        </h2>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Manage and assign tasks across your workspace
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">

        {/* Search */}
        <div className="relative min-w-0 sm:w-64">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className={`${inputStyle} pl-10 pr-4`}
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={selectStyle}
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className={selectStyle}
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

      </div>
    </div>
  );
};

export default TaskToolbar;