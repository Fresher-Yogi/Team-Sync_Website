import EmployeeTaskCard from "./EmployeeTaskCard";

const EmployeeTaskColumn = ({
  title,
  tasks = [],
  color,
  onTaskClick,
}) => {
  return (
    <div className="min-w-0 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${color}`} />

          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            {title}
          </h2>

          <span className="rounded-md bg-[var(--bg-hover)] px-2 py-0.5 text-xs text-[var(--text-secondary)]">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <EmployeeTaskCard
              key={task._id}
              task={task}
              onClick={onTaskClick}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-[var(--border-color)] px-3 py-8 text-center text-xs text-[var(--text-muted)]">
            No tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaskColumn;