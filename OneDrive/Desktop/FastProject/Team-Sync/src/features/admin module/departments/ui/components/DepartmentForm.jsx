
const DepartmentForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  onCancel,
  employees = [],
  employeeIsPending,
}) => {
  const inputClasses =
    "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] hover:border-[var(--primary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_15%,transparent)]";

  const labelClasses =
    "mb-2.5 block text-sm font-medium text-[var(--text-secondary)]";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-md"
    >
      {/* Form Heading */}
      <div className="border-b border-[var(--border-color)] px-5 py-6 sm:px-7">
        <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
          Create New Department
        </h2>

        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
          Add department information and assign a manager and employees.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-7 px-5 py-7 sm:px-7">
        {/* Department Name */}
        <div>
          <label className={labelClasses}>
            Department Name <span className="text-[var(--danger)]">*</span>
          </label>

          <input
            type="text"
            placeholder="e.g. Human Resources"
            {...register("name", {
              required: "Department name is required",
            })}
            className={inputClasses}
          />

          {errors.name && (
            <p className="mt-2 text-xs text-[var(--danger)]">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Department Manager */}
        <div>
          <label className={labelClasses}>
            Department Manager <span className="text-[var(--danger)]">*</span>
          </label>

          <select
            {...register("manager", {
              required: "Please select a department manager",
            })}
            className={`${inputClasses} cursor-pointer`}
          >
            <option value="">Select department manager</option>

            {employeeIsPending ? (
              <option disabled>Loading employees...</option>
            ) : employees.length > 0 ? (
              employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} — {employee.email}
                </option>
              ))
            ) : (
              <option disabled>No employees found</option>
            )}
          </select>

          {errors.manager && (
            <p className="mt-2 text-xs text-[var(--danger)]">
              {errors.manager.message}
            </p>
          )}
        </div>

        {/* Department Employees */}
        <div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Select Department Employees
            </label>

            <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
              Select the employees who will belong to this department.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] p-3 transition-colors hover:border-[var(--primary)] focus-within:border-[var(--primary)]">
            <select
              multiple
              {...register("employees")}
              className="min-h-40 w-full cursor-pointer space-y-1 bg-transparent text-sm text-[var(--text-primary)] outline-none"
            >
              {employeeIsPending ? (
                <option disabled>Loading employees...</option>
              ) : employees.length > 0 ? (
                employees.map((employee) => (
                  <option
                    key={employee._id}
                    value={employee._id}
                    className="bg-[var(--bg-card)] text-[var(--text-primary)]"
                  >
                    {employee.name} — {employee.email}
                  </option>
                ))
              ) : (
                <option disabled>No employees found</option>
              )}
            </select>
          </div>

          <p className="mt-2.5 text-xs leading-relaxed text-[var(--text-muted)]">
            Hold{" "}
            <span className="font-medium text-[var(--text-secondary)]">
              Ctrl
            </span>{" "}
            on Windows or{" "}
            <span className="font-medium text-[var(--text-secondary)]">
              Command
            </span>{" "}
            on Mac to select multiple employees.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className={labelClasses}>
            Department Description
          </label>

          <textarea
            rows={4}
            placeholder="Write a short description about this department..."
            {...register("description", {
              maxLength: {
                value: 300,
                message: "Description cannot exceed 300 characters",
              },
            })}
            className={`${inputClasses} min-h-28 resize-y leading-relaxed`}
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            {errors.description ? (
              <p className="text-xs text-[var(--danger)]">
                {errors.description.message}
              </p>
            ) : (
              <p className="text-xs text-[var(--text-muted)]">
                Briefly describe the department's responsibilities.
              </p>
            )}

            <span className="shrink-0 text-xs text-[var(--text-muted)]">
              Maximum 300 characters
            </span>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col-reverse justify-end gap-3 border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-5 py-5 sm:flex-row sm:px-7">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[var(--border-color)] px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-[var(--bg-main)] transition hover:opacity-85 active:scale-[0.98]"
        >
          Create Department
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;
