import { X } from "lucide-react";

const TaskForm = ({
  onClose,
  employees = [],
  taskFormSubmit,
  register,
  reset,
  handleSubmit,
  errors,
  isSubmitting,
}) => {
  const inputStyle =
    "w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)]";

  const labelStyle =
    "mb-2 block text-sm font-medium text-[var(--text-secondary)]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Create New Task
            </h2>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Assign a new task to your team member.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(taskFormSubmit)}
          className="space-y-5 p-6"
        >
          {/* Task Title */}
          <div>
            <label className={labelStyle}>Task Title *</label>

            <input
              type="text"
              placeholder="e.g. Prepare Q3 sales report"
              className={inputStyle}
              {...register("title", {
                required: "Task title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />

            {errors.title && (
              <p className="mt-1 text-xs text-[var(--danger)]">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>Description</label>

            <textarea
              rows={3}
              placeholder="Add task details..."
              className={`${inputStyle} resize-none`}
              {...register("description")}
            />
          </div>

          {/* Assign Employee */}
          <div>
            <label className={labelStyle}>Assign To *</label>

            <select
              className={inputStyle}
              {...register("assignedTo", {
                required: "Please select an employee",
              })}
            >
              <option value="">Select an employee</option>

              {employees?.employees?.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} ({employee.email})
                </option>
              ))}
            </select>

            {errors.assignedTo && (
              <p className="mt-1 text-xs text-[var(--danger)]">
                {errors.assignedTo.message}
              </p>
            )}
          </div>

          {/* Priority and Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelStyle}>Priority</label>

              <select
                className={inputStyle}
                {...register("priority")}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Due Date</label>

              <input
                type="date"
                className={inputStyle}
                {...register("dueDate")}
              />
            </div>
          </div>

          {/* Hidden Status */}
          <input type="hidden" {...register("status")} />

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-[var(--border-color)] pt-5">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="rounded-lg border border-[var(--border-color)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-main)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;