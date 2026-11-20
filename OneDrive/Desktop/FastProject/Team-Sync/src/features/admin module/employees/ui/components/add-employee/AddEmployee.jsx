
import useEmployeesHook from "../../../hooks/useEmployeesHook";
import AddEmployeeAvatar from "./AddEmployeeAvatar";

const AddEmployee = () => {
  const {
    employeeToEdit,
    handleSubmit,
    handleCancel,
    register,
    errors,
    onSubmit,
  } = useEmployeesHook();

  const inputClass =
    "w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_15%,transparent)]";

  const labelClass = "mb-2 block text-sm font-medium text-[var(--text-secondary)]";
  const errorClass = "mt-1 text-xs text-[var(--danger)]";

  return (
    <section className="mx-auto w-full max-w-5xl bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span>Team</span>
          <span>/</span>
          <span className="font-medium text-[var(--primary)]">
            Add New Employee
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {employeeToEdit ? "Edit Employee" : "Add Employee"}
        </h1>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Configure the new team member's workspace profile and permissions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Personal Information */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-md)] sm:p-7">
          <div className="mb-7 flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-lg text-[var(--primary)]">
              ♙
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Personal Information
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Basic details of your new team member
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <AddEmployeeAvatar />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-9">
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-[var(--danger)]">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  className={inputClass}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must contain at least 2 characters",
                    },
                  })}
                />

                {errors.name && (
                  <p className={errorClass}>{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Email Address <span className="text-[var(--danger)]">*</span>
                </label>

                <input
                  type="email"
                  placeholder="sarah@example.com"
                  className={inputClass}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />

                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Bio / About</label>

                <textarea
                  rows={3}
                  placeholder="Tell us about the new team member..."
                  className={`${inputClass} resize-none`}
                  {...register("bio")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-md)] sm:p-7">
          <div className="mb-7 flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-lg text-[var(--primary)]">
              ▣
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Employment Details
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Set up the employee's role and work information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Department <span className="text-[var(--danger)]">*</span>
              </label>

              <select
                className={inputClass}
                {...register("department", {
                  required: "Please select a department",
                })}
              >
                <option value="">Select Department</option>
                <option value="common">Common</option>
                <option value="marketing">Marketing</option>
                <option value="administrative">Administrative</option>
                <option value="security">Security</option>
                <option value="developer">Developer</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
              </select>

              {errors.department && (
                <p className={errorClass}>{errors.department.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Role <span className="text-[var(--danger)]">*</span>
              </label>

              <select
                className={inputClass}
                {...register("role", {
                  required: "Please select a role",
                })}
              >
                <option value="">Select Role</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>

              {errors.role && (
                <p className={errorClass}>{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Joining Date <span className="text-[var(--danger)]">*</span>
              </label>

              <input
                type="date"
                className={inputClass}
                {...register("joiningDate", {
                  required: "Joining date is required",
                })}
              />

              {errors.joiningDate && (
                <p className={errorClass}>{errors.joiningDate.message}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Employment Status</label>

              <div className="mt-3 flex items-center gap-7">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <input
                    type="radio"
                    value="active"
                    className="h-4 w-4 accent-[var(--primary)]"
                    {...register("status")}
                  />
                  Active
                </label>

                <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <input
                    type="radio"
                    value="inactive"
                    className="h-4 w-4 accent-[var(--primary)]"
                    {...register("status")}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="mb-4 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl border border-[var(--border-color)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-hover)]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--bg-main)] shadow-lg transition hover:opacity-85 active:scale-[0.98]"
          >
            {employeeToEdit ? "Save Employee" : "+ Create Employee"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddEmployee;
