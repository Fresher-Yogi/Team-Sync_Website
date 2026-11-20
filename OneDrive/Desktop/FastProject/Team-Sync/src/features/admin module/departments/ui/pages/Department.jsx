
import useDepartmentHook from "../../hooks/useDepartmentHook";
import DepartmentForm from "../components/DepartmentForm";

const Department = () => {
  const {
    employeeIsPending,
    navigate,
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleCancel,
    employees,
  } = useDepartmentHook();

  return (
    <div className="min-h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Department Management
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
            Create, organize, and manage your organization's departments.
          </p>
        </div>

        {/* Total Departments */}
        <div
          onClick={() => navigate("/home/all-departments")}
          className="flex min-w-52 cursor-pointer items-center gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-5 py-4 shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01M15 12v.01M15 15v.01M15 18v.01"
              />
            </svg>
          </div>

          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">
              Total Departments
            </p>
          </div>
        </div>
      </div>

      {/* Department Form */}
      <DepartmentForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        employees={employees?.employees}
        employeeIsPending={employeeIsPending}
      />
    </div>
  );
};

export default Department;
