import { X, CalendarDays } from "lucide-react";

const EmployeeTaskDetails = ({
  task,
  isLoading,
  isError,
  error,
  getErrorMessage,
  onClose,
  onStatusChange,
  isUpdating,
  statusError,
  statusOptions = [],
}) => {
  if (!task && !isLoading && !isError) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-lg rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-2xl sm:p-6">

        {/* Modal Header */}
        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Task Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <X size={19} />
          </button>

        </div>

        {/* Loading */}
        {isLoading ? (
          <p className="py-8 text-center text-sm text-[var(--text-secondary)]">
            Loading task details...
          </p>
        ) : isError ? (
          <div className="py-8 text-center">
            <p className="text-sm text-[var(--danger)]">
              Unable to load task details
            </p>

            <p className="mt-2 text-xs text-[var(--text-muted)]">
              {getErrorMessage(error)}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-5">

              {/* Task Title */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Task title
                </p>

                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  {task?.title || "Untitled task"}
                </h3>
              </div>

              {/* Priority */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Priority
                </p>

                <p className="text-sm capitalize text-[var(--text-secondary)]">
                  {task?.priority || "Not specified"}
                </p>
              </div>

              {/* Due Date */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Due date
                </p>

                <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <CalendarDays size={15} />
                  {task?.formattedDueDate || "Not specified"}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  Status
                </p>

                <select
                  value={task?.status || "todo"}
                  disabled={isUpdating}
                  onChange={(event) =>
                    onStatusChange(event.target.value)
                  }
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-hover)] px-3 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                {isUpdating && (
                  <p className="mt-2 text-xs text-[var(--primary)]">
                    Updating status...
                  </p>
                )}

                {statusError && (
                  <p className="mt-2 text-xs text-[var(--danger)]">
                    {getErrorMessage(statusError)}
                  </p>
                )}
              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 w-full rounded-xl bg-[var(--primary)] py-3 text-sm font-semibold text-[#101010] transition hover:opacity-90"
            >
              Close
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default EmployeeTaskDetails;