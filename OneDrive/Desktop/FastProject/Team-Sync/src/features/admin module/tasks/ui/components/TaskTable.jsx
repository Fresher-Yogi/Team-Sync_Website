import {
  MoreHorizontal,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

const TaskTable = ({
  tasks = [],
  employees,
  getPriorityStyle,
  getStatusStyle,
  getStatusLabel,
  formatDate,
  getInitials,
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">

      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] p-5">
        <div>
          <h2 className="font-semibold text-[var(--text-primary)]">
            Workspace Tasks
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            View, assign and track employee tasks
          </p>
        </div>

        <span className="rounded-lg bg-[var(--bg-hover)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
          {tasks.length} Tasks
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">

          <thead className="border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
            <tr className="text-xs text-[var(--text-muted)]">
              <th className="px-5 py-4 font-medium">Task Details</th>
              <th className="px-5 py-4 font-medium">Assigned To</th>
              <th className="px-5 py-4 font-medium">Priority</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Due Date</th>
              <th className="px-5 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-color)]">
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="transition hover:bg-[var(--bg-hover)]"
              >
                {/* Task Details */}
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] p-2 text-[var(--primary)]">
                      <ClipboardList size={17} />
                    </div>

                    <div className="max-w-[280px]">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {task.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                        {task.description || "No description provided"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Assigned Employee */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--secondary)_15%,transparent)] text-[10px] font-semibold text-[var(--secondary)]">
                      {getInitials(task.assignedTo?.name)}
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[var(--text-secondary)]">
                        {task.assignedTo?.name || "Unassigned"}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">
                        {task.assignedTo?.email || "No employee assigned"}
                      </p>
                    </div>
                  </div>

                  {/* Reassign Employee */}
                  <select
                    defaultValue={task.assignedTo?._id || ""}
                    aria-label={`Reassign ${task.title}`}
                    className="mt-2 max-w-[190px] rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-2 py-1.5 text-[10px] text-[var(--text-secondary)] outline-none focus:border-[var(--primary)]"
                  >
                    <option value="" disabled>
                      Select employee
                    </option>

                    {employees?.employees?.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Priority */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium capitalize ${getPriorityStyle(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium ${getStatusStyle(
                      task.status
                    )}`}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                </td>

                {/* Due Date */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <CalendarDays
                      size={14}
                      className="text-[var(--text-muted)]"
                    />

                    {formatDate(task.dueDate)}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    title="More options"
                    className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="border-t border-[var(--border-color)] px-5 py-3">
        <p className="text-xs text-[var(--text-muted)]">
          Showing {tasks.length} tasks on this page
        </p>
      </div>

    </section>
  );
};

export default TaskTable;